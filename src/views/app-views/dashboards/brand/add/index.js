import React, { useState, useEffect, useCallback } from "react";
import { Card, Input, Select, Spin, Button } from "antd";
import Drag from "views/app-views/components/data-entry/input/Drag";
import store from "redux/store";
import { INPUT_1_ACT } from "redux/actions/FormInput";
import { getListCountry, getDetailBrand, postCreateBrand } from "api/ApiData";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";
import {
  GlobalOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;
const { TextArea } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const BrandAdd = (props) => {
  const brandId = props.match.params.id;
  const [brandState, setBrandState] = useState({
    image: "",
    description: "",
    category: "",
    country: "",
    website: "",
    facebook: "",
    facebook_id: "",
    twitter: "",
    address: "",
    email: "",
    phone: "",
    youtube: "",
    instagram: "",
  });
  const [brandName, setBrandName] = useState("");
  const [dataTagCountry, setDataTagCountry] = useState([]);
  const [dataDefTagCountry, setDefDataTagCountry] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      getTagCountry();
      retrieveData();
    })();
  }, []);

  const retrieveData = () => {};

  const onChangeTitle = (e) => {
    setBrandName(e.target.value);
  };

  const onChangeInput = (e) => {
    setBrandState({
      ...brandState,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCategory = (value) => {
    setBrandState({
      ...brandState,
      category: value,
    });
  };
  const handleChangeCountry = (selectedItems) => {
    setDefDataTagCountry(selectedItems);
    console.log(selectedItems);
  };
  const getTagCountry = () => {
    getListCountry().then((response) => {
      setDataTagCountry(response.data);
      setFirstLoading(false);
    });
  };

  const onChangeMetaTitle = (e) => {
    setMetaTitle(e.target.value);
  };

  const onChangeDesc = (e) => {
    setMetaDesc(e.target.value);
  };

  const sendRequest = (e) => {
    // update state
    setLoading(true);
    let merk = brandName;
    let logo =
      store.getState().hpproscons.image_data === undefined
        ? brandState.image
        : store.getState().hpproscons.image_data;
    let meta_title = metaTitle;
    let meta_desc = metaDesc;
    let desc_html = store.getState().form_input.form_1_data;
    let urutan = 0;
    let grup_kategori = brandState.category;
    let desc_company = brandState.description;
    let alamat = brandState.address;
    let id_negara = dataDefTagCountry;
    let c_center = brandState.phone;
    let em = brandState.email;
    let url_website = brandState.website;
    let fb = brandState.facebook;
    let fb_id = brandState.facebook_id;
    let tw = brandState.twitter;
    let ytube = brandState.youtube;
    let ch = "";
    let instagram = brandState.instagram;
    console.log("merk", merk);
    console.log("logo", logo);
    console.log("meta_title", meta_title);
    console.log("meta_desc", meta_desc);
    console.log("desc_html", desc_html);
    console.log("urutan", urutan);
    console.log("grup_kategori", grup_kategori);
    console.log("desc_company", desc_company);
    console.log("alamat", alamat);
    console.log("id_negara", id_negara);
    console.log("c_center", c_center);
    console.log("em", em);
    console.log("url_website", url_website);
    console.log("fb", fb);
    console.log("fb_id", fb_id);
    console.log("tw", tw);
    console.log("ytube", ytube);
    console.log("ch", ch);
    console.log("instagram", instagram);
    postCreateBrand(
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
    )
      .then((response) => {
        console.log("response", response.status);
        if (response.status === true) {
          toast.success(response.message, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          /* setTimeout(
          () => (window.location.href = "/dashboards/rss/list"),
          3000
        ); */
        } else {
          toast.error("Gagal update data", {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toast.error("Gagal update data", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }; // update the callback if the state changes

  return firstLoading === true ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <div>
      <Card>
        <div>GENERAL</div>
        <div style={{ margin: "15px 0px" }}>
          <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
            Brand Image *
          </div>
          <Drag folder="brands" filename={brandName} />
        </div>
        <div style={{ marginTop: 10, display: "flex" }}>
          <div>
            <div>Name</div>
            <Input
              placeholder="Nama Brand"
              allowClear
              onChange={onChangeTitle}
              value={brandName}
              style={{ marginTop: 10, width: 350 }}
            />
          </div>
          <div style={{ margin: "10px 0px 0px 30px", width: 250 }}>
            <div>Category</div>
            <Select
              defaultValue={brandState.category}
              value={brandState.category}
              onChange={handleChangeCategory}
              style={{ width: 200 }}
            >
              <Option value={1}>Group One</Option>
              <Option value={2}>Group Two</Option>
            </Select>
          </div>
        </div>
        <div style={{ margin: "15px 0px 0px 0px" }}>
          <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
            Meta Title / Head Title*
          </div>
          <Input
            placeholder="Meta title"
            allowClear
            onChange={onChangeMetaTitle}
            value={metaTitle}
          />
          <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
            Meta Description*
          </div>
          <TextArea
            placeholder="Meta description"
            allowClear
            onChange={onChangeDesc}
            value={metaDesc}
            style={{ minHeight: "150px" }}
          />
          <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
            Description
          </div>
          <TextArea
            rows={6}
            style={{ width: "100%" }}
            onChange={onChangeInput}
            name="description"
            value={brandState.description}
          />
          <div style={{ margin: "15px 0px 0px 0px" }}>
            <CKEditorCustom editor_type={"brand"} />
          </div>
        </div>
        <div style={{ margin: "15px 0px 0px 0px" }}>
          <div>CONTACT</div>
          <div style={{ margin: "15px 0px" }}>
            <div>Country</div>
            <Select
              showSearch
              style={{ width: "450px", height: "auto !important" }}
              placeholder="Pilih negara"
              defaultValue={dataDefTagCountry}
              value={dataDefTagCountry}
              onChange={handleChangeCountry}
              optionLabelProp="label"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {dataTagCountry.map((items) => (
                <Option value={items.id} label={items.country}>
                  {items.country}
                </Option>
              ))}
            </Select>
            <div style={{ margin: "30px 0px 0px 0px", display: "flex" }}>
              <div>
                <div>Address</div>
                <TextArea
                  rows={4}
                  style={{ width: 300 }}
                  onChange={onChangeInput}
                  name="address"
                  value={brandState.address}
                />
              </div>
              <div style={{ margin: "0px 0px 0px 20px" }}>
                <div>Call Center</div>
                <TextArea
                  rows={3}
                  style={{ width: 300 }}
                  onChange={onChangeInput}
                  name="phone"
                  value={brandState.phone}
                />
              </div>
              <div style={{ margin: "0px 0px 0px 20px" }}>
                <div>Email</div>
                <TextArea
                  rows={4}
                  style={{ width: 300 }}
                  onChange={onChangeInput}
                  name="email"
                  value={brandState.email}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ margin: "15px 0px 0px 0px" }}>
          <div>SOCIAL AND URL</div>
          <div style={{ display: "flex" }}>
            <div>
              <div>Website</div>
              <Input
                prefix={<GlobalOutlined />}
                name="website"
                placeholder="Website"
                allowClear
                onChange={onChangeInput}
                value={brandState.website}
                style={{ marginTop: 10, width: 350 }}
              />
            </div>
          </div>
          <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
            <div>
              <div>Facebook</div>
              <Input
                prefix={<FacebookOutlined />}
                name="facebook"
                placeholder="Facebook"
                allowClear
                onChange={onChangeInput}
                value={brandState.facebook}
                style={{ marginTop: 10, width: 250 }}
              />
            </div>
            <div style={{ margin: "0px 0px 0px 20px" }}>
              <div>Facebook ID</div>
              <Input
                prefix={<FacebookOutlined />}
                name="facebook_id"
                placeholder="Facebook ID"
                allowClear
                onChange={onChangeInput}
                value={brandState.facebook_id}
                style={{ marginTop: 10, width: 250 }}
              />
            </div>
          </div>
          <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
            <div>
              <div>Twitter</div>
              <Input
                prefix={<TwitterOutlined />}
                name="twitter"
                placeholder="Twitter"
                allowClear
                onChange={onChangeInput}
                value={brandState.twitter}
                style={{ marginTop: 10, width: 250 }}
              />
            </div>
            <div style={{ margin: "0px 0px 0px 20px" }}>
              <div>Youtube</div>
              <Input
                prefix={<YoutubeOutlined />}
                name="youtube"
                placeholder="Youtube"
                allowClear
                onChange={onChangeInput}
                value={brandState.youtube}
                style={{ marginTop: 10, width: 250 }}
              />
            </div>
            <div style={{ margin: "0px 0px 0px 20px" }}>
              <div>Instagram</div>
              <Input
                prefix={<InstagramOutlined />}
                name="instagram"
                placeholder="Instagram"
                allowClear
                onChange={onChangeInput}
                value={brandState.instagram}
                style={{ marginTop: 10, width: 250 }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "30px 0px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={sendRequest}
                loading={loading}
                style={{
                  width: 180,
                  backgroundColor: "#219653",
                  border: "none",
                }}
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default BrandAdd;
