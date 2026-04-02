---
name: create-lesson
description: Create a new NihonGo! lesson with proper frontmatter, content structure, and cross-pillar integration
user_invocable: true
---

# Create Lesson Skill

When creating a new lesson for NihonGo!, follow this checklist:

## 1. Determine Lesson Metadata
- Chapter number and lesson number within chapter
- Phase (1 = kana/sounds, 2 = grammar basics, 3 = N5 grammar expansion)
- Previous and next lesson slugs
- Tags and estimated time

## 2. Create Lesson File
Path: `_lessons/ch{NN}/{NN}-kebab-title.md`

Required frontmatter:
```yaml
layout: lesson
title: "Vietnamese title"
chapter: N
lesson: N
total_lessons_in_chapter: N
phase: N
week: N
estimated_time: "NN phút"
prev_lesson: chNN/NN-slug
next_lesson: chNN/NN-slug
tags: [relevant, tags]
level: N5
```

## 3. Content Structure
Every lesson should follow this flow:
1. **Introduction** — what we'll learn and why (Vietnamese)
2. **Core content** — use grammar-box, vocab-box, formula-box includes
3. **Examples** — use `<table class="kana-table">` for vocabulary/example tables (NEVER Markdown tables)
4. **Practice** — use exercise-box include
5. **Quiz** — inline HTML quiz with 3-5 questions + results section
6. **Culture note** — use culture-box include (optional)

## 4. Cross-Pillar Integration
After creating the lesson, also update:
- [ ] `_data/chapters.yml` — add/update chapter entry if new chapter
- [ ] `_data/grammar.yml` — add new grammar patterns taught in this lesson
- [ ] `_data/mock_test_n5.yml` — add 2-3 questions testing this lesson's content
- [ ] `_data/flashcard_decks.yml` — add vocab deck if lesson introduces 10+ new words
- [ ] `_data/reading_practice.yml` — add a reading passage using this lesson's grammar (optional)
- [ ] Previous lesson's `next_lesson` frontmatter — update if this is a new lesson in sequence
- [ ] `flashcards/index.md` — add deck card if new flashcard deck created

## 5. Build & Verify
```bash
bundle exec jekyll build
```
Check that the lesson renders at the expected URL and navigation works.

## 6. Lesson Content Guidelines
- All text in Vietnamese (explanations, instructions)
- Japanese text with romaji on first introduction
- Use Hán-Việt connections whenever possible (e.g., 学 = học)
- Include at least one matching quiz or fill-blank exercise per lesson
- Reference the math-logic framework when explaining patterns
- Keep to ~20-30 phút reading time
