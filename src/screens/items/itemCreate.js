import React, { useState } from "react";
import ItemForm from "../../components/form/itemForm";

let Filter = require("bad-words");
let filter = new Filter();

export default function ItemCreate({ addNew }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    images: "",
  });
  const [isProfane, setIsProfane] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (filter.isProfane(value)) {
      setIsProfane(true);
    } else {
      setIsProfane(false);
      setFormData((formData) => ({
        ...formData,
        [name]: type === "number" ? parseInt(value, 10) : value,
      }));
    }
  };

  const verify = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value != "number" && value.length === 0) {
        console.log(`${key} field cannot be blank`);
      }
      if (filter.isProfane(value)) {
        setIsProfane(true);
      }
    }
    // const formValues = Object.values(formData);
    // return formValues.forEach(value => {
    //   if (typeof(value) != 'number' && value.length === 0) {
    //     console.log("Field cannot be blank.")
    //   }
    // })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addNew(formData);
    setFormData({
      name: "",
      category: "",
      description: "",
      price: 0,
      images: "",
    });
  };

  return (
    <>
      {/* <button onClick={verify}>Verify</button> */}
      <ItemForm
        isProfane={isProfane}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
