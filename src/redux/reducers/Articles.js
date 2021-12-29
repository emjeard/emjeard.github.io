import { ADD_DATA } from "../constants/Auth";

const initState = {
  description: "",
};

const articles = (state = initState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        description: action.data,
      };

    default:
      return state;
  }
};

export default articles;
