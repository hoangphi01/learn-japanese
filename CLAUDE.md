# CLAUDE.md — NihonGo! Project Instructions

## Build & Dev Commands

```bash
bundle install              # Install dependencies
bundle exec jekyll serve    # Dev server at localhost:4000/learn-japanese/
bundle exec jekyll build    # Production build → _site/
```

- Ruby 3.3.6 via rbenv
- Jekyll 4.3, jekyll-seo-tag, webrick
- No npm, no bundlers, no build tools beyond Bundler

## Project Structure

```
_config.yml          # Jekyll config (baseurl: /learn-japanese)
_data/               # YAML data files (curriculum, kana, vocabulary, rules, grammar, mock tests, reading)
_includes/           # Reusable HTML components (boxes, nav, sidebar, quiz, flashcard)
_layouts/            # Page templates (default → lesson, chapter, quiz, flashcard)
_lessons/            # Lesson content (Markdown + includes) — 71 lessons total
  ch01/              # Phase 1: Katakana & Sound System (4 lessons)
  ch02/              # Phase 1: Dakuten, Combos, Numbers (4 lessons)
  ch03/              # Phase 1: Hiragana (4 lessons)
  ch04/              # Phase 2: Particles / Trợ Từ (4 lessons)
  ch05/              # Phase 2: Verbs & Nouns (4 lessons)
  ch06/              # Phase 2: Hán-Việt Decoder (3 lessons)
  ch07/              # Phase 3: 3 Kịch Bản (4 lessons)
  ch08/              # Phase 3: Simulation Drills (3 lessons)
  ch09/              # Phase 3: Ôn Tập & Nghe Hiểu (3 lessons)
  ch10/              # Phase 4: Tính Từ い/な (5 lessons)
  ch11/              # Phase 4: Te-Form (4 lessons)
  ch12/              # Phase 4: Nai-Form (3 lessons)
  ch13/              # Phase 4: Ta-Form & Trải Nghiệm (3 lessons)
  ch14/              # Phase 4: Dictionary Form & Khả Năng (3 lessons)
  ch15/              # Phase 5: Plain Form & Speech Register (3 lessons)
  ch16/              # Phase 5: Tồn Tại & Vị Trí (3 lessons)
  ch17/              # Phase 5: Counters & So Sánh (4 lessons)
  ch18/              # Phase 5: Mong Muốn & Cho-Nhận (3 lessons)
  ch19/              # Phase 5: Điều Kiện & Mệnh Đề Quan Hệ (4 lessons)
  ch20/              # Phase 6: Tổng Ôn N5 — Grand Review (3 lessons)
assets/
  css/               # 8 CSS files (style, boxes, flashcard, quiz, srs, mock-test, grammar, welcome)
  js/                # 9 JS modules (theme, nav, progress, quiz, flashcard, srs, mock-test, hv-decoder, welcome)
  font/              # Bookerly + Minecraft Unicode (do NOT modify)
  images/            # preview.png (OG meta), icons, logos
flashcards/          # Flashcard hub + deck pages (index, katakana, hiragana, 6 vocab decks)
pages/               # Static pages (about, hv-decoder, roadmap, mock-test, grammar, reading, travel-phrasebook)
index.md             # Homepage
```

## Key Conventions

### Lesson Files

Path pattern: `_lessons/ch{NN}/{NN}-kebab-title.md`

Required frontmatter:

```yaml
layout: lesson
title: "Vietnamese title"
chapter: 1                          # Chapter number
lesson: 2                           # Lesson number within chapter
total_lessons_in_chapter: 4
phase: 1                            # Learning phase (1–6)
week: 1                             # Week number
estimated_time: "20 phút"
prev_lesson: ch01/01-slug           # Empty string if first
next_lesson: ch01/03-slug           # Empty string if last
tags: [katakana, kana, phase-1]
level: N5
```

### Data Files

