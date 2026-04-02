# SKILL.md — NihonGo! Content Porting Skills

Two repeatable workflows for creating lesson content: one from the LaTeX source book, one from PDF textbooks.

---

## Skill 1: LaTeX → Web Lesson

### Input

LaTeX `.tex` file with NihonGo! macros: `\chapter`, `\section`, `\begin{tcolorbox}`, `\begin{tabular}`, `\jpformula`, `\jw`.

### Process

1. **Identify boundaries** — Find `\chapter{}` and `\section{}` to determine lesson splits
2. **Map environments** — Convert LaTeX environments to web includes:

   | LaTeX Environment | Web Include / HTML |
   |---|---|
   | `\begin{tcolorbox}[grammarbox]` | `{% include grammar-box.html %}` |
   | `\begin{tcolorbox}[vocabbox]` | `{% include vocab-box.html %}` |
   | `\begin{tcolorbox}[exercisebox]` | `{% include exercise-box.html %}` |
   | `\begin{tcolorbox}[culturebox]` | `{% include culture-box.html %}` |
   | `\jpformula{...}` | `{% include formula-box.html content="..." %}` |
   | `\begin{tabular}` | `<table class="kana-table">` |
   | `\jw{JP}{romaji}{meaning}` | Table row: `<td><span lang="ja">JP</span></td><td>romaji</td><td>meaning</td>` |

3. **Convert tables** — `\begin{tabular}{cols}` → `<table class="kana-table">`, `\hline` → implicit via CSS, `&` → `</td><td>`, `\\` → `</tr><tr>`
4. **Convert formulas** — `\jpformula{text}` → `{% include formula-box.html content="text" %}`
5. **Convert Japanese words** — `\jw{JP}{romaji}{meaning}` → table rows or inline `<span lang="ja">JP</span>` depending on context
6. **Split into lessons** — Target 15–25 minutes each. Each `\section` is typically one lesson. Exercises (`exercisebox`) become the final lesson of each chapter.
7. **Create frontmatter** — Use this template:

   ```yaml
   ---
   layout: lesson
   title: "Vietnamese title"
   chapter: N
   lesson: M
   total_lessons_in_chapter: T
   phase: P
   week: W
   estimated_time: "20 phút"
   prev_lesson: "chNN/MM-slug"    # empty string if first lesson overall
   next_lesson: "chNN/MM-slug"    # empty string if last lesson overall
   tags: [relevant, tags]
   level: N5
   ---
   ```

8. **Build exercises** — Every lesson should include interactive exercises. Convert `exercisebox` content into quiz components. Use a mix of the 3 quiz types:

   **Type 1: Multiple Choice** (`quiz-question.html` include or inline HTML)

   Liquid include:
   ```liquid
   {% include quiz-question.html
     question="Question text"
     options="Option A|Option B|Option C|Option D"
     correct="B"
     explanation="Explanation text"
   %}
   ```

   Inline HTML (preferred — most existing lessons use this pattern):
   ```html
   <div class="quiz-section">

   <div class="quiz-question" data-correct="answer_value">
   <p class="question-text">Question text</p>
   <div class="question-options">
   <button class="option-btn" data-value="answer_value" onclick="LJQuiz.checkAnswer(this, 'answer_value')">Option A</button>
   <button class="option-btn" data-value="wrong1" onclick="LJQuiz.checkAnswer(this, 'answer_value')">Option B</button>
   <button class="option-btn" data-value="wrong2" onclick="LJQuiz.checkAnswer(this, 'answer_value')">Option C</button>
   </div>
   <div class="question-explanation" style="display:none;">
   Explanation of the correct answer.
   </div>
   </div>

   </div>
   ```

   **Type 2: Matching** (`matching-quiz.html`)

   ```liquid
   {% include matching-quiz.html pairs="ア:a,イ:i,ウ:u,エ:e,オ:o" %}
   ```

   - `pairs`: comma-separated `left:right` values
   - Right column is auto-shuffled by JS on page load
   - User clicks left item first, then right item to match
   - Best for: kana recognition, vocabulary pairing, particle-meaning matching

   **Type 3: Fill-in-the-Blank** (`fill-blank.html`)

   ```liquid
   {% include fill-blank.html before="私は" blank="学生|がくせい" after="です。" hint="student" %}
   ```

   - `before`: text displayed before the blank
   - `blank`: correct answer(s), pipe-separated for multiple accepted answers
   - `after`: text displayed after the blank
   - `hint`: optional hint text (shown via "Gợi ý" button)
   - Best for: grammar exercises, particle fill-in, verb conjugation

   **Quiz Results Block** — Add after each `<div class="quiz-section">` that contains multiple-choice questions:

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

   Replace `N` in `quiz-total` with the actual number of `.quiz-question` elements on the page.

   **Which quiz type to use:**

   | Content Type | Best Quiz Type |
   |---|---|
   | Kana recognition | Matching or Multiple Choice |
   | Vocabulary meaning | Multiple Choice |
   | Grammar / particles | Fill-in-the-Blank |
   | Sentence patterns | Fill-in-the-Blank |
   | Concept understanding | Multiple Choice |

   **Guidelines:**
   - Minimum 3–5 quiz questions per lesson
   - Mix quiz types where the content allows
   - Wrap all quiz blocks in `<div class="quiz-section">`
   - Include a quiz-results block if the page has multiple-choice questions

