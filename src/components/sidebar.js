import React from "react";
import { Link } from "react-router-dom";
import { useFetchData } from "../util/hooks/useFetchData";

export default function Sidebar({ isExpanded, toggleExpanded }) {
  const data = useFetchData();
  const { items, itemsByCat } = data.state;
  let selected = itemsByCat[0] || { category: "" };

  const cats = items.map((item) => item.category);

  const categories = [...cats, "All"].sort().filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const catMap = () => {
    return categories.map((cat) => (
      <Link
        className="px-2 py-3 my-2 shadow-sm cursor-pointer hover:bg-gray-200"
        key={cat}
        to={cat === "All" ? `/items` : `/items/for/${cat}`}
        style={
          cat === selected.category ? { backgroundColor: `lightgray` } : null
        }
        onClick={toggleExpanded}
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
        } fixed md:block z-20 top-0 w-1/3 md:w-1/6 h-full mt-16 pt-2 overflow-y-auto bg-white border-r-2 border-red-200 md:h-screen`}
      >
        <ul className="flex flex-col justify-between">
          {categories && catMap()}
        </ul>
      </aside>
      <button
        className="fixed left-0 z-10 w-8 h-8 -ml-4 bg-red-300 rounded-full md:hidden focus:bg-red-300 focus:outline-none"
        style={{ top: `50%` }}
        onClick={() => toggleExpanded()}
      ></button>
    </>
  );
}
