import React from "react";
import View from "../view/view";

export default function ConfirmDeleteModal({ item, openModal, deletion }) {
  return (
    <View
      class="fixed top-0 left-0 w-screen h-screen"
      viewStyle={{
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        display: `grid`,
        placeItems: `center`,
      }}
    >
      <div className="w-1/3 p-12 bg-white rounded shadow">
        <span className="flex flex-col justify-between">
          <h1 className="font-bold text-center text-red-500">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </h1>
          <span className="flex items-center justify-center">
            <button
              className="px-3 py-1 mx-2 bg-red-300 rounded"
              onClick={openModal}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 mx-2 bg-red-500 rounded"
              onClick={() => deletion(item.id)}
            >
              Delete
            </button>
          </span>
        </span>
      </div>
    </View>
  );
}
