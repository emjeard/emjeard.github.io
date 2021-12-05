/* eslint-disable no-use-before-define */
import axios from "axios";
import { API_BASE_URL } from "constants/ApiConstant";
import { AUTH_TOKEN } from "redux/constants/Auth";
const BASE_URL = API_BASE_URL;
const BASE_URL_SVC = "https://services.inponsel.com";

const BASE_URL_PLACES =
  "https://maps.googleapis.com/maps/api/place/details/json?";
const btoa = function (str) {
  return Buffer.from(str).toString("base64");
};

export {
  postLogin,
  getMeProfile,
  getListHpEdChoice,
  getSearchHp,
  putUpdateHpEditorChoice,
  getSearchMore,
  getListNews,
};

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

let getListHpEdChoice = (id) => {
  const url = `${BASE_URL}hp/editor/list?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getSearchHp = (keyword) => {
  const url = `${BASE_URL}hp/search/list?key=${keyword}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let putUpdateHpEditorChoice = (id, title, desc, image, data_hp) => {
  const url = `${BASE_URL}hp/editor/update`;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("title", title);
  formData.append("desc", desc);
  formData.append("image", image);
  formData.append("data", data_hp);
  return axios
    .put(url, formData, headerRequest)
    .then((response) => response.data);
};

let getSearchMore = (keyword) => {
  const url = `${BASE_URL}search/list?key=${keyword}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListNews = (page, many, filter) => {
  const url = `${BASE_URL}article/list?page=${page}&many=${many}${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
