import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader";
import View from "../../components/view/view";
import { LS_STRINGS } from "../../util/constants/constants";
import { useAuth } from "../../util/hooks/useAuth";
import { useFetchData } from "../../util/hooks/useFetchData";

export default function Profile() {
  const auth = useAuth();
  const user = auth.state.user;
  const userLS = JSON.parse(localStorage.getItem(LS_STRINGS.LS_USER));

  const data = useFetchData();
  const { userItems, isLoading, error } = data.state;

  useEffect(() => {
    data.fetchUserItems(userLS.id);
  }, []);

  const renderData = () => {
    if (userItems && userItems.length) {
      return userItems.map((item) => (
        <Link
          key={item.id}
          to={`/items/${item.id}`}
          className="px-3 py-2 mx-2 bg-red-200 rounded focus:outline-none"
        >
          {item.name}
        </Link>
      ));
    }
  };

  return (
    <View class="flex md:flex-col w-5/6 mx-auto shadow-inner h-full p-4 rounded">
      {isLoading && <Loader />}
      {error && <h1>There was an error, please refresh</h1>}
      {user && (
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-1/3">
            <img
              src={user.picture}
              alt="User"
              className="w-64 h-64 rounded-full"
            />
            <h1 className="text-2xl">{user.username}</h1>
            <h2>
              Email:{" "}
              <a
                href={`mailto:${user.email}`}
                className="text-blue-400 underline"
              >
                {user.email}
              </a>
            </h2>
          </div>
          <div className="relative flex flex-wrap items-center w-2/3">
            {renderData()}
          </div>
        </div>
      )}
    </View>
  );
}
