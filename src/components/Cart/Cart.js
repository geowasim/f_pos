import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { discountOnAllProducts } from "../../utils/OfferFunction";
import { addPricingToCartItems } from "../../utils/invoicesFunctions";
import { ComponentToPrint } from "../Print/ComponentToPrint";
import { useDefaultRateDiscount } from "../../hooks/useDefaultRateDiscount";
import Payment from "../Payments/Payment";
import LogoFooter from "../Common/Footer";
import "./Cart.css";

const Basket = ({ cartItems, resetCartItems, onAdd, onRemove }) => {
  const [method, setMethod] = useState("Mada");
  const [paidMoney, setPaidMoney] = useState(0);
  const [change, setChange] = useState(0);
  const [hideQuestionShowPay, setHideQuestionShowPay] = useState(false);
  const [serialNumber, setSerialNumber] = useState(
    Number(localStorage.getItem("invoiceSerial"))
  );
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const { vatRate, discountRate } = useDefaultRateDiscount();

  const {
    totalBasicPrice,
    totalBasicPriceAfterDiscount,
    otherPrice = 0,
  } = discountOnAllProducts(cartItems, discountRate);

  const itemsPrice = totalBasicPriceAfterDiscount + otherPrice;
  const taxPrice = Number((itemsPrice * vatRate).toFixed(2));
  const totalPrice = Number((itemsPrice + taxPrice).toFixed(2));

  const totalItems = cartItems.reduce((acc, product) => acc + product.qty, 0);
  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (currentInvoice) {
      handleReactToPrint();
      setCurrentInvoice(null);
    }
  }, [currentInvoice, handleReactToPrint]);

  const checkPaymentMethod = (method) => setMethod(method);
  const moneyFromClient = (recived) => setPaidMoney(recived);
  const isChange = (change) => setChange(Number(change).toFixed(2));

  const createInvoice = () => {
    const existingInvoices = JSON.parse(localStorage.getItem("invoices"));
    const currentSerial = localStorage.getItem("invoiceSerial");
    const nextSerial = parseInt(currentSerial) + 1;

    const cartItemsWithTotals = addPricingToCartItems(cartItems, discountRate);

    const subtotal = itemsPrice;
    const tax = Number((subtotal * vatRate).toFixed(2));
    const finalTotal = Number((subtotal + tax).toFixed(2));
    const newInvoice = {
      cartItems: cartItemsWithTotals,
      paymentMethod: { method },
      invoiceNumber: { sn: nextSerial },
      paidandchange: { paidMoney, change },
      dateMyPC: new Date().toISOString(),
      subtotal,
      tax,
      totalPrice: finalTotal,
      totalItems,
      itemsPrice,
      totalBasicPrice,
      isOffer: discountRate > 0,
      vatRate: vatRate,
      discountRate: discountRate,
    };

    localStorage.setItem("invoiceSerial", nextSerial);
    localStorage.setItem(
      "invoices",
      JSON.stringify([...existingInvoices, newInvoice])
    );
    setCurrentInvoice(newInvoice);
    setSerialNumber(nextSerial);
  };

  return (
    <>
      <div className="basketContainer">
        <div className="basket">
          <h2 className="basketName">The Cart</h2>

          {cartItems.length !== 0 && (
            <button
              className="cancelOrder w-auto mt-1 text-sm"
              onClick={() => {
                resetCartItems();
              }}
            >
              Cancel order{" "}
            </button>
          )}

          <div className="Cart flex flex-col bg-white w-full h-[350px] shadow-md rounded-lg text-sm md:text-base">
            <div className="Products-items scroll-right flex-1 overflow-y-auto border-b p-2">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Empty Basket</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="row">
                    <div className="basketTitle">
                      {item.category[0]} - {item.title}
                    </div>
                    <div className="basketIND">
                      <button onClick={() => onAdd(item)} className="add">
                        +
                      </button>
                      <button onClick={() => onRemove(item)} className="remove">
                        -
                      </button>
                    </div>
                    <div className="basketQT">
                      {item.qty} ×{" "}
                      {(Number(item.price) * (1 + vatRate)).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length !== 0 && (
              <div className="Summery text-sm md:text-base bg-[#fdefde80] p-3 space-y-2 text-right text-gray-700">
                <div className="flex justify-between">
                  <span>Price with vat({vatRate * 100}%):</span>
                  <span>
                    {(totalBasicPrice * (1 + vatRate)).toFixed(2)} SAR
                  </span>
                </div>

                {discountRate > 0 && (
                  <div className="flex justify-between">
                    <span>Discount ({discountRate}%):</span>
                    <span>
                      -{((totalBasicPrice * discountRate) / 100).toFixed(2)} SAR
                    </span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-[#cb7d00]">
                  <span>Total:</span>
                  <span>{totalPrice} SAR</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
              </div>
            )}
          </div>

          <div className="PaymentOption mt-4 w-full">
            {cartItems.length !== 0 && (
              <div className="paymentArea">
                <Payment
                  checkPaymentMethod={checkPaymentMethod}
                  resetCartItems={resetCartItems}
                  moneyFromClient={moneyFromClient}
                  isChange={isChange}
                  createInvoice={createInvoice}
                  itemsPrice={itemsPrice}
                  cartItems={cartItems}
                  method={method}
                  paidMoney={paidMoney}
                  change={change}
                  serialNumber={serialNumber}
                  setHideQuestionShowPay={setHideQuestionShowPay}
                  hideQuestionShowPay={hideQuestionShowPay}
                  vatRate={vatRate}
                  discountRate={discountRate}
                  taxPrice={taxPrice}
                  totalPrice={totalPrice}
                />
              </div>
            )}
          </div>
        </div>

        <LogoFooter />
      </div>

      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} currentInvoice={currentInvoice} />
      </div>
    </>
  );
};

export default Basket;
