export const ignoreList = [
  "herr", "frau", "dr", "prof", "ing", "dipl", "bsc", "msc", "ba", "ma", "magister", "mba",
  "fh", "gmbh", "ag", 
  "der", "die", "das", "ein", "eine", "einer", "einem", "eines", "den", "dem", "des",
  "und", "oder", "aber", "doch", "sowie", "denn", "sondern", "als", "ob", "falls", "dass", "weil",
  "mit", "von", "bei", "in", "an", "auf", "für", "aus", "nach", "über", "unter", "zwischen", "gegen", "ohne", "um", "bis", "ab", "zu", "am", "im", "beim",
  "ich", "du", "er", "sie", "es", "wir", "ihr", "man", "mein", "dein", "sein", "ihr", "unser", "euer", "deren", "dessen",
  "sein", "bin", "bist", "ist", "sind", "seid", "war", "waren", "gewesen",
  "haben", "habe", "hast", "hat", "hatte", "hatten", "gehabt",
  "werden", "wird", "wurde", "wurden", "worden",
  "wie", "was", "wenn", "wo", "warum", "also", "auch", "nur", "schon", "noch", "immer", "mal", "jetzt", "dann", "da", "hier", "dort", "so", "zum", "zur", "vom", "im", "am", "beim"
];

export function soundex(name) {
  let s = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!s.length) return "";
  const map = { B: 1, F: 1, P: 1, V: 1, C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2, D: 3, T: 3, L: 4, M: 5, N: 5, R: 6 };
  let output = s[0], prevDigit = map[s[0]] || 0;
  for (let i = 1; i < s.length; i++) {
    let digit = map[s[i]] || 0;
    if (digit !== prevDigit && digit !== 0) output += digit;
    prevDigit = digit;
  }
  return (output + "0000").slice(0, 4);
}

export function levenshtein(a, b) {
  const tmp = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i++) tmp[0][i] = i;
  for (let j = 0; j <= b.length; j++) tmp[j][0] = j;
  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      tmp[j][i] = b[j - 1] === a[i - 1]
        ? tmp[j - 1][i - 1]
        : Math.min(tmp[j - 1][i], tmp[j][i - 1], tmp[j - 1][i - 1]) + 1;
    }
  }
  return tmp[b.length][a.length];
}

export function generateAbbreviation(name) {
  const parts = name.split(/\s+/).filter(Boolean);
  let abbrev = "";
  for (let part of parts) {
    if (part === part.toUpperCase()) {
      abbrev += part;
    } else {
      let partAbbrev = part.charAt(0).toUpperCase();
      for (let i = 1; i < part.length; i++) {
        const ch = part.charAt(i);
        if (ch.match(/[A-Z]/)) {
          partAbbrev += ch;
        }
      }
      abbrev += partAbbrev;
    }
  }
  return abbrev;
}

export function applyColorClasses(text) {
  text = text.replace(/\[Klient\]/g, '<span class="mask-klient">[Klient]</span>');
  text = text.replace(/\[Ansprechperson\d+\]/g, match => `<span class="mask-ansprechperson">${match}</span>`);
  text = text.replace(/\[Dienstleister\d+\]/g, match => `<span class="mask-dienstleister">${match}</span>`);
  return text;
}

export function maskName(name, placeholder, text, mappingTable) {
  const parts = name.split(/\s+/)
    .filter(Boolean)
    .map(p => p.toLowerCase())
    .filter(p => !ignoreList.includes(p));
  const normalizedName = parts.join("");
  const tokens = text.match(/\S+|\s+/g) || [];
  let outputTokens = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (/\s+/.test(token)) {
      outputTokens.push(token);
      continue;
    }
    const cleanToken = token.replace(/[.,!?;:()]/g, '').toLowerCase();
    if (ignoreList.includes(cleanToken)) {
      outputTokens.push(token);
      continue;
    }
    const punctuationMatch = token.match(/[.,!?;:]+$/);
    const punctuation = punctuationMatch ? punctuationMatch[0] : '';

    let isSensitive = false;
    for (let part of parts) {
      const isShort = cleanToken.length <= 2 || part.length <= 2;
      const maxDistance = Math.floor(part.length / 4);
      if (isShort) {
        if (cleanToken === part) { isSensitive = true; break; }
      } else {
        if (cleanToken === part ||
          levenshtein(cleanToken, part) <= maxDistance ||
          soundex(cleanToken) === soundex(part)) {
          isSensitive = true;
          break;
        }
      }
    }
    if (!isSensitive) {
      const maxDistanceNorm = Math.floor(normalizedName.length / 4);
      if (cleanToken === normalizedName ||
        levenshtein(cleanToken, normalizedName) <= maxDistanceNorm ||
        soundex(cleanToken) === soundex(normalizedName)) {
        isSensitive = true;
      }
    }
    if (!isSensitive) {
      const fullAbbr = generateAbbreviation(name).toLowerCase();
      if (cleanToken === fullAbbr) isSensitive = true;
    }
    if (isSensitive) {
      let lastToken = null;
      for (let j = outputTokens.length - 1; j >= 0; j--) {
        if (!/^\s+$/.test(outputTokens[j])) {
          lastToken = outputTokens[j].replace(/[.,!?;:]+$/, '');
          break;
        }
      }
      const placeholderToken = `[${placeholder}]`;
      if (lastToken === placeholderToken) continue;
      else {
        outputTokens.push(placeholderToken + punctuation);
        mappingTable.set(placeholder, name);
      }
    } else {
      outputTokens.push(token);
    }
  }
  return outputTokens.join('').replace(/\s{2,}/g, ' ');
}  