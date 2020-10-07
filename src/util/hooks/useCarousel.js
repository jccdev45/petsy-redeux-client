import { useReducer } from "react";
import { ACTIONS } from "../constants/constants";

function carouselReducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEXT: {
      return {
        ...state,
        currentImage: state.images[state.currentIndex + 1],
        currentIndex: state.currentIndex + 1,
      };
    }
    case ACTIONS.PREVIOUS: {
      return {
        ...state,
        currentImage: state.images[state.currentIndex - 1],
        currentIndex: state.currentIndex - 1,
      };
    }
    case ACTIONS.RESETN: {
      return {
        ...state,
        currentImage: state.images[0],
        currentIndex: 0,
      };
    }
    case ACTIONS.RESETP: {
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

export default function useCarousel(item) {
  const [state, dispatch] = useReducer(carouselReducer, {
    images: [item.image1, item.image2, item.image3],
    currentIndex: 0,
    currentImage: item.image1,
  });

  return state, dispatch;
}
