import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
} from "../actions/types";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
