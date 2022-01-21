import { HP_PROS_DATA, HP_CONS_DATA, HP_1_DATA, HP_2_DATA } from "../constants/Handphone";

const initState = {
  content: "",
};

const hpproscons = (state = initState, action) => {
  switch (action.type) {
    case HP_PROS_DATA:
      return {
        ...state,
        pros_data: action.data,
      };
    case HP_CONS_DATA:
      return {
        ...state,
        cons_data: action.data,
      };
    case HP_1_DATA:
      return {
        ...state,
        hp_1: action.data,
      };
    case HP_2_DATA:
      return {
        ...state,
        hp_2: action.data,
      };
    default:
      return state;
  }
};

export default hpproscons;
