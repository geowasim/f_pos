const floatTwoNumbers = (num) => parseFloat(num.toFixed(2));

export const addPricingToCartItems = (cartItems, discountRate) => {
  return cartItems.map((item) => {
    const unitPrice = Number(item.price);
    const finalPrice = floatTwoNumbers(unitPrice * (1 - discountRate / 100));
    const lineTotal = floatTwoNumbers(finalPrice * item.qty);

    return {
      id: item.id,
      title: item.title,
      qty: item.qty,
      vol: item.vol,
      category: item.category,
      description: item.description,
      unitPrice,
      discountRate,
      finalPrice,
      lineTotal,
    };
  });
};

//total (sales + returns)
export function getTotalIncome(invoices) {
  return floatTwoNumbers(
    invoices.reduce((acc, invoice) => acc + invoice.totalPrice, 0)
  );
}

export function getTotalSoldItems(invoices) {
  return invoices.reduce((acc, invoice) => acc + invoice.totalItems, 0);
}

export function getTotalSales(invoices) {
  return floatTwoNumbers(
    invoices
      .filter((inv) => !inv.isReturn)
      .reduce((acc, inv) => acc + inv.totalPrice, 0)
  );
}

export function getTotalReturns(invoices) {
  return floatTwoNumbers(
    invoices
      .filter((inv) => inv.isReturn)
      .reduce((acc, inv) => acc + inv.totalPrice, 0)
  );
}

export function getNetIncome(invoices) {
  return floatTwoNumbers(
    getTotalSales(invoices) - Math.abs(getTotalReturns(invoices))
  );
}
