export function processRailwayPNR(pnrData) {
  if (!pnrData || typeof pnrData !== 'object') return null;
  if (typeof pnrData.pnr !== 'string' || pnrData.pnr.length !== 10 || !/^\d+$/.test(pnrData.pnr)) return null;
  if (!pnrData.train || typeof pnrData.train !== 'object') return null;
  if (!Array.isArray(pnrData.passengers) || pnrData.passengers.length === 0) return null;

  const pnrFormatted = `${pnrData.pnr.slice(0, 3)}-${pnrData.pnr.slice(3, 6)}-${pnrData.pnr.slice(6)}`;

  const { number, name, from, to } = pnrData.train;
  const trainInfo = `Train: ${number} - ${name} | ${from} → ${to} | Class: ${pnrData.classBooked}`;

  const passengers = pnrData.passengers.map(p => {
    let statusLabel = "CONFIRMED";
    const current = p.current;

    if (current === "CAN") statusLabel = "CANCELLED";
    else if (current.startsWith("WL")) statusLabel = "WAITING";
    else if (current.startsWith("RAC")) statusLabel = "RAC";
    else if (current.startsWith("B") || current.startsWith("S")) statusLabel = "CONFIRMED";

    return {
      formattedName: `${p.name.padEnd(20)}(${p.age}/${p.gender})`,
      bookingStatus: p.booking,
      currentStatus: p.current,
      statusLabel,
      isConfirmed: statusLabel === "CONFIRMED"
    };
  });

  const summary = {
    totalPassengers: passengers.length,
    confirmed: passengers.filter(p => p.statusLabel === "CONFIRMED").length,
    waiting: passengers.filter(p => p.statusLabel === "WAITING").length,
    cancelled: passengers.filter(p => p.statusLabel === "CANCELLED").length,
    rac: passengers.filter(p => p.statusLabel === "RAC").length,
    allConfirmed: passengers.every(p => p.isConfirmed),
    anyWaiting: passengers.some(p => p.statusLabel === "WAITING")
  };

  const nonCancelled = passengers.filter(p => p.statusLabel !== "CANCELLED");
  const chartPrepared = nonCancelled.length > 0 ? nonCancelled.every(p => p.isConfirmed) : true;

  return {
    pnrFormatted,
    trainInfo,
    passengers,
    summary,
    chartPrepared
  };
}