### Output

Jekyll lesson `.md` files in `_lessons/chNN/` with correct frontmatter, HTML/Liquid content, exercises, and prev/next chain.

---

## Skill 2: PDF → Logic Approach

### Input

PDF textbook (e.g., Minna no Nihongo) with grammar points, vocabulary lists, and sentence patterns.

### Process

1. **Extract content** — Read PDF to identify grammar points, vocabulary, sentence patterns, and cultural notes per lesson
2. **Reframe as math** — Apply NihonGo!'s math-framework metaphor:

   | Textbook Concept | NihonGo! Metaphor |
   |---|---|
   | Grammar rule | Formula / Function |
   | Particle | Operator (toán tử) |
   | Verb conjugation | Function transformation |
   | Vocabulary | Variables (biến số) |
   | Sentence pattern | Equation template |

3. **Map Hán-Việt** — For every kanji/vocabulary item, find Hán-Việt connections where possible. Use `_data/hv_rules.yml` patterns to highlight systematic mappings.
4. **Structure each lesson** — Follow the "Text + Test" flow:

   ```
   ── TEXT (teaching content) ──────────────────────
   1. Concept explanation (grammar-box)
   2. Formula box (formula-box) — the core pattern
   3. Examples table (kana-table) — JP | Romaji | Vietnamese
   4. Culture note (culture-box) — if applicable

   ── TEST (interactive exercises) ─────────────────
   5. Exercises (exercise-box) — practice problems
   6. Quiz section — interactive check using all 3 types:
      • Multiple choice (quiz-question) — concept understanding, vocab
      • Matching (matching-quiz) — kana, vocabulary pairing
      • Fill-in-blank (fill-blank) — grammar, particles, conjugation
   7. Quiz results block — score display with reset button
   ```

   **Which quiz type fits which content:**

   | Content Type | Best Quiz Type |
   |---|---|
   | Kana recognition | Matching or Multiple Choice |
   | Vocabulary meaning | Multiple Choice |
   | Grammar / particles | Fill-in-the-Blank |
   | Sentence patterns | Fill-in-the-Blank |
   | Concept understanding | Multiple Choice |

5. **Group into chapters** — Follow the chapter structure in `_data/chapters.yml`. Each chapter = 3–5 lessons, each lesson = 15–25 minutes. Currently 20 chapters (71 lessons) covering 100% N5.

### Output

Lesson content using NihonGo!'s math-framework teaching style, with all standard includes and correct frontmatter.

---

## Quality Checklist

Before committing any new lesson content, verify:

- [ ] **Frontmatter complete** — All required fields present (see template above)
- [ ] **prev/next chain** — Every lesson links correctly to its neighbors; cross-chapter links work
- [ ] **total_lessons_in_chapter** — Consistent across all lessons in the same chapter
- [ ] **chapters.yml updated** — New chapter entry with correct `lessons` count
- [ ] **Box usage** — At least one grammar-box or vocab-box per lesson; exercises use exercise-box
- [ ] **Formula boxes** — Key patterns wrapped in formula-box for emphasis
- [ ] **Japanese text** — All Japanese wrapped in `<span lang="ja">` or inside kana-table
- [ ] **Quiz format** — Quiz questions use correct include or inline HTML pattern
- [ ] **Quiz count** — At least 3 quiz questions per lesson
- [ ] **Quiz results** — `<div class="quiz-results">` present if page has multiple-choice questions
- [ ] **Quiz variety** — Mix of quiz types where content allows (MC, matching, fill-blank)
- [ ] **Quiz section wrapper** — All quiz blocks wrapped in `<div class="quiz-section">`
- [ ] **Estimated time** — Realistic (15–25 min per lesson)
- [ ] **Tags** — Include chapter topic, phase, and kana type where relevant
- [ ] **Tables** — Use `class="kana-table"` for consistent styling
- [ ] **Chapter accent** — If adding a new chapter, add accent color CSS rule in `style.css`
- [ ] **Build passes** — `bundle exec jekyll build` completes without errors
