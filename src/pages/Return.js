import React, { useState } from "react";
import { toast } from "sonner";

const Return = () => {
  const [searchInvNumb, setSearchInvNumb] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [invoice, setInvoice] = useState(null);

  const handleSearch = () => {
    const stored = localStorage.getItem("invoices");
    if (!stored) {
      toast.warning(
        "No invoices found in localStorage \n لا يوجد فواتر محفوظة بعد"
      );
      return;
    }

    const allInvoices = JSON.parse(stored);
    setInvoices(allInvoices);

    const found = allInvoices.find(
      (inv) => String(inv.invoiceNumber.sn) === String(searchInvNumb)
    );

    if (!found) {
      toast.warning(
        <>
          <p>"Invoice not found"</p>
          <p>الفاتورة غير موجودة</p>
        </>
      );
      setInvoice(null);
      setSearchInvNumb("");
      return;
    }

    if (found.isReturn) {
      toast.warning(
        <div className="text-black">
          This is already a returned invoice. You cannot refund a refunded.
          <br />
          الفاتورة مستردة – لا يمكن استرداد المبلغ المُسترد
        </div>
      );

      return;
    }

    const alreadyReturned = allInvoices.find(
      (invoice) => invoice.ref === found.invoiceNumber.sn
    );

    if (alreadyReturned) {
      toast.error(
        <div className="text-red-800">
          This invoice has already been refunded.
          <br />
          لقد تم استرداد هذه الفاتورة بالفعل.
        </div>
      );
      return;
    }

    setInvoice(found);
  };

  const handleFullInvoiceReturn = () => {
    if (!invoice) return;

    const returnedItems = invoice.cartItems.map((item) => ({
      ...item,
      qty: -item.qty,
    }));

    let subtotalRefund = -Math.abs(Number(invoice.subtotal));

    const taxRefund = invoice.tax;
    const totalRefund = -invoice.totalPrice;
    const originalSN = invoice.invoiceNumber.sn;
    const totalItemsRefund = -invoice.totalItems;

    const returnInvoice = {
      cartItems: returnedItems,
      paymentMethod: { method: "Return" },
      invoiceNumber: { sn: `R-${originalSN}` },
      paidandchange: { paidMoney: 0, change: 0 },
      dateMyPC: new Date().toISOString(),
      subtotal: subtotalRefund,
      tax: taxRefund,
      totalPrice: totalRefund,
      totalItems: totalItemsRefund,
      isReturn: true,
      ref: originalSN,
    };

    const storedData = localStorage.getItem("invoices");
    if (!storedData) return [];
    const storedInvoices = JSON.parse(storedData);
    storedInvoices.push(returnInvoice);
    localStorage.setItem("invoices", JSON.stringify(storedInvoices));

    toast.success(
      `Full invoice returned! Return Invoice #: ${returnInvoice.invoiceNumber.sn} - \n تم استرجاع الفاتورة`
    );
    setInvoice(null);
    setSearchInvNumb("");
  };

  const subtotalBeforeDiscount = (invoice) =>
    invoice.cartItems.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  const floatNum = (num) => num.toFixed(2);

  return (
    <div className="return p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Return Invoice</h2>

      <div className="search flex justify-center gap-2 mb-4">
        <input
          type="text"
          value={searchInvNumb}
          onChange={(e) => setSearchInvNumb(e.target.value)}
          placeholder="Enter invoice number"
          className="border p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#ffc363] hover:bg-[#f9bb58] disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          disabled={searchInvNumb.trim() === ""}
        >
          Search
        </button>
      </div>

      {invoice && (
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">
            Invoice #{invoice.invoiceNumber.sn}
          </h3>

          <table className="table w-full mb-3">
            <thead>
              <tr>
                <th className="text-left">Item</th>
                <th className="text-left">Qty</th>
                <th className="text-left">Unit (before VAT & discount)</th>
                <th className="text-left">Line Total (before VAT)</th>
              </tr>
            </thead>
            <tbody>
              {invoice.cartItems.map((item, idx) => {
                const unitPrice = item.unitPrice;
                const qty = item.qty;
                const displayLineTotal = unitPrice * qty;
                return (
                  <tr key={idx}>
                    <td>{item.description}</td>
                    <td>{qty}</td>
                    <td>{floatNum(unitPrice)} SAR</td>
                    <td>{floatNum(displayLineTotal)} SAR</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p className="text-xs mt-2 text-center">
            * Item prices shown are <strong>before</strong> VAT & discount,
            exactly as recorded at sale time.
          </p>

          <div className="mb-4 mt-3">
            <p>
              <strong>Subtotal (before discount):</strong>{" "}
              {floatNum(subtotalBeforeDiscount(invoice))} SAR
            </p>

            <p>
              <strong>Subtotal (paid, after discounts if any):</strong>{" "}
              {invoice.subtotal} SAR
            </p>

            <p>
              <strong>VAT:</strong> {invoice.tax} SAR
            </p>

            <p className="text-xl text-[#972b4f]">
              <strong>Total Paid:</strong> {invoice.totalPrice} SAR
            </p>

            <p>
              <strong>Payment Method:</strong> {invoice.paymentMethod.method}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleFullInvoiceReturn}
              className="rounded-md bg-[#972b4f] text-white px-4 py-2"
            >
              Return Entire Invoice
            </button>

            <button
              onClick={() => {
                setInvoice(null);
                setSearchInvNumb("");
              }}
              className="rounded-md text-white bg-gray-500 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Return;
