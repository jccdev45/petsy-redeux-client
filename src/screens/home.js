import React from "react";
import Loader from "../components/loader/loader";
import View from "../components/view/view";
import { useFetchData } from "../util/hooks/useFetchData";
import Items from "./items/items";

export default function Home() {
  const data = useFetchData();
  const { items, isLoading, error } = data.state;

  // TODO: refactor into landing page, currently duplicate item-related code in items.js
  return (
    <View class="flex">
      {isLoading && <Loader />}
      {items && (
        <Items />
      )}
      {error && <h1>do a refresh</h1>}
    </View>
  );
}
