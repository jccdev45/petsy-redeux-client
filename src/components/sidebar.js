import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "../util/hooks/useFetchData";

export default function Sidebar() {
  const [isExpanded, setExpanded] = useState(false);

  const data = useFetchData();
  const { items, itemsByCat } = data.state;
  let selected = itemsByCat[0] || { category: "" };

  const cats = items.map((item) => item.category);

  const categories = [...cats, "All"].sort().filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

  const catMap = () => {
    return categories.map((cat) => (
      <Link
        className="px-2 py-3 my-2 shadow-sm cursor-pointer hover:bg-gray-200"
        key={cat}
        to={cat === "All" ? `/items` : `/items/for/${cat}`}
        style={
          cat === selected.category ? { backgroundColor: `lightgray` } : null
        }
      >
        {cat}
      </Link>
    ));
  };

  return (
    <>
      <aside
        className={`${
          isExpanded ? `block` : `hidden`
        } fixed md:block z-20 top-0 w-1/6 mt-16 pt-2 overflow-y-auto bg-white border-r-2 border-red-200 md:h-screen`}
      >
        <ul className="flex flex-col justify-between">
          {categories && catMap()}
        </ul>
      </aside>
      <button
        className="fixed left-0 z-10 w-6 h-6 -ml-3 bg-red-300 border-r-2 border-red-500 rounded-full md:hidden focus:bg-red-300 focus:outline-none"
        style={isExpanded ? { top: `33%`, marginLeft: `5rem` } : { top: `33%` }}
        onClick={() => toggleExpanded()}
      ></button>
    </>
  );
}
