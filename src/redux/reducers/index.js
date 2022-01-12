import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import Articles from "./Articles";
import Handphone from "./Handphone";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  articles: Articles,
  hpproscons: Handphone,
});

export default reducers;
