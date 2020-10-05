import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router";
import Layout from "./shared/layout";
import InitialRoutes from "./routes/initialRoutes";
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from "./util/auth/auth";

const ACTIONS = {
  LOGINREGISTER: "loginregisterverify",
  VERIFY: "verify",
  SUCCESS: "success",
  ERROR: "error",
  LOGOUT: "logout",
  INPUT: "input",
};

function loginReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INPUT: {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case ACTIONS.VERIFY: {
      return {
        ...state,
        user: action.payload.data,
        isLoggedIn: true,
      };
    }
    case ACTIONS.LOGINREGISTER: {
      return {
        ...state,
        error: "",
        isLoading: true,
        username: "",
        email: "",
        password: "",
      };
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: action.payload.data,
      };
    }
    case ACTIONS.ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false,
        isLoading: false,
        username: "",
        email: "",
        password: "",
      };
    }
    case ACTIONS.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return;
  }
}

const initialState = {
  user: null,
  username: "",
  email: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const history = useHistory();

  useEffect(() => {
    const doAVerify = async () => {
      try {
        const user = await verifyUser();
        dispatch({
          type: ACTIONS.VERIFY,
          payload: { data: user },
        });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, payload: error });
      }
    };
    doAVerify();
  }, []);

  const login = async (data) => {
    dispatch({ type: ACTIONS.LOGINREGISTER });
    try {
      const user = await loginUser(data);
      dispatch({ type: ACTIONS.SUCCESS, payload: { data: user } });
      history.push("/");
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, payload: error });
    }
  };

  const register = async (data) => {
    dispatch({ type: ACTIONS.LOGINREGISTER });
    try {
      const user = await registerUser(data);
      dispatch({ type: ACTIONS.SUCCESS, payload: { data: user } });
      history.push("/");
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, payload: error });
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    removeToken();

    dispatch({ type: ACTIONS.LOGOUT });

    history.push("/");
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Layout user={state.user} logout={logout}>
          <InitialRoutes user={state.user} login={login} register={register} />
        </Layout>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
