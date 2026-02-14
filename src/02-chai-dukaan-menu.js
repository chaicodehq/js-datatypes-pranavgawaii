export function formatChaiMenu(items) {
  if (!Array.isArray(items) || items.length === 0) return "";

  const formattedItems = items
    .filter(item => item.price > 0 && typeof item.name === 'string' && item.name.trim() !== '')
    .map(item => {
      return `${item.name.toUpperCase()} - Rs.${item.price}`;
    });

  return formattedItems.join(" | ");
}
