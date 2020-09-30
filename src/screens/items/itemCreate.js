import React, { useState } from "react";
import ItemForm from "../../components/form/itemForm";

export default function ItemCreate({ addNew }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    images: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((formData) => ({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
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
    <ItemForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
