import React from "react";

export function Button({ handleClick, extraClass, children }) {
  return (
    <button className={`button ${extraClass}`} onClick={handleClick}>
      {children}
    </button>
  );
}
