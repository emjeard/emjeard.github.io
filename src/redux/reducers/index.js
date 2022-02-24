import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import Articles from "./Articles";
import Handphone from "./Handphone";
import FormInput from "./FormInput";
import General from "./General";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  articles: Articles,
  hpproscons: Handphone,
  form_input: FormInput,
  gen_hp_data: General,
});

export default reducers;
