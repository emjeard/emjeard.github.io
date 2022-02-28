import React, { useState, useEffect } from "react";
import { Input, Select, Checkbox } from "antd";
import store from "redux/store";
import { getListHpBattery } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const CheckingHp = () => {
  const [dataBattery, setDataBattery] = useState([]);
  const [dataOs, setDataOs] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {};

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
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
        id="screen"
        style={{
          background: "#A8BC7B",
        }}
        className="lay-segment"
      >
        Checking Data
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          padding: "10px",
          minHeight: 200,
        }}
      >
        <div>Jika data sudah complete, kosongan form lain-lain dibawah.</div>
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
