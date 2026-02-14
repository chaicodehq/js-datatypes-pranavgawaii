export function parseWhatsAppMessage(message) {
  if (typeof message !== 'string') return null;

  const firstDashIndex = message.indexOf(" - ");
  if (firstDashIndex === -1) return null;

  const dateTime = message.substring(0, firstDashIndex);
  const content = message.substring(firstDashIndex + 3);

  const firstColonIndex = content.indexOf(": ");
  if (firstColonIndex === -1) return null;

  const sender = content.substring(0, firstColonIndex);
  const text = content.substring(firstColonIndex + 2).trim();

  const commaIndex = dateTime.indexOf(", ");
  if (commaIndex === -1) return null;

  const date = dateTime.substring(0, commaIndex);
  const time = dateTime.substring(commaIndex + 2);

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  const lowerText = text.toLowerCase();
  let sentiment = 'neutral';

  const isFunny = lowerText.includes('😂') || lowerText.includes(':)') || lowerText.includes('haha');
  const isLove = lowerText.includes('❤') || lowerText.includes('love') || lowerText.includes('pyaar');

  if (isFunny) sentiment = 'funny';
  else if (isLove) sentiment = 'love';

  return {
    date,
    time,
    sender,
    text,
    wordCount,
    sentiment
  };
}
