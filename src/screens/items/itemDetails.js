import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { getItemById } from "../../util/items/itemMethods";
import Loader from "../../components/loader/loader";

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
    <div>
      <div className="flex">
        {item.images ? (
          <img
            src={item.images}
            alt={item.name}
            className="p-1 pb-2 border-2 border-black shadow-lg"
          />
        ) : (
          <div
            style={{ width: `500px`, height: `500px`, backgroundColor: `gray` }}
          ></div>
        )}
        <span>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-3/4 mx-auto md:w-2/3">
      {isLoading && <Loader />}
      {item && itemDetailRender()}
      {error && <h1>refresh</h1>}
    </div>
  );
}
