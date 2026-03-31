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
_data/               # YAML data files (curriculum, kana, vocabulary, rules)
_includes/           # Reusable HTML components (boxes, nav, sidebar, quiz, flashcard)
_layouts/            # Page templates (default → lesson, chapter, quiz)
_lessons/            # Lesson content (Markdown + includes)
  ch01/              # Phase 1: Katakana & Sound System (4 lessons)
  ch02/              # Phase 1: Dakuten, Combos, Numbers (4 lessons)
  ch03/              # Phase 1: Hiragana (4 lessons)
  ch04/              # Phase 2: Particles / Trợ Từ (4 lessons)
  ch05/              # Phase 2: Verbs & Nouns (4 lessons)
  ch06/              # Phase 2: Hán-Việt Decoder (3 lessons)
assets/
  css/               # 5 CSS files (style, boxes, flashcard, quiz, welcome)
  js/                # 6 JS modules (theme, nav, progress, quiz, flashcard, welcome)
  font/              # Bookerly + Minecraft Unicode (do NOT modify)
  images/            # preview.png (OG meta), icons, logos
flashcards/          # Flashcard pages (katakana.md, hiragana.md)
pages/               # Static pages (about, hv-decoder, roadmap)
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
phase: 1                            # Learning phase (1–4)
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
| `hv_rules.yml` | 8 Hán-Việt → On'yomi mapping rules with examples |
| `vocabulary.yml` | Loanwords (jp, romaji, en, vi) and numbers (num, jp, romaji) |

### Content Boxes (Includes)

```liquid
{% include vocab-box.html title="Title" content="Markdown content" %}
{% include grammar-box.html title="Title" content="Content" %}
{% include exercise-box.html title="Title" content="Content" %}
{% include culture-box.html title="Title" content="Content" %}
{% include formula-box.html content="Content" %}
```

Also available: `quiz-question.html` (params: correct, question, options, explanation), `flashcard.html` (params: front, back, note).

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
| `quiz.js` | `LJQuiz` | Quiz answer checking & scoring |
| `flashcard.js` | `LJFlashcard` | Deck shuffle, flip, known-marking |
| `hv-decoder.js` | `LJHVDecoder` | HV→On'yomi dictionary lookup + rule prediction |
| `welcome.js` | `LJWelcome` | Onboarding modal & level selection |

### localStorage Keys

| Key | Value | Used By |
|-----|-------|---------|
| `lj_theme` | `'modern'` or empty | theme.js |
| `lj_progress` | JSON `{ lessons: {}, quizScores: {} }` | progress.js |
| `lj_selected_level` | `'N5'`, `'N4'`, etc. | nav.js, welcome.js |
| `lj_sidebar` | `'collapsed'` or `'open'` | nav.js |
| `lj_welcome_dismissed` | `'true'` or absent | welcome.js |

## Do NOT

- Add npm, webpack, or any JS build tools
- Change localStorage key names (breaks existing user data)
- Modify font files in `assets/font/`
- Add a backend — all persistence is localStorage
- Remove the inline theme script in `default.html` `<head>` (prevents FOUC)
