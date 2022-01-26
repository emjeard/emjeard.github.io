import { INPUT_1_DATA, INPUT_2_DATA } from "../constants/FormInput";

export const INPUT_1_ACT = (newData) => {
  return { type: INPUT_1_DATA, data: newData };
};

export const INPUT_2_ACT = (newData) => {
  return { type: INPUT_2_DATA, data: newData };
};
