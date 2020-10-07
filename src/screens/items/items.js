import React from "react";
import Item from "../../components/items/item";
import Loader from "../../components/loader/loader";

export default function Items({ items, loading, error, user, deletion }) {
  // const [isOpen, toggleIsOpen] = useState(false);

  // const confirmDelete = () => {
  //   toggleIsOpen(!isOpen);
  // };

  const showData = () => {
    // let filtered = items.filter((item) =>
    //   item.category === selected ? item : null
    // );

    return items
      .map((item) => (
        <Item key={item.id} user={user} item={item} deletion={deletion} />
      ))
      .reverse();
  };

  return (
    <div className="flex flex-wrap justify-center mx-auto md:w-11/12">
      {loading && <Loader size="xl" />}
      {showData()}
      {error && <h1>refresh</h1>}
    </div>
  );
}
