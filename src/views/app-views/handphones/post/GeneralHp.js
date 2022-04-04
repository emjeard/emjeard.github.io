import React, { useState, useEffect, useCallback } from "react";
import {
  Input,
  Select,
  Card,
  Tooltip,
  DatePicker,
  Button,
  Checkbox,
  BackTop,
} from "antd";
import { InfoCircleOutlined, SaveOutlined } from "@ant-design/icons";
import Drag from "./Drag";
import store from "redux/store";
import { GEN_INPUT_ACT } from "redux/actions/General";
import { getListBrands, getListHpModel, getListHpStatus } from "api/ApiData";

const { Option } = Select;
const { TextArea } = Input;

const GeneralHp = () => {
  const [dataTagBrand, setDataTagBrand] = useState([]);
  const [dataHpModel, setDataHpModel] = useState([]);
  const [dataHpStatus, setDataHpStatus] = useState([]);
  const [dataDefTagBrand, setDefDataTagBrand] = useState([]);
  const [size, setSize] = useState("default");

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getTagBrand();
    getTagModelHp();
    getHpStatus();
  };

  function onSearchSelect(val) {
    console.log("search:", val);
  }
  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
    }
    store.dispatch(GEN_INPUT_ACT(stateName, stateValue));
  };

  const onChangeGenDiumumkan = (date, dateString) => {
    store.dispatch(GEN_INPUT_ACT("gen_diumumkan", dateString + "-01"));
  };

  const onChangeSelectGeneral = (selectedItems, option) => {
    const splitOptions = option.key.split("--");
    const stateName = splitOptions[1];
    const valueSelect = splitOptions[0];
    store.dispatch(GEN_INPUT_ACT(stateName, parseInt(valueSelect)));
  };

  const onChangeTagsGeneral = (selectedItems, option) => {
    store.dispatch(GEN_INPUT_ACT("gen_tags", selectedItems));
  };

  const getTagBrand = () => {
    getListBrands(1, 1000, "merk:asc").then((response) => {
      const data = response.data.map((item) => ({
        text: item.merk,
        value: item.id + "--gen_merk",
      }));
      setDataTagBrand(data);
    });
  };
  const getTagModelHp = () => {
    getListHpModel().then((response) => {
      const data = response.data.map((item) => ({
        text: item.model,
        value: item.id + "--gen_model",
      }));
      setDataHpModel(data);
    });
  };

  const getHpStatus = () => {
    getListHpStatus().then((response) => {
      const data = response.data.map((item) => ({
        text: item.status,
        value: item.id + "--gen_hpstatus",
      }));
      setDataHpStatus(data);
    });
  };

  return (
    <div>
      <div
        style={{
          background: "#999999",
        }}
        className="lay-segment"
      >
        General
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="layout-input-data-col"
          style={{
            width: "100%",
            minHeight: 200,
          }}
        >
          <div style={{ display: "flex" }}>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Merek</div>
              <Select
                style={{ minWidth: 200 }}
                showSearch
                name="gen_merk"
                placeholder="Pilih merek"
                optionFilterProp="children"
                onChange={onChangeSelectGeneral}
                onSearch={onSearchSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {dataTagBrand.map((item) => (
                  <Option key={item.value}>{item.text}</Option>
                ))}
              </Select>
            </div>
            <div
              className="lay-subsegment"
              style={{ margin: "0px 0px 0px 20px" }}
            >
              <div className="lbl-input-data">
                <Tooltip
                  placement="rightTop"
                  title={"Contoh: Galaxy S22"}
                  color={"orange"}
                  key={"orange"}
                >
                  <span style={{ marginRight: 6 }}>Tipe</span>
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
              <Input
                placeholder="Contoh: Galaxy S22"
                style={{ minWidth: 230 }}
                name="gen_tipe"
                onChange={onChangeInputGeneral}
                value={store.getState().hpproscons.gen_tipe}
              />
            </div>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Tags</div>
            <Select
              mode="tags"
              size={size}
              name="gen_tags"
              placeholder=""
              defaultValue={[]}
              onChange={onChangeTagsGeneral}
              style={{ width: "100%" }}
            ></Select>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Keterangan Tambahan</div>
            <TextArea
              rows={4}
              name="gen_add_info"
              placeholder=""
              onChange={onChangeInputGeneral}
              value={store.getState().hpproscons.gen_add_info}
            />
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Gambar</div>
            <Drag image={""} />
          </div>
        </div>
        <div
          className="layout-input-data-col"
          style={{
            width: "100%",
            minHeight: 200,
          }}
        >
          <div className="lay-subsegment">
            <div className="lbl-input-data">Model</div>
            <Select
              name="gen_model"
              style={{ minWidth: 230 }}
              showSearch
              placeholder="Pilih model"
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              onSearch={onSearchSelect}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {dataHpModel.map((item) => (
                <Option key={item.value}>{item.text}</Option>
              ))}
            </Select>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Dimensi</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Input
                addonAfter={
                  <span className="lay-group-label">mm (panjang)</span>
                }
                defaultValue=""
                onChange={onChangeInputGeneral}
                name="gen_panjang"
                style={{ width: 170 }}
              />
              <Input
                addonAfter={<span className="lay-group-label">mm (lebar)</span>}
                defaultValue=""
                onChange={onChangeInputGeneral}
                name="gen_lebar"
                style={{ width: 150, margin: "0px 0px 0px 20px" }}
              />
              <Input
                addonAfter={<span className="lay-group-label">mm (tebal)</span>}
                defaultValue=""
                onChange={onChangeInputGeneral}
                name="gen_tebal"
                style={{ width: 150, margin: "10px 0px 0px 0px" }}
              />
            </div>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Bobot</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Input
                addonAfter={<span className="lay-group-label">gram</span>}
                defaultValue=""
                onChange={onChangeInputGeneral}
                style={{ width: 120 }}
                name="gen_bobot"
              />
              <Input
                defaultValue=""
                onChange={onChangeInputGeneral}
                name="gen_bobot_info"
                style={{ width: 250, margin: "0px 0px 0px 20px" }}
              />
            </div>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Warna</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Input
                defaultValue=""
                onChange={onChangeInputGeneral}
                name="gen_warna"
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
              />
            </div>
          </div>
          <div className="lay-subsegment">
            <div style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Diumumkan</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <Input.Group compact>
                    <DatePicker
                      style={{ width: 130 }}
                      onChange={onChangeGenDiumumkan}
                      name="gen_diumumkan"
                      picker="month"
                    />
                    <Button
                      style={{ width: 80, padding: "5px 0px 0px 0px" }}
                      icon={
                        <Checkbox
                          name="gen_diumumkan__cb"
                          onChange={onChangeInputGeneral}
                          style={{
                            position: "relative",
                            top: "-5px",
                          }}
                        />
                      }
                    >
                      <span
                        style={{
                          position: "relative",
                          top: "-5px",
                          margin: "0px 0px 0px 5px",
                        }}
                      >
                        N/A
                      </span>
                    </Button>
                  </Input.Group>
                </div>
              </div>
              <div style={{ margin: "0px 0px 0px 20px" }}>
                <div className="lbl-input-data">Status</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <Select
                    name="gen_status"
                    style={{ minWidth: 230 }}
                    showSearch
                    placeholder="Pilih status"
                    optionFilterProp="children"
                    onChange={onChangeSelectGeneral}
                    onSearch={onSearchSelect}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dataHpStatus.map((item) => (
                      <Option key={item.value}>{item.text}</Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralHp;
