import React, { useState, useEffect } from "react";
import { Input, Select, Button, InputNumber } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const LazadaHp = () => {
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
      stateValue = null;
    }
    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };
  return (
    <div>
      <div id="lazada" className="lay-segment affix-lazada">
        Lazada
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          margin: 0,
        }}
      >
        <div className="lay-subsegment">
          <div style={{ padding: "0px 10px", margin: "0px 0px 0px 0px" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  minWidth: "150px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Product URL
              </div>
              <Input
                name="lazada_hp"
                defaultValue={store.getState().gen_hp_data.data.lazada_hp}
                onChange={onChangeInputGeneral}
                placeholder="http"
                style={{ width: "100%" }}
                allowClear
              />
            </div>
          </div>
          <div style={{ padding: "0px 10px", margin: "10px 0px 0px 0px" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  minWidth: "150px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Accessories URL
              </div>
              <Input
                name="lazada_acc"
                defaultValue={store.getState().gen_hp_data.data.lazada_acc}
                onChange={onChangeInputGeneral}
                placeholder="http"
                style={{ width: "100%" }}
                allowClear
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazadaHp;
