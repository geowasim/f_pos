import { useEffect, useState } from "react";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import Dialog from "../InvoicePreview/Dialog";
import { toast } from "sonner";

export default function Payment(props) {
  const {
    checkPaymentMethod,
    resetCartItems,
    createInvoice,
    cartItems,
    method,
    paidMoney,
    change,
    setHideQuestionShowPay,
    hideQuestionShowPay,
    itemsPrice,
    totalPrice,
    vatRate,
    discountRate,
    isChange,
    moneyFromClient,
  } = props;

  const [showMethod, setShowMethod] = useState("Mada");
  const [cashInput, setCashInput] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);
  const [changeAmount, setChangeAmount] = useState("");

  useEffect(() => {
    checkPaymentMethod(showMethod);
    if (showMethod === "Mada") {
      setIsPreviewEnabled(true);
    } else {
      setIsPreviewEnabled(false);
      setCashInput("");
      setChangeAmount("");
      setIsInputDisabled(false);
    }
  }, [showMethod, checkPaymentMethod]);

  useEffect(() => {
    if (isInputDisabled && paidMoney) {
      const updatedTotal = itemsPrice * (1 + vatRate);
      const updatedChange = (paidMoney - updatedTotal).toFixed(2);
      setChangeAmount(updatedChange);
      props.isChange(updatedChange);
    }
  }, [itemsPrice, isInputDisabled, cartItems, props, vatRate, paidMoney]);

  useEffect(() => {
    if (showMethod === "Cash" && isInputDisabled && paidMoney) {
      const updatedTotal = totalPrice;
      const updatedChange = paidMoney - updatedTotal;

      if (updatedChange < 0) {
        toast.warning(
          "تم تعديل السلة، المبلغ المدفوع لم يعد كافياً.\nقلّص عدد العناصر أو عدل مبلغ الحساب.",
          {
            autoClose: 8000,
          }
        );
        setIsPreviewEnabled(false);
        setChangeAmount("");
        isChange("");
      } else {
        const formattedChange = updatedChange.toFixed(2);
        setChangeAmount(formattedChange);
        isChange(formattedChange);
        setIsPreviewEnabled(true);
      }
    }
  }, [
    cartItems,
    itemsPrice,
    isChange,
    isInputDisabled,
    paidMoney,
    showMethod,
    totalPrice,
  ]);

  const handleToggleMethod = () => {
    setShowMethod((prev) => (prev === "Mada" ? "Cash" : "Mada"));
  };

  const handleCashInput = (e) => {
    setCashInput(e.target.value);
  };

  const handleCalculateChange = () => {
    const paid = Number(cashInput);
    if (paid < totalPrice) {
      alert("تأكد من المبلغ المستلم");
      return;
    }
    const change = (paid - totalPrice).toFixed(2);
    setChangeAmount(change);
    moneyFromClient(paid);
    props.isChange(change);
    setIsInputDisabled(true);
    setIsPreviewEnabled(true);
  };

  const handlePreview = () => {
    setHideQuestionShowPay(true);
  };

  return (
    <div className="paymentContainer flex flex-col gap-3 w-full max-w-[32rem] mx-auto px-4 py-3 bg-white rounded-lg shadow-md text-right">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 mr-2">
          {showMethod === "Mada" ? (
            <FaCreditCard className="text-xl text-blue-500" />
          ) : (
            <FaMoneyBill className="text-xl text-green-600" />
          )}
          <h2 className="text-sm font-semibold text-gray-700">
            {showMethod === "Mada" ? "Default: Pay by Card" : "Pay Cash"}
          </h2>
        </div>
        <button
          onClick={handleToggleMethod}
          className="border border-[#ffda22] text-xs md:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition md"
        >
          {showMethod === "Mada" ? "Change to Cash" : "Change to Card"}
        </button>
      </div>

      <div className="paymentContent w-full min-h-[4rem] flex flex-col justify-center gap-2">
        {showMethod === "Mada" ? (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Requerd Amount: <span className="font-bold">{totalPrice}</span>{" "}
              SAR
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {isInputDisabled ? (
              <p className="border p-[0.4rem] rounded text-right w-full text-sm bg-gray-50 text-gray-800">
                Remaining: <span className="font-bold">{changeAmount}</span> SAR
              </p>
            ) : (
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="Enter the amount paid"
                value={cashInput}
                onChange={handleCashInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCalculateChange();
                  }
                }}
                className="no-spinner border p-[0.4rem] rounded text-right w-full text-sm text-gray-800 placeholder-gray-500 bg-white"
              />
            )}

            <button
              onClick={handleCalculateChange}
              className="itemButton px-3 py-[0.4rem] whitespace-nowrap text-sm"
              disabled={isInputDisabled}
            >
              Get remainder
            </button>
          </div>
        )}
      </div>

      <div className=" flex flex-wrap justify-center items-center gap-2 mt-3">
        <button
          onClick={handlePreview}
          disabled={!isPreviewEnabled}
          className={`Preview-Button itemButton px-4 py-2 text-sm ${
            !isPreviewEnabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Preview & Print the Invoice
        </button>
        {showMethod === "Cash" && isInputDisabled && !isPreviewEnabled && (
          <button
            onClick={() => {
              setIsInputDisabled(false);
              setCashInput("");
              setChangeAmount("");
              props.isChange("");
            }}
            className="itemButton"
          >
            تعديل المبلغ المدفوع
          </button>
        )}
      </div>

      {hideQuestionShowPay && (
        <Dialog
          setHideQuestionShowPay={setHideQuestionShowPay}
          resetCartItems={resetCartItems}
          createInvoice={createInvoice}
          cartItems={cartItems}
          method={method}
          paidMoney={paidMoney}
          change={change}
          vatRate={vatRate}
          discountRate={discountRate}
          totalPrice={totalPrice}
          itemsPrice={itemsPrice}
        />
      )}
    </div>
  );
}
