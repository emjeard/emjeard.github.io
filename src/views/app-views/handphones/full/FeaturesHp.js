import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import store from "redux/store";
import { getListHpCpu, getListTagOs } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const FeaturesHp = () => {
  const [dataCpuCore, setDataCpuCore] = useState([]);
  const [dataOs, setDataOs] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getCpuCore();
    getOs();
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
    store.dispatch(HP_DATA_ACT(stateName, valueSelect));
  };

  const getCpuCore = () => {
    getListHpCpu().then((response) => {
      const data = response.data.map((item) => ({
        text: item.cpu,
        value: item.id + "--har_cpu_core",
      }));
      setDataCpuCore(data);
    });
  };

  const getOs = () => {
    getListTagOs().then((response) => {
      const data = response.data.map((item) => ({
        text: item.label,
        value: item.value + "--sof_os",
      }));
      setDataOs(data);
    });
  };

  return (
    <div>
      <div id="features" className="lay-segment affix-features">
        Features
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
                <div className="lbl-input-data">Musik</div>
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
                    store.getState().gen_hp_data.data.fit_musik_status +
                    "--fit_musik_status"
                  }
                >
                  <Option value="1--fit_musik_status">Yes</Option>
                  <Option value="2--fit_musik_status">No</Option>
                  <Option value="3--fit_musik_status">N/A</Option>
                  <Option value="0--fit_musik_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="fit_musik"
                    defaultValue={store.getState().gen_hp_data.data.fit_musik}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Radio</div>
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
                    store.getState().gen_hp_data.data.fit_radio_status +
                    "--fit_radio_status"
                  }
                >
                  <Option value="1--fit_radio_status">Yes</Option>
                  <Option value="2--fit_radio_status">No</Option>
                  <Option value="3--fit_radio_status">N/A</Option>
                  <Option value="0--fit_radio_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="fit_radio"
                    defaultValue={store.getState().gen_hp_data.data.fit_radio}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">TV Analog</div>
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
                    store.getState().gen_hp_data.data.fit_tvanalog +
                    "--fit_tvanalog"
                  }
                >
                  <Option value="1--fit_tvanalog">Yes</Option>
                  <Option value="2--fit_tvanalog">No</Option>
                  <Option value="3--fit_tvanalog">N/A</Option>
                  <Option value="0--fit_tvanalog">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="fit_tvanalog_ket"
                    defaultValue={
                      store.getState().gen_hp_data.data.fit_tvanalog_ket
                    }
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">GPS</div>
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
                    store.getState().gen_hp_data.data.fit_gps_status +
                    "--fit_gps_status"
                  }
                >
                  <Option value="1--fit_gps_status">Yes</Option>
                  <Option value="2--fit_gps_status">No</Option>
                  <Option value="3--fit_gps_status">N/A</Option>
                  <Option value="0--fit_gps_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="fit_gps"
                    defaultValue={store.getState().gen_hp_data.data.fit_gps}
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
                <div className="lbl-input-data">Browser</div>
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
                    store.getState().gen_hp_data.data.fit_browser_status +
                    "--fit_browser_status"
                  }
                >
                  <Option value="1--fit_browser_status">Yes</Option>
                  <Option value="2--fit_browser_status">No</Option>
                  <Option value="3--fit_browser_status">N/A</Option>
                  <Option value="0--fit_browser_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="fit_browser"
                    defaultValue={store.getState().gen_hp_data.data.fit_browser}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Water Resistant</div>
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
                    store.getState().gen_hp_data.data.fit_wresistant_status +
                    "--fit_wresistant_status"
                  }
                >
                  <Option value="1--fit_wresistant_status">Yes</Option>
                  <Option value="2--fit_wresistant_status">No</Option>
                  <Option value="3--fit_wresistant_status">N/A</Option>
                  <Option value="0--fit_wresistant_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="fit_wresistant"
                    defaultValue={
                      store.getState().gen_hp_data.data.fit_wresistant
                    }
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div style={{ width: "100%", margin: "0px 0px 0px 0px" }}>
                <div className="lbl-input-data">Pesan</div>
                <div style={{ width: "100%", margin: "0px 0px 0px 0px" }}>
                  <Input.Group compact>
                    <Input
                      name="fit_pesan"
                      defaultValue={store.getState().gen_hp_data.data.fit_pesan}
                      onChange={onChangeInputGeneral}
                      style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                    />
                  </Input.Group>
                </div>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div style={{ width: "100%", margin: "0px 0px 0px 0px" }}>
                <div className="lbl-input-data">Lain-lain</div>
                <TextArea
                  name="fit_lain"
                  defaultValue={store.getState().gen_hp_data.data.fit_lain}
                  onChange={onChangeInputGeneral}
                  style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesHp;
