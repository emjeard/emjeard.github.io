import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const DataOperator = () => {
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
      <div id="op-data" className="lay-segment affix-op-data">
        Data
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Jaringan</div>
          <Select
            style={{ minWidth: 200, height: 38.5 }}
            name="data_jaringan"
            placeholder="Pilih Jaringan"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.data_jaringan === "" ||
              store.getState().gen_hp_data.data.data_jaringan === 0
                ? undefined
                : store.getState().gen_hp_data.data.data_jaringan
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1--data_jaringan">Seluler</Option>
            <Option value="2--data_jaringan">Kabel</Option>
            <Option value="3--data_jaringan">Seluler & Kabel</Option>
            <Option value="4--data_jaringan">WiFi</Option>
            <Option value="0--data_jaringan">N/A</Option>
          </Select>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">Kecepatan</div>
          <Input.Group compact>
            <InputNumber
              name="data_kecepatan_mbps"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "data_kecepatan_mbps")}
              defaultValue={
                store.getState().gen_hp_data.data.data_kecepatan_mbps === "" ||
                store.getState().gen_hp_data.data.data_kecepatan_mbps === 0
                  ? undefined
                  : store.getState().gen_hp_data.data.data_kecepatan_mbps
              }
              placeholder=""
              allowClear
            />
            <Button className="lay-group-label" style={{ height: "40px" }}>
              Mbps
            </Button>
          </Input.Group>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Jenis Paket</div>
          <Select
            style={{ minWidth: 200, height: 38.5 }}
            name="data_jenis_paket"
            placeholder="Pilih Jenis Paket"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.data_jenis_paket === "" ||
              store.getState().gen_hp_data.data.data_jenis_paket === 0
                ? undefined
                : store.getState().gen_hp_data.data.data_jenis_paket
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1--data_jenis_paket">Unlimited</Option>
            <Option value="2--data_jenis_paket">Non Unlimited</Option>
            <Option value="3--data_jenis_paket">Reguler</Option>
            <Option value="0--data_jenis_paket">N/A</Option>
          </Select>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">Kuota</div>
          <Input.Group compact>
            <InputNumber
              name="data_kuota_mb"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "data_kuota_mb")}
              defaultValue={
                store.getState().gen_hp_data.data.data_kuota_mb === "" ||
                store.getState().gen_hp_data.data.data_kuota_mb === 0
                  ? undefined
                  : store.getState().gen_hp_data.data.data_kuota_mb
              }
              placeholder=""
              allowClear
            />
            <Button className="lay-group-label" style={{ height: "40px" }}>
              MB
            </Button>
          </Input.Group>
        </div>
      </div>
    </div>
  );
};

export default DataOperator;
