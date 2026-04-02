# Architecture — NihonGo!

## Overview

NihonGo! is a **Jekyll 4.3 static site** for learning Japanese, targeting Vietnamese speakers. It uses vanilla JavaScript for interactivity and localStorage for persistence. Hosted on GitHub Pages.

**Key design decisions:**

- No backend — all state lives in the browser (localStorage)
- No JS frameworks — IIFE modules with explicit global exports
- CSS design system ported from a LaTeX book (tcolorbox → CSS boxes)
- Data-driven curriculum — YAML files define structure, Liquid templates render

## Directory Tree

```
learn_japanese/
├── _config.yml                     # Jekyll config (baseurl, url, collections, defaults, OG image)
├── _data/
│   ├── chapters.yml                # 20 chapters: id, title, level, phase, week, milestone
│   ├── levels.yml                  # JLPT N5–N1: id, title, description, active
│   ├── kana.yml                    # Katakana & Hiragana: char, romaji, row, strokes
│   ├── hv_rules.yml                # 15 Hán-Việt → On'yomi rules with examples
│   ├── vocabulary.yml              # Loanwords (jp/romaji/en/vi), numbers (num/jp/romaji)
│   ├── flashcard_decks.yml         # 6 vocabulary flashcard decks
│   ├── grammar.yml                 # 20 N5 grammar patterns
│   ├── mock_test_n5.yml            # 37 mock test questions
│   ├── reading_practice.yml        # 5 reading texts with furigana
│   ├── n5_vocabulary.yml           # Extended N5 vocabulary list
│   └── travel_phrases.yml          # Travel/survival phrases
│
├── _layouts/
│   ├── default.html                # Base: <head>, nav, sidebar, all CSS/JS loading
│   ├── lesson.html                 # Lesson page: header, progress bar, prev/next nav
│   ├── chapter.html                # Chapter index: lists lessons filtered by chapter_id
│   └── quiz.html                   # Quiz container: results card, reset button
│
├── _includes/
│   ├── nav.html                    # Top bar + mobile bottom dock
│   ├── sidebar.html                # Left nav tree: levels → chapters → lessons
│   ├── progress-bar.html           # Dual progress bars (8-week + N5 timelines)
│   ├── welcome-modal.html          # Onboarding modal with level selection
│   ├── quiz-question.html          # Multiple-choice question component
│   ├── flashcard.html              # Flip card component (3D CSS transform)
│   ├── vocab-box.html              # Gold-themed vocabulary box
│   ├── grammar-box.html            # Blue-themed grammar box
│   ├── exercise-box.html           # Green-themed exercise box
│   ├── culture-box.html            # Red-themed cultural note box
│   └── formula-box.html            # Navy-bordered formula box
│
├── _lessons/                       # 71 lessons across 20 chapters (100% N5)
│   ├── ch01/                       # Phase 1: Katakana & Sound System (4 lessons)
│   ├── ch02/                       # Phase 1: Dakuten, Combos, Numbers (4 lessons)
│   ├── ch03/                       # Phase 1: Hiragana (4 lessons)
│   ├── ch04/                       # Phase 2: Particles / Trợ Từ (4 lessons)
│   ├── ch05/                       # Phase 2: Verbs & Nouns (4 lessons)
│   ├── ch06/                       # Phase 2: Hán-Việt Decoder (3 lessons)
│   ├── ch07/                       # Phase 3: 3 Kịch Bản (4 lessons)
│   ├── ch08/                       # Phase 3: Simulation Drills (3 lessons)
│   ├── ch09/                       # Phase 3: Ôn Tập & Nghe Hiểu (3 lessons)
│   ├── ch10/                       # Phase 4: Tính Từ い/な (5 lessons)
│   ├── ch11/                       # Phase 4: Te-Form (4 lessons)
│   ├── ch12/                       # Phase 4: Nai-Form (3 lessons)
│   ├── ch13/                       # Phase 4: Ta-Form & Trải Nghiệm (3 lessons)
│   ├── ch14/                       # Phase 4: Dictionary Form (3 lessons)
│   ├── ch15/                       # Phase 5: Plain Form (3 lessons)
│   ├── ch16/                       # Phase 5: Tồn Tại & Vị Trí (3 lessons)
│   ├── ch17/                       # Phase 5: Counters & So Sánh (4 lessons)
│   ├── ch18/                       # Phase 5: Mong Muốn & Cho-Nhận (3 lessons)
│   ├── ch19/                       # Phase 5: Điều Kiện & Mệnh Đề QH (4 lessons)
│   └── ch20/                       # Phase 6: Tổng Ôn N5 (3 lessons)
│
├── assets/
│   ├── css/
│   │   ├── style.css               # Design system: variables, layout, typography, themes
│   │   ├── boxes.css               # Content box components (tcolorbox port)
│   │   ├── flashcard.css           # Flashcard grid, 3D flip, known state
│   │   ├── quiz.css                # Quiz questions, options, results, matching
│   │   ├── srs.css                 # SRS review mode styles
│   │   ├── mock-test.css           # Mock test timer, sections, scoring
│   │   ├── grammar.css             # Grammar hub filter/search styles
│   │   └── welcome.css             # Welcome modal, level cards, blur backdrop
│   ├── js/
│   │   ├── theme.js                # Theme toggle (IIFE, side-effect)
│   │   ├── nav.js                  # Sidebar, chapter toggle, level filter (IIFE)
│   │   ├── progress.js             # LJProgress: lesson completion, quiz scores
│   │   ├── quiz.js                 # LJQuiz: answer checking, scoring (MC, matching, fill-blank)
│   │   ├── flashcard.js            # LJFlashcard: shuffle, flip, known-marking, TTS
│   │   ├── srs.js                  # LJSRS: Leitner 5-box spaced repetition
│   │   ├── mock-test.js            # LJMockTest: timed N5 mock exam engine
│   │   ├── hv-decoder.js           # LJHVDecoder: HV→On'yomi lookup + prediction
│   │   ├── phrasebook.js           # Travel phrasebook TTS + category filter
│   │   └── welcome.js              # LJWelcome: onboarding modal
│   ├── font/
│   │   ├── bookerly/               # Serif font family (4 weights)
│   │   └── minecraft-unicode.ttf   # Pixel font for titles
│   └── images/
│       └── preview.png             # OG meta preview image for social sharing
│
├── flashcards/
│   ├── index.md                    # Flashcard hub — all 8 decks
│   ├── katakana.md                 # Katakana flashcard deck
│   ├── hiragana.md                 # Hiragana flashcard deck
│   ├── loanwords.md                # Loanwords deck
│   ├── numbers.md                  # Numbers deck
│   ├── particles.md                # Particles deck
│   ├── verbs.md                    # Verbs deck
│   ├── nouns.md                    # Nouns deck
│   └── hanviet.md                  # Hán-Việt deck
│
├── pages/
│   ├── about.md                    # About page
│   ├── hv-decoder.md               # Hán-Việt decoder interactive tool
│   ├── roadmap.md                  # Learning roadmap
│   ├── mock-test.md                # Timed N5 mock exam
│   ├── grammar.md                  # Searchable grammar hub (20 patterns)
│   ├── reading.md                  # Reading practice with furigana
│   └── travel-phrasebook.md        # 120+ travel phrases with TTS
│
├── index.md                        # Homepage
├── manifest.json                   # PWA manifest
├── Gemfile                         # Ruby deps: jekyll ~> 4.3, jekyll-seo-tag, webrick
└── README.md                       # Project overview
```

