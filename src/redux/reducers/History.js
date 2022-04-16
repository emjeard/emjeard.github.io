import { LAST_PATH_DATA } from "../constants/FormInput";

const initState = {
  last_path: "",
};

const history = (state = initState, action) => {
  switch (action.type) {
    case LAST_PATH_DATA:
      return {
        ...state,
        last_path: action.data,
      };

    default:
      return state;
  }
};

export default history;
