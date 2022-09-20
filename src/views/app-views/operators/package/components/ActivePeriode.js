import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const ActivePeriode = () => {
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

  function onSearchSelect(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <div
        id="op-masa-aktiv"
        className="lay-segment affix-op-masa-aktiv"
        style={{ color: "#212121" }}
      >
        Masa Aktiv
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Periode</div>
          <Select
            style={{ minWidth: 200, height: 38.5 }}
            name="masa_aktiv_periode"
            placeholder="Pilih Masa Aktiv"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.masa_aktiv_periode === "" ||
              store.getState().gen_hp_data.data.masa_aktiv_periode === 0
                ? undefined
                : store.getState().gen_hp_data.data.masa_aktiv_periode +
                  "--masa_aktiv_periode"
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1--masa_aktiv_periode">Harian</Option>
            <Option value="2--masa_aktiv_periode">Mingguan</Option>
            <Option value="3--masa_aktiv_periode">Bulanan</Option>
            <Option value="4--masa_aktiv_periode">Tahunan</Option>
            <Option value="5--masa_aktiv_periode">Reguler</Option>
            <Option value="0--masa_aktiv_periode">N/A</Option>
          </Select>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">Durasi</div>
          <Input.Group compact>
            <InputNumber
              name="masa_aktiv_durasi"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "masa_aktiv_durasi")}
              defaultValue={
                store.getState().gen_hp_data.data.masa_aktiv_durasi === "" ||
                store.getState().gen_hp_data.data.masa_aktiv_durasi === 0
                  ? undefined
                  : store.getState().gen_hp_data.data.masa_aktiv_durasi
              }
              placeholder=""
              allowClear
            />
            <Button className="lay-group-label" style={{ height: "40px" }}>
              Hari
            </Button>
          </Input.Group>
        </div>
      </div>
    </div>
  );
};

export default ActivePeriode;
