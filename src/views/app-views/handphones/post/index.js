import React, { useState, useEffect, useCallback } from "react";
import {
  Input,
  Select,
  Card,
  Tooltip,
  DatePicker,
  Button,
  Checkbox,
  BackTop,
} from "antd";
import { InfoCircleOutlined, SaveOutlined } from "@ant-design/icons";
import Drag from "./Drag";
import store from "redux/store";
import { GEN_INPUT_ACT } from "redux/actions/General";
import GeneralHp from "./GeneralHp";
import NetworkHp from "./NetworkHp";

const { Option } = Select;
const { TextArea } = Input;

const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

const PostHandphoneApp = () => {
  const [size, setSize] = useState("default");
  const [imageUrl, setImageUrl] = useState("");
  const [generalState, setGeneralState] = useState({
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

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  function onChangeMerk(value) {
    console.log(`selected ${value}`);
  }

  function onSearchMerk(val) {
    console.log("search:", val);
  }

  function onChangeModel(value) {
    console.log(`selected ${value}`);
  }

  function onSearchModel(val) {
    console.log("search:", val);
  }

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  const callback = useCallback((value) => {
    setImageUrl(value);
  }, []);

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    store.dispatch(GEN_INPUT_ACT(stateName, e.target.value));

    /* if (stateName === "gen_tipe") {
      store.dispatch(GEN_TIPE_ACT(e.target.value));
    } else if (stateName === "gen_add_info") {
      store.dispatch(GEN_ADD_INFO_ACT(e.target.value));
    } */
    /* setBrandState({
      ...brandState,
      [e.target.name]: e.target.value,
    }); */
  };
  const onSubmitHp = (e) => {
    console.log("gen_tipe", store.getState().gen_hp_data.gen_tipe);
    console.log("gen_add_info", store.getState().gen_hp_data.gen_add_info);
  };
  return (
    <div>
      <Card>
        <GeneralHp />
        <NetworkHp />
        <div
          style={{
            background: "#F0AD4E",
          }}
          className="lay-segment"
        >
          Screen
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <div
              className="layout-input-data-col"
              style={{
                width: "100%",
                padding: "10px",
                minHeight: 200,
              }}
            ></div>
            <div
              className="layout-input-data-col"
              style={{
                width: "100%",
                padding: "10px",
                minHeight: 200,
              }}
            ></div>
          </div>
        </div>
        <Button
          onClick={onSubmitHp}
          type="primary"
          icon={<SaveOutlined />}
          style={{
            width: "-webkit-fill-available",
            margin: "15px 0px 10px 0px",
          }}
        >
          Save
        </Button>
      </Card>
      <BackTop>
        <div style={style} onClick={() => console.log("top")}>
          UP
        </div>
      </BackTop>
    </div>
  );
};

export default PostHandphoneApp;
