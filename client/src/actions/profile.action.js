import axios from "axios";
import { setAlert } from "./alert.action";
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

// Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};
// Get github repos of some user
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};
// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios("/api/profile/");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "ProfileUpdate" : "Profile Created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.error(e);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.error(e);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education added", "success"));
    history.push("/dashboard");
  } catch (e) {
    const errors = e.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.error(e);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience removed", "success"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education removed", "success"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone.")) {
  }
  try {
    const res = await axios.delete(`/api/profile`);
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: ACCOUNT_DELETED,
    });
    dispatch(setAlert("Your acccount has been permanently deleted"));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};
