export function buildZomatoOrder(cart, coupon) {
  if (!Array.isArray(cart) || cart.length === 0) return null;

  const validItems = cart.filter(item => item.qty > 0);

  const processedItems = validItems.map(item => {
    let addonTotal = 0;
    if (Array.isArray(item.addons)) {
      addonTotal = item.addons.reduce((sum, addon) => {
        const parts = addon.split(':');
        return sum + (parts.length > 1 ? parseFloat(parts[1]) : 0);
      }, 0);
    }
    const itemTotal = (item.price + addonTotal) * item.qty;
    return {
      name: item.name,
      qty: item.qty,
      basePrice: item.price,
      addonTotal,
      itemTotal
    };
  });

  const subtotal = processedItems.reduce((sum, item) => sum + item.itemTotal, 0);

  let deliveryFee = 0;
  if (subtotal < 500) deliveryFee = 30;
  else if (subtotal < 1000) deliveryFee = 15;

  let discount = 0;
  let finalDeliveryFee = deliveryFee;

  if (typeof coupon === 'string') {
    const upperCoupon = coupon.toUpperCase();
    if (upperCoupon === 'FIRST50') {
      discount = Math.min(subtotal * 0.5, 150);
    } else if (upperCoupon === 'FLAT100') {
      discount = 100;
    } else if (upperCoupon === 'FREESHIP') {
      discount = deliveryFee;
      finalDeliveryFee = 0;
    }
  }

  const gst = parseFloat((subtotal * 0.05).toFixed(2));

  const grandTotal = parseFloat(Math.max(0, subtotal + finalDeliveryFee + gst - discount).toFixed(2));

  return {
    items: processedItems,
    subtotal,
    deliveryFee: finalDeliveryFee,
    gst,
    discount,
    grandTotal
  };
}
