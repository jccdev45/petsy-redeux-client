import React from "react";
import Item from "./item";


export default function Items({ items, expanded, selected }) {
  const showData = () => {
    let filtered = items.filter((item) =>
      item.category === selected ? item : null
    );

    return filtered.map((item) => (
      <Item key={item.id} item={item} expanded={expanded} />
    ));
  };

  return (
    <div className={`flex flex-wrap justify-center md:w-5/6 md:ml-48 h-full`}>
      {showData()}
    </div>
  );
}
