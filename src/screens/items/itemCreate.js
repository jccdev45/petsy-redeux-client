import React, { useState } from "react";
import ItemForm from "../../components/form/itemForm";
import { useFetchData } from "../../util/hooks/useFetchData";

let Filter = require("bad-words");
let filter = new Filter();

export default function ItemCreate() {
  const data = useFetchData();
  const {
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
  const [isProfane, setIsProfane] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (filter.isProfane(value)) {
      setIsProfane(true);
    } else {
      setIsProfane(false);
      data.dispatch({
        type: "input",
        fieldName: name,
        payload: { value: type === "number" ? parseInt(value, 10) : value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // return isProfane
    //   ? alert("Watch your profamity")
    //   : data.addNewItem(formData)
    if (isProfane) {
      return alert("Watch your profamity!");
    } else {
      return data.addNewItem(formData), data.dispatch({ type: "reset" });
    }
  };

  return (
    <>
      <ItemForm
        type="Add"
        isProfane={isProfane}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
