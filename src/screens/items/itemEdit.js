import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemForm from "../../components/form/itemForm";

export default function ItemEdit({ items, update }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    images: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const doTheThing = () => {
      const anItem = items.find((item) => item.id === Number(id));
      setFormData({
        name: anItem.name,
        category: anItem.category,
        description: anItem.description,
        price: anItem.price,
        images: anItem.images,
      });
    };

    if (items.length) {
      doTheThing();
    }
  }, [id, items]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(id, formData);
  };

  return (
    <ItemForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
