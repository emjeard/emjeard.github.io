import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const Telpon = () => {
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {};

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

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
  const onChangeCb = (e, name) => {
    const stateName = name;
    const checked = e.target.checked;
    const is_unlimited = checked === true ? 1 : 0;
    console.log(`checked = ${checked} ${stateName}`);
    store.dispatch(HP_DATA_ACT(stateName, is_unlimited));
  };
  function onSearchSelect(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <div id="op-telpon" className="lay-segment affix-op-telpon">
        Telpon
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Telpon Sesama</div>
          <Input.Group compact>
            <InputNumber
              name="telpon_sesama_menit"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "telpon_sesama_menit")}
              defaultValue={
                store.getState().gen_hp_data.data.telpon_sesama_menit === "" ||
                store.getState().gen_hp_data.data.telpon_sesama_menit === 0
                  ? undefined
                  : store.getState().gen_hp_data.data.telpon_sesama_menit
              }
              placeholder=""
              allowClear
            />
            <Button className="lay-group-label" style={{ height: "40px" }}>
              Menit
            </Button>
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox
              onChange={(e) => onChangeCb(e, "telpon_sesama_menit_unl")}
            >
              Unlimited
            </Checkbox>
          </div>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">SMS Sesama</div>
          <Input.Group compact>
            <InputNumber
              name="sms_sesama"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "sms_sesama")}
              defaultValue={
                store.getState().gen_hp_data.data.sms_sesama === "" ||
                store.getState().gen_hp_data.data.sms_sesama === 0
                  ? undefined
                  : store.getState().gen_hp_data.data.sms_sesama
              }
              placeholder=""
              allowClear
            />
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox onChange={(e) => onChangeCb(e, "sms_sesama_unl")}>
              Unlimited
            </Checkbox>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Telpon Antar Operator</div>
          <Input.Group compact>
            <InputNumber
              name="telpon_antar_operator_menit"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) =>
                onChangeInputNumber(e, "telpon_antar_operator_menit")
              }
              defaultValue={
                store.getState().gen_hp_data.data
                  .telpon_antar_operator_menit === "" ||
                store.getState().gen_hp_data.data
                  .telpon_antar_operator_menit === 0
                  ? undefined
                  : store.getState().gen_hp_data.data
                      .telpon_antar_operator_menit
              }
              placeholder=""
              allowClear
            />
            <Button className="lay-group-label" style={{ height: "40px" }}>
              Menit
            </Button>
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox
              onChange={(e) => onChangeCb(e, "telpon_antar_operator_menit_unl")}
            >
              Unlimited
            </Checkbox>
          </div>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">SMS Antar Operator</div>
          <Input.Group compact>
            <InputNumber
              name="sms_antar_operator"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "sms_antar_operator")}
              defaultValue={
                store.getState().gen_hp_data.data.sms_antar_operator === "" ||
                store.getState().gen_hp_data.data.sms_antar_operator === 0
                  ? undefined
                  : store.getState().gen_hp_data.data.sms_antar_operator
              }
              placeholder=""
              allowClear
            />
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox onChange={(e) => onChangeCb(e, "sms_antar_operator_unl")}>
              Unlimited
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Telpon;
