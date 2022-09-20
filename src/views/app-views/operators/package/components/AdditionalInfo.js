import React, { useState, useEffect, useCallback } from "react";
import { Select, DatePicker, Button, Spin } from "antd";
import moment from "moment";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";

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
  const retrieveData = () => {
    const last_update = store.getState().gen_hp_data.data.updated_at;
    if (last_update !== 0) {
      const dateString = moment
        .unix(last_update / 1000)
        .format("YYYY-MM-DD HH:mm:ss");
      console.log(dateString);
      setUpdatedAt(dateString);
    }
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

  const onChangeUpdatedAt = (date, dateString) => {
    console.log(date);
    setUpdatedAt(dateString);
    const update_at_u = moment(dateString, "YYYY-MM-DD HH:mm:ss").valueOf();
    store.dispatch(HP_DATA_ACT("updated_at_u", update_at_u));
  };

  return (
    <div>
      <div
        id="op-data"
        className="lay-segment affix-op-informasi-tambahan"
        style={{ color: "#212121" }}
      >
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
    </div>
  );
};

export default AdditionalInfo;
