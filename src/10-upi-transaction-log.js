export function analyzeUPITransactions(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) return null;

  const validTxns = transactions.filter(t =>
    t.amount > 0 && (t.type === 'credit' || t.type === 'debit')
  );

  if (validTxns.length === 0) return null;

  const totalCredit = validTxns
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = validTxns
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalCredit - totalDebit;
  const transactionCount = validTxns.length;

  const totalAmount = validTxns.reduce((sum, t) => sum + t.amount, 0);
  const avgTransaction = Math.round(totalAmount / transactionCount);

  const highestTransaction = [...validTxns].sort((a, b) => b.amount - a.amount)[0];

  const categoryBreakdown = validTxns.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const tempCounts = {};
  for (const t of validTxns) {
    tempCounts[t.to] = (tempCounts[t.to] || 0) + 1;
  }

  let frequentContact = validTxns[0].to;
  const maxVal = Math.max(...Object.values(tempCounts));

  for (const t of validTxns) {
    if (tempCounts[t.to] === maxVal) {
      frequentContact = t.to;
      break;
    }
  }

  const allAbove100 = validTxns.every(t => t.amount > 100);
  const hasLargeTransaction = validTxns.some(t => t.amount >= 5000);

  return {
    totalCredit,
    totalDebit,
    netBalance,
    transactionCount,
    avgTransaction,
    highestTransaction,
    categoryBreakdown,
    frequentContact,
    allAbove100,
    hasLargeTransaction
  };
}
