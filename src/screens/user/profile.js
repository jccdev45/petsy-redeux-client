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
    <View class="flex sm:flex-col w-5/6 mx-auto h-full md:p-4 rounded">
      {error && <h1>There was an error, please refresh</h1>}
      {user && (
        <div className="flex flex-col w-full md:flex-row">
          <div className="flex flex-row items-center w-full m-4 md:w-1/3 md:flex-col md:mr-4">
            <img
              src={user.picture ? user.picture : "https://placehold.it/300"}
              alt="User"
              className="w-24 h-auto rounded-full md:w-64"
            />
            <div className="flex flex-col mx-4">
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
          </div>

          <div className="flex flex-col justify-start w-full px-3 py-2 shadow-inner">
            <h1 className="text-2xl">Your items:</h1>
            <div className="flex flex-wrap items-center w-2/3 py-2">
              {isLoading ? <Loader /> : renderData()}
            </div>
          </div>
        </div>
      )}
    </View>
  );
}