| File | Purpose |
|------|---------|
| `chapters.yml` | Chapter definitions: id, title, short_title, level, phase, week, milestone, lessons count |
| `levels.yml` | JLPT levels (N5–N1): id, title, description, active boolean |
| `kana.yml` | Katakana & Hiragana characters: char, romaji, row, strokes, note; dakuten variants |
| `hv_rules.yml` | 15 Hán-Việt → On'yomi mapping rules with examples |
| `vocabulary.yml` | Loanwords (jp, romaji, en, vi) and numbers (num, jp, romaji) |
| `flashcard_decks.yml` | 6 vocabulary flashcard decks (loanwords, numbers, particles, verbs, nouns, hanviet) |
| `grammar.yml` | 20 N5 grammar patterns with examples, formation, tags |
| `mock_test_n5.yml` | 37 mock test questions (vocabulary, grammar, reading) |
| `reading_practice.yml` | 5 reading texts with furigana + vocabulary |
| `n5_vocabulary.yml` | Extended N5 vocabulary list |
| `travel_phrases.yml` | Travel/survival phrases |

### Content Boxes (Includes)

```liquid
{% include vocab-box.html title="Title" content="Markdown content" %}
{% include grammar-box.html title="Title" content="Content" %}
{% include exercise-box.html title="Title" content="Content" %}
{% include culture-box.html title="Title" content="Content" %}
{% include formula-box.html content="Content" %}
```

Also available: `flashcard.html` (params: front, back, note).

### Quiz Components (3 Types)

**1. Multiple Choice** — `quiz-question.html` or inline HTML

```liquid
{% include quiz-question.html correct="B" question="Question?" options="A|B|C" explanation="Why B is correct" %}
```

Inline HTML (preferred pattern in most lessons):

```html
<div class="quiz-section">
<div class="quiz-question" data-correct="answer">
<p class="question-text">Question text</p>
<div class="question-options">
<button class="option-btn" data-value="answer" onclick="LJQuiz.checkAnswer(this, 'answer')">Correct option</button>
<button class="option-btn" data-value="wrong" onclick="LJQuiz.checkAnswer(this, 'answer')">Wrong option</button>
</div>
<div class="question-explanation" style="display:none;">Explanation here.</div>
</div>
</div>

<div class="quiz-results" id="quiz-results" style="display:none;">
<div class="results-card">
<h2>Kết quả</h2>
<div class="score-display">
<span class="score-number" id="quiz-score">0</span>
<span class="score-total">/ <span id="quiz-total">N</span></span>
</div>
<p class="score-message" id="score-message"></p>
<button class="btn btn-primary" onclick="LJQuiz.reset()">Làm lại</button>
</div>
</div>
```

**2. Matching** — `matching-quiz.html`

```liquid
{% include matching-quiz.html pairs="ア:a,イ:i,ウ:u,エ:e,オ:o" %}
```

- `pairs`: comma-separated `left:right` values. Right column auto-shuffled by JS.

**3. Fill-in-the-Blank** — `fill-blank.html`

```liquid
{% include fill-blank.html before="私は" blank="学生|がくせい" after="です。" hint="student" %}
```

- `blank`: pipe-separated accepted answers. `hint`: optional, shown via button.

### CSS Theme System

- **Pixel theme** (default): `--radius: 0px`, thick borders, pixelated shadows
- **Modern theme**: Applied via `[data-theme="modern"]` on `<html>`, rounded corners, soft shadows
- Custom properties defined in `:root` of `style.css`
- Responsive: sidebar collapses at 1024px, mobile dock appears
- **Chapter accent colors**: `lesson.html` sets `data-chapter` on `<article>`, CSS targets `.lesson-page[data-chapter="N"]` to color badge and header border per chapter
- **`.kana-table`**: Global table class in `style.css` for kana/vocabulary tables (navy header, zebra rows). **All tables must use `class="kana-table"`** — Markdown tables render without styling. Use HTML `<table class="kana-table">` for proper borders/colors in both themes.

### JavaScript Modules

All use IIFE pattern. No frameworks.

