import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import store from "redux/store";
import { getListHpBattery } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const BatteryHp = () => {
  const [dataBattery, setDataBattery] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getBattery();
  };

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };

  const onChangeSelectGeneral = (selectedItems, option) => {
    const splitOptions = option.value.split("--");
    const stateName = splitOptions[1];
    const valueSelect = splitOptions[0];
    store.dispatch(HP_DATA_ACT(stateName, parseInt(valueSelect)));
  };

  const getBattery = () => {
    getListHpBattery().then((response) => {
      const data = response.data.map((item) => ({
        text: item.jbat,
        value: item.id + "--bat_kapasitas_s",
      }));
      setDataBattery(data);
    });
  };

  return (
    <div>
      <div id="battery" className="lay-segment affix-battery">
        Battery
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <div
            className="layout-input-data-col"
            style={{
              width: "100%",
              padding: "10px",
              minHeight: 200,
            }}
          >
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Jenis</div>
                <Select
                  style={{ minWidth: 100 }}
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={
                    store.getState().gen_hp_data.data.bat_kapasitas_s +
                    "--bat_kapasitas_s"
                  }
                >
                  {dataBattery.map((item) => (
                    <Option key={item.value}>{item.text}</Option>
                  ))}
                </Select>
              </div>
              <div style={{ width: "200px", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="bat_kapasitas"
                    defaultValue={
                      store.getState().gen_hp_data.data.bat_kapasitas
                    }
                    onChange={onChangeInputGeneral}
                    style={{ width: "100px", margin: "0px 0px 0px 0px" }}
                  />
                  <Button className="lay-group-label">mAh</Button>
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div style={{ width: 250 }}>
                <div className="lbl-input-data">Tipe Baterai</div>
                <Input.Group compact>
                  <Input
                    name="bat_model"
                    defaultValue={store.getState().gen_hp_data.data.bat_model}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div style={{ width: 250 }}>
                <div className="lbl-input-data">Info Tambahan</div>
                <Input.Group compact>
                  <Input
                    name="bat_musik"
                    defaultValue={store.getState().gen_hp_data.data.bat_musik}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
          </div>
          <div
            className="layout-input-data-col"
            style={{
              width: "100%",
              padding: "10px",
              minHeight: 200,
            }}
          >
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Fast Charging</div>
                <Select
                  style={{ minWidth: 130 }}
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={
                    store.getState().gen_hp_data.data.bat_fcharge_status +
                    "--bat_fcharge_status"
                  }
                >
                  <Option value="1--bat_fcharge_status">Yes</Option>
                  <Option value="2--bat_fcharge_status">No</Option>
                  <Option value="3--bat_fcharge_status">N/A</Option>
                  <Option value="0--bat_fcharge_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="bat_fcharge"
                    defaultValue={store.getState().gen_hp_data.data.bat_fcharge}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Wireless Charging</div>
                <Select
                  style={{ minWidth: 130 }}
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={
                    store.getState().gen_hp_data.data.bat_wcharge_status +
                    "--bat_wcharge_status"
                  }
                >
                  <Option value="1--bat_wcharge_status">Yes</Option>
                  <Option value="2--bat_wcharge_status">No</Option>
                  <Option value="3--bat_wcharge_status">N/A</Option>
                  <Option value="0--bat_wcharge_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="bat_wcharge"
                    defaultValue={store.getState().gen_hp_data.data.bat_wcharge}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div style={{ width: "100%", margin: "0px 0px 0px 0px" }}>
                <div className="lbl-input-data">Waktu bicara</div>
                <div style={{ width: "100%", margin: "0px 0px 0px 0px" }}>
                  <Input.Group compact>
                    <Input
                      name="bat_bicara"
                      defaultValue={
                        store.getState().gen_hp_data.data.bat_bicara
                      }
                      onChange={onChangeInputGeneral}
                      style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                    />
                  </Input.Group>
                </div>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div style={{ width: "100%", margin: "0px 0px 0px 0px" }}>
                <div className="lbl-input-data">Waktu siaga</div>
                <Input.Group compact>
                  <Input
                    name="bat_siaga"
                    defaultValue={store.getState().gen_hp_data.data.bat_siaga}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryHp;
