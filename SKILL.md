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

8. **Build quiz** — Convert `exercisebox` content into `{% include quiz-question.html %}` calls:

   ```liquid
   {% include quiz-question.html
     question="Question text"
     options="Option A|Option B|Option C|Option D"
     correct="B"
     explanation="Explanation text"
   %}
   ```

### Output

Jekyll lesson `.md` files in `_lessons/chNN/` with correct frontmatter, HTML/Liquid content, and prev/next chain.

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
4. **Structure each lesson** — Follow this flow:

   ```
   1. Concept explanation (grammar-box)
   2. Formula box (formula-box) — the core pattern
   3. Examples table (kana-table) — JP | Romaji | Vietnamese
   4. Culture note (culture-box) — if applicable
   5. Exercises (exercise-box) — practice problems
   6. Quiz (quiz-question) — interactive check
   ```

5. **Group into chapters** — Follow the chapter structure in `_data/chapters.yml`. Each chapter = 3–4 lessons, each lesson = 15–25 minutes.

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
- [ ] **Quiz format** — Quiz questions use `quiz-question.html` include with correct/options/explanation
- [ ] **Estimated time** — Realistic (15–25 min per lesson)
- [ ] **Tags** — Include chapter topic, phase, and kana type where relevant
- [ ] **Tables** — Use `class="kana-table"` for consistent styling
- [ ] **Chapter accent** — If adding a new chapter, add accent color CSS rule in `style.css`
- [ ] **Build passes** — `bundle exec jekyll build` completes without errors
