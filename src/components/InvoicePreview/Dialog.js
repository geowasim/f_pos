import "./dialog.css";
import Preview from "./Preview";
function Dialog(props) {
  const {
    setHideQuestionShowPay,
    resetCartItems,
    createInvoice,
    cartItems,
    itemsPrice,
    method,
    paidMoney,
    change,
    totalPrice,
    vatRate,
    discountRate,
  } = props;
  return (
    <div
      className="fixed inset-0 bg-black/50 z-[5]"
      onClick={() => setHideQuestionShowPay(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 px rounded-[10px] text-[#3d3d3d] font-[El_Messiri] h-[95vh]"
      >
        <Preview
          cartItems={cartItems}
          itemsPrice={itemsPrice}
          method={method}
          paidMoney={paidMoney}
          change={change}
          vatRate={vatRate}
          totalPrice={totalPrice}
          discountRate={discountRate}
        />
        <h3 className="warning text-xl mb-2 ">
          طريقة الدفع
          {method === "Mada" ? <span>- بطاقة</span> : <span> كاش</span>}
        </h3>
        <p className="mb-4 text-2xl">هل تم إستلام المبلغ؟</p>

        <div className="flex items-center">
          <button onClick={() => setHideQuestionShowPay(false)} className="no">
            لا - الرجوع للقائمة السابقة{" "}
          </button>
          <button
            onClick={() => {
              setHideQuestionShowPay(false);

              resetCartItems();
              createInvoice();
            }}
            className="yes"
          >
            نعم - اطبع الفاتورة
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
