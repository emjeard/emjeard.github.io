/* eslint-disable no-use-before-define */
import axios from "axios";
import { API_BASE_URL } from "constants/ApiConstant";
import { AUTH_TOKEN } from "redux/constants/Auth";
const BASE_URL = API_BASE_URL;
const BASE_URL_SVC = "https://services.inponsel.com";
const BASE_URL2 = "https://api-v2.inponsel.com";

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
  putUpdateCompareHp,
  getSearchMore,
  getListNews,
  getListHp,
  getListCompareHp,
  getDetailRSS,
  getListTagGeneral,
  getListTagOs,
  getListTagOp,
  getListTagBrand,
  getDetailHp,
  postUploadAvatar,
  putUpdateArticle,
  putUpdateHandphone,
  getCompareHp,
  getGenerateCompareHp,
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

const headerImgKitRequest = {
  auth: {
    username: "jgjRPRWKM03LoK8DyFpF2kwfOFA=",
    password: "",
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

let getDetailHp = (id) => {
  const url = `${BASE_URL}hp/detail?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getGenerateCompareHp = (idhp, idhp2) => {
  const url = `${BASE_URL2}/hp/compare/short?id=${idhp}&id2=${idhp2}`;
  return axios.get(url).then((response) => response.data);
};

let putUpdateHpEditorChoice = (id, title, desc, content, image, data_hp) => {
  const url = `${BASE_URL}hp/editor/update`;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("title", title);
  formData.append("desc", desc);
  formData.append("content", content);
  formData.append("image", image);
  formData.append("data", data_hp);
  return axios
    .put(url, formData, headerRequest)
    .then((response) => response.data);
};

let putUpdateCompareHp = (id, meta_desc, desc) => {
  const url = `${BASE_URL}hp/compare/edit`;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("meta_desc", meta_desc);
  formData.append("desc", desc);
  return axios
    .put(url, formData, headerRequest)
    .then((response) => response.data);
};

let getSearchMore = (keyword) => {
  const url = `${BASE_URL}search/list?key=${keyword}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListTagGeneral = () => {
  const url = `${BASE_URL}article/tag/general`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListTagOs = () => {
  const url = `${BASE_URL}article/tag/os`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListTagOp = () => {
  const url = `${BASE_URL}article/tag/op`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListTagBrand = (key) => {
  const url = `${BASE_URL}article/tag/brand?key=${key}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListNews = (page, many, filter) => {
  const url = `${BASE_URL}article/list?page=${page}&many=${many}${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListHp = (page, many, filter) => {
  const url = `${BASE_URL}hp/list?page=${page}&many=${many}${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getListCompareHp = (page, many, filter) => {
  const url = `${BASE_URL}hp/compare/list?page=${page}&many=${many}${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getDetailRSS = (id) => {
  const url = `${BASE_URL}article/detail?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let getCompareHp = (id_hp1, id_hp2) => {
  const url = `${BASE_URL}hp/compare/detail?id_hp1=${id_hp1}&id_hp2=${id_hp2}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

let postUploadAvatar = (file, fileName) => {
  const url = `https://api.imagekit.io/v1/files/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("folder", "article/content");

  return axios
    .post(url, formData, headerImgKitRequest)
    .then((response) => response);
};

let putUpdateArticle = (
  id,
  title,
  desc,
  content,
  tag_general,
  tag_os,
  tag_brands,
  tag_devices,
  tag_devices_id,
  tag_op,
  status,
  had_pushed,
  hide_images,
  meta_title,
  meta_desc,
  meta_image
) => {
  const url = `${BASE_URL}article/edit`;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("title", title);
  formData.append("desc", desc.replace(/\r\n/g, ""));
  formData.append("content", content.replace(/\r\n/g, ""));
  formData.append("tag_general", tag_general);
  formData.append("tag_os", tag_os);
  formData.append("tag_brands", tag_brands);
  formData.append("tag_devices", tag_devices);
  formData.append("tag_devices_id", tag_devices_id);
  formData.append("tag_op", tag_op);
  formData.append("status", status);
  formData.append("had_pushed", had_pushed);
  formData.append("hide_images", hide_images);
  formData.append("meta_title", meta_title);
  formData.append("meta_desc", meta_desc);
  formData.append("meta_image", meta_image);

  return axios.put(url, formData, headerRequest).then((response) => response);
};

let putUpdateHandphone = (
  id,
  hp_pros,
  hp_cons,
  hp_compare,
  hp_release_date,
  hp_negative_word,
  shopee_hp_url,
  shopee_acc_url,
  laz_hp_url,
  laz_acc_url
) => {
  const url = `${BASE_URL}hp/edit`;

  const formData = new FormData();
  formData.append("id_hp", id);
  formData.append(
    "hp_pros",
    hp_pros === "" ? " " : hp_pros.replace(/\r\n/g, "")
  );
  formData.append(
    "hp_cons",
    hp_cons === "" ? " " : hp_cons.replace(/\r\n/g, "")
  );
  formData.append("hp_compare", hp_compare === "" ? " " : hp_compare);
  formData.append(
    "hp_release_date",
    hp_release_date === "" ? " " : hp_release_date
  );
  formData.append(
    "hp_negative_word",
    hp_negative_word === "" ? " " : hp_negative_word
  );
  formData.append("shopee_hp_url", shopee_hp_url === "" ? " " : shopee_hp_url);
  formData.append(
    "shopee_acc_url",
    shopee_acc_url === "" ? " " : shopee_acc_url
  );
  formData.append("laz_hp_url", laz_hp_url === "" ? " " : laz_hp_url);
  formData.append("laz_acc_url", laz_acc_url === "" ? " " : laz_acc_url);

  return axios.put(url, formData, headerRequest).then((response) => response);
};
