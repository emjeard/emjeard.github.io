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
  getSearchCity,
  putUpdateHpEditorChoice,
  putUpdateCompareHp,
  getSearchMore,
  getListNews,
  getListHp,
  getListHpModel,
  getListHpMemJen,
  getListHpMemKap,
  getListHpBattery,
  getListHpLayarWarna,
  getListHpLayarSensor,
  getListHpCpu,
  getListHpStatus,
  getListHpSimCard,
  getListCompareHp,
  getDetailRSS,
  getDetailBrand,
  getListTagGeneral,
  getListTagOs,
  getListCountry,
  getListTagOp,
  getListTagBrand,
  getDetailHp,
  getDetailOp,
  getDetailOpPack,
  delDetailOpPack,
  delUmuModel,
  delDeviceStatus,
  delDetailOp,
  postUploadAvatar,
  postCreateArticle,
  postCreateHp,
  postEditHp,
  postCreateOpPackage,
  postUpdateOp,
  postUmuModel,
  postDeviceStatus,
  putUmuModel,
  putDeviceStatus,
  putUpdateOpPackage,
  putUpdateOp,
  putUpdateArticle,
  putUpdateHandphone,
  getCompareHp,
  getGenerateCompareHp,
  getListBrands,
  getListUmuModel,
  getListProvince,
  getListOperator,
  getListOperatorPack,
  getListDeviceStatus,
  putUpdateBrand,
  postCreateBrand,
  getRootPathSitePage,
  getListGalleryHp,
  putUpdateGalleryHp,
  postUploadFile,
  headerRequest,
  getToken,
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

const postLogin = (email, password) => {
  const url = `${BASE_URL}admin/user/login`;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  return axios.post(url, formData).then((response) => response.data);
};

