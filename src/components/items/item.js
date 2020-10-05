import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import Carousel from "../carousel/carousel";
import ConfirmDeleteModal from "../modal/confirmDeleteModal";

const ACTIONS = {
  NEXT: "next",
  PREVIOUS: "previous",
  RESETN: "resetn",
  RESETP: "resetp",
};

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

export default function Item({ item, user, deletion }) {
  const [state, dispatch] = useReducer(carouselReducer, {
    images: [item.image1, item.image2, item.image3],
    currentIndex: 0,
    currentImage: item.image1,
  });

  const [isOpen, toggleIsOpen] = useState(false);

  const openModal = () => {
    toggleIsOpen(!isOpen);
  };

  const renderModal = () => {
    if (isOpen) {
      return (
        <ConfirmDeleteModal
          item={item}
          openModal={openModal}
          deletion={deletion}
        />
      );
    }
  };

  const prevClick = () => {
    if (state.currentIndex === 0) {
      return dispatch({ type: ACTIONS.RESETP });
    } else {
      return dispatch({ type: ACTIONS.PREVIOUS });
    }
  };

  const nextClick = () => {
    if (state.currentIndex === 2) {
      return dispatch({ type: ACTIONS.RESETN });
    } else {
      return dispatch({ type: ACTIONS.NEXT });
    }
  };

  return (
    <div
      className={`w-2/3 md:w-1/4 md:mx-4 flex flex-col p-4 rounded-lg shadow-lg`}
    >
      <Carousel state={state} prevClick={prevClick} nextClick={nextClick} />

      <Link to={`/items/${item.id}`}>{item.name}</Link>
      <span>${item.price}.00</span>

      {user && user.id === item.user_id ? (
        <div className="flex items-center justify-evenly">
          <Link
            className="px-4 py-1 bg-red-300 rounded"
            to={`/items/${item.id}/edit`}
          >
            Edit
          </Link>
          <button className="px-3 py-1 bg-red-300 rounded" onClick={openModal}>
            Delete
          </button>
          {isOpen ? renderModal() : null}
        </div>
      ) : null}
    </div>
  );
}
