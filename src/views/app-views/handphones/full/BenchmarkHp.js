import React, { useState, useEffect } from "react";
import { Input, Select, Button, InputNumber } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const BenchmarkHp = () => {
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

  const onChangeInputNumber = (e, name) => {
    const stateName = name;
    let stateValue = e;
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };

  return (
    <div>
      <div id="benchmark" className="lay-segment affix-benchmark">
        Benchmark
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
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
                  onChange={(e) => onChangeInputNumber(e, "antutu_score1")}
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
                  onChange={(e) => onChangeInputNumber(e, "antutu_score2")}
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
                onChange={(e) => onChangeInputNumber(e, "antutu_score3")}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </div>
            <div style={{ margin: "0px 0px 0px 30px" }}>
              <div className="lbl-input-data">URL Youtube</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkHp;
