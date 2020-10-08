import React from "react";

const LABEL_CLASSLIST =
  "flex flex-col md:flex-row w-1/2 items-center justify-between my-2 border-b border-red-200 py-2 relative";
const INPUT_CLASSLIST = "rounded p-2 shadow-inner w-3/4";

export default function ItemForm({
  formData,
  handleChange,
  handleSubmit,
  isProfane,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-3/4 p-4 mx-auto my-2 shadow-inner md:w-2/3"
    >
      <div className="flex justify-center w-12 h-12">
        <h1
          className={`${
            isProfane ? `bg-red-400` : `underline text-red-500`
          } fixed z-50 px-16 py-2 text-xl text-white rounded uppercase`}
        >
          {isProfane ? "Watch your profamity" : "Add an Item"}
        </h1>
      </div>
      <label htmlFor="name" className={LABEL_CLASSLIST}>
        Name
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="name"
          onChange={handleChange}
          defaultValue={formData.name}
        />
      </label>
      <label htmlFor="description" className={LABEL_CLASSLIST}>
        Description
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="description"
          onChange={handleChange}
          defaultValue={formData.description}
        />
      </label>
      <label htmlFor="category" className={LABEL_CLASSLIST}>
        Category
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="category"
          onChange={handleChange}
          defaultValue={formData.category}
        />
      </label>
      <label htmlFor="price" className={LABEL_CLASSLIST}>
        Price
        <input
          className={INPUT_CLASSLIST}
          type="number"
          name="price"
          min={0}
          onChange={handleChange}
          defaultValue={formData.price}
        />
      </label>
      <label htmlFor="image1" className={LABEL_CLASSLIST}>
        Image 1
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="image1"
          onChange={handleChange}
          defaultValue={formData.image1}
        />
      </label>
      <label htmlFor="image2" className={LABEL_CLASSLIST}>
        Image 2
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="image2"
          onChange={handleChange}
          defaultValue={formData.image2}
        />
      </label>
      <label htmlFor="image3" className={LABEL_CLASSLIST}>
        Image 3
        <input
          className={INPUT_CLASSLIST}
          type="text"
          name="image3"
          onChange={handleChange}
          defaultValue={formData.image3}
        />
      </label>
      <button className="px-2 py-1 text-white bg-red-300 rounded hover:bg-red-400">
        Submit
      </button>
    </form>
  );
}
