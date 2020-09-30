import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import SecondaryRoutes from "../routes/secondaryRoutes";

import {
  addItem,
  deleteItem,
  editItem,
  getItems,
} from "../util/items/itemMethods";

export default function Home({ user }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchData = async () => {
      await getItems()
        .then((res) => setItems(res), setIsLoading(false))
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(e);
        });
    };
    fetchData();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  // const [selected, setSelected] = useState("Kids");
  // const [expanded, setExpanded] = useState(false);

  // const cats = items
  //   .map((item) => item.category)
  //   .filter((value, index, self) => {
  //     return self.indexOf(value) === index;
  //   });

  // const selectCat = (e) => {
  //   setSelected(e);
  // };

  // const toggleExpanded = () => {
  //   setExpanded(!expanded);
  // };

  const updateItem = async (id, data) => {
    const updated = await editItem(id, data);
    setItems((items) =>
      items.map((item) => (item.id === Number(id) ? updated : item))
    );
    history.push("/");
  };

  const addNewItem = async (data) => {
    const newItem = await addItem(data);
    setItems((items) => [...items, newItem]);
    history.push("/");
  };

  const deletion = async (id) => {
    await deleteItem(id);
    setItems((items) => items.filter((item) => item.id !== id));
    history.push("/");
  };

  return (
    <section className="flex">
      {/* <Sidebar
        cats={cats}
        selectCat={selectCat}
        selected={selected}
        expanded={expanded}
        toggleExpanded={toggleExpanded}
      /> */}
      <SecondaryRoutes
        user={user}
        items={items}
        loading={isLoading}
        error={error}
        update={updateItem}
        addNew={addNewItem}
        deletion={deletion}
      />
    </section>
  );
}
