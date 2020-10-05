import React, { useState } from "react";
import { Img } from "react-image";
// import Loader from "../loader/loader";
import { Link } from "react-router-dom";
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

  return (
    <div
      className={`w-2/3 md:w-1/4 md:mx-4 flex flex-col p-4 rounded-lg shadow-lg`}
    >
      <div className="overflow-hidden">
        <Img
          src={[item.images, "https://via.placeholder.com/150"]}
          // loader={<Loader />}
          className="item-img"
          unloader="https://via.placeholder.com/150"
        />
      </div>

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
