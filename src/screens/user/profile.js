import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import Loader from "../../components/loader/loader";
import ItemPreview from "../../components/modal/itemPreview";
import View from "../../components/view/view";
import { DATA_ACTIONS } from "../../util/constants/constants";
import { useAuth } from "../../util/hooks/useAuth";
import { getUserItems } from "../../util/user/userMethods";

function userReducer(state, action) {
  switch (action.type) {
    case DATA_ACTIONS.REQUEST: {
      return {
        isLoading: true,
        data: [],
      };
    }
    case DATA_ACTIONS.GET_DATA: {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    }
    case DATA_ACTIONS.ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        data: [],
      };
    }
    default:
      return state;
  }
}

// const user = JSON.parse(localStorage.getItem("user"));

export default function Profile() {
  const auth = useAuth()
  const [isOpen, setisOpen] = useState(false);
  const [state, dispatch] = useReducer(userReducer, {
    isLoading: true,
    data: [],
  });
  const { data, isLoading, error } = state;
  const user = auth.state.user

  useEffect(() => {
    // const cancelToken = axios.CancelToken.source();
    dispatch({ type: DATA_ACTIONS.REQUEST });

    const fetchData = async () => {
      const res = await getUserItems(user.id);
      dispatch({ type: DATA_ACTIONS.GET_DATA, payload: { data: res } });
    };

    fetchData().catch((e) => {
      dispatch({ type: DATA_ACTIONS.ERROR, payload: { error: e } });
    });
  }, []);

  const toggleOpen = () => {
    setisOpen(!isOpen);
  };

  const renderData = () => {
    if (data && data.length) {
      return data.map((item) => (
        <React.Fragment key={item.id}>
          <button
            className="px-3 py-2 mx-2 bg-red-200 rounded focus:outline-none"
            onClick={() => toggleOpen()}
          >
            {item.name}
          </button>
          <ItemPreview
            item={item}
            isOpen={isOpen}
            toggleOpen={() => toggleOpen()}
          />
        </React.Fragment>
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
