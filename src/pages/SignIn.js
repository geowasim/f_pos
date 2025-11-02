import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ReactComponent as LogoSVG } from "../assets/logo-signin.svg";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const copyValue = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        const message =
          value === "demo@pos.com"
            ? "Email copied to clipboard!"
            : value === "admin123"
            ? "Password copied to clipboard!"
            : "Copied to clipboard!";
        toast.warning(message);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
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
          <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3"
              type="email"
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col py-2">
            <label className="py-2 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3"
              type="password"
              value={password}
              placeholder="Password"
            />
          </div>
          <button
            className="border border-[#373737] bg-[#706f6f] hover:bg-[#5b5b59] w-full p-4 my-2 text-white"
            type="submit"
          >
            Login
          </button>
        </form>
        <div>
          <p className="mt-8"> Demo credentials:</p>
          <br />
          <p
            onClick={() => copyValue("demo@pos.com")}
            className="cursor-pointer"
          >
            <strong className="mr-4">Email: (Click to copy)</strong>
            demo@pos.com
          </p>
          <br />
          <p onClick={() => copyValue("admin123")} className="cursor-pointer">
            <strong className="mr-4">Password: (Click to copy)</strong>
            admin123
          </p>
          {/* <strong>Password:</strong> admin123 */}
        </div>
        {error && <p style={{ color: "red" }}>Wrong username or password</p>}
      </div>
    </div>
  );
};

export default Signin;
