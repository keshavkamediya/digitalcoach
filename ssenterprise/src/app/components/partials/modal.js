import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, visiblity, onClick, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-screen h-screen backdrop-blur-md flex items-center justify-center z-50 ${
        visiblity ? "block" : "hidden"
      }`}
    >
      <div className="p-4 bg-white rounded-3xl relative shadow-lg shadow-slate-800">
        <div className="flex items-center justify-end">
          <button
            className="bg-red-500 rounded-md p-2 text-slate-950 font-bold"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
