import React, { useEffect, useReducer } from "react";
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
  LOGIN: "login",
  VERIFY_USER: "verify_user",
  VERIFY_FIELD: "verify_field",
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
    case ACTIONS.VERIFY_USER: {
      return {
        ...state,
        user: action.payload.data,
        isLoggedIn: true,
      };
    }
    case ACTIONS.LOGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ACTIONS.VERIFY_FIELD: {
      if (Object.values(state).map((value) => value === "")) {
        return {
          ...state,
          error: "Field(s) cannot be blank",
          isLoading: false,
        };
      } else if (state.password != state.confirmPassword) {
        return {
          ...state,
          error: "Passwords do not match",
          password: "",
          confirmPassword: "",
          isLoading: false,
        };
      } else if (state.password.length < 6) {
        return {
          ...state,
          error: "Password must be longer than 6 characters",
          password: "",
          confirmPassword: "",
          isLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: true,
          isVerified: true,
        };
      }
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        error: "",
        isLoggedIn: true,
        isVerified: true,
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
        picture: "",
        password: "",
        confirmPassword: "",
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
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture: "",
  error: "",
  isVerified: false,
  isLoading: false,
  isLoggedIn: false,
  user: null,
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
        if (user) {
          dispatch({
            type: ACTIONS.VERIFY_USER,
            payload: { data: user },
          });
        }
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, payload: error });
      }
    };
    doAVerify();
  }, []);

  const login = async (data) => {
    dispatch({ type: ACTIONS.LOGIN });
    try {
      const user = await loginUser(data);
      dispatch({ type: ACTIONS.SUCCESS, payload: { data: user } });
      history.push("/");
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, payload: error });
    }
  };

  const register = async (data) => {
    dispatch({ type: ACTIONS.LOGIN });
    dispatch({ type: ACTIONS.VERIFY_FIELD });

    try {
      if (state.isVerified) {
        const user = await registerUser(data);
        dispatch({ type: ACTIONS.SUCCESS, payload: { data: user } });
        history.push("/");
      }
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