## Data Model

### Hierarchy: Levels → Chapters → Lessons

```
levels.yml          chapters.yml              _lessons/ch{NN}/*.md
┌──────────┐        ┌─────────────────┐       ┌────────────────────┐
│ N5       │◄───────│ chapter.level   │       │ lesson.level       │
│ N4       │        │ chapter.id: 1   │◄──────│ lesson.chapter: 1  │
│ N3       │        │ chapter.phase   │       │ lesson.lesson: 1   │
│ ...      │        │ chapter.lessons │       │ lesson.prev/next   │
└──────────┘        └─────────────────┘       └────────────────────┘
```

### levels.yml

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Level code: N5, N4, N3, N2, N1 |
| `title` | string | Vietnamese display name |
| `description` | string | Proficiency description |
| `active` | boolean | Whether content exists |

### chapters.yml

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Chapter number (1–20) |
| `title` | string | Full Vietnamese title |
| `short_title` | string | Abbreviated title |
| `level` | string | JLPT level (N5, N4, ...) |
| `phase` | number | Learning phase (1–4) |
| `week` | string | Week indicator ("Tuần 1") |
| `eight_week_pct` | number | Progress % toward 8-week goal |
| `n5_pct` | number | Progress % toward N5 goal |
| `milestone` | string | Learning objective |
| `lessons` | number | Lesson count in chapter |

