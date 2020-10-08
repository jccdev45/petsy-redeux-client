import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ItemForm from "../../components/form/itemForm";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function ItemEdit() {
  const data = useFetchData();
  const {
    items,
    name,
    category,
    description,
    price,
    image1,
    image2,
    image3,
  } = data.state;
  const formData = {
    name,
    category,
    description,
    price,
    image1,
    image2,
    image3,
  };
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const doTheThing = () => {
      const anItem = items.find((item) => item.id === Number(id));
      data.dispatch({
        type: "set_item",
        payload: {
          name: anItem.name,
          category: anItem.category,
          description: anItem.description,
          price: anItem.price,
          image1: anItem.image1,
          image2: anItem.image2,
          image3: anItem.image3,
        },
      });
    };

    if (items) {
      doTheThing();
    }
  }, [id, items]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    data.dispatch({
      type: "input",
      fieldName: name,
      payload: { value: type === "number" ? parseInt(value, 10) : value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data.updateItem(id, formData);
  };

  return (
    <ItemForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
