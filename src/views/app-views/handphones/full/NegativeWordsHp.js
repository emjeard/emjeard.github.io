import React, { useState, useEffect } from "react";
import { Input, Select, Button, InputNumber } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const NegativeWordsHp = () => {
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {};

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };
  return (
    <div>
      <div
        id="negativekeywords"
        className="lay-segment affix-negativekeywords"
      >
        Negative keywords
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
        }}
      >
        <div className="lay-subsegment">
          <Input
            name="negative_keywords"
            placeholder="Negative keywords"
            defaultValue={store.getState().gen_hp_data.data.negative_keywords}
            onChange={onChangeInputGeneral}
            style={{ width: "100%" }}
            allowClear
          />
        </div>
      </div>
    </div>
  );
};

export default NegativeWordsHp;