### Lesson Frontmatter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `layout` | string | yes | Always `lesson` |
| `title` | string | yes | Vietnamese title |
| `chapter` | number | yes | Chapter number |
| `lesson` | number | yes | Lesson number within chapter |
| `total_lessons_in_chapter` | number | yes | Total lessons in chapter |
| `phase` | number | yes | Learning phase (1–6) |
| `week` | number | yes | Week number |
| `estimated_time` | string | yes | Duration (e.g., "20 phút") |
| `prev_lesson` | string | yes | Previous lesson slug or empty |
| `next_lesson` | string | yes | Next lesson slug or empty |
| `tags` | array | yes | Content tags |
| `level` | string | yes | JLPT level |

### kana.yml

Two top-level keys: `katakana`, `hiragana`. Each has:

- `basic[]`: `char`, `romaji`, `row`, `strokes`, `note` (optional)
- `dakuten[]`: `char`, `romaji`, `base`

### vocabulary.yml

- `loanwords[]`: `jp`, `romaji`, `en`, `vi`
- `numbers[]`: `num`, `jp`, `romaji`

### hv_rules.yml

- `id`, `hv_pattern`, `onyomi`, `examples[]` → `{ hv, jp }`

## Layouts & Includes

### Layout Inheritance

```
default.html
├── lesson.html       # Adds: lesson header, progress-bar include, prev/next nav, completion checkbox
│                     #   <article data-chapter="{{ page.chapter }}"> enables per-chapter accent colors
├── chapter.html      # Adds: chapter header, lesson list from site.lessons collection
└── quiz.html         # Adds: quiz header, #quiz-results card, reset button
```

`default.html` loads:
- All 5 CSS files
- `nav.html` and `sidebar.html` includes
- All JS files at page bottom (welcome.js only on homepage)
- Inline theme script in `<head>` to prevent FOUC

### Include Parameters

| Include | Parameters | Notes |
|---------|-----------|-------|
| `nav.html` | none | Uses `site.baseurl` for links |
| `sidebar.html` | none | Iterates `site.data.levels`, `site.data.chapters`, `site.lessons` |
| `progress-bar.html` | `week`, `phase_name`, `time`, `eight_week_pct`, `n5_pct`, `milestone` | Dual progress bars |
| `welcome-modal.html` | none | Iterates `site.data.levels` |
| `quiz-question.html` | `correct`, `question`, `options` (pipe-separated), `explanation` | Multiple-choice |
| `matching-quiz.html` | `pairs` (comma-separated `left:right`) | Matching pairs, right column shuffled |
| `fill-blank.html` | `before`, `blank` (pipe-separated answers), `after`, `hint` | Fill-in-the-blank |
| `flashcard.html` | `front`, `back`, `note` | 3D flip card |
| `vocab-box.html` | `title`, `content` | Gold theme |
| `grammar-box.html` | `title`, `content` | Blue theme |
| `exercise-box.html` | `title`, `content` | Green theme |
| `culture-box.html` | `title`, `content` | Red theme |
| `formula-box.html` | `content` | Navy border, centered |

## CSS Architecture

### Files

| File | Lines | Purpose |
|------|-------|---------|
| `style.css` | Main | Design system: variables, layout, typography, nav, sidebar, mobile dock |
| `boxes.css` | Components | Content boxes ported from LaTeX tcolorbox |
| `flashcard.css` | Component | Flashcard grid, 3D transforms, card states |
| `quiz.css` | Component | Quiz questions, options, results, matching, fill-in-blank |
| `welcome.css` | Component | Welcome modal, level cards, blur backdrop |

### Custom Properties (`:root`)

**Colors:** `--japan-red`, `--navy-blue`, `--gold-accent`, `--hira-color`, `--kata-color`, `--kanji-color`, `--progress-red`, `--progress-blue`, `--med-gray`, `--cream-bg`, `--light-blue`, `--light-green`, `--light-gold`, `--light-red`

**Fonts:** `--font-pixel` (Minecraft Unicode), `--font-jp` (Noto Sans JP), `--font-body`

**Layout:** `--sidebar-width: 280px`, `--nav-height: 56px`, `--max-content: 800px`

