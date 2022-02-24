import {
  HP_PROS_DATA,
  HP_CONS_DATA,
  HP_1_DATA,
  HP_2_DATA,
  ADD_IMAGE_DATA,
  GEN_MEREK,
  GEN_TIPE,
  GEN_MODEL,
  GEN_TAGS,
  GEN_DIM_PANJANG,
  GEN_DIM_LEBAR,
  GEN_DIM_TEBAL,
  GEN_ADD_INFO,
  GEN_BOBOT,
  GEN_BOBOT_INFO,
  GEN_IMAGE,
  GEN_WARNA,
  GEN_DIUMUMKAN,
  GEN_STATUS,
} from "../constants/Handphone";

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

export const GEN_MEREK_ACT = (newData) => {
  return { type: GEN_MEREK, data: newData };
};
export const GEN_TIPE_ACT = (newData) => {
  return { type: GEN_TIPE, data: newData };
};
export const GEN_ADD_INFO_ACT = (newData) => {
  return { type: GEN_ADD_INFO, data: newData };
};

export const GEN_INPUT_ACT = (stateName, newData) => {
  return { type: stateName, data: newData };
};