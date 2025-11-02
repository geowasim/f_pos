import React from "react";

const LogoFooter = () => {
  return (
    <div className="cartLogo mt-6 flex flex-col items-center">
      <img
        src="https://i.ibb.co/fVtHjzH5/Logo.png"
        alt="my logo"
        className="w-24"
      />
      <div className="copyRights text-xs text-gray-500 mt-1">
        <p>
          Copyright <span>&copy;</span> reserved My company -{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default LogoFooter;
