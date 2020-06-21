import { combineReducers } from "redux";
import alert from "./alert.reducer";
import auth from "./auth.reducer";
const reducer = combineReducers({
  alert,
  auth,
});
export default reducer;
