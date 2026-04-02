// ============================================================
// SRS (SPACED REPETITION) — Leitner Box System
// ============================================================

var LJSRS = (function () {
  var STORAGE_KEY = 'lj_srs';

  // Leitner box intervals in milliseconds
  var INTERVALS = [
    0,                    // Box 1: review now
    1 * 24 * 3600000,    // Box 2: 1 day
    3 * 24 * 3600000,    // Box 3: 3 days
    7 * 24 * 3600000,    // Box 4: 7 days
    14 * 24 * 3600000    // Box 5: 14 days (mastered)
  ];

  var BOX_LABELS = ['Mới', '1 ngày', '3 ngày', '7 ngày', '14 ngày'];

  // ─── Data persistence ──────────────────────────────
  function getData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* localStorage full */ }
  }

  // ─── Card state management ─────────────────────────
  function getCardState(deckId, cardIndex) {
    var data = getData();
    if (!data[deckId]) return null;
    return data[deckId][cardIndex] || null;
  }

  function initCard(deckId, cardIndex) {
    var data = getData();
    if (!data[deckId]) data[deckId] = {};
    if (!data[deckId][cardIndex]) {
      data[deckId][cardIndex] = {
        box: 0,
        next: Date.now(),
        last: 0
      };
    }
    saveData(data);
    return data[deckId][cardIndex];
  }

  function initDeck(deckId, totalCards) {
    var data = getData();
    if (!data[deckId]) data[deckId] = {};
    for (var i = 0; i < totalCards; i++) {
      if (!data[deckId][i]) {
        data[deckId][i] = { box: 0, next: Date.now(), last: 0 };
      }
    }
    saveData(data);
  }

  // ─── Review logic ──────────────────────────────────
  function markCorrect(deckId, cardIndex) {
    var data = getData();
    if (!data[deckId] || !data[deckId][cardIndex]) return;

    var card = data[deckId][cardIndex];
    card.box = Math.min(card.box + 1, 4);
    card.last = Date.now();
    card.next = Date.now() + INTERVALS[card.box];
    saveData(data);
  }

  function markWrong(deckId, cardIndex) {
    var data = getData();
    if (!data[deckId] || !data[deckId][cardIndex]) return;

    var card = data[deckId][cardIndex];
    card.box = 0;
    card.last = Date.now();
    card.next = Date.now();
    saveData(data);
  }

  function getDueCards(deckId) {
    var data = getData();
    if (!data[deckId]) return [];

    var now = Date.now();
    var due = [];
    var keys = Object.keys(data[deckId]);
    for (var i = 0; i < keys.length; i++) {
      var card = data[deckId][keys[i]];
      if (card.next <= now) {
        due.push(parseInt(keys[i], 10));
      }
    }
    // Shuffle due cards
    for (var j = due.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = due[j]; due[j] = due[k]; due[k] = tmp;
    }
    return due;
  }

  function getDeckStats(deckId) {
    var data = getData();
    if (!data[deckId]) return { total: 0, due: 0, boxes: [0, 0, 0, 0, 0] };

    var now = Date.now();
    var stats = { total: 0, due: 0, boxes: [0, 0, 0, 0, 0] };
    var keys = Object.keys(data[deckId]);
    stats.total = keys.length;

    for (var i = 0; i < keys.length; i++) {
      var card = data[deckId][keys[i]];
      stats.boxes[card.box]++;
      if (card.next <= now) stats.due++;
    }
    return stats;
  }

  function resetDeck(deckId) {
    var data = getData();
    delete data[deckId];
    saveData(data);
  }

  // ─── SRS Review UI ─────────────────────────────────
  var reviewState = {
    deckId: null,
    dueCards: [],
    currentIndex: 0,
    allCards: [],
    isActive: false
  };

  function startReview(deckId) {
    var deck = document.getElementById(deckId);
    if (!deck) return;

    var cards = deck.querySelectorAll('.flashcard');
    reviewState.allCards = Array.from(cards);
    reviewState.deckId = deckId;

    // Initialize all cards in SRS if not already
    initDeck(deckId, cards.length);

    var due = getDueCards(deckId);
    if (due.length === 0) {
      showNoCardsMessage(deckId);
      return;
    }

    reviewState.dueCards = due;
    reviewState.currentIndex = 0;
    reviewState.isActive = true;

    // Hide grid, show SRS UI
    deck.style.display = 'none';

    var container = document.getElementById('srs-container');
    if (!container) {
      container = createReviewUI();
      deck.parentNode.insertBefore(container, deck.nextSibling);
    }

    container.style.display = 'block';
    showCurrentCard();
    updateSRSStats();

    // Hide normal controls
    var controls = document.querySelector('.flashcard-controls');
    if (controls) controls.style.display = 'none';
    var score = document.querySelector('.flashcard-score');
    if (score) score.style.display = 'none';
  }

  function createReviewUI() {
    var container = document.createElement('div');
    container.id = 'srs-container';
    container.className = 'srs-container';

    container.innerHTML =
      '<div class="srs-progress">' +
        '<div class="srs-progress-bar"><div class="srs-progress-fill" id="srs-progress-fill"></div></div>' +
        '<span class="srs-progress-text" id="srs-progress-text">0 / 0</span>' +
      '</div>' +
      '<div class="srs-stats" id="srs-stats"></div>' +
      '<div class="srs-card-area" id="srs-card-area"></div>' +
      '<div class="srs-buttons" id="srs-buttons" style="display:none;">' +
        '<button class="btn srs-btn srs-btn-wrong" onclick="LJSRS.rateWrong()">Chưa biết</button>' +
        '<button class="btn srs-btn srs-btn-right" onclick="LJSRS.rateCorrect()">Biết rồi</button>' +
      '</div>' +
      '<div class="srs-complete" id="srs-complete" style="display:none;">' +
        '<div class="srs-complete-icon">&#127881;</div>' +
        '<h3>Hoàn thành!</h3>' +
        '<p id="srs-complete-msg"></p>' +
        '<button class="btn btn-primary" onclick="LJSRS.exitReview()">Quay lại</button>' +
      '</div>' +
      '<div class="srs-exit">' +
        '<button class="btn btn-secondary" onclick="LJSRS.exitReview()">Thoát ôn tập</button>' +
      '</div>';

    return container;
  }

  function showCurrentCard() {
    var area = document.getElementById('srs-card-area');
    var buttons = document.getElementById('srs-buttons');
    if (!area) return;

    if (reviewState.currentIndex >= reviewState.dueCards.length) {
      showComplete();
      return;
    }

    var cardIdx = reviewState.dueCards[reviewState.currentIndex];
    var originalCard = reviewState.allCards[cardIdx];
    if (!originalCard) return;

    // Clone the card for SRS display
    var front = originalCard.querySelector('.flashcard-front');
    var back = originalCard.querySelector('.flashcard-back');
    var cardClass = originalCard.className.replace('flipped', '').replace('known', '').trim();

    area.innerHTML =
      '<div class="' + cardClass + ' srs-single-card" id="srs-active-card" onclick="LJSRS.flipCurrent()">' +
        '<div class="flashcard-inner">' +
          '<div class="flashcard-front">' + front.innerHTML + '</div>' +
          '<div class="flashcard-back">' + back.innerHTML + '</div>' +
        '</div>' +
      '</div>' +
      '<p class="srs-flip-hint" id="srs-flip-hint">Nhấn để lật thẻ</p>';

    buttons.style.display = 'none';

    // Update progress
    var total = reviewState.dueCards.length;
    var current = reviewState.currentIndex;
    var fill = document.getElementById('srs-progress-fill');
    var text = document.getElementById('srs-progress-text');
    if (fill) fill.style.width = Math.round((current / total) * 100) + '%';
    if (text) text.textContent = (current + 1) + ' / ' + total;
  }

  function flipCurrent() {
    var card = document.getElementById('srs-active-card');
    var buttons = document.getElementById('srs-buttons');
    var hint = document.getElementById('srs-flip-hint');

    if (card) {
      card.classList.toggle('flipped');
      if (card.classList.contains('flipped') && buttons) {
        buttons.style.display = 'flex';
        if (hint) hint.style.display = 'none';
      }
    }
  }

  function rateCorrect() {
    var cardIdx = reviewState.dueCards[reviewState.currentIndex];
    markCorrect(reviewState.deckId, cardIdx);
    reviewState.currentIndex++;
    showCurrentCard();
    updateSRSStats();
  }

  function rateWrong() {
    var cardIdx = reviewState.dueCards[reviewState.currentIndex];
    markWrong(reviewState.deckId, cardIdx);
    // Add card back to end of queue
    reviewState.dueCards.push(cardIdx);
    reviewState.currentIndex++;
    showCurrentCard();
    updateSRSStats();
  }

  function showComplete() {
    var area = document.getElementById('srs-card-area');
    var buttons = document.getElementById('srs-buttons');
    var complete = document.getElementById('srs-complete');
    var msg = document.getElementById('srs-complete-msg');
    var fill = document.getElementById('srs-progress-fill');

    if (area) area.innerHTML = '';
    if (buttons) buttons.style.display = 'none';
    if (fill) fill.style.width = '100%';

    var stats = getDeckStats(reviewState.deckId);
    if (msg) {
      msg.textContent = 'Bạn đã ôn xong ' + reviewState.dueCards.length +
        ' thẻ. Thẻ cần ôn tiếp: ' + stats.due;
    }
    if (complete) complete.style.display = 'block';
  }

  function showNoCardsMessage(deckId) {
    var stats = getDeckStats(deckId);
    var deck = document.getElementById(deckId);
    var container = document.getElementById('srs-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'srs-container';
      container.className = 'srs-container';
      deck.parentNode.insertBefore(container, deck.nextSibling);
    }

    container.style.display = 'block';
    container.innerHTML =
      '<div class="srs-no-cards">' +
        '<div class="srs-complete-icon">&#10003;</div>' +
        '<h3>Không có thẻ cần ôn!</h3>' +
        '<p>Tất cả ' + stats.total + ' thẻ đã được ôn tập. Quay lại sau nhé!</p>' +
        '<div class="srs-box-summary" id="srs-box-summary"></div>' +
        '<button class="btn btn-primary" onclick="LJSRS.exitReview()">Quay lại</button>' +
      '</div>';

    updateBoxSummary(stats);

    deck.style.display = 'none';
    var controls = document.querySelector('.flashcard-controls');
    if (controls) controls.style.display = 'none';
    var score = document.querySelector('.flashcard-score');
    if (score) score.style.display = 'none';
  }

  function exitReview() {
    reviewState.isActive = false;
    var container = document.getElementById('srs-container');
    if (container) container.style.display = 'none';

    var deck = document.getElementById(reviewState.deckId);
    if (deck) deck.style.display = '';

    var controls = document.querySelector('.flashcard-controls');
    if (controls) controls.style.display = '';
    var score = document.querySelector('.flashcard-score');
    if (score) score.style.display = '';
  }

  function updateSRSStats() {
    var el = document.getElementById('srs-stats');
    if (!el) return;
    var stats = getDeckStats(reviewState.deckId);
    el.innerHTML =
      '<div class="srs-box-row">' +
        stats.boxes.map(function (count, i) {
          return '<div class="srs-box-item' + (i === 0 ? ' srs-box-new' : '') + (i === 4 ? ' srs-box-mastered' : '') + '">' +
            '<span class="srs-box-count">' + count + '</span>' +
            '<span class="srs-box-label">' + BOX_LABELS[i] + '</span>' +
          '</div>';
        }).join('') +
      '</div>';
  }

  function updateBoxSummary(stats) {
    var el = document.getElementById('srs-box-summary');
    if (!el) return;
    el.innerHTML =
      '<div class="srs-box-row">' +
        stats.boxes.map(function (count, i) {
          return '<div class="srs-box-item' + (i === 0 ? ' srs-box-new' : '') + (i === 4 ? ' srs-box-mastered' : '') + '">' +
            '<span class="srs-box-count">' + count + '</span>' +
            '<span class="srs-box-label">' + BOX_LABELS[i] + '</span>' +
          '</div>';
        }).join('') +
      '</div>';
  }

  // ─── Badge: show due count on flashcard hub ────────
  function updateDueBadges() {
    var deckCards = document.querySelectorAll('.deck-card[data-deck-id]');
    deckCards.forEach(function (card) {
      var deckId = card.getAttribute('data-deck-id');
      var stats = getDeckStats(deckId);
      if (stats.due > 0) {
        var badge = card.querySelector('.deck-due-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'deck-due-badge';
          card.appendChild(badge);
        }
        badge.textContent = stats.due + ' cần ôn';
      }
    });
  }

  // Init on page load
  document.addEventListener('DOMContentLoaded', updateDueBadges);

  return {
    startReview: startReview,
    exitReview: exitReview,
    flipCurrent: flipCurrent,
    rateCorrect: rateCorrect,
    rateWrong: rateWrong,
    getDeckStats: getDeckStats,
    getDueCards: getDueCards,
    initDeck: initDeck,
    resetDeck: resetDeck,
    markCorrect: markCorrect,
    markWrong: markWrong
  };
})();
