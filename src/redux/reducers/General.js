import { HP_DATA_UPDATE } from "../constants/Handphone";
const gen_hp_data = (state, action) => {
  let stateName = action.type;
  if (stateName.includes(HP_DATA_UPDATE)) {
    stateName = stateName.split(".")[1];
    return {
      data: { ...state.data, [stateName]: action.data },
    };
  } else {
    return {
      ...state,
      [stateName]: action.data,
    };
  }
};

export default gen_hp_data;
