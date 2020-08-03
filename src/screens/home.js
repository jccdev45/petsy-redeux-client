import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Items from "../components/items/items";

export default function Home({ items, loading, error }) {
  const [selected, setSelected] = useState("Kids");
  const [expanded, setExpanded] = useState(false);

  const cats = items
    .map((item) => item.category)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const selectCat = (e) => {
    setSelected(e);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <section className="flex">
      <Sidebar
        cats={cats}
        selectCat={selectCat}
        selected={selected}
        expanded={expanded}
        toggleExpanded={toggleExpanded}
      />
      {loading && <h1>loading...</h1>}
      <Items items={items} expanded={expanded} selected={selected} />
      {error && <h1>refresh</h1>}
    </section>
  );
}
