import { combineReducers } from "redux";
import alert from "./alert.reducer";
import auth from "./auth.reducer";
import profile from "./profile.reducer";

const reducer = combineReducers({
  alert,
  auth,
  profile,
});
export default reducer;

/*
  alert = {
    id: 1,
    msg: 'Please log in',
    alertType: 'success'
  }
  auth = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: {
      name,
      email,
      gravatar,
      date
    },
  }
  profile = {
    profile: null,
    profiles: [],
    loading: null,
    error: {},
  }
*/
