import { HP_PROS_DATA, HP_CONS_DATA, HP_1_DATA, HP_2_DATA, ADD_IMAGE_DATA } from "../constants/Handphone";

export const ADD_IMAGE_ACT = (newData) => {
  return { type: ADD_IMAGE_DATA, data: newData };
};

export const HP_PROS = (newData) => {
  return { type: HP_PROS_DATA, data: newData };
};

export const HP_CONS = (newData) => {
  return { type: HP_CONS_DATA, data: newData };
};

export const HP_SELECT_1 = (newData) => {
  return { type: HP_1_DATA, data: newData };
};

export const HP_SELECT_2 = (newData) => {
  return { type: HP_2_DATA, data: newData };
};
