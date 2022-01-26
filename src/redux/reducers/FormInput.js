import { INPUT_1_DATA, INPUT_2_DATA } from "../constants/FormInput";

const initState = {
  content: "",
};

const form_input = (state = initState, action) => {
  switch (action.type) {
    case INPUT_1_DATA:
      return {
        ...state,
        form_1_data: action.data,
      };
    case INPUT_2_DATA:
      return {
        ...state,
        form_2_data: action.data,
      };

    default:
      return state;
  }
};

export default form_input;
