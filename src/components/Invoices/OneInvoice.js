import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
import { ComponentToPrint } from "../Print/ComponentToPrint";

const OneInvoice = ({ invoice }) => {
  const { cartItems, invoiceNumber, totalPrice, paymentMethod, dateMyPC } =
    invoice;

  const serialNumber = invoiceNumber.sn;
  const totalItemsOneInv = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <tr className="bg-white hover:bg-gray-100 border-b border-dotted border-gray-400">
        <td className="px-2 py-1">{serialNumber}</td>
        <td className="px-2 py-1">{Number(totalPrice).toFixed(2)}</td>
        <td className="px-2 py-1">{totalItemsOneInv}</td>
        <td className="px-2 py-1">{paymentMethod.method}</td>
        <td className="px-2 py-1">{new Date(dateMyPC).toLocaleString()}</td>
        <td className="px-2 py-1 ">
          <button
            onClick={handleReactToPrint}
            className="inline-flex  justify-center items-center text-yellow-600 hover:text-amber-500"
          >
            <FaPrint />
          </button>
        </td>
      </tr>

      <tr style={{ display: "none" }}>
        <td colSpan="6">
          <ComponentToPrint ref={componentRef} currentInvoice={invoice} />
        </td>
      </tr>
    </>
  );
};

export default OneInvoice;
