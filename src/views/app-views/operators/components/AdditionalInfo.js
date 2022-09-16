import React, { useState, useEffect, useCallback } from "react";
import { Select, DatePicker, Button } from "antd";
import moment from "moment";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const AdditionalInfo = () => {
  const [updatedAt, setUpdatedAt] = useState("");
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

  const onChangeUpdatedAt = (date, dateString) => {
    setUpdatedAt(dateString);
    store.dispatch(HP_DATA_ACT("created_at_u", dateString));
  };

  const onSubmitData = (e) => {
    const created_at = Date.now();
    const updated_at = Date.now();
    store.dispatch(HP_DATA_ACT("created_at", created_at));
    store.dispatch(HP_DATA_ACT("updated_at", updated_at));
  };

  return (
    <div>
      <div id="op-data" className="lay-segment affix-op-informasi-tambahan">
        Info Tambahan
      </div>
      <div className="lbl-input-data">Keterangan</div>
      <CKEditorCustom editor_type={"additional_info"} />
      <div style={{ display: "flex", marginTop: 25 }}>
        <div>
          <div>Tanggal Update</div>
          <DatePicker
            onChange={onChangeUpdatedAt}
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            defaultValue={
              updatedAt === "" ? "" : moment(updatedAt, "YYYY-MM-DD HH:mm:ss")
            }
            value={
              updatedAt === "" ? "" : moment(updatedAt, "YYYY-MM-DD HH:mm:ss")
            }
            style={{ minWidth: "225px" }}
          />
        </div>
      </div>
      <Button
        onClick={onSubmitData}
        type="primary"
        icon={<SaveOutlined />}
        style={{
          width: "-webkit-fill-available",
          margin: "15px 0px 10px 0px",
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default AdditionalInfo;
