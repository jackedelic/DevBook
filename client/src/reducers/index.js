import { combineReducers } from "redux";
import alert from "./alert.reducer";
import auth from "./auth.reducer";
import profile from "./profile.reducer";
import post from "./post.reducer";

const reducer = combineReducers({
  alert,
  auth,
  profile,
  post,
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
    profile: null,    ---> the specific profile the client is viewing e.g react route -> /profile/:d
    profiles: [],
    loading: null,
    error: {},
  }
  post = {
    posts: [],
    post: null,       ---> the specific post the client is viewing e.g react route -> /post/:id
    loading: false,
    error: {}
  }
*/
