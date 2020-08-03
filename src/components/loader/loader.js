import React from "react";

export default function Loader() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 mx-auto my-10">
      <div className="w-12 h-12 ease-linear border-8 border-t-8 rounded-full md:w-24 md:h-24 loader"></div>
      <div className="w-12 h-12 ease-linear border-8 border-t-8 rounded-full opacity-75 md:w-24 md:h-24 loader2"></div>
    </div>
  );
}
