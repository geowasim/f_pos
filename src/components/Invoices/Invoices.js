import React, { useState, useEffect } from "react";
import OneInvoice from "./OneInvoice";
import {
  getNetIncome,
  getTotalReturns,
  getTotalSales,
  getTotalSoldItems,
} from "../../utils/invoicesFunctions";

const style = {
  bg: `p-4`,
  container: `bg-slate-100 max-w-[90vw] w-full rounded-md shadow-xl p-4 flex flex-col justify-between min-h-[30rem]`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  count: `text-center p-2`,
  pagination: `flex justify-center gap-4 mt-4`,
  button: `bg-[#ffbe59] text-black px-4 py-2 rounded hover:bg-yellow-500 disabled:opacity-50`,
};

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    if (!storedInvoices) return;

    try {
      const parsedInvoices = JSON.parse(storedInvoices);
      setInvoices(parsedInvoices);
    } catch (err) {
      console.error("Failed to get invoices from localStorage", err);
    }
  }, []);

  const invoicesPerPage = 10;
  const totalPages = Math.ceil(invoices.length / invoicesPerPage);
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = [...invoices]
    .reverse()
    .slice(indexOfFirstInvoice, indexOfLastInvoice);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  if (invoices.length === 0) {
    return (
      <div className="flex justify-center items-center h-[98vh]">
        <h3>Loading .... No invoices yet....</h3>
      </div>
    );
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div>
          <h3 className={style.heading}>Invoices</h3>
          <div className="flex justify-around my-2 text-lg">
            <p>Net Income : {getNetIncome(invoices)}</p>
            <p>Total Sales : {getTotalSales(invoices).toFixed(2)}</p>
            <p>Total Returns : {getTotalReturns(invoices).toFixed(2)}</p>
            <p>Total sold items : {getTotalSoldItems(invoices)}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[500px] text-xs  w-full text-center border border-gray-400">
              <thead className="bg-gray-200">
                <tr>
                  <th>Order#</th>
                  <th>Total</th>
                  <th>Qty</th>
                  <th>Payment Method</th>
                  <th>Date & Time</th>
                  <th>Print</th>
                </tr>
              </thead>
              <tbody>
                {currentInvoices.map((invoice, index) => (
                  <OneInvoice key={index} invoice={invoice} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className={style.pagination}>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={style.button}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={style.button}
            >
              Next
            </button>
          </div>

          <p className={style.count}>You have {invoices.length} Invoices</p>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
