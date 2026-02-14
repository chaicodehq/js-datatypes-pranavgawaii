export function maskAadhaar(aadhaarNumber) {
  if (typeof aadhaarNumber !== 'string') return "INVALID";
  if (aadhaarNumber.length !== 12) return "INVALID";
  if (/[^0-9]/.test(aadhaarNumber)) return "INVALID";

  const masked = "X".repeat(8) + aadhaarNumber.slice(8);
  return `${masked.slice(0, 4)}-${masked.slice(4, 8)}-${masked.slice(8)}`;
}
