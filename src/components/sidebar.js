import React from "react";

export default function Sidebar({
  cats,
  selectCat,
  selected,
  expanded,
  toggleExpanded,
}) {
  const catMap = () => {
    return cats.map((cat) => (
      <li
        className="p-1 shadow-sm cursor-pointer hover:bg-gray-200"
        key={cat}
        onClick={() => selectCat(cat)}
        style={selected === cat ? { backgroundColor: `lightgray` } : null}
      >
        {cat}
      </li>
    ));
  };

  return (
    <>
      <aside
        className={`${
          expanded ? `block` : `hidden`
        } fixed md:block z-10 top-0 w-1/4 min-h-screen my-12 overflow-y-auto bg-white border-r-2 border-black md:w-1/6`}
      >
        <ul className="flex flex-col justify-between">{catMap()}</ul>
      </aside>
      <button
        className={`fixed md:hidden border-r-2 -ml-3 rounded-full bg-gray-400 border-gray-500 w-6 h-6 left-0 focus:outline-none`}
        style={expanded ? { top: `50%`, marginLeft: `5rem` } : { top: `50%` }}
        onClick={() => toggleExpanded()}
      ></button>
    </>
  );
}
