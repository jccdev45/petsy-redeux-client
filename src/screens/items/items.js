import React from "react";
import Item from "../../components/items/item";
import Loader from "../../components/loader/loader";
import View from "../../components/view/view";

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
    <View class="flex flex-wrap justify-center mx-auto md:w-11/12">
      {loading && <Loader size="xl" />}
      {showData()}
      {error && <h1>refresh</h1>}
    </View>
  );
}
