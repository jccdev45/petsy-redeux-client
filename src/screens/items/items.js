import React from "react";
// import { Img } from "react-image";
// import { Link } from "react-router-dom";
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
        <Item
          key={item.id}
          user={user}
          item={item}
          deletion={deletion}
          // isOpen={isOpen}
          // confirmDelete={confirmDelete}
        />
        // <div
        //   key={item.id}
        //   className={`w-2/3 md:w-1/4 md:mx-4 flex flex-col p-4 rounded-lg shadow-lg`}
        // >
        //   <div className="overflow-hidden">
        //     <Img
        //       src={[item.images, "https://via.placeholder.com/150"]}
        //       // loader={<Loader />}
        //       className="item-img"
        //       unloader="https://via.placeholder.com/150"
        //     />
        //   </div>

        //   <Link to={`/items/${item.id}`}>{item.name}</Link>
        //   <span>${item.price}.00</span>
        //   {user && user.id === item.user_id ? (
        //     <div className="flex items-center justify-evenly">
        //       {isOpen ? (
        //         <>
        //           <button
        //             className="px-4 py-1 bg-red-300 rounded"
        //             onClick={confirmDelete}
        //           >
        //             Cancel
        //           </button>
        //           <button
        //             className="px-3 py-1 bg-red-300 rounded"
        //             onClick={() => deletion(item.id)}
        //           >
        //             Delete
        //           </button>
        //         </>
        //       ) : (
        //         <>
        //           <Link
        //             className="px-4 py-1 bg-red-300 rounded"
        //             to={`/items/${item.id}/edit`}
        //           >
        //             Edit
        //           </Link>
        //           <button
        //             className="px-3 py-1 bg-red-300 rounded"
        //             onClick={confirmDelete}
        //           >
        //             Delete
        //           </button>
        //         </>
        //       )}
        //     </div>
        //   ) : null}
        // </div>
      ))
      .reverse();
  };

  return (
    <div className={`flex flex-wrap justify-center md:w-5/6 md:ml-48 h-full`}>
      {loading && <Loader size="xl" />}
      {showData()}
      {error && <h1>refresh</h1>}
    </div>
  );
}
