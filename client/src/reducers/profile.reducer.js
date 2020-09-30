import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILE_AVATAR,
} from "../actions/types";
const initialState = {
  profile: {},
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILE_AVATAR:
      return {
        ...state,
        profiles: state.profiles.map((prof) =>
          prof._id === payload.prof_id
            ? { ...prof, avatarUrl: payload.avatarUrl }
            : prof
        ),
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: { ...payload },
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
};