**Theme:** `--radius`, `--radius-sm`, `--shadow`, `--shadow-lg`, `--pixel-shadow`, `--pixel-shadow-sm`

### Theme System

| Property | Pixel (default) | Modern (`[data-theme="modern"]`) |
|----------|----------------|----------------------------------|
| `--radius` | `0px` | `12px` |
| `--radius-sm` | `0px` | `8px` |
| `--shadow` | `none` | Soft drop shadow |
| `--shadow-lg` | `none` | Larger drop shadow |
| Border width | `3px` | `1px` |
| Box shadow | `4px 4px 0 navy` | Standard CSS shadow |

### Chapter Accent Colors

Each chapter can have a unique accent color applied to its lesson badge and header border via the `data-chapter` attribute on `<article>` in `lesson.html`:

| Chapter | Color Variable | Visual |
|---------|---------------|--------|
| 4 | `--navy-blue` | Blue badge + left border |
| 5 | `--japan-red` | Red badge + left border |
| 6 | `--gold-accent` | Gold badge + left border |
| 7 | `--hira-color` | Green badge + left border |
| 8 | `--japan-red` | Red badge + left border |
| 9 | `--navy-blue` | Blue badge + left border |
| 10 | `--gold-accent` | Gold badge + left border |
| 11 | `--hira-color` | Green badge + left border |
| 12 | `--navy-blue` | Blue badge + left border |
| 13 | `--japan-red` | Red badge + left border |
| 14 | `--gold-accent` | Gold badge + left border |
| 15 | `--hira-color` | Green badge + left border |
| 16 | `--navy-blue` | Blue badge + left border |
| 17 | `--japan-red` | Red badge + left border |
| 18 | `--gold-accent` | Gold badge + left border |
| 19 | `--hira-color` | Green badge + left border |
| 20 | `--japan-red` | Red badge + left border |

Selector pattern: `.lesson-page[data-chapter="N"] .lesson-badge / .lesson-header`

### Global `.kana-table` Styles

Reusable table class for kana/vocabulary tables defined in `style.css`. Features navy header, zebra striping, centered text, and responsive font sizing. Used across lesson content with `<table class="kana-table">`.

### Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `> 1024px` | Desktop: sidebar visible, collapsible |
| `≤ 1024px` | Mobile: sidebar hidden (slide-in overlay), mobile dock visible |
| `≤ 768px` | Compact: reduced padding, smaller fonts |
| `≤ 480px` | Welcome modal: single-column level grid |

## JavaScript Modules

### Loading Order (in `default.html`)

1. **Inline `<head>` script** — Read `lj_theme`, apply `data-theme` attribute (FOUC prevention)
2. `theme.js` — Bind theme toggle checkbox
3. `nav.js` — Sidebar, chapter toggle, level filter, mobile dock
4. `progress.js` — `LJProgress` global, UI update on DOMContentLoaded
5. `quiz.js` — `LJQuiz` global, quiz answer handling
6. `flashcard.js` — `LJFlashcard` global, deck operations
7. `welcome.js` — `LJWelcome` global, modal init on DOMContentLoaded (homepage only)

### Module Details

#### LJProgress (progress.js)

```javascript
LJProgress.toggleLesson(lessonId, completed)  // Mark lesson done/undone
LJProgress.isLessonComplete(lessonId)          // Check completion
LJProgress.saveQuizScore(quizId, score, total) // Save quiz result
LJProgress.getCompletedCount()                 // Total completed
LJProgress.updateUI()                          // Refresh all indicators
```

Storage: `lj_progress` → `{ lessons: { "ch01/slug": { completed: true, date: "ISO" } }, quizScores: {} }`

#### LJQuiz (quiz.js)

```javascript
LJQuiz.checkAnswer(btn, correctValue)  // Multiple choice: validate and show feedback
LJQuiz.reset()                         // Clear all MC answers, hide results
LJQuiz.selectMatch(item)               // Matching: select left/right item, check pair
LJQuiz.initMatching()                  // Matching: shuffle right column (auto on DOMContentLoaded)
LJQuiz.checkBlank(btn)                 // Fill-blank: validate input against accepted answers
LJQuiz.showHint(btn)                   // Fill-blank: reveal hint text
```

Integrates with `LJProgress.saveQuizScore()` when all MC questions answered.

#### LJFlashcard (flashcard.js)

