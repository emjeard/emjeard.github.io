import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import { InfoCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { getListOperator } from "api/ApiData";
import Drag from "./Drag";

const { TextArea } = Input;

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const GeneralOperator = () => {
  const [dataOperator, setDataOperator] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getOperator();
  };
  const getOperator = () => {
    getListOperator(1, 1000, "").then((response) => {
      const data = response.data.map((item) => ({
        text: item.name,
        value: item.id + "--id_operator",
      }));
      setDataOperator(data);
    });
  };
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

  function onSearchSelect(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <div id="op-general" className="lay-segment affix-op-general">
        General
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div className="lbl-input-data">Nama Operator</div>
          <Input
            placeholder="Contoh: Telkomsel"
            style={{ minWidth: 230 }}
            name="name"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.name == null
                ? undefined
                : store.getState().gen_hp_data.data.name
            }
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Logo (600x600)</div>
          <div style={{ position: "relative" }}>
            <Drag image={""} id="img-operator" className="drag-operator"/>
          </div>
        </div>
        <div
          className="lay-subsegment"
          style={{
            margin: "0px 0px 0px 50px",
            width: "-webkit-fill-available",
          }}
        >
          <div className="lbl-input-data">Alamat</div>
          <TextArea
            style={{ width: "-webkit-fill-available" }}
            rows={4}
            name="addr"
            placeholder=""
            onChange={onChangeInputGeneral}
            value={store.getState().hpproscons.addr}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralOperator;
