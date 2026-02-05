import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ReactComponent as LogoSVG } from "../assets/logo-signin.svg";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fillDemoData = () => {
    setEmail("demo@pos.com");
    setPassword("admin123");
    toast.success("Demo credentials filled!");
  };

  const copyValue = (value, type) => {
    navigator.clipboard.writeText(value).then(() => {
      toast.info(`${type} copied to clipboard!`);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isAdminPassword = password === "admin123";
    const isUserPassword = password === "123456";

    if (email === "demo@pos.com" && (isAdminPassword || isUserPassword)) {
      if (!localStorage.getItem("invoiceSerial")) {
        localStorage.setItem("invoiceSerial", "99");
      }
      if (!localStorage.getItem("invoices")) {
        localStorage.setItem("invoices", JSON.stringify([]));
      }

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("isAdmin", isAdminPassword ? "true" : "false");
      navigate("/pos");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6e1e3]">
      <div className="max-w-[600px] w-full p-6 shadow-2xl bg-[#bebebe33] rounded-md">
        <div className="w-full flex justify-center">
          <LogoSVG className="bg-transparent shadow-none w-[200px] h-[100px] mb-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold py-2">Sign in to Demo Version</h1>
        </div>
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">
              Demo Access
            </span>
            <button
              onClick={fillDemoData}
              className="text-xs bg-amber-600 text-white px-2 py-1 rounded hover:bg-amber-700 transition"
            >
              Autofill Login
            </button>
          </div>
          <div className="text-sm space-y-1">
            <p
              className="flex justify-between cursor-pointer group"
              onClick={() => copyValue("demo@pos.com", "Email")}
            >
              <span className="text-gray-600 italic">Email:</span>
              <span className="font-mono font-semibold group-hover:text-amber-700">
                demo@pos.com 📋
              </span>
            </p>
            <p
              className="flex justify-between cursor-pointer group"
              onClick={() => copyValue("admin123", "Password")}
            >
              <span className="text-gray-600 italic">Password:</span>
              <span className="font-mono font-semibold group-hover:text-amber-700">
                admin123 📋
              </span>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-amber-500 outline-none"
              type="email"
              value={email}
            />
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-amber-500 outline-none"
            type="password"
            value={password}
          />

          <button
            className="w-full bg-[#706f6f] hover:bg-[#5b5b59] text-white font-bold py-4 rounded-lg shadow-md transition-all active:scale-95"
            type="submit"
          >
            Login to System
          </button>
        </form>

        {error && toast.success("Wrong username or password")}
      </div>
    </div>
  );
};

export default Signin;
