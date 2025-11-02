import React from "react";

const Preview = React.forwardRef((props, ref) => {
  const {
    cartItems,
    itemsPrice,
    method,
    paidMoney,
    change,
    vatRate,
    totalPrice,
  } = props;

  const taxAmout = Number(itemsPrice * vatRate);

  return (
    <div className="fatorah-p h-[82vh] w-full scale-95" ref={ref}>
      <div className="p-5-p p-0 mt-1">
        <table className="w-full">
          <thead>
            <tr>
              <td>Category</td>
              <td>Description</td>
              <td>Vol-مل</td>
              <td>Qty</td>
              <td>Price</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.length !== 0
              ? cartItems.map((cartProduct, key) => (
                  <tr key={key}>
                    <td>{cartProduct.category} </td>
                    <td>
                      <span>{cartProduct.description}</span>{" "}
                      <span>{cartProduct.title}</span>{" "}
                    </td>
                    <td>{cartProduct.vol} </td>
                    <td>{cartProduct.qty}</td>
                    <td>{cartProduct.price}</td>
                    <td>{cartProduct.qty * cartProduct.price}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <div className="paymentDataContainer-p ">
          <div className="paymentData-p ">
            <div className="L1-p">
              <p>Subtotal + discount without VAT </p>
              <p>{itemsPrice.toFixed(2)} SAR</p>
            </div>
            <div className="L1-p">
              <p>VAT {vatRate * 100}% </p>
              <p>{taxAmout.toFixed(2)} SAR </p>
            </div>
            <div className="L1-p" style={{ fontSize: "12px" }}>
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "bold" }}>المبلغ شامل الضريبة</span>{" "}
                <span>Total Amount include VAT:</span>{" "}
              </p>
              <h4 style={{ fontSize: "20px", color: "red" }}>
                {totalPrice.toFixed(2)} SAR
              </h4>
            </div>
            <div className="L1-p">
              <p> payment by : طريقة الدفع </p>
              <p
                style={{
                  fontSize: "18px",
                  background: "#3d69bd",
                  color: "#fff",
                }}
              >
                {method === "Mada" ? "Mada(مدى) بطاقة" : "Cash(كاش)"}
              </p>
            </div>
            {method === "Mada" ? (
              <div className="L1-p">
                <p> Received: المبلغ المستلم</p>
                <p> {totalPrice.toFixed(2)} SAR</p>
              </div>
            ) : (
              <>
                <div className="L1-p">
                  <p>المبلغ المستلم Received:</p>
                  <p style={{ fontSize: "15px" }}> {paidMoney} SAR</p>
                </div>

                <div className="L1-p">
                  <p>المتبقي للعميل Change:</p>
                  <p style={{ fontSize: "15px", fontStyle: "italic" }}>
                    {change ? `${change} SAR` : "—"}{" "}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <br />
      </div>
      <hr />
    </div>
  );
});

export default Preview;
