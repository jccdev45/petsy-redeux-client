import React from "react";
import { Img } from "react-image";
import Loader from "../loader/loader";
import { NavLink } from "react-router-dom";

export default function Item({ item }) {
  // const {src} = useImage({
  //   srcList: item.images,
  //   loader: Loader
  // })

  return (
    <div
      className={`w-2/3 md:w-1/4 md:mx-4 flex flex-col p-4 rounded-lg shadow-lg`}
    >
      {item.images ? (
        // <img src={item.images} alt={item.name} samesite="None" secure="true" />
        <Img
          src={[item.images, "https://via.placeholder.com/150"]}
          loader={<Loader />}
          unloader="https://via.placeholder.com/150"
        />
      ) : (
        <div
          className="bg-gray-500"
          style={{ width: `218px`, height: `218px` }}
        ></div>
      )}
      {/* <span className="uppercase">{item.name}</span> */}
      <NavLink exact to={`/items/${item.id}`}>{item.name}</NavLink>
      <span>${item.price}.00</span>
    </div>
  );
}
