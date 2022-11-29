import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
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
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";

import { getListBrands, getListHpModel, getListHpStatus } from "api/ApiData";
import { parseInt } from "lodash";

const { Option } = Select;
const { TextArea } = Input;

const GeneralHp = () => {
  const monthFormat = "YYYY-MM";
  const [dataTagBrand, setDataTagBrand] = useState([]);
  const [dataHpModel, setDataHpModel] = useState([]);
  const [dataHpStatus, setDataHpStatus] = useState([]);
  const [dataUmuDiumumkanStat, setDataUmuDiumumkanStat] = useState(true);
  const [dataCodename, setDataCodename] = useState("");
  const [dataMerk, setDataMerk] = useState("");
  const [dataModel, setDataModel] = useState("");
  const [size, setSize] = useState("default");

  let tagsRepl = store.getState().gen_hp_data.data.umu_tags.replace(/, /g, ",");
  let tags = tagsRepl.split(",");
  let tagsArr = [];
  for (let i = 0; i < tags.length; i++) {
    tagsArr.push(tags[i]);
  }

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getTagBrand();
    getTagModelHp();
    getHpStatus();
    setDataCodename(store.getState().gen_hp_data.data.codename);
    setDataMerk(store.getState().gen_hp_data.data.merk);
    setDataModel(store.getState().gen_hp_data.data.model);
    /*  if (store.getState().gen_hp_data.data.umu_diumumkan !== "") {
      setDataUmuDiumumkanStat(false);
    } else {
      setDataUmuDiumumkanStat(true);
    } */
  };

  function onSearchSelect(val) {
    console.log("search:", val);
  }
  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

    if (stateValue === "") {
      stateValue = null;
    }

    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
      setDataUmuDiumumkanStat(!dataUmuDiumumkanStat);
    }

    if (stateName.includes("model")) {
      let merk = dataMerk;
      let model = stateValue;
      let namalengkap = merk + " " + model;
      let codename = namalengkap.replace(/ /g, "");
      let slug = slugify(namalengkap);
      setDataModel(model);
      store.dispatch(HP_DATA_ACT("codename", codename));
      store.dispatch(HP_DATA_ACT("slug", slug.toLowerCase()));
      store.dispatch(HP_DATA_ACT("merk", merk));
      store.dispatch(HP_DATA_ACT("namalengkap", namalengkap));
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));

    if (
      stateName.includes("umu_dim_panjang") ||
      stateName.includes("umu_dim_lebar") ||
      stateName.includes("umu_dim_tebal") ||
      stateName.includes("umu_bobot")
    ) {
      store.dispatch(HP_DATA_ACT(stateName, parseFloat(stateValue)));
    }
  };

  const onChangeGenDiumumkan = (date, dateString) => {
    store.dispatch(HP_DATA_ACT("umu_diumumkan", dateString + "-01"));
  };

  const onChangeSelectGeneral = (selectedItems, option) => {
    console.log();
    const splitOptions = option.value.split("--");
    const stateName = splitOptions[1];
    const valueSelect = splitOptions[0];
    store.dispatch(HP_DATA_ACT(stateName, parseInt(valueSelect)));

    if (option.value.includes("--id_merk")) {
      let merk = option.children;
      let model = dataModel;
      let namalengkap = merk + " " + model;
      let codename = namalengkap.replace(/ /g, "");
      let slug = slugify(namalengkap);
      setDataMerk(merk);
      store.dispatch(HP_DATA_ACT("codename", codename));
      store.dispatch(HP_DATA_ACT("slug", slug.toLowerCase()));
      store.dispatch(HP_DATA_ACT("merk", merk));
      store.dispatch(HP_DATA_ACT("namalengkap", namalengkap));
    }
  };

  const onChangeTagsGeneral = (selectedItems, option) => {
    console.log(selectedItems);
    let finalStateValue = "";
    for (let i = 0; i < selectedItems.length; i++) {
      finalStateValue += selectedItems[i] + ",";
    }
    finalStateValue = finalStateValue.substring(0, finalStateValue.length - 1);
    store.dispatch(HP_DATA_ACT("umu_tags", finalStateValue));
  };

  const getTagBrand = () => {
    getListBrands(1, 1000, "merk:asc").then((response) => {
      const data = response.data.map((item) => ({
        text: item.merk,
        value: item.id + "--id_merk",
      }));
      setDataTagBrand(data);
    });
  };
  const getTagModelHp = () => {
    getListHpModel().then((response) => {
      const data = response.data.map((item) => ({
        text: item.model,
        value: item.id + "--umu_model",
      }));
      setDataHpModel(data);
    });
  };

  const getHpStatus = () => {
    getListHpStatus().then((response) => {
      const data = response.data.map((item) => ({
        text: item.status,
        value: item.id + "--umu_status",
      }));
      setDataHpStatus(data);
    });
  };

  return (
    <div>
      <div id="general" className="lay-segment affix-general">
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
                style={{ minWidth: 200, height: 38.5 }}
                name="id_merk"
                placeholder="Pilih merek"
                optionFilterProp="children"
                onChange={onChangeSelectGeneral}
                onSearch={onSearchSelect}
                defaultValue={
                  store.getState().gen_hp_data.data.id_merk === ""
                    ? undefined
                    : store.getState().gen_hp_data.data.id_merk + "--id_merk"
                }
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
                name="model"
                onChange={onChangeInputGeneral}
                defaultValue={store.getState().gen_hp_data.data.model}
              />
            </div>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Tags</div>
            <Select
              id="hp-select-tags"
              mode="tags"
              size={size}
              name="gen_tags"
              placeholder="Supports multiple tags by pressing tab / enter button"
              defaultValue={tagsArr[0] === "" ? [] : tagsArr}
              onChange={onChangeTagsGeneral}
              style={{ width: "100%", height: "auto" }}
            ></Select>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Keterangan Tambahan</div>
            <TextArea
              rows={4}
              name="ketamb"
              placeholder=""
              onChange={onChangeInputGeneral}
              defaultValue={
                store.getState().gen_hp_data.data.ketamb === null
                  ? ""
                  : store
                      .getState()
                      .gen_hp_data.data.ketamb.replace(/; /g, "\n")
              }
            />
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Gambar</div>
            <div style={{ position: "relative" }}>
              <Drag
                image={
                  store.getState().gen_hp_data.data.gambar === ""
                    ? ""
                    : store.getState().gen_hp_data.data.gambar.includes("_")
                    ? "https://ik.imagekit.io/inponsel/hp/" +
                      store.getState().gen_hp_data.data.gambar
                    : "https://ik.imagekit.io/inponsel/images/hape/" +
                      store.getState().gen_hp_data.data.gambar
                }
                image_type={"new_hp"}
                folder={"hp"}
              />
            </div>
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
              name="umu_model"
              style={{ minWidth: 230 }}
              placeholder="Pilih model"
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              defaultValue={
                store.getState().gen_hp_data.data.umu_model === ""
                  ? undefined
                  : store.getState().gen_hp_data.data.umu_model + "--umu_model"
              }
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
            <div className="lbl-input-data">Dimensi (mm)</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Input
                addonAfter={<span className="lay-group-label">panjang</span>}
                defaultValue={store.getState().gen_hp_data.data.umu_dim_panjang}
                onChange={onChangeInputGeneral}
                name="umu_dim_panjang"
                style={{ width: 130, margin: "0px 10px 10px 0px" }}
              />
              <Input
                addonAfter={<span className="lay-group-label">lebar</span>}
                defaultValue={store.getState().gen_hp_data.data.umu_dim_lebar}
                onChange={onChangeInputGeneral}
                name="umu_dim_lebar"
                style={{ width: 110, margin: "0px 10px 10px 0px" }}
              />
              <Input
                addonAfter={<span className="lay-group-label">tebal</span>}
                defaultValue={store.getState().gen_hp_data.data.umu_dim_tebal}
                onChange={onChangeInputGeneral}
                name="umu_dim_tebal"
                style={{ width: 110, margin: "0px 10px 10px 0px" }}
              />
            </div>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Bobot</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Input
                addonAfter={<span className="lay-group-label">gram</span>}
                defaultValue={store.getState().gen_hp_data.data.umu_bobot}
                onChange={onChangeInputGeneral}
                style={{ width: 110, margin: "0px 10px 10px 0px" }}
                name="umu_bobot"
              />
              <Input
                defaultValue={store.getState().gen_hp_data.data.umu_bobot_ket}
                onChange={onChangeInputGeneral}
                name="umu_bobot_ket"
                style={{ width: 250, margin: "0px 10px 10px 0px" }}
              />
            </div>
          </div>
          <div className="lay-subsegment">
            <div className="lbl-input-data">Warna</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Input
                defaultValue={
                  store.getState().gen_hp_data.data.umu_warna_ponsel
                }
                onChange={onChangeInputGeneral}
                name="umu_warna_ponsel"
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
                      name="umu_diumumkan"
                      picker="month"
                      defaultValue={
                        store.getState().gen_hp_data.data.umu_diumumkan === ""
                          ? undefined
                          : moment(
                              store.getState().gen_hp_data.data.umu_diumumkan,
                              monthFormat
                            )
                      }
                      format={monthFormat}
                    />
                  </Input.Group>
                </div>
              </div>
              <div style={{ margin: "0px 0px 0px 20px" }}>
                <div className="lbl-input-data">Status</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <Select
                    name="umu_status"
                    style={{ minWidth: 230 }}
                    placeholder="Pilih status"
                    optionFilterProp="children"
                    onChange={onChangeSelectGeneral}
                    onSearch={onSearchSelect}
                    defaultValue={
                      store.getState().gen_hp_data.data.umu_status === ""
                        ? undefined
                        : store.getState().gen_hp_data.data.umu_status +
                          "--umu_status"
                    }
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
