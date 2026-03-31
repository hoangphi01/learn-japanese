// ============================================================
// FLASHCARD SYSTEM
// ============================================================

var LJFlashcard = (function () {
  function shuffle(deckId) {
    var deck = document.getElementById(deckId);
    if (!deck) return;

    var cards = Array.from(deck.querySelectorAll('.flashcard'));
    // Reset flipped state
    cards.forEach(function (c) { c.classList.remove('flipped'); });

    // Fisher-Yates shuffle
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      deck.appendChild(cards[j]);
      var temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
  }

  function flipAll(deckId) {
    var deck = document.getElementById(deckId);
    if (!deck) return;

    var cards = deck.querySelectorAll('.flashcard');
    var anyFlipped = false;
    cards.forEach(function (c) {
      if (c.classList.contains('flipped')) anyFlipped = true;
    });

    cards.forEach(function (c) {
      if (anyFlipped) {
        c.classList.remove('flipped');
      } else {
        c.classList.add('flipped');
      }
    });
  }

  function resetAll(deckId) {
    var deck = document.getElementById(deckId);
    if (!deck) return;

    var cards = deck.querySelectorAll('.flashcard');
    cards.forEach(function (c) {
      c.classList.remove('flipped', 'known');
    });

    updateScore(deckId);
  }

  function toggleKnown(card) {
    card.classList.toggle('known');
    var deck = card.closest('.flashcard-grid');
    if (deck && deck.id) {
      updateScore(deck.id);
    }
  }

  function updateScore(deckId) {
    var deck = document.getElementById(deckId);
    if (!deck) return;

    var total = deck.querySelectorAll('.flashcard').length;
    var known = deck.querySelectorAll('.flashcard.known').length;

    var scoreEl = document.querySelector('[data-deck-score="' + deckId + '"]');
    if (scoreEl) {
      scoreEl.textContent = known + ' / ' + total;
    }
  }

  // Double-click to mark as known
  document.addEventListener('dblclick', function (e) {
    var card = e.target.closest('.flashcard');
    if (card) {
      toggleKnown(card);
    }
  });

  return {
    shuffle: shuffle,
    flipAll: flipAll,
    resetAll: resetAll,
    toggleKnown: toggleKnown
  };
})();
