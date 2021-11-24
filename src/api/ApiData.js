/* eslint-disable no-use-before-define */
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
const BASE_URL = "http://localhost:4000/";
const BASE_URL_SVC = "https://services.inponsel.com";

const BASE_URL_PLACES =
  "https://maps.googleapis.com/maps/api/place/details/json?";
const btoa = function (str) {
  return Buffer.from(str).toString("base64");
};

export { postLogin, getMeProfile };

const getToken = function () {
  let isToken = "";

  if (typeof window !== "undefined") {
    isToken = localStorage.getItem(AUTH_TOKEN);
  } else {
  }
  return isToken;
};
const headerRequest = {
  headers: {
    Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
    "ADM-Token": getToken(),
  },
};

let postLogin = (email, password) => {
  const url = `${BASE_URL}admin/user/login`;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  return axios.post(url, formData).then((response) => response.data);
};

let getMeProfile = () => {
  const url = `${BASE_URL}admin/me`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
