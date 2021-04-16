import React, { useReducer } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { CAROUSEL_ACTIONS } from "../../util/constants/constants";

function carouselReducer(state, action) {
  switch (action.type) {
    case CAROUSEL_ACTIONS.SET: {
      return {
        ...state,
        currentImage: state.images[action.payload.index],
        currentIndex: action.payload.index,
      };
    }
    case CAROUSEL_ACTIONS.NEXT: {
      return {
        ...state,
        currentImage: state.images[state.currentIndex + 1],
        currentIndex: state.currentIndex + 1,
      };
    }
    case CAROUSEL_ACTIONS.PREVIOUS: {
      return {
        ...state,
        currentImage: state.images[state.currentIndex - 1],
        currentIndex: state.currentIndex - 1,
      };
    }
    case CAROUSEL_ACTIONS.RESETN: {
      return {
        ...state,
        currentImage: state.images[0],
        currentIndex: 0,
      };
    }
    case CAROUSEL_ACTIONS.RESETP: {
      return {
        ...state,
        currentImage: state.images[2],
        currentIndex: 2,
      };
    }
    default:
      return;
  }
}

export default function Carousel({ item, size }) {
  const [state, dispatch] = useReducer(carouselReducer, {
    images: [item.image1, item.image2, item.image3],
    currentIndex: 0,
    currentImage: item.image1,
  });

  const prevClick = () => {
    if (state.currentIndex === 0) {
      return dispatch({ type: CAROUSEL_ACTIONS.RESETP });
    } else {
      return dispatch({ type: CAROUSEL_ACTIONS.PREVIOUS });
    }
  };

  const nextClick = () => {
    if (state.currentIndex === 2) {
      return dispatch({ type: CAROUSEL_ACTIONS.RESETN });
    } else {
      return dispatch({ type: CAROUSEL_ACTIONS.NEXT });
    }
  };

  return (
    <div className={`relative w-full overflow-hidden`}>
      <button
        className="absolute left-0 p-1 bg-gray-200 rounded opacity-50 focus:outline-none hover:bg-white hover:opacity-75"
        style={{ top: `50%` }}
        onClick={() => prevClick()}
        name="prev"
      >
        <FcPrevious className="text-xl" />
      </button>
      <div className="mx-auto bg-gray-500">
        <img
          src={state.currentImage}
          alt=""
          className="object-cover object-center max-w-full"
          style={{ height: size }}
        />
      </div>
      <div className="absolute bottom-0 flex items-center justify-center w-full mx-auto mb-1">
        {state.images.map((img, index) => {
          return img.length ? (
            <button
              key={index}
              about={img}
              onClick={() =>
                dispatch({ type: CAROUSEL_ACTIONS.SET, payload: { index } })
              }
              className={`w-3 mx-1 h-3 bg-gray-400 rounded-full focus:outline-none ${
                index === state.currentIndex ? `bg-gray-600` : ``
              }`}
            />
          ) : null;
        })}
      </div>

      <button
        className="absolute right-0 p-1 bg-gray-200 rounded opacity-75 hover:bg-white hover:"
        style={{ top: `50%` }}
        name="next"
        onClick={() => nextClick()}
      >
        <FcNext className="text-xl" />
      </button>
    </div>
  );
}
