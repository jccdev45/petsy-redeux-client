import React, { useState } from "react";
import { FcRating } from "react-icons/fc";
import { Link } from "react-router-dom";
import Carousel from "../carousel/carousel";
import ConfirmDeleteModal from "../modal/confirmDeleteModal";

export default function Item({ item, user, deletion }) {
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

  const renderStars = () => {
    let ratings = [];
    let i = 1;
    while (i <= item.rating) {
      i++;
      ratings.push(<FcRating key={i} />);
    }
    return <div className="flex items-center">{ratings}</div>;
  };

  const renderEditDelete = () => (
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
  );

  return (
    <article
      className="flex flex-col w-2/3 p-4 rounded-lg shadow-lg md:w-1/4 md:mx-4"
      style={{ minWidth: `325px` }}
    >
      <Carousel item={item} size="318px" />

      <div className="flex items-center justify-between md:text-lg">
        <Link
          to={`/items/${item.id}`}
          className="text-red-300 underline hover:text-red-400"
        >
          {item.name}
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-green-500">$</span>
          <span className="mx-1 bold">{item.price}.00</span>
        </div>

        {item.rating ? renderStars() : <span>No Ratings Yet</span>}
      </div>

      {user && user.id === item.user_id ? renderEditDelete() : null}
    </article>
  );
}
