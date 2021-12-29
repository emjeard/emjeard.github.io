import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import Articles from "./Articles";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  articles: Articles,
});

export default reducers;