| Module | Global | Purpose |
|--------|--------|---------|
| `theme.js` | — | Theme toggle (side-effect only) |
| `nav.js` | — | Sidebar, chapter expand/collapse, level filter |
| `progress.js` | `LJProgress` | Lesson completion & quiz score tracking |
| `quiz.js` | `LJQuiz` | Quiz answer checking & scoring (3 types: MC, matching, fill-blank) |
| `flashcard.js` | `LJFlashcard` | Deck shuffle, flip, known-marking, TTS (Web Speech API) |
| `srs.js` | `LJSRS` | Spaced repetition — Leitner 5-box system, review mode |
| `mock-test.js` | `LJMockTest` | N5 mock test engine — timed, randomized, section scoring |
| `hv-decoder.js` | `LJHVDecoder` | HV→On'yomi dictionary lookup + rule prediction |
| `welcome.js` | `LJWelcome` | Onboarding modal & level selection |
| `phrasebook.js` | — | Travel phrasebook TTS + category filter |

### localStorage Keys

| Key | Value | Used By |
|-----|-------|---------|
| `lj_theme` | `'modern'` or empty | theme.js |
| `lj_progress` | JSON `{ lessons: {}, quizScores: {} }` | progress.js |
| `lj_selected_level` | `'N5'`, `'N4'`, etc. | nav.js, welcome.js |
| `lj_sidebar` | `'collapsed'` or `'open'` | nav.js |
| `lj_welcome_dismissed` | `'true'` or absent | welcome.js |
| `lj_srs` | JSON `{ deckId: { cardIndex: { box, next, last } } }` | srs.js |
| `lj_last_visit` | timestamp string | daily reminder (default.html) |
| `lj_reminder_dismissed` | timestamp string | daily reminder (default.html) |

## 6 Pillars Architecture

NihonGo! has 6 core interactive pillars:

| Pillar | Path | Purpose |
|--------|------|---------|
| **Lessons** | `_lessons/ch{NN}/` | Structured curriculum (Markdown + includes) |
| **Flashcards + SRS** | `flashcards/` | Practice decks with Leitner spaced repetition |
| **Mock Test** | `pages/mock-test.md` | Timed N5 mock exam (23 randomized questions from 37-question bank) |
| **Grammar Hub** | `pages/grammar.md` | Searchable/filterable grammar reference (20 patterns) |
| **Reading Practice** | `pages/reading.md` | Short texts with furigana + translation + vocab |
| **HV Decoder** | `pages/hv-decoder.md` | Interactive Hán-Việt → On'yomi lookup tool |

Supporting tools:
- **Travel Phrasebook** (`pages/travel-phrasebook.md`) — 120+ phrases with TTS
- **Daily Review Reminder** — localStorage-based "days since last visit" banner

### Flashcard System

- **Kana decks** (katakana, hiragana): use `layout: default`, read from `kana.yml` directly
- **Vocabulary decks** (6 decks): use `layout: flashcard`, read from `flashcard_decks.yml` via `page.deck_id`
- **Index page** (`flashcards/index.md`): hub listing all 8 decks grouped by phase
- **SRS Review**: Each deck has "Ôn tập SRS" button → single-card review mode with Leitner scheduling
- **TTS**: All flashcards have 🔊 button using Web Speech API (Japanese voice)

### SRS (Spaced Repetition) System

Leitner 5-box algorithm in `srs.js`:
- Box 0 (Mới): review immediately
- Box 1: review after 1 day
- Box 2: review after 3 days
- Box 3: review after 7 days
- Box 4: review after 14 days (mastered)
- Correct → advance one box. Wrong → back to box 0.
- Data stored in `lj_srs` localStorage key per deck.

### Mock Test System

`mock-test.js` engine:
- Question bank in `_data/mock_test_n5.yml` (3 sections: vocabulary, grammar, reading)
- Randomly selects 23 questions per test (10 vocab + 8 grammar + 5 reading)
- 30-minute countdown timer
- Section-by-section scoring
- Score saved to `lj_progress.quizScores['mock-test-n5']`

### Sidebar Navigation

Sidebar (`_includes/sidebar.html`) has two sections:
1. **Chapter navigation** — expandable chapter list with lesson links
2. **Tools section** — links to Flashcards, Grammar, Mock Test, Reading, HV Decoder, Travel Phrasebook

## Do NOT

- Add npm, webpack, or any JS build tools
- Change localStorage key names (breaks existing user data)
- Modify font files in `assets/font/`
- Add a backend — all persistence is localStorage
- Remove the inline theme script in `default.html` `<head>` (prevents FOUC)
