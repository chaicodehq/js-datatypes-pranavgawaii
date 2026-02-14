export function calculateGST(amount, category) {
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) return null;
  if (typeof category !== 'string') return null;

  const lowerCategory = category.toLowerCase();

  let rate;
  if (lowerCategory === 'essential') rate = 0;
  else if (lowerCategory === 'food') rate = 5;
  else if (lowerCategory === 'standard') rate = 12;
  else if (lowerCategory === 'electronics') rate = 18;
  else if (lowerCategory === 'luxury') rate = 28;
  else return null;

  const gstAmount = parseFloat((amount * rate / 100).toFixed(2));
  const totalAmount = parseFloat((amount + gstAmount).toFixed(2));

  return {
    baseAmount: amount,
    gstRate: rate,
    gstAmount: gstAmount,
    totalAmount: totalAmount
  };
}
