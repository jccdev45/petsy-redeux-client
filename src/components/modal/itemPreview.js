import React from "react";
import { Link } from "react-router-dom";

export default function ItemPreview({ item, isOpen, toggleOpen }) {
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className={`fixed w-screen h-screen top-0 z-20 left-0 ${
        isOpen ? `block` : `hidden`
      }`}
    >
      <div className="z-30 flex flex-col items-center justify-around w-3/4 h-64 mx-auto my-20 bg-red-200 md:w-1/3">
        <span className="flex">
          Click for
          <Link
            to={`/items/${item.id}`}
            className="mx-2 text-red-300 underline hover:text-red-400"
          >
            {item.name}
          </Link>
          details
        </span>
        <button
          onClick={toggleOpen}
          className="px-3 py-2 bg-red-200 rounded focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}
