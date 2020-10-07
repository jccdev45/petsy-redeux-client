import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../../components/loader/loader";
import Carousel from "../../components/carousel/carousel";
import { getItemById } from "../../util/items/itemMethods";
import View from "../../components/view/view";

export default function ItemDetails() {
  const [item, setItem] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const getDetails = async () => {
      await getItemById(id)
        .then((res) => setItem(res), setIsLoading(false))
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(e);
        });
    };
    getDetails();
    return () => {
      cancelToken.cancel();
    };
  }, [id]);

  const itemDetailRender = () => (
    <div className="flex flex-col w-full p-4 rounded-lg md:flex-row">
      <div className="w-1/2 p-4 shadow-lg">
        <Carousel item={item} height="h-auto" />
      </div>
      <div className="w-5/12 px-2">
        <h1 className="my-2 text-2xl">{item.name}</h1>
        <h2 className="my-1 text-xl"><span className="text-red-400">Category: </span>{item.category}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  );

  return (
    <View
      class="flex flex-col items-center justify-center w-full mx-auto md:w-5/6"
      // title={`${item && item.name}`}
    >
      {isLoading && <Loader />}
      {item && itemDetailRender()}
      {error && <h1>refresh</h1>}
    </View>
  );
}
