import React, { useState, useEffect } from "react";
import { Input, Select, DatePicker, InputNumber } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const PriceRangeHp = () => {
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
  const onChangeInputNumber = (e, name) => {
    const stateName = name;
    let stateValue = e;
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };
  const onChangeLastUpdate = (date, dateString) => {
    store.dispatch(HP_DATA_ACT("last_update", dateString));
  };
  const onChangeRilisDate = (date, dateString) => {
    store.dispatch(HP_DATA_ACT("release_idn", dateString));
  };

  return (
    <div>
      <div id="price" className="lay-segment affix-price">
        Price
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          margin: 0,
        }}
      >
        <div className="lay-subsegment">
          <div style={{ padding: "0px 10px" }}>
            <div style={{ color: "#bbb", fontSize: "0.8rem", fontWeight: 600 }}>
              Harga Baru
            </div>
            <div style={{ display: "flex", marginTop: 5 }}>
              <div style={{}}>
                <div style={{ fontSize: "12px", fontWeight: 500 }}>
                  Termurah
                </div>
                <InputNumber
                  name="price_new_from"
                  style={{ minWidth: "225px" }}
                  formatter={(value) =>
                    `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                  onChange={(e) => onChangeInputNumber(e, "price_new_from")}
                  defaultValue={
                    store.getState().gen_hp_data.data.price_new_from === 0
                      ? ""
                      : store.getState().gen_hp_data.data.price_new_from
                  }
                  placeholder="Termurah"
                  allowClear
                />
              </div>
              <div style={{ margin: "0px 0px 0px 25px" }}>
                <div style={{ fontSize: "12px", fontWeight: 500 }}>
                  Tertinggi
                </div>
                <InputNumber
                  name="price_new_end"
                  style={{ minWidth: "225px" }}
                  formatter={(value) =>
                    `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                  onChange={(e) => onChangeInputNumber(e, "price_new_end")}
                  defaultValue={store.getState().gen_hp_data.data.price_new_end === 0
                    ? ""
                    : store.getState().gen_hp_data.data.price_new_end}
                  placeholder="Tertinggi"
                  allowClear
                />
              </div>
            </div>
            <div
              style={{
                color: "#bbb",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginTop: 25,
              }}
            >
              Harga Bekas
            </div>
            <div style={{ display: "flex", marginTop: 5 }}>
              <div>
                <div>Termurah</div>
                <InputNumber
                  name="price_second_from"
                  style={{ minWidth: "225px" }}
                  formatter={(value) =>
                    `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                  onChange={(e) => onChangeInputNumber(e, "price_second_from")}
                  defaultValue={
                    store.getState().gen_hp_data.data.price_second_from === 0
                    ? ""
                    : store.getState().gen_hp_data.data.price_second_from
                  }
                  placeholder="Termurah"
                  allowClear
                />
              </div>
              <div style={{ margin: "0px 0px 0px 25px" }}>
                <div>Tertinggi</div>
                <InputNumber
                  name="price_second_end"
                  style={{ minWidth: "225px" }}
                  formatter={(value) =>
                    `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                  onChange={(e) => onChangeInputNumber(e, "price_second_end")}
                  defaultValue={
                    store.getState().gen_hp_data.data.price_second_end === 0
                    ? ""
                    : store.getState().gen_hp_data.data.price_second_end
                  }
                  placeholder="Tertinggi"
                  allowClear
                />
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 25 }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 500 }}>
                  Update terakhir
                </div>
                <DatePicker
                  onChange={onChangeLastUpdate}
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                  defaultValue={
                    store.getState().gen_hp_data.data.last_update === "" ||
                    store
                      .getState()
                      .gen_hp_data.data.release_idn.includes("000")
                      ? ""
                      : moment(
                          store.getState().gen_hp_data.data.last_update,
                          "YYYY-MM-DD HH:mm:ss"
                        )
                  }
                  style={{ minWidth: "225px" }}
                />
              </div>
              <div style={{ margin: "0px 0px 0px 25px" }}>
                <div style={{ fontSize: "12px", fontWeight: 500 }}>
                  Rilis di Indonesia
                </div>
                <DatePicker
                  onChange={onChangeRilisDate}
                  format="YYYY-MM-DD"
                  defaultValue={
                    store.getState().gen_hp_data.data.release_idn === "" ||
                    store
                      .getState()
                      .gen_hp_data.data.release_idn.includes("000")
                      ? ""
                      : moment(
                          store.getState().gen_hp_data.data.release_idn,
                          "YYYY-MM-DD"
                        )
                  }
                  style={{ minWidth: "225px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeHp;
