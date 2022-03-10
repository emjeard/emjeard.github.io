import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import store from "redux/store";
import { getListHpCpu, getListTagOs } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const ConnectivityHp = () => {
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
    store.dispatch(HP_DATA_ACT(stateName, parseInt(valueSelect)));
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
      <div id="connectivity" className="lay-segment affix-connectivity">
        Connectivity
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
                <div className="lbl-input-data">Bluetooth</div>
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
                    store.getState().gen_hp_data.data.kon_bluetooth_status ===
                    ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_bluetooth_status +
                        "--kon_bluetooth_status"
                  }
                >
                  <Option value="1--kon_bluetooth_status">Yes</Option>
                  <Option value="2--kon_bluetooth_status">No</Option>
                  <Option value="3--kon_bluetooth_status">N/A</Option>
                  <Option value="0--kon_bluetooth_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_bluetooth"
                    defaultValue={
                      store.getState().gen_hp_data.data.kon_bluetooth
                    }
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">USB</div>
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
                    store.getState().gen_hp_data.data.kon_usb_status === ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_usb_status +
                        "--kon_usb_status"
                  }
                >
                  <Option value="1--kon_usb_status">Yes</Option>
                  <Option value="2--kon_usb_status">No</Option>
                  <Option value="3--kon_usb_status">N/A</Option>
                  <Option value="0--kon_usb_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_usb"
                    defaultValue={store.getState().gen_hp_data.data.kon_usb}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">3.5mm jack</div>
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
                    store.getState().gen_hp_data.data.kon_35mm_jack === ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_35mm_jack +
                        "--kon_35mm_jack"
                  }
                >
                  <Option value="1--kon_35mm_jack">Yes</Option>
                  <Option value="2--kon_35mm_jack">No</Option>
                  <Option value="3--kon_35mm_jack">N/A</Option>
                  <Option value="0--kon_35mm_jack">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_35mm_jack_ket"
                    defaultValue={
                      store.getState().gen_hp_data.data.kon_35mm_jack_ket
                    }
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">WLAN</div>
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
                    store.getState().gen_hp_data.data.kon_wlan_status === ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_wlan_status +
                        "--kon_wlan_status"
                  }
                >
                  <Option value="1--kon_wlan_status">Yes</Option>
                  <Option value="2--kon_wlan_status">No</Option>
                  <Option value="3--kon_wlan_status">N/A</Option>
                  <Option value="0--kon_wlan_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_wlan"
                    defaultValue={store.getState().gen_hp_data.data.kon_wlan}
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
                <div className="lbl-input-data">NFC</div>
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
                    store.getState().gen_hp_data.data.kon_nfc_status === ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_nfc_status +
                        "--kon_nfc_status"
                  }
                >
                  <Option value="1--kon_nfc_status">Yes</Option>
                  <Option value="2--kon_nfc_status">No</Option>
                  <Option value="3--kon_nfc_status">N/A</Option>
                  <Option value="0--kon_nfc_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_nfc"
                    defaultValue={store.getState().gen_hp_data.data.kon_nfc}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">HDMI</div>
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
                    store.getState().gen_hp_data.data.kon_hdmi_status === ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_hdmi_status +
                        "--kon_hdmi_status"
                  }
                >
                  <Option value="1--kon_hdmi_status">Yes</Option>
                  <Option value="2--kon_hdmi_status">No</Option>
                  <Option value="3--kon_hdmi_status">N/A</Option>
                  <Option value="0--kon_hdmi_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_hdmi"
                    defaultValue={store.getState().gen_hp_data.data.kon_hdmi}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">TV-Out</div>
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
                    store.getState().gen_hp_data.data.kon_tvoutput_status === ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_tvoutput_status +
                        "--kon_tvoutput_status"
                  }
                >
                  <Option value="1--kon_tvoutput_status">Yes</Option>
                  <Option value="2--kon_tvoutput_status">No</Option>
                  <Option value="3--kon_tvoutput_status">N/A</Option>
                  <Option value="0--kon_tvoutput_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_tvoutput"
                    defaultValue={
                      store.getState().gen_hp_data.data.kon_tvoutput
                    }
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Infrared</div>
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
                    store.getState().gen_hp_data.data.kon_infrared === ""
                      ? undefined
                      : store.getState().gen_hp_data.data.kon_infrared +
                        "--kon_infrared"
                  }
                >
                  <Option value="1--kon_infrared">Yes</Option>
                  <Option value="2--kon_infrared">No</Option>
                  <Option value="3--kon_infrared">N/A</Option>
                  <Option value="0--kon_infrared">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="kon_infrared_ket"
                    defaultValue={
                      store.getState().gen_hp_data.data.kon_infrared_ket
                    }
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

export default ConnectivityHp;
