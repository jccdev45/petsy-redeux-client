import React from "react";

export default function Loader({ size }) {
  const dimensionRender = () => {
    if (size == "xl") {
      return "w-32 h-32 md:w-64 md:h-64";
    } else {
      return "w-12 h-12 md:w-24 md:h-24";
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 mx-auto my-10">
      <div
        className={`${dimensionRender()} ease-linear border-8 border-t-8 rounded-full loader`}
      ></div>
      <div
        className={`${dimensionRender()} ease-linear border-8 border-t-8 rounded-full loader2`}
      ></div>
    </div>
  );
}
