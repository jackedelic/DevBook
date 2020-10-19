import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";
import { setAlert } from "../actions/alert.action";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (e) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Load user and populate the user data to the browser (localStorage)
export const loadUser = () => async dispatch => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      throw new Error("Load user fail");
    }
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: {
        token: localStorage.token,
        user: res.data
      }
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  console.log(body);

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    console.error(e);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout user
export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });
};
