import React, { useState, useEffect } from "react";
import { Input, Select, Button, InputNumber } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";

const { Option } = Select;
const { TextArea } = Input;

const ProsConsHp = () => {
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
      <div id="proscons" className="lay-segment affix-proscons">
        Kelebihan dan Kekurangan
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          margin: 0,
        }}
      >
        <div className="lay-subsegment">
          <div
            style={{
              fontWeight: 500,
              color: "#313131",
              padding: "0px 0px 5px",
              margin: "0px 0px 0px 0px",
            }}
          >
            <div style={{ fontWeight: 500 }}>{`Kelebihan ${
              store.getState().gen_hp_data.data.namalengkap
            }`}</div>
            <div style={{ margin: "5px 0px 0px" }}>
              <CKEditorCustom editor_type={"hp_pros"} />
              <div style={{ fontSize: "11px", fontWeight: 400 }}>Contoh :</div>
              <div>
                <ul>
                  <li style={{ fontSize: "11px", fontWeight: 400 }}>
                    Daya tahan baterai cukup lama
                  </li>
                  <li style={{ fontSize: "11px", fontWeight: 400 }}>
                    Desain ringkas dengan Invinity V Display
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                fontWeight: 500,
                color: "#313131",
                padding: "0px 0px 5px",
                margin: "20px 0px 0px 0px",
              }}
            >{`Kekurangan ${
              store.getState().gen_hp_data.data.namalengkap
            }`}</div>
            <div style={{ margin: "5px 0px 0px" }}>
              <CKEditorCustom editor_type={"hp_cons"} />
              <div style={{ fontSize: "11px", fontWeight: 400 }}>Contoh:</div>
              <ul>
                <li style={{ fontSize: "11px", fontWeight: 400 }}>Kinerja kurang gesit</li>
                <li style={{ fontSize: "11px", fontWeight: 400 }}>Memori internal hanya 16GB&nbsp;</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProsConsHp;