const getMeProfile = () => {
  const url = `${BASE_URL}admin/me`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListHpEdChoice = (id) => {
  const url = `${BASE_URL}hp/editor/list?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getSearchHp = (keyword) => {
  const url = `${BASE_URL}hp/search/list?key=${keyword}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getSearchCity = (keyword) => {
  const url = `${BASE_URL}city/list?page=1&many=20&key=${keyword}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getDetailHp = (id) => {
  const url = `${BASE_URL}hp/detail?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getDetailOpPack = (id) => {
  const url = `${BASE_URL}operator/package?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const delDetailOpPack = (id) => {
  const url = `${BASE_URL}operator/package/delete?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const delUmuModel = async (id) => {
  const url = `${BASE_URL}master/umu-model/delete?id=${id}`;
  try {
    const response = await axios.delete(url, headerRequest);
    return response;
  } catch (err) {
    return err.response;
  }
};
const delDeviceStatus = async (id) => {
  const url = `${BASE_URL}master/device-status/delete?id=${id}`;
  try {
    const response = await axios.delete(url, headerRequest);
    return response;
  } catch (err) {
    return err.response;
  }
};
const delDetailOp = (id) => {
  const url = `${BASE_URL}operator/delete?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getDetailOp = (id) => {
  const url = `${BASE_URL}operator?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getGenerateCompareHp = (idhp, idhp2) => {
  const url = `${BASE_URL2}/hp/compare/short?id=${idhp}&id2=${idhp2}`;
  return axios.get(url).then((response) => response.data);
};

const putUpdateHpEditorChoice = (id, title, desc, content, image, data_hp) => {
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

const putUpdateCompareHp = (id, id_hp1, id_hp2, meta_desc, desc) => {
  const url = `${BASE_URL}hp/compare/edit`;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("id_hp1", id_hp1);
  formData.append("id_hp2", id_hp2);
  formData.append("meta_desc", meta_desc);
  formData.append("desc", desc);
  return axios
    .put(url, formData, headerRequest)
    .then((response) => response.data);
};

const getRootPathSitePage = () => {
  const url = `${BASE_URL}site/page/root-path`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getSearchMore = (keyword) => {
  const url = `${BASE_URL}search/list?key=${keyword}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListTagGeneral = () => {
  const url = `${BASE_URL}article/tag/general`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListTagOs = () => {
  const url = `${BASE_URL}article/tag/os`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListCountry = () => {
  const url = `${BASE_URL}country/list`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListTagOp = () => {
  const url = `${BASE_URL}article/tag/op`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListTagBrand = (key) => {
  const url = `${BASE_URL}article/tag/brand?key=${key}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListNews = (page, many, filter) => {
  const url = `${BASE_URL}article/list?page=${page}&many=${many}${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListHp = (page, many, filter) => {
  const url = `${BASE_URL}hp/list?page=${page}&many=${many}${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListGalleryHp = (id_hp) => {
  const url = `${BASE_URL}hp/gallery?id=${id_hp}`;
  return axios
    .get(url, headerRequest)
    .then((response) => response)
    .catch((err) => err.response);
};

const getListHpModel = () => {
  const url = `${BASE_URL}hp/model`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListHpMemJen = () => {
  const url = `${BASE_URL}hp/memjen`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListHpMemKap = () => {
  const url = `${BASE_URL}hp/memkap`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListHpBattery = () => {
  const url = `${BASE_URL}hp/battery/type`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListHpLayarWarna = () => {
  const url = `${BASE_URL}hp/layar/warna`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListHpLayarSensor = () => {
  const url = `${BASE_URL}hp/layar/sensor`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListHpCpu = () => {
  const url = `${BASE_URL}hp/cpu`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListHpStatus = () => {
  const url = `${BASE_URL}hp/status`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListHpSimCard = () => {
  const url = `${BASE_URL}hp/simcard`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListBrands = (page, many, filter) => {
  const url = `${BASE_URL}brand/list?page=${page}&many=${many}&order=${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListUmuModel = (page, many, filter) => {
  const url = `${BASE_URL}master/umu-model/list?page=${page}&many=${many}&order=${filter}`;
  return axios
    .get(url, headerRequest)
    .then((response) => response)
    .catch((err) => err.response);
};

const getListDeviceStatus = (page, many, filter) => {
  const url = `${BASE_URL}master/device-status/list?page=${page}&many=${many}&order=${filter}`;
  return axios
    .get(url, headerRequest)
    .then((response) => response)
    .catch((err) => err.response);
};

const getListOperator = (page, many, filter) => {
  const url = `${BASE_URL}operator/list?page=${page}&many=${many}&order=${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListOperatorPack = (page, many, filter) => {
  const url = `${BASE_URL}operator/package/list?page=${page}&many=${many}&order=${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getListProvince = (page, many, filter) => {
  const url = `${BASE_URL}province/list?page=${page}&many=${many}&order=${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};
const getListCompareHp = (page, many, filter) => {
  const url = `${BASE_URL}hp/compare/list?page=${page}&many=${many}${filter}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getDetailRSS = (id) => {
  const url = `${BASE_URL}article/detail?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getDetailBrand = (id) => {
  const url = `${BASE_URL}brand/detail?id=${id}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const getCompareHp = (id_hp1, id_hp2) => {
  const url = `${BASE_URL}hp/compare/detail?id_hp1=${id_hp1}&id_hp2=${id_hp2}`;
  return axios.get(url, headerRequest).then((response) => response.data);
};

const postUploadAvatar = (file, fileName) => {
  const url = `https://api.imagekit.io/v1/files/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("folder", "article/content");

  return axios
    .post(url, formData, headerImgKitRequest)
    .then((response) => response);
};

const postCreateHp = (jsonData) => {
  const url = `${BASE_URL}hp/create`;
  const data = JSON.stringify(jsonData);

  var config = {
    method: "post",
    url: url,
    headers: {
      Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
      "ADM-Token": getToken(),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then((response) => response);
};

const postEditHp = (jsonData) => {
  const url = `${BASE_URL}hp/edit/full`;
  const data = JSON.stringify(jsonData);

  var config = {
    method: "post",
    url: url,
    headers: {
      Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
      "ADM-Token": getToken(),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then((response) => response);
};

const postCreateOpPackage = (jsonData) => {
  const url = `${BASE_URL}operator/package/create`;
  const data = JSON.stringify(jsonData);

  var config = {
    method: "post",
    url: url,
    headers: {
      Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
      "ADM-Token": getToken(),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then((response) => response);
};

const postUpdateOp = (jsonData) => {
  const url = `${BASE_URL}operator/create`;
  const data = JSON.stringify(jsonData);

  var config = {
    method: "post",
    url: url,
    headers: {
      Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
      "ADM-Token": getToken(),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then((response) => response);
};

const putUpdateOp = (jsonData) => {
  const url = `${BASE_URL}operator/edit`;
  const data = JSON.stringify(jsonData);

  var config = {
    method: "put",
    url: url,
    headers: {
      Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
      "ADM-Token": getToken(),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then((response) => response);
};

const putUpdateOpPackage = (jsonData) => {
  const url = `${BASE_URL}operator/package/edit`;
  const data = JSON.stringify(jsonData);

  var config = {
    method: "put",
    url: url,
    headers: {
      Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
      "ADM-Token": getToken(),
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then((response) => response);
};

const postCreateArticle = (
  portal_id,
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
  const url = `${BASE_URL}article/create`;

  const formData = new FormData();
  formData.append("portal_id", portal_id);
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

  return axios.post(url, formData, headerRequest).then((response) => response);
};
const postUmuModel = (model) => {
  const url = `${BASE_URL}master/umu-model/create`;
  const formData = new FormData();
  formData.append("model", model);
  return axios
    .post(url, formData, headerRequest)
    .then((response) => response)
    .catch((err) => err.response);
};
const postDeviceStatus = async (status) => {
  const url = `${BASE_URL}master/device-status/create`;
  const formData = new FormData();
  formData.append("status", status);
  try {
    const response = await axios.post(url, formData, headerRequest);
    return response;
  } catch (err) {
    return err.response;
  }
};
const putDeviceStatus = async (id, status) => {
  const url = `${BASE_URL}master/device-status/update`;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("status", status);
  try {
    const response = await axios.put(url, formData, headerRequest);
    return response;
  } catch (err) {
    return err.response;
  }
};
const putUmuModel = async (id, model) => {
  const url = `${BASE_URL}master/umu-model/update`;
  const formData = new FormData();
  formData.append("id", id);
  formData.append("model", model);
  try {
    const response = await axios.put(url, formData, headerRequest);
    return response;
  } catch (err) {
    return err.response;
  }
};
const putUpdateArticle = (
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

const putUpdateHandphone = (
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

const putUpdateBrand = (
  id,
  merk,
  logo,
  meta_title,
  meta_desc,
  desc_html,
  urutan,
  grup_kategori,
  desc_company,
  alamat,
  id_negara,
  c_center,
  em,
  url_website,
  fb,
  fb_id,
  tw,
  ytube,
  ch,
  instagram
) => {
  const url = `${BASE_URL}brand/edit`;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("merk", merk);
  formData.append("logo", logo);
  formData.append("meta_title", meta_title);
  formData.append("meta_desc", meta_desc);
  formData.append("desc_html", desc_html);
  formData.append("urutan", urutan);
  formData.append("grup_kategori", grup_kategori);
  formData.append("desc_company", desc_company);
  formData.append("alamat", alamat);
  formData.append("id_negara", id_negara);
  formData.append("c_center", c_center);
  formData.append("em", em);
  formData.append("url", url_website);
  formData.append("fb", fb);
  formData.append("fb_id", fb_id);
  formData.append("tw", tw);
  formData.append("ytube", ytube);
  formData.append("ch", ch);
  formData.append("instagram", instagram);

  return axios
    .put(url, formData, headerRequest)
    .then((response) => response.data);
};

const postCreateBrand = (
  merk,
  logo,
  meta_title,
  meta_desc,
  desc_html,
  urutan,
  grup_kategori,
  desc_company,
  alamat,
  id_negara,
  c_center,
  em,
  url_website,
  fb,
  fb_id,
  tw,
  ytube,
  ch,
  instagram
) => {
  const url = `${BASE_URL}brand/create`;

  const formData = new FormData();
  formData.append("merk", merk);
  formData.append("logo", logo);
  formData.append("meta_title", meta_title);
  formData.append("meta_desc", meta_desc);
  formData.append("desc_html", desc_html);
  formData.append("urutan", urutan);
  formData.append("grup_kategori", grup_kategori);
  formData.append("desc_company", desc_company);
  formData.append("alamat", alamat);
  formData.append("id_negara", id_negara);
  formData.append("c_center", c_center);
  formData.append("em", em);
  formData.append("url", url_website);
  formData.append("fb", fb);
  formData.append("fb_id", fb_id);
  formData.append("tw", tw);
  formData.append("ytube", ytube);
  formData.append("ch", ch);
  formData.append("instagram", instagram);

  return axios
    .post(url, formData, headerRequest)
    .then((response) => response.data);
};

const putUpdateGalleryHp = (id, galeri) => {
  const url = `${BASE_URL}hp/gallery/update`;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("galeri", galeri);

  return axios
    .put(url, formData, headerRequest)
    .then((response) => response.data);
};

const postUploadFile = (file, fileName, folder) => {
  const url = `${BASE_URL}admin/upload/s3`;

  let final_folder = folder.replace("//", "/");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("filename", fileName);
  formData.append("folder_path", final_folder);

  return axios.post(url, formData, headerRequest).then((response) => response);
};
