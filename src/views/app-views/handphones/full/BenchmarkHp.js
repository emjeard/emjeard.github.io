import React, { useState, useEffect } from "react";
import { Input, Select, Button, InputNumber } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const BenchmarkHp = () => {
  const [dataMemJen, setDataMemJen] = useState([]);
  const [dataMemKap, setDataMemKap] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {};

  const getStateValue = (e) => {
    let stateName = e.target.name;
    console.log("getStateValue", stateName);
    let stateValue = store.getState().gen_hp_data.data[stateName];
    return stateValue;
  };

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };

  const onChangeSelectGeneral = (selectedItems, option) => {
    const splitOptions = option.value.split("--");
    const stateName = splitOptions[1];
    const valueSelect = splitOptions[0];
    store.dispatch(HP_DATA_ACT(stateName, valueSelect));
  };

  return (
    <div>
      <div
        id="network"
        style={{
          background: "#555555",
        }}
        className="lay-segment"
      >
        Benchmark
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          padding: "10px",
          minHeight: 200,
        }}
      >
        <div className="lay-subsegment">
          <div style={{ display: "flex" }}>
            <div>
              <div className="lbl-input-data">Antutu</div>
              <div>
                <InputNumber
                  style={{ minWidth: "150px" }}
                  name="antutu_score1"
                  defaultValue={store.getState().gen_hp_data.data.antutu_score1}
                  onChange={onChangeInputGeneral}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
              <div>
                <InputNumber
                  style={{ minWidth: "150px", margin: "15px 0px 0px 0px" }}
                  name="antutu_score2"
                  defaultValue={store.getState().gen_hp_data.data.antutu_score2}
                  onChange={onChangeInputGeneral}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
              <InputNumber
                style={{ minWidth: "150px", margin: "15px 0px 0px 0px" }}
                name="antutu_score3"
                defaultValue={store.getState().gen_hp_data.data.antutu_score3}
                onChange={onChangeInputGeneral}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </div>
            <div style={{ margin: "0px 0px 0px 30px" }}>
              <div className="lbl-input-data">Sumber</div>
              <div>
                <Input
                  name="antutu_url_1"
                  defaultValue={store.getState().gen_hp_data.data.antutu_url_1}
                  onChange={onChangeInputGeneral}
                  style={{ minWidth: "350px", margin: "0px 0px 0px 0px" }}
                />
              </div>
              <div>
                <Input
                  name="antutu_url_2"
                  defaultValue={store.getState().gen_hp_data.data.antutu_url_2}
                  onChange={onChangeInputGeneral}
                  style={{ minWidth: "350px", margin: "15px 0px 0px 0px" }}
                />
              </div>
              <div>
                <Input
                  name="antutu_url_3"
                  defaultValue={store.getState().gen_hp_data.data.antutu_url_3}
                  onChange={onChangeInputGeneral}
                  style={{ minWidth: "350px", margin: "15px 0px 0px 0px" }}
                />
              </div>
            </div>
            <div style={{ margin: "0px 0px 0px 30px" }}>
              <div className="lbl-input-data">Keterangan Tambahan</div>
              <div>
                <Input
                  name="antutu_ket_1"
                  defaultValue={store.getState().gen_hp_data.data.antutu_ket_1}
                  onChange={onChangeInputGeneral}
                  style={{ minWidth: "350px", margin: "0px 0px 0px 0px" }}
                />
              </div>
              <div>
                <Input
                  name="antutu_ket_2"
                  defaultValue={store.getState().gen_hp_data.data.antutu_ket_2}
                  onChange={onChangeInputGeneral}
                  style={{ minWidth: "350px", margin: "15px 0px 0px 0px" }}
                />
              </div>
              <div>
                <Input
                  name="antutu_ket_3"
                  defaultValue={store.getState().gen_hp_data.data.antutu_ket_3}
                  onChange={onChangeInputGeneral}
                  style={{ minWidth: "350px", margin: "15px 0px 0px 0px" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Youtube URL</div>
          <Input
            name="antutu_youtube"
            defaultValue={store.getState().gen_hp_data.data.antutu_youtube}
            onChange={onChangeInputGeneral}
            style={{ maxWidth: "350px", margin: "0px 0px 0px 0px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default BenchmarkHp;
