export function fixBollywoodTitle(title) {
  if (typeof title !== 'string') return "";

  const trimmed = title.trim();
  if (trimmed.length === 0) return "";

  const words = trimmed.split(/\s+/);
  const smallWords = ["ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"];

  const fixedWords = words.map((word, index) => {
    const lowerWord = word.toLowerCase();
    if (index !== 0 && smallWords.includes(lowerWord)) {
      return lowerWord;
    }
    return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
  });

  return fixedWords.join(" ");
}
