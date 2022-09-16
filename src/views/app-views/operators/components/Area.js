import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import { getListProvince, getListCountry } from "api/ApiData";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const AreaOperator = () => {
  const [dataProvince, setDataProvince] = useState([]);
  const [dataCountry, setDataCountry] = useState([]);
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getProvince();
    getCountry();
  };
  const getProvince = () => {
    getListProvince(1, 1000, "").then((response) => {
      const data = response.data.map((item) => ({
        text: item.name,
        value: item.id + "--area_layanan_propinsi",
      }));
      setDataProvince(data);
    });
  };
  const getCountry = () => {
    getListCountry(1, 1000, "").then((response) => {
      const data = response.data.map((item) => ({
        text: item.country,
        value: item.id + "--area_layanan_negara",
      }));
      setDataCountry(data);
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
  const onChangeTagsPropinsi = (selectedItems, option) => {
    let stateValue = selectedItems;
    let finalStateValue = "";
    for (let i = 0; i < stateValue.length; i++) {
      finalStateValue += stateValue[i] + ",";
    }
    finalStateValue = finalStateValue
      .slice(0, -1)
      .replace(/--area_layanan_propinsi/g, "");

    store.dispatch(HP_DATA_ACT("area_layanan_propinsi", finalStateValue));
  };

  const onChangeTagsNegara = (selectedItems, option) => {
    let stateValue = selectedItems;
    let finalStateValue = "";
    for (let i = 0; i < stateValue.length; i++) {
      finalStateValue += stateValue[i] + ",";
    }
    finalStateValue = finalStateValue
      .slice(0, -1)
      .replace(/--area_layanan_negara/g, "");

    store.dispatch(HP_DATA_ACT("area_layanan_negara", finalStateValue));
  };
  let negaraArr = [];
  const negaraRepl = store
    .getState()
    .gen_hp_data.data.area_layanan_negara.replace(/, /g, ",");
  const negaraTags = negaraRepl.split(",");
  for (let i = 0; i < negaraTags.length; i++) {
    negaraArr.push(negaraTags[i] + "--area_layanan_negara");
  }

  let propinsiArr = [];
  const propinsiRepl = store
    .getState()
    .gen_hp_data.data.area_layanan_propinsi.replace(/, /g, ",");
  const propinsiTags = propinsiRepl.split(",");
  for (let i = 0; i < propinsiTags.length; i++) {
    propinsiArr.push(propinsiTags[i] + "--area_layanan_propinsi");
  }

  function onSearchSelect(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <div id="op-area-layanan" className="lay-segment affix-op-area-layanan">
        Area Layanan
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Area</div>
          <Select
            style={{ width: 400, height: 38.5 }}
            name="area_layanan"
            placeholder="Pilih Area"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.area_layanan === "" ||
              store.getState().gen_hp_data.data.area_layanan === 0
                ? undefined
                : store.getState().gen_hp_data.data.area_layanan +
                  "--area_layanan"
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1--area_layanan">Nasional</Option>
            <Option value="2--area_layanan">Internasional</Option>
            <Option value="3--area_layanan">Lokal</Option>
          </Select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="lay-subsegment"
          style={{ width: "-webkit-fill-available" }}
        >
          <div className="lbl-input-data">Propinsi</div>
          <Select
            mode="multiple"
            showSearch
            name="area-propinsi"
            placeholder="Pilih Propinsi"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={
              store.getState().gen_hp_data.data.area_layanan_propinsi === "" ||
              store.getState().gen_hp_data.data.area_layanan_propinsi === 0
                ? []
                : propinsiArr
            }
            onChange={onChangeTagsPropinsi}
            style={{ width: "-webkit-fill-available" }}
          >
            {dataProvince.map((item) => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="lay-subsegment"
          style={{ width: "-webkit-fill-available" }}
        >
          <div className="lbl-input-data">Kota</div>
          <Select
            style={{ width: "-webkit-fill-available", height: 38.5 }}
            name="op_jenis_paket"
            placeholder="Pilih Kota"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={undefined}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          ></Select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="lay-subsegment"
          style={{ width: "-webkit-fill-available" }}
        >
          <div className="lbl-input-data">Negara</div>
          <Select
            mode="multiple"
            style={{ width: "-webkit-fill-available", height: 38.5 }}
            name="op_jenis_paket"
            showSearch
            placeholder="Pilih Negara"
            optionFilterProp="children"
            onChange={onChangeTagsNegara}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.area_layanan_negara === "" ||
              store.getState().gen_hp_data.data.area_layanan_negara === 0
                ? []
                : negaraArr
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dataCountry.map((item) => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AreaOperator;
