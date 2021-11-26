import React, { useState } from "react";
import { AutoComplete, Button } from "antd";
import { EditOutlined, LoginOutlined } from "@ant-design/icons";
import { getSearchHp } from "api/ApiData";

const { Option } = AutoComplete;

const PopulerData = (props) => {
  const [result, setResult] = useState([]);
  const [value, setValue] = useState("");

  const handleSearch = (value) => {
    getSearchHp(value)
      .then((response) => {
        setResult(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onSelect = (value, option) => {
    console.log("onSelect", props.number + "-" + option.key);
    const key = option.key;
    const idHp = key.split("-image-")[0];
    const image = key.split("-image-")[1];
    setValue(image);
    props.parentCallback(props.number + "-" + idHp);
  };
  const onChange = (data) => {
    setValue(data);
  };

  const children = result.map((items) => (
    <Option key={items.id + "-image-" + items.image} value={items.nama_hp}>
      {items.nama_hp}
    </Option>
  ));
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          fontSize: "18px",
          display: "flex",
          flexBasis: "5%",
        }}
      >
        {props.number}
      </div>
      <AutoComplete
        style={{
          flexBasis: "85%",
          padding: "0px 40px 0px 0px",
        }}
        onSearch={handleSearch}
        onSelect={onSelect}
        placeholder={"Cari hp"}
        defaultValue={props.nama_hp}
      >
        {children}
      </AutoComplete>
      <img
        src={`https://ik.imagekit.io/inponsel/images/hape/${
          value === "" ? props.image : value
        }`}
        alt={props.nama_hp}
        width={"75px"}
      />
    </div>
  );
};
export default PopulerData;
