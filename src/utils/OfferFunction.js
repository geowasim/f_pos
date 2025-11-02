export function discountOnAllProducts(cartItems, discountRate) {
  const totalBefore = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discountValue = totalBefore * (discountRate / 100);
  const totalAfter = totalBefore - discountValue;

  return {
    totalBasicPrice: totalBefore,
    totalBasicPriceAfterDiscount: totalAfter,
    otherPrice: 0,
  };
}
