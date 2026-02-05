import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DEFAULT_DISCOUNT, DEFAULT_VAT } from "../hooks/useDefaultRateDiscount";

const AdminSettings = () => {
  const [adminCode, setAdminCode] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [discountRateInput, setDiscountRateInput] = useState("");
  const [currentRate, setCurrentRate] = useState(DEFAULT_DISCOUNT);
  const [vatValueInput, setVatValueInput] = useState("");
  const [currentVat, setCurrentVat] = useState(DEFAULT_VAT);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) navigate("/pos");

    const savedRate = localStorage.getItem("discountRate");
    if (savedRate) setCurrentRate(savedRate);

    const savedVat = localStorage.getItem("vatValue");
    if (savedVat) setCurrentVat(savedVat);

    const sessionAuth = sessionStorage.getItem("adminAuth") === "true";
    if (sessionAuth) setIsAuth(true);
  }, [navigate]);

  const handleAuth = () => {
    if (adminCode === "admin") {
      setIsAuth(true);
      sessionStorage.setItem("adminAuth", "true");
    } else {
      alert("رمز خاطئ / wrong password");
    }
  };

  const saveDiscount = () => {
    const rate = Number(discountRateInput);
    if (rate < 0 || rate > 100) {
      toast.warning("Discount ratio should be between 0 and 100");
      return;
    }
    localStorage.setItem("discountRate", rate);
    setCurrentRate(rate);
    setDiscountRateInput("");
    toast.success(`تم حفظ خصم ${rate}%`);
  };

  const saveVat = () => {
    const vat = Number(vatValueInput);
    if (vat < 0 || vat > 100) {
      toast.warning("VAT ratio should be between 0 and 100");
      return;
    }
    localStorage.setItem("vatValue", vat);
    setCurrentVat(vat);
    setVatValueInput("");
    toast.success(`% ${vat} Successfuly saved the value`);
  };

  return (
    <div className="p-6 max-w-[600px] mx-auto">
      {!isAuth ? (
        <div>
          <h2 className=" flex flex-row justify-between text-xl font-bold mb-4">
            <span>Admin Signin</span>
            <span>دخول الأدمن </span>
          </h2>
          <p className="my-4">
            <i>password</i>: admin{" "}
          </p>
          <input
            type="password"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            className="border p-2 w-full mb-4"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAuth();
              }
            }}
            placeholder="Password"
          />
          <button
            onClick={handleAuth}
            className="bg-blue-600 text-white p-2 w-full"
          >
            Enter
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl text-center font-bold mb-6">
            VAT & Discount settings
          </h2>
          <p className="font text-center mb-6">Vat and Discount Settings</p>
          <table className="w-full text-right border-separate space-y-4">
            <thead className="text-center">
              <tr className="text-gray-600 text-sm">
                <th>Task</th>
                <th>Current value</th>
                <th>New Value</th>
                <th>Save</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="font-semibold text-gray-700">
                  Discount ratio (%)
                </td>
                <td>{currentRate ? `${currentRate}٪` : "—"}</td>
                <td>
                  <input
                    className="no-spinner border p-2 w-full"
                    type="number"
                    placeholder="Enter the value"
                    value={discountRateInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveDiscount();
                    }}
                    onChange={(e) => setDiscountRateInput(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    onClick={saveDiscount}
                    className="bg-gray-700 text-white px-4 py-2"
                  >
                    Add
                  </button>
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700">VAT Rate (%)</td>
                <td>{currentVat ? `${currentVat}٪` : "—"}</td>
                <td>
                  <input
                    className="no-spinner border p-2 w-full"
                    value={vatValueInput}
                    onChange={(e) => setVatValueInput(e.target.value)}
                    type="number"
                    placeholder="Enter the value "
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveVat();
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={saveVat}
                    className="bg-yellow-600 text-white px-4 py-2"
                  >
                    add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
