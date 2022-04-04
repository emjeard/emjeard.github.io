import React, { useState, useEffect } from "react";
import { Input, Select, Button, InputNumber } from "antd";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const DxOmarkHp = () => {
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {};

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };

  const onChangeInputNumber = (e, name) => {
    const stateName = name;
    let stateValue = e;
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };
  return (
    <div>
      <div id="dxomark" className="lay-segment affix-dxomark">
        DxOmark
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          minHeight: 200,
        }}
      >
        <div className="lay-subsegment">
          <div style={{ display: "flex" }}>
            <div>
              <div className="lbl-input-data" style={{ fontSize: "20px" }}>
                Mobile
              </div>
            </div>
            <div style={{ margin: "0px 0px 0px 30px" }}>
              <div
                className="lbl-input-data"
                style={{ margin: "10px 0px 0px 0px" }}
              >
                Total
              </div>
              <div
                className="lbl-input-data"
                style={{ margin: "33px 0px 0px 0px" }}
              >
                Photo
              </div>
              <div
                className="lbl-input-data"
                style={{ margin: "33px 0px 0px 0px" }}
              >
                Video
              </div>
            </div>
            <div style={{ margin: "0px 0px 0px 69px" }}>
              <div>
                <InputNumber
                  style={{ minWidth: "150px" }}
                  name="dx_mob_total"
                  defaultValue={store.getState().gen_hp_data.data.dx_mob_total}
                  onChange={(e) => onChangeInputNumber(e, "dx_mob_total")}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
              <div>
                <InputNumber
                  style={{ minWidth: "150px", margin: "15px 0px 0px 0px" }}
                  name="dx_mob_photo"
                  defaultValue={store.getState().gen_hp_data.data.dx_mob_photo}
                  onChange={(e) => onChangeInputNumber(e, "dx_mob_photo")}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
              <div>
                <InputNumber
                  style={{ minWidth: "150px", margin: "15px 0px 0px 0px" }}
                  name="dx_mob_video"
                  defaultValue={store.getState().gen_hp_data.data.dx_mob_video}
                  onChange={(e) => onChangeInputNumber(e, "dx_mob_video")}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lay-subsegment">
          <div style={{ display: "flex" }}>
            <div>
              <div className="lbl-input-data" style={{ fontSize: "20px" }}>
                Selfie
              </div>
            </div>
            <div style={{ margin: "0px 0px 0px 45px" }}>
              <div
                className="lbl-input-data"
                style={{ margin: "10px 0px 0px 0px" }}
              >
                Total
              </div>
              <div
                className="lbl-input-data"
                style={{ margin: "33px 0px 0px 0px" }}
              >
                Photo
              </div>
              <div
                className="lbl-input-data"
                style={{ margin: "33px 0px 0px 0px" }}
              >
                Video
              </div>
              <div
                className="lbl-input-data"
                style={{ margin: "33px 0px 0px 0px" }}
              >
                URL Review
              </div>
            </div>
            <div style={{ margin: "0px 0px 0px 30px" }}>
              <div>
                <InputNumber
                  style={{ minWidth: "150px" }}
                  name="dx_self_total"
                  defaultValue={store.getState().gen_hp_data.data.dx_self_total}
                  onChange={(e) => onChangeInputNumber(e, "dx_self_total")}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
              <div>
                <InputNumber
                  style={{ minWidth: "150px", margin: "15px 0px 0px 0px" }}
                  name="dx_self_photo"
                  defaultValue={store.getState().gen_hp_data.data.dx_self_photo}
                  onChange={(e) => onChangeInputNumber(e, "dx_self_photo")}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
              <div>
                <InputNumber
                  style={{ minWidth: "150px", margin: "15px 0px 0px 0px" }}
                  name="dx_self_video"
                  defaultValue={store.getState().gen_hp_data.data.dx_self_video}
                  onChange={(e) => onChangeInputNumber(e, "dx_self_video")}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </div>
              <div>
                <Input
                  name="dx_self_urlreview"
                  defaultValue={
                    store.getState().gen_hp_data.data.dx_self_urlreview
                  }
                  onChange={onChangeInputGeneral}
                  style={{ minWidth: "450px", margin: "15px 0px 0px 0px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DxOmarkHp;
