import React from "react";
import { Buffer } from "buffer";
import QRCode from "react-qr-code";
import { Invoice } from "@axenda/zatca";
import { ReactComponent as LogoSVG } from "../../assets/logo-print.svg";

export const ComponentToPrint = React.forwardRef(({ currentInvoice }, ref) => {
  if (!currentInvoice) return null;
  window.Buffer = Buffer;

  const {
    cartItems = [],
    paymentMethod,
    invoiceNumber,
    paidandchange,
    dateMyPC,
    tax,
    totalPrice,
    isOffer,
    totalBasicPrice,
    itemsPrice,
    originalInvoiceRef,
    discountRate,
    vatRate,
  } = currentInvoice;

  const timeBuf = dateMyPC;
  const totalWithVat = Math.abs(Number(totalPrice));
  const vatAmount = Math.abs(Number(tax));

  const qrInvoice = new Invoice({
    sellerName: "Demo Perfume Company",
    vatRegistrationNumber: "123456789012345",
    invoiceTimestamp: timeBuf,
    invoiceTotal: totalWithVat.toFixed(2),
    invoiceVatTotal: vatAmount.toFixed(2),
  });

  return (
    <div className="fatorah" ref={ref}>
      <div className="com_title">
        <div className="flex justify-center items-center">
          <LogoSVG className="mt-4 w-[100px] h-auto" />
        </div>
        <h2 className="mt-4">Demo Perfume Company</h2>
        <div className="under_line"></div>
      </div>

      <div className="perData">
        <p>معرض الرياض للعطور والبخور</p>
        <p>Simplified Vat Invoice</p>
        <p>فاتورة ضريبية مبسطة</p>
        <p>Vat: 123456789012345 :الرقم الضريبي</p>
        <p>C.R: 1234567890 :س .ت</p>
      </div>

      <div className="casher">
        <p>Salesperson: EXPO</p>
        <div className="date">
          <p>{timeBuf}</p>
          <span className="text-xs">order# {invoiceNumber.sn}</span>
        </div>
      </div>

      <div className="p-5">
        <table className="table">
          <thead>
            <tr>
              <td>Category</td>
              <td>Description</td>
              <td>Vol-مل</td>
              <td>Qty</td>
              <td>Unit price (with VAT)</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, key) => {
              const qty = Number(item.qty);
              const unitPrice = Number(item.unitPrice);
              const unitWithTax = Number(
                (unitPrice * (1 + vatRate)).toFixed(2)
              );

              return (
                <tr key={key}>
                  <td>{item.category}</td>
                  <td>{item.description || item.title}</td>
                  <td>{item.vol}</td>
                  <td>{qty}</td>
                  <td>{unitWithTax.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="paymentDataContainer">
          <div className="paymentData">
            {isOffer && (
              <>
                <div className="L1" style={{ fontSize: "12px" }}>
                  <p>Subtotal no VAT: المبلغ السابق بدون الضريبة</p>
                  <h4>{Number(totalBasicPrice).toFixed(2)} SAR</h4>
                </div>
                <div className="L1">
                  <p>Discount {discountRate}%</p>
                  <p>
                    <b>
                      {(Number(totalBasicPrice) - Number(itemsPrice)).toFixed(
                        2
                      )}{" "}
                      SAR
                    </b>
                  </p>
                </div>
              </>
            )}

            <div className="L1">
              <p>Total without VAT</p>
              <p>{(totalWithVat - vatAmount).toFixed(2)} SAR</p>
            </div>
            <div className="L1">
              <p>VAT {Math.round(vatRate * 100)}%</p>
              <p>{vatAmount.toFixed(2)} SAR</p>
            </div>
            <div className="L1" style={{ fontSize: "12px" }}>
              <p>
                <strong>المبلغ شامل الضريبة</strong> Total Amount include VAT:
              </p>
              <h4 className="font-bold text-lg">
                {totalWithVat.toFixed(2)} SAR
              </h4>
            </div>

            {paymentMethod.method === "Return" ? (
              <>
                <div className="L1">
                  <p>Client Refunded: المبلغ المسلم للعميل</p>
                  <p>{totalWithVat.toFixed(2)} SAR</p>
                </div>
                <div className="L1">
                  <p>Refund Method: طريقة الاسترجاع</p>
                  <p>Cash (نقداً)</p>
                </div>
                {originalInvoiceRef && (
                  <div className="L1">
                    <p>Return for Invoice #: {originalInvoiceRef}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="L1">
                  <p>Payment Method: طريقة الدفع</p>
                  <p>
                    {paymentMethod.method === "Mada"
                      ? "Card (بطاقة)"
                      : "Cash (كاش)"}
                  </p>
                </div>
                {paymentMethod.method === "Mada" ? (
                  <div className="L1">
                    <p>Received: المبلغ المستلم</p>
                    <p>{totalWithVat.toFixed(2)} SAR</p>
                  </div>
                ) : (
                  <>
                    <div className="L1">
                      <p>Received: المبلغ المستلم</p>
                      <p>{paidandchange.paidMoney} SAR</p>
                    </div>
                    <div className="L1">
                      <p>Change: المتبقي للعميل</p>
                      <p>{paidandchange.change} SAR</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* <OfferComponent codeE={"RYD1122"} /> */}

      <div
        className="qr-container"
        style={{ maxWidth: 180, margin: "15px auto" }}
      >
        <QRCode
          className="qr-code"
          size={256}
          style={{ width: "100%", height: "auto" }}
          value={qrInvoice.toBase64()}
          viewBox={`0 0 256 256`}
        />
      </div>

      <div className="flex flex-col justify-center">
        <p>نشكركم لاختياركم منتجاتنا</p>
        <p>Thank you for choosing our products</p>
        <p>See you soon!</p>
        <p>😊</p>
      </div>
    </div>
  );
});
