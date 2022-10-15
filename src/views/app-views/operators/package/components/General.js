import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import { InfoCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { getListOperator } from "api/ApiData";

const { TextArea } = Input;

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const GeneralOperator = () => {
  const [dataOperator, setDataOperator] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getOperator();
  };
  const getOperator = () => {
    getListOperator(1, 1000, "").then((response) => {
      const data = response.data.map((item) => ({
        text: item.name,
        value: item.id + "--id_operator",
      }));
      setDataOperator(data);
    });
  };
  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;
    if (stateValue === "") {
      stateValue = null;
    }
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
        id="op-general"
        className="lay-segment affix-op-general"
        style={{ color: "#212121" }}
      >
        General
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div className="lbl-input-data" style={{ color: "#777" }}>
            Nama Paket
          </div>
          <Input
            placeholder="Contoh: Combo Sakti Unlimited 15GB"
            style={{ minWidth: 230 }}
            name="name"
            onChange={onChangeInputGeneral}
            defaultValue={
              store.getState().gen_hp_data.data.name == null
                ? undefined
                : store.getState().gen_hp_data.data.name
            }
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data" style={{ color: "#aaa" }}>
            Jenis Layanan
          </div>
          <Select
            style={{ minWidth: 200, height: 38.5 }}
            name="jenis_layanan"
            placeholder="Pilih Jenis Layanan"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.jenis_layanan === "" ||
              store.getState().gen_hp_data.data.jenis_layanan === 0
                ? undefined
                : store.getState().gen_hp_data.data.jenis_layanan +
                  "--jenis_layanan"
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1--jenis_layanan">Internet</Option>
            <Option value="2--jenis_layanan">Telpon</Option>
            <Option value="3--jenis_layanan">Internet & Telpon</Option>
            <Option value="4--jenis_layanan">Internet & Hiburan</Option>
            <Option value="5--jenis_layanan">Telpon & SMS</Option>
            <Option value="6--jenis_layanan">Telpon Internasional</Option>
            <Option value="7--jenis_layanan">Internet Internasional</Option>
            <Option value="8--jenis_layanan">Lainnya</Option>
          </Select>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">Operator</div>
          <Select
            style={{ minWidth: 200, height: 38.5 }}
            name="id_operator"
            placeholder="Pilih Operator"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.id_operator === "" ||
              store.getState().gen_hp_data.data.id_operator === 0
                ? undefined
                : store.getState().gen_hp_data.data.id_operator +
                  "--id_operator"
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dataOperator.map((item) => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Jenis Paket</div>
          <Select
            style={{ minWidth: 200, height: 38.5 }}
            name="jenis_paket"
            placeholder="Pilih Jenis Paket"
            optionFilterProp="children"
            onChange={onChangeSelectGeneral}
            onSearch={onSearchSelect}
            defaultValue={
              store.getState().gen_hp_data.data.jenis_paket === "" ||
              store.getState().gen_hp_data.data.jenis_paket === 0
                ? undefined
                : store.getState().gen_hp_data.data.jenis_paket +
                  "--jenis_paket"
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1--jenis_paket">Pra Bayar</Option>
            <Option value="2--jenis_paket">Pasca Bayar</Option>
            <Option value="0--jenis_paket">N/A</Option>
          </Select>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">Harga (Rp)</div>
          <InputNumber
            name="price"
            style={{ width: 200 }}
            formatter={(value) =>
              `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
            onChange={(e) => onChangeInputNumber(e, "price")}
            defaultValue={
              store.getState().gen_hp_data.data.price === "" ||
              store.getState().gen_hp_data.data.price === 0
                ? undefined
                : store.getState().gen_hp_data.data.price
            }
            placeholder=""
            allowClear
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralOperator;
