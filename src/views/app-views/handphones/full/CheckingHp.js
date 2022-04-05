import React, { useState, useEffect } from "react";
import { Input, Select, Checkbox } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const CheckingHp = () => {
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
        id="checking"
        style={{
          background: "#673AB7",
        }}
        className="lay-segment"
      >
        Checking Data
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
        }}
      >
        <div style={{ padding: "10px 0px", fontWeight: 500 }}>
          Jika data sudah complete, kosongan form lain-lain dibawah.
        </div>
        <div>
          <TextArea
            name="checkingdata_hp"
            defaultValue={store.getState().gen_hp_data.data.checkingdata_hp}
            onChange={onChangeInputGeneral}
            style={{ width: "100%", margin: "0px 0px 0px 0px" }}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckingHp;
