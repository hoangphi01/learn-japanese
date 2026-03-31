/**
 * HV Decoder – Hán-Việt → On'yomi prediction engine
 * Depends on: _data/hv_kanji.yml (dictionary) + _data/hv_rules.yml (rules)
 */
var LJHVDecoder = (function () {
  'use strict';

  var _dict = [];       // Array of { hv, onyomi, kanji, meaning }
  var _rules = [];      // Array from hv_rules.yml
  var _compounds = [];  // Array of { hv, kanji, reading, meaning }

  // Vietnamese tone marks (combining diacritics after NFD)
  var TONE_MARKS = /[\u0300\u0301\u0303\u0309\u0323]/g;

  // Map special Vietnamese vowels to base forms for lookup
  // We keep ơ→o, ư→u, â→a, ê→e, ô→o after stripping tones
  var VIET_VOWEL_MAP = {
    '\u01A1': 'o',  // ơ
    '\u01B0': 'u',  // ư
    '\u0103': 'a',  // ă
    '\u00E2': 'a',  // â  (precomposed)
    '\u00EA': 'e',  // ê  (precomposed)
    '\u00F4': 'o',  // ô  (precomposed)
  };

  /**
   * Normalize a Vietnamese string for dictionary lookup:
   * - NFD decompose, strip tone marks, NFC recompose
   * - Map Vietnamese special vowels to ASCII equivalents
   * - Strip đ → d
   * - Lowercase
   */
  function normalize(str) {
    var s = str.toLowerCase().trim();
    // Handle đ/Đ first
    s = s.replace(/đ/g, 'd').replace(/Đ/g, 'd');
    // NFD to separate base + combining
    s = s.normalize('NFD');
    // Remove tone marks
    s = s.replace(TONE_MARKS, '');
    // NFC recompose
    s = s.normalize('NFC');
    // Map remaining special vowels
    var result = '';
    for (var i = 0; i < s.length; i++) {
      result += VIET_VOWEL_MAP[s[i]] || s[i];
    }
    return result;
  }

  /**
   * Look up a single syllable in the dictionary.
   * Returns array of matches (may be multiple kanji for same HV).
   */
  function lookupDict(syllable) {
    var norm = normalize(syllable);
    var matches = [];
    for (var i = 0; i < _dict.length; i++) {
      if (_dict[i].hv === norm) {
        matches.push(_dict[i]);
      }
    }
    return matches;
  }

  /**
   * Apply rule-based prediction for a single syllable.
   * Returns array of { rule, prediction } objects.
   */
  function applyRules(syllable) {
    var norm = normalize(syllable);
    var results = [];

    for (var i = 0; i < _rules.length; i++) {
      var rule = _rules[i];
      var matched = false;

      // Check onset patterns
      if (rule.onset_patterns) {
        for (var j = 0; j < rule.onset_patterns.length; j++) {
          var p = rule.onset_patterns[j];
          if (norm.indexOf(p.from) === 0) {
            matched = true;
            break;
          }
        }
      }

      // Check coda patterns
      if (rule.coda_patterns) {
        for (var k = 0; k < rule.coda_patterns.length; k++) {
          var cp = rule.coda_patterns[k];
          var fromLen = cp.from.length;
          if (norm.length >= fromLen && norm.substring(norm.length - fromLen) === cp.from) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        results.push({
          rule: rule,
          ruleId: rule.id
        });
      }
    }

    return results;
  }

  /**
   * Look up the full input as a compound in _compounds.
   * Returns a match object or null.
   */
  function lookupCompound(input) {
    var syllables = input.trim().split(/\s+/);
    var norm = syllables.map(function (s) { return normalize(s); }).join(' ');
    for (var i = 0; i < _compounds.length; i++) {
      if (_compounds[i].hv === norm) {
        return _compounds[i];
      }
    }
    return null;
  }

  /**
   * Decode a full HV input (possibly multi-syllable).
   * Returns { input, combined, syllables[], source, compound }
   */
  function decode(input) {
    if (!input || !input.trim()) return null;

    // Check compound dictionary first
    var compoundMatch = lookupCompound(input);

    // If compound has per-kanji breakdown, use it directly
    if (compoundMatch && compoundMatch.breakdown) {
      var breakdownResults = [];
      for (var b = 0; b < compoundMatch.breakdown.length; b++) {
        var bd = compoundMatch.breakdown[b];
        breakdownResults.push({
          original: bd.hv,
          kanji: bd.char,
          onyomi: bd.reading,
          source: 'compound-breakdown'
        });
      }
      return {
        input: input.trim(),
        source: 'compound',
        compound: compoundMatch,
        combined: compoundMatch.reading,
        allResolved: true,
        syllables: breakdownResults
      };
    }

    var syllables = input.trim().split(/\s+/);
    var results = [];
    var combinedOnyomi = [];

    for (var i = 0; i < syllables.length; i++) {
      var syl = syllables[i];
      var dictMatches = lookupDict(syl);
      var ruleMatches = applyRules(syl);

      var entry = {
        original: syl,
        normalized: normalize(syl),
        dictMatches: dictMatches,
        ruleMatches: ruleMatches,
        source: 'none',
        onyomi: null,
        kanji: null
      };

      if (dictMatches.length > 0) {
        entry.source = 'dictionary';
        entry.onyomi = dictMatches[0].onyomi;
        entry.kanji = dictMatches[0].kanji;
        combinedOnyomi.push(capitalize(dictMatches[0].onyomi));
      } else if (ruleMatches.length > 0) {
        entry.source = 'rules';
        combinedOnyomi.push('?');
      } else {
        combinedOnyomi.push('?');
      }

      results.push(entry);
    }

    // Build combined reading
    var combined = null;
    var allResolved = results.every(function (r) { return r.source === 'dictionary'; });
    if (allResolved && results.length > 0) {
      combined = results.map(function (r) {
        return capitalize(r.onyomi);
      }).join('').toLowerCase();
      // Capitalize first letter
      combined = combined.charAt(0).toUpperCase() + combined.slice(1);
    }

    return {
      input: input.trim(),
      source: compoundMatch ? 'compound' : 'syllable',
      compound: compoundMatch || null,
      combined: compoundMatch ? compoundMatch.reading : combined,
      allResolved: compoundMatch ? true : allResolved,
      syllables: results
    };
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Convert onyomi romanization to display form with macrons.
   * ou → ō, uu → ū, ei stays as ei
   */
  function toMacron(reading) {
    if (!reading) return '';
    return reading
      .replace(/ou/gi, 'ō')
      .replace(/oo/gi, 'ō')
      .replace(/uu/gi, 'ū');
  }

  // Public API
  return {
    init: function (dictArray, rulesArray, compoundsArray) {
      _dict = dictArray || [];
      _rules = rulesArray || [];
      _compounds = compoundsArray || [];
    },
    decode: decode,
    normalize: normalize,
    toMacron: toMacron,
    lookupDict: lookupDict,
    applyRules: applyRules
  };
})();
