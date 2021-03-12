import React from "react";
import Hero from "../components/hero/hero";
import Loader from "../components/loader/loader";
import View from "../components/view/view";
import { useFetchData } from "../util/hooks/useFetchData";
import Items from "./items/items";

export default function Home() {
  const data = useFetchData();
  const { items, isLoading, error } = data.state;

  // TODO: refactor into landing page, currently duplicate item-related code in items.js
  return (
    <View class="flex flex-col items-center justify-center pt-24 md:w-5/6 mx-auto">
      {isLoading && <Loader />}
      <Hero />
      {items && (
        <Items />
      )}
      {error && <h1>do a refresh</h1>}
    </View>
  );
}
