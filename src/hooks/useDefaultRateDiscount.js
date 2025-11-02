import { useState, useEffect } from "react";

export const DEFAULT_VAT = 15;
export const DEFAULT_DISCOUNT = 25;

export const useDefaultRateDiscount = () => {
  const [vatRate, setVatRate] = useState(DEFAULT_VAT / 100);
  const [discountRate, setDiscountRate] = useState(DEFAULT_DISCOUNT);

  useEffect(() => {
    const storedVat = localStorage.getItem("vatValue");
    const storedDiscount = localStorage.getItem("discountRate");

    if (storedVat !== null) setVatRate(Number(storedVat) / 100);
    else localStorage.setItem("vatValue", DEFAULT_VAT);

    if (storedDiscount !== null) setDiscountRate(Number(storedDiscount));
    else localStorage.setItem("discountRate", DEFAULT_DISCOUNT);
  }, []);
  return { vatRate, discountRate };
};
