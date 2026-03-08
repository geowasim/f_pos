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
          Payment Method :
          {method === "Mada" ? (
            <span className="mr-1"> Card</span>
          ) : (
            <span> Cash</span>
          )}
        </h3>
        <p className="mb-4 text-2xl">Has the payment been received?</p>

        <div className="flex items-center">
          <button onClick={() => setHideQuestionShowPay(false)} className="no">
            No - Back main page{" "}
          </button>
          <button
            onClick={() => {
              setHideQuestionShowPay(false);

              resetCartItems();
              createInvoice();
            }}
            className="yes"
          >
            Yes - Print the invoice
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;
