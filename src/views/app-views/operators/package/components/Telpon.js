import React, { useState, useEffect, useCallback } from "react";
import { Select, Tooltip, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { TextArea } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const Telpon = () => {
  const [cbTelpon1, setCbTelpon1] = useState(false);
  const [cbTelpon2, setCbTelpon2] = useState(false);
  const [cbTelpon3, setCbTelpon3] = useState(false);
  const [cbTelpon4, setCbTelpon4] = useState(false);
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    setCbTelpon1(
      store.getState().gen_hp_data.data.telpon_sesama_menit_unl === 1
        ? true
        : false
    );

    setCbTelpon2(
      store.getState().gen_hp_data.data.sms_sesama_unl === 1 ? true : false
    );

    setCbTelpon3(
      store.getState().gen_hp_data.data.telpon_antar_operator_menit_unl === 1
        ? true
        : false
    );

    setCbTelpon4(
      store.getState().gen_hp_data.data.sms_antar_operator_unl === 1
        ? true
        : false
    );
  };

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;
    if (stateValue === "") {
      stateValue = "-";
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
    if (stateValue === null) {
      stateValue = -1;
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };
  const onChangeCb = (e, name) => {
    const stateName = name;
    const checked = e.target.checked;
    const is_unlimited = checked === true ? 1 : 2;
    if (stateName === "telpon_sesama_menit_unl") {
      setCbTelpon1(checked);
    } else if (stateName === "sms_sesama_unl") {
      setCbTelpon2(checked);
    } else if (stateName === "telpon_antar_operator_menit_unl") {
      setCbTelpon3(checked);
    } else if (stateName === "sms_antar_operator_unl") {
      setCbTelpon4(checked);
    }
    store.dispatch(HP_DATA_ACT(stateName, is_unlimited));
  };
  return (
    <div>
      <div
        id="op-telpon"
        className="lay-segment affix-op-telpon"
        style={{ color: "#212121" }}
      >
        Telpon
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Telpon Sesama</div>
          <Input.Group compact>
            <InputNumber
              name="telpon_sesama_menit"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "telpon_sesama_menit")}
              defaultValue={
                store.getState().gen_hp_data.data.telpon_sesama_menit === "" ||
                store.getState().gen_hp_data.data.telpon_sesama_menit <= 0
                  ? undefined
                  : store.getState().gen_hp_data.data.telpon_sesama_menit
              }
              placeholder=""
              allowClear
            />
            <Button className="lay-group-label" style={{ height: "40px" }}>
              Menit
            </Button>
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox
              onChange={(e) => onChangeCb(e, "telpon_sesama_menit_unl")}
              checked={cbTelpon1}
            >
              Unlimited
            </Checkbox>
          </div>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">SMS Sesama</div>
          <Input.Group compact>
            <InputNumber
              name="sms_sesama"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "sms_sesama")}
              defaultValue={
                store.getState().gen_hp_data.data.sms_sesama === "" ||
                store.getState().gen_hp_data.data.sms_sesama <= 0
                  ? undefined
                  : store.getState().gen_hp_data.data.sms_sesama
              }
              placeholder=""
              allowClear
            />
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox
              onChange={(e) => onChangeCb(e, "sms_sesama_unl")}
              checked={cbTelpon2}
            >
              Unlimited
            </Checkbox>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Telpon Antar Operator</div>
          <Input.Group compact>
            <InputNumber
              name="telpon_antar_operator_menit"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) =>
                onChangeInputNumber(e, "telpon_antar_operator_menit")
              }
              defaultValue={
                store.getState().gen_hp_data.data
                  .telpon_antar_operator_menit === "" ||
                store.getState().gen_hp_data.data.telpon_antar_operator_menit <=
                  0
                  ? undefined
                  : store.getState().gen_hp_data.data
                      .telpon_antar_operator_menit
              }
              placeholder=""
              allowClear
            />
            <Button className="lay-group-label" style={{ height: "40px" }}>
              Menit
            </Button>
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox
              onChange={(e) => onChangeCb(e, "telpon_antar_operator_menit_unl")}
              checked={cbTelpon3}
            >
              Unlimited
            </Checkbox>
          </div>
        </div>
        <div className="lay-subsegment" style={{ margin: "0px 0px 0px 50px" }}>
          <div className="lbl-input-data">SMS Antar Operator</div>
          <Input.Group compact>
            <InputNumber
              name="sms_antar_operator"
              style={{ width: 200 }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\\s?|(,*)/g, "")}
              onChange={(e) => onChangeInputNumber(e, "sms_antar_operator")}
              defaultValue={
                store.getState().gen_hp_data.data.sms_antar_operator === "" ||
                store.getState().gen_hp_data.data.sms_antar_operator <= 0
                  ? undefined
                  : store.getState().gen_hp_data.data.sms_antar_operator
              }
              placeholder=""
              allowClear
            />
          </Input.Group>
          <div style={{ padding: "5px 10px" }}>
            <Checkbox
              onChange={(e) => onChangeCb(e, "sms_antar_operator_unl")}
              checked={cbTelpon4}
            >
              Unlimited
            </Checkbox>
          </div>
        </div>
      </div>
      <div
        className="lay-subsegment"
        style={{
          width: "-webkit-fill-available",
        }}
      >
        <div className="lbl-input-data">Lainnya</div>
        <TextArea
          style={{ width: "-webkit-fill-available", minHeight: "100px" }}
          rows={3}
          placeholder="Contoh: 15 GB Sosial Media"
          name="telpon_add_info"
          onChange={onChangeInputGeneral}
          defaultValue={
            store.getState().gen_hp_data.data.telpon_add_info == null ||
            store.getState().gen_hp_data.data.telpon_add_info === "-"
              ? undefined
              : store.getState().gen_hp_data.data.telpon_add_info
          }
        />
      </div>
    </div>
  );
};

export default Telpon;
