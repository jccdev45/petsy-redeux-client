import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

export default function Carousel({ state, prevClick, nextClick }) {
  const { currentImage, images, currentIndex } = state;
  return (
    <div className="relative overflow-hidden">
      <button
        className="absolute left-0 z-50 p-1 bg-gray-200 rounded opacity-50 hover:bg-white hover:opacity-75"
        style={{ top: `50%` }}
      >
        <FcPrevious name="prev" onClick={() => prevClick()} />
      </button>
      <div
        className="object-cover object-center w-full h-64 bg-gray-300 item-img"
        style={{ backgroundImage: `url("${currentImage}")` }}
      >
        <div className="absolute bottom-0 flex items-center justify-center w-full mb-1">
          {images.map((img, index) => (
            <button
              key={index}
              about={img}
              className={`w-3 mx-1 h-3 bg-gray-400 rounded-full ${
                index === currentIndex ? `bg-gray-600` : ``
              }`}
            />
          ))}
        </div>
      </div>
      <button
        className="absolute right-0 z-50 p-1 bg-gray-200 rounded opacity-75 hover:bg-white hover:"
        style={{ top: `50%` }}
      >
        <FcNext name="next" onClick={() => nextClick()} />
      </button>
    </div>
  );
}