```javascript
LJFlashcard.shuffle(deckId)      // Fisher-Yates shuffle, reset flipped
LJFlashcard.flipAll(deckId)      // Toggle all cards
LJFlashcard.resetAll(deckId)     // Clear flipped + known states
LJFlashcard.toggleKnown(card)    // Mark card known (opacity 0.4)
```

Double-click on card auto-calls `toggleKnown()`.

#### LJWelcome (welcome.js)

```javascript
LJWelcome.init()  // Check dismissed state, bind events
```

Storage: `lj_welcome_dismissed` (show/hide), `lj_selected_level` (chosen level).

## Component Patterns

### Sidebar Navigation

- Grouped by level → chapter → lesson
- Level dropdown filters visible chapters
- Chapter sections expand/collapse (click toggle)
- Completed lessons show checkmark via `LJProgress`
- State persisted: `lj_sidebar` (collapsed/open), `lj_selected_level`

### Content Boxes

Ported from LaTeX tcolorbox. Each box type has a distinct color scheme:

- **Vocab** (gold): Vocabulary tables, word lists
- **Grammar** (blue): Grammar rules, sentence patterns
- **Exercise** (green): Practice activities
- **Culture** (red): Cultural notes, fun facts
- **Formula** (navy border): Key formulas, center-aligned

### Quiz Engine

Three interactive quiz component types, all managed by `LJQuiz` (quiz.js):

#### 1. Multiple Choice (`quiz-question.html` or inline HTML)

- Questions wrapped in `<div class="quiz-question" data-correct="value">`
- Options are `.option-btn` elements with `data-value` and `onclick="LJQuiz.checkAnswer(this, 'correct')"`
- After answering: correct = green, incorrect = red, `.question-explanation` revealed
- Quiz results block (`#quiz-results`) shown when all questions on the page are answered
- Score saved via `LJProgress.saveQuizScore(quizId, correct, total)` using page pathname as `quizId`

Include params: `correct`, `question`, `options` (pipe-separated), `explanation`

#### 2. Matching (`matching-quiz.html`)

- Container: `<div class="matching-quiz">`
- Items: `.match-item[data-side="left|right"][data-pair="N"]` with `onclick="LJQuiz.selectMatch(this)"`
- `LJQuiz.initMatching()` runs on DOMContentLoaded — Fisher-Yates shuffles right column
- User clicks left item, then right item. Matching `data-pair` values = correct (`.matched` class)
- Wrong match: brief red flash (`.incorrect` class, removed after 500ms)

Include params: `pairs` (comma-separated `left:right` values)

#### 3. Fill-in-the-Blank (`fill-blank.html`)

- Container: `<div class="fill-blank">`
- Input: `<input data-answers="answer1|answer2">` — pipe-separated accepted answers
- `LJQuiz.checkBlank(btn)`: compares input value (case-insensitive) against all accepted answers
- Correct: input gets `.correct` class, becomes readonly, check button hidden
- Wrong: input gets `.incorrect` class, feedback shows "Thử lại!"
- `LJQuiz.showHint(btn)`: reveals `.blank-hint` span, hides hint button

Include params: `before`, `blank` (pipe-separated answers), `after`, `hint` (optional)

#### Quiz Results Block

```html
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

Required when a page has multiple-choice questions. Score messages: 100% = "Xuất sắc!", ≥70% = "Tốt lắm!", <70% = "Cần luyện thêm."

### Progress Tracking

- Lesson completion via checkbox on each lesson page
- Progress bar in sidebar and mobile header
- Chapter cards on homepage show completion count
- All data in `lj_progress` localStorage key

## Adding New Content

### Add a new chapter

1. Add chapter entry to `_data/chapters.yml` with all fields
2. Create folder `_lessons/ch{NN}/`
3. Create lesson files following naming pattern `{NN}-kebab-slug.md`
4. Set `prev_lesson` / `next_lesson` to link lessons sequentially
5. Update the last lesson of the previous chapter's `next_lesson` field

### Add a new lesson to existing chapter

1. Create `_lessons/ch{NN}/{NN}-slug.md` with full frontmatter
2. Update `total_lessons_in_chapter` in all sibling lessons
3. Update `lessons` count in `_data/chapters.yml`
4. Fix `prev_lesson` / `next_lesson` chain

### Add a new JLPT level

1. Set `active: true` in `_data/levels.yml` for the level
2. Add chapters to `_data/chapters.yml` with the level's id
3. Create lesson files in new chapter folders
