import React, { useState, useEffect } from "react";
import { Select, Input } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import { CloudUploadOutlined } from "@ant-design/icons";
import { getListOperator } from "api/ApiData";

const { TextArea } = Input;

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const GeneralOperator = () => {
  const [dataOperator, setDataOperator] = useState([]);
  const [dataImgOp, setDataImgOp] = useState("");
  const hiddenFileInput = React.useRef(null);
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    setDataImgOp(store.getState().gen_hp_data.data.logo);
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

  const handleChangeImage = (e) => {
    setDataImgOp(URL.createObjectURL(e.target.files[0]));
    console.log("img", e.target.files[0]);
    store.dispatch(HP_DATA_ACT("img_file", e.target.files[0]));
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  function onSearchSelect(val) {
    console.log("search:", val);
  }
  return (
    <div>
      <div id="op-general" className="lay-segment affix-op-general">
        General
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div className="lbl-input-data">Nama Operator</div>
          <Input
            placeholder="Contoh: Telkomsel"
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
          <div className="lbl-input-data">Logo (600x600)</div>
          <div
            className="col-12"
            style={{ padding: 0, margin: 0, textAlign: "center" }}
          >
            <input
              ref={hiddenFileInput}
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleChangeImage}
            />
            {dataImgOp === "" ? (
              <p className="ant-upload-drag-icon" onClick={handleClick}>
                <CloudUploadOutlined style={{ fontSize: "4rem" }} />
              </p>
            ) : (
              <img
                src={
                  store.getState().gen_hp_data.data.img_file === undefined
                    ? "https://is3.cloudhost.id/inps/images/operator/" +
                      dataImgOp
                    : dataImgOp
                }
                alt="img"
                width="200px"
                height="200px"
              />
            )}
          </div>
        </div>
        <div
          className="lay-subsegment"
          style={{
            margin: "0px 0px 0px 50px",
            width: "-webkit-fill-available",
          }}
        >
          <div className="lbl-input-data">Alamat</div>
          <TextArea
            style={{ width: "-webkit-fill-available" }}
            rows={4}
            name="addr"
            placeholder=""
            onChange={onChangeInputGeneral}
            value={store.getState().gen_hp_data.data.addr}
            defaultValue={
              store.getState().gen_hp_data.data.addr == null
                ? undefined
                : store.getState().gen_hp_data.data.addr
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralOperator;
