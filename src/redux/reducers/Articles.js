import { ADD_DATA } from "../constants/Auth";

const initState = {
  content: "",
};

const articles = (state = initState, action) => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        content: action.data,
      };

    default:
      return state;
  }
};

export default articles;
