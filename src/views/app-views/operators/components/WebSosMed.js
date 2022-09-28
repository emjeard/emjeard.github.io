import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { TextArea } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const WebSosMed = () => {
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {};

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;
    if (stateValue === "") {
      stateValue = "-";
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };
  const onChangeSelectGeneral = (selectedItems, option) => {
    console.log();
    const splitOptions = option.value.split("--");
    const stateName = splitOptions[1];
    const valueSelect = splitOptions[0];
    store.dispatch(HP_DATA_ACT(stateName, parseInt(valueSelect)));
  };
  const onChangeInputNumber = (e, name) => {
    const stateName = name;
    let stateValue = e;
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };

  function onSearchSelect(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <div
        id="op-data"
        style={{ color: "#212121" }}
        className="lay-segment affix-op-data"
      >
        Web & Social Media
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Website</div>
          <Input
            placeholder="Contoh: telkomsel.com"
            style={{ minWidth: 230 }}
            name="url"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.url == null ||
              store.getState().gen_hp_data.data.url === "-"
                ? undefined
                : store.getState().gen_hp_data.data.url
            }
          />
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">Instagram</div>
          <Input
            placeholder="Contoh: @telkomsel"
            style={{ minWidth: 230 }}
            name="instagrm"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.instagrm == null ||
              store.getState().gen_hp_data.data.instagrm === "-"
                ? undefined
                : store.getState().gen_hp_data.data.instagrm
            }
          />
        </div>
        <div
          className="lay-subsegment"
          style={{
            margin: "0px 0px 0px 50px",
            width: "-webkit-fill-available",
          }}
        >
          <div className="lbl-input-data">No Telp / CS</div>
          <TextArea
            style={{ width: "-webkit-fill-available", minHeight: "100px" }}
            rows={3}
            placeholder="Contoh: 021789456123"
            name="c_center"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.c_center == null ||
              store.getState().gen_hp_data.data.c_center === "-"
                ? undefined
                : store.getState().gen_hp_data.data.c_center
            }
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Facebook ID</div>
          <Input
            placeholder="Contoh: 17662812631"
            style={{ minWidth: 230 }}
            name="fb"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.fb == null ||
              store.getState().gen_hp_data.data.fb === "-"
                ? undefined
                : store.getState().gen_hp_data.data.fb
            }
          />
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">TikTok</div>
          <Input
            placeholder="Contoh: @Telkomsel"
            style={{ minWidth: 230 }}
            name="tiktok"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.tiktok == null ||
              store.getState().gen_hp_data.data.tiktok === "-"
                ? undefined
                : store.getState().gen_hp_data.data.tiktok
            }
          />
        </div>
        <div
          className="lay-subsegment"
          style={{
            margin: "0px 0px 0px 50px",
            width: "-webkit-fill-available",
          }}
        >
          <div className="lbl-input-data">Email</div>
          <TextArea
            style={{ width: "-webkit-fill-available", minHeight: "100px" }}
            rows={3}
            placeholder="Contoh: info@telkomsel"
            name="em"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.em == null ||
              store.getState().gen_hp_data.data.em === "-"
                ? undefined
                : store.getState().gen_hp_data.data.em
            }
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Twitter</div>
          <Input
            placeholder="Contoh: @telkomsel"
            style={{ minWidth: 230 }}
            name="tw"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.tw == null ||
              store.getState().gen_hp_data.data.tw === "-"
                ? undefined
                : store.getState().gen_hp_data.data.tw
            }
          />
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">Youtube</div>
          <Input
            placeholder="Contoh: Telkomsel"
            style={{ minWidth: 230 }}
            name="ytube"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.ytube == null ||
              store.getState().gen_hp_data.data.ytube === "-"
                ? undefined
                : store.getState().gen_hp_data.data.ytube
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WebSosMed;
