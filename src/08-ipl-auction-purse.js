export function iplAuctionSummary(team, players) {
  if (!team || typeof team.purse !== 'number' || team.purse < 0) return null;
  if (!Array.isArray(players) || players.length === 0) return null;

  const totalSpent = players.reduce((sum, p) => sum + p.price, 0);
  const remaining = team.purse - totalSpent;
  const playerCount = players.length;
  const averagePrice = Math.round(totalSpent / playerCount);
  const isOverBudget = totalSpent > team.purse;

  const sortedByPrice = [...players].sort((a, b) => b.price - a.price);
  const costliestPlayer = sortedByPrice[0];
  const cheapestPlayer = sortedByPrice[playerCount - 1];

  const byRole = players.reduce((acc, p) => {
    acc[p.role] = (acc[p.role] || 0) + 1;
    return acc;
  }, {});

  return {
    teamName: team.name,
    totalSpent,
    remaining,
    playerCount,
    costliestPlayer,
    cheapestPlayer,
    averagePrice,
    byRole,
    isOverBudget
  };
}
