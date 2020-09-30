import React from "react";

const LABEL_CLASSLIST = "flex flex-col md:flex-row w-1/2 items-center justify-between my-2";
const INPUT_CLASSLIST = "rounded p-2 shadow-inner w-3/4";

export default function ItemForm({ formData, handleChange, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-3/4 p-4 mx-auto my-2 shadow-inner md:w-2/3"
    >
      <label htmlFor="name" className={LABEL_CLASSLIST}>
        Name
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </label>
      <label htmlFor="description" className={LABEL_CLASSLIST}>
        Description
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </label>
      <label htmlFor="category" className={LABEL_CLASSLIST}>
        Category
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="category"
          onChange={handleChange}
          value={formData.category}
        />
      </label>
      <label htmlFor="price" className={LABEL_CLASSLIST}>
        Price
        <input
          className={INPUT_CLASSLIST}
          type="number"
          name="price"
          onChange={handleChange}
          value={formData.price}
        />
      </label>
      <label htmlFor="images" className={LABEL_CLASSLIST}>
        Images
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="images"
          onChange={handleChange}
          value={formData.images}
        />
      </label>
      <button className="px-2 py-1 text-white bg-red-300 rounded hover:bg-red-400">
        Submit
      </button>
    </form>
  );
}
