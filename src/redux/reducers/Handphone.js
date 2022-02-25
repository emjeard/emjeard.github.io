import {
  HP_DATA_FULL,
  HP_PROS_DATA,
  HP_CONS_DATA,
  HP_1_DATA,
  HP_2_DATA,
  ADD_IMAGE_DATA,
  GEN_MEREK,
  GEN_TIPE,
  GEN_ADD_INFO,
  GEN_INPUT,
  HP_DATA,
} from "../constants/Handphone";

const initState = {
  content: "",
};

const hpproscons = (state = initState, action) => {
  const stateName = action.type;
  switch (action.type) {
    case ADD_IMAGE_DATA:
      return {
        ...state,
        image_data: action.data,
      };
    case HP_PROS_DATA:
      return {
        ...state,
        pros_data: action.data,
      };
    case HP_DATA_FULL:
      return {
        ...state,
        gen_hp_data: action.data,
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
    case GEN_MEREK:
      return {
        ...state,
        gen_merek: action.data,
      };
    case GEN_TIPE:
      return {
        ...state,
        gen_tipe: action.data,
      };
    case GEN_ADD_INFO:
      return {
        ...state,
        gen_add_info: action.data,
      };
    case GEN_INPUT:
      return {
        ...state,
        [stateName]: action.data,
      };
    case HP_DATA:
      return {
        ...state,
        gen_hp_data: action.data,
      };
    default:
      return state;
  }
};

export default hpproscons;
