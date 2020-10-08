import React, { useReducer, useEffect, useContext, createContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { DATA_ACTIONS } from "../constants/constants";
import { addItem, deleteItem, editItem, getItems } from "../items/itemMethods";

function reducer(state, action) {
  switch (action.type) {
    case DATA_ACTIONS.INITIAL_REQUEST:
      return { loading: true, items: [] };
    case DATA_ACTIONS.REQUEST:
      return { loading: true };
    case DATA_ACTIONS.INPUT: {
      return {
        ...state,
        [action.fieldName]: action.payload.value,
      };
    }
    case DATA_ACTIONS.SET_ITEM: {
      return {
        ...state,
        name: action.payload.name,
        category: action.payload.category,
        description: action.payload.description,
        price: action.payload.price,
        image1: action.payload.image1,
        image2: action.payload.image2,
        image3: action.payload.image3,
      };
    }
    case DATA_ACTIONS.GET_DATA:
      return { ...state, loading: false, items: action.payload.items };
    case DATA_ACTIONS.ADD_DATA:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload.items],
      };
    case DATA_ACTIONS.DELETE_DATA:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case DATA_ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    default:
      return state;
  }
}

const initialState = {
  error: "",
  isLoading: true,
  items: [],
  name: "",
  category: "",
  description: "",
  price: 0,
  image1: "",
  image2: "",
  image3: "",
};

const dataContext = createContext();

export function ProviderData({ children }) {
  const items = useProviderData();
  return <dataContext.Provider value={items}>{children}</dataContext.Provider>;
}

export const useFetchData = () => {
  return useContext(dataContext);
};

export default function useProviderData() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: DATA_ACTIONS.INITIAL_REQUEST });

    const fetchData = async () => {
      await getItems()
        .then((res) =>
          dispatch({ type: DATA_ACTIONS.GET_DATA, payload: { items: res } })
        )
        .catch((error) => {
          if (axios.isCancel(error)) return;
          dispatch({ type: DATA_ACTIONS.ERROR, payload: { error: error } });
        });
    };
    fetchData();

    return () => {
      cancelToken.cancel();
    };
  }, []);

  const addNewItem = async (data) => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: DATA_ACTIONS.REQUEST });

    try {
      const newItem = await addItem(data);
      dispatch({ type: DATA_ACTIONS.UPDATE_DATA, payload: { items: newItem } });
    } catch (error) {
      if (axios.isCancel(error)) return;
      dispatch({ type: DATA_ACTIONS.ERROR, payload: { error: error } });
    }
    history.push("/");

    return () => {
      cancelToken.cancel();
    };
  };

  const updateItem = async (id, data) => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: DATA_ACTIONS.REQUEST });

    try {
      const updated = await editItem(id, data);
      dispatch({
        type: DATA_ACTIONS.GET_DATA,
        payload: {
          items: state.items.map((item) =>
            item.id === Number(id) ? updated : item
          ),
        },
      });
    } catch (error) {
      if (axios.isCancel(error)) return;
      dispatch({ type: DATA_ACTIONS.ERROR, payload: { error: error } });
    }
    history.push("/");

    return () => {
      cancelToken.cancel();
    };
  };

  const deletion = async (id) => {
    dispatch({ type: DATA_ACTIONS.REQUEST });

    try {
      await deleteItem(id);
      dispatch({ type: DATA_ACTIONS.DELETE_DATA, payload: { id: id } });
    } catch (error) {
      dispatch({ type: DATA_ACTIONS.ERROR, payload: { error: error } });
    }
    history.push("/");
  };

  return { state, dispatch, updateItem, addNewItem, deletion };
}
