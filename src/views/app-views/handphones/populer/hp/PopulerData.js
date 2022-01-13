import React, { useState } from "react";
import { AutoComplete, Button } from "antd";
import { EditOutlined, LoginOutlined } from "@ant-design/icons";
import { getSearchHp } from "api/ApiData";

const { Option } = AutoComplete;

const PopulerData = (props) => {
  const [result, setResult] = useState([]);
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");

  const handleSearch = (value) => {
    getSearchHp(value)
      .then((response) => {
        if (response.status === true) {
          setResult(response.data);
        } else {
          setResult([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onSelect = (value, option) => {
    //console.log("onSelect", props.number + "-" + option.key);
    const key = option.key;
    const idHp = key.split("-image-")[0];
    const image = key.split("-image-")[1];
    setImage(image);
    setValue(value);
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
  //console.log("nama_hp", props.nama_hp);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          fontSize: "18px",
          display: "flex",
          flexBasis: "5%",
          padding: "5px 0px 0px 10px",
          alignItems: "center",
        }}
      >
        {props.number}
      </div>
      <AutoComplete
        allowClear={true}
        style={{
          display: "flex",
          alignItems: "center",
          flexBasis: "90%",
          padding: "0px 20px 0px 0px",
        }}
        notFoundContent={"Data tidak ditemukan"}
        onSearch={handleSearch}
        onSelect={onSelect}
        onChange={onChange}
        placeholder={"Cari hp"}
        defaultValue={props.nama_hp}
        value={value !== "" ? value : props.nama_hp}
      >
        {children}
      </AutoComplete>
      <img
        src={`https://ik.imagekit.io/inponsel/images/hape/${
          image === "" ? props.image : image
        }`}
        alt={props.nama_hp}
        width={"35px"}
        style={{
          padding: "3px",
          backgroundColor: "#f1f1f1",
          borderRadius: "3px",
        }}
      />
    </div>
  );
};
export default PopulerData;
