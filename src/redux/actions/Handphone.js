import { HP_PROS_DATA, HP_CONS_DATA } from "../constants/Handphone";

export const HP_PROS = (newData) => {
  return { type: HP_PROS_DATA, data: newData };
};

export const HP_CONS = (newData) => {
  return { type: HP_CONS_DATA, data: newData };
};
