import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import store from "redux/store";
import { getListHpCpu, getListTagOs } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const HardSoftWareHp = () => {
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
      <div id="hardwaresoftware" className="lay-segment affix-hardwaresoftware">
        Hardware & Software
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
                <div className="lbl-input-data">
                  Tambahkan informasi hardware?
                </div>
                <Select
                  style={{ minWidth: 70 }}
                  showSearch
                  placeholder=""
                  defaultValue={
                    store.getState().gen_hp_data.data.har_info + "--har_info"
                  }
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1--har_info">Yes</Option>
                  <Option value="2--har_info">No</Option>
                  <Option value="3--har_info">N/A</Option>
                  <Option value="0--har_info">N/A</Option>
                </Select>
              </div>
            </div>

            <div style={{ display: "flex" }} className="lay-subsegment">
              <div style={{ width: "100%" }}>
                <div className="lbl-input-data">Chipset</div>
                <Input
                  name="har_chipset"
                  style={{ width: "100%" }}
                  defaultValue={store.getState().gen_hp_data.data.har_chipset}
                  placeholder=""
                />
              </div>
            </div>
            <div style={{ display: "flex" }} className="lay-subsegment">
              <div>
                <div className="lbl-input-data">CPU</div>
                <Select
                  style={{ minWidth: 140 }}
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
                    store.getState().gen_hp_data.data.har_cpu_core +
                    "--har_cpu_core"
                  }
                >
                  {dataCpuCore.map((item) => (
                    <Option key={item.value}>{item.text}</Option>
                  ))}
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <Input.Group compact>
                  <Input
                    name="har_cpu_clock"
                    onChange={onChangeInputGeneral}
                    defaultValue={
                      store.getState().gen_hp_data.data.har_cpu_clock
                    }
                    style={{ width: 176, margin: "0px 0px 0px 0px" }}
                  />
                  <Button className="lay-group-label">MHz</Button>
                </Input.Group>
              </div>
            </div>
            <div style={{ margin: "15px 0px 0px 0px", width: "100%" }}>
              <Input
                name="har_cpu_jenpros"
                onChange={onChangeInputGeneral}
                defaultValue={store.getState().gen_hp_data.data.har_cpu_jenpros}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
              />
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">GPU</div>
              <Input
                name="har_gpu"
                onChange={onChangeInputGeneral}
                defaultValue={store.getState().gen_hp_data.data.har_gpu}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
              />
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Keterangan Tambahan </div>
              <TextArea
                name="har_semua_ket"
                defaultValue={store.getState().gen_hp_data.data.har_semua_ket}
                onChange={onChangeInputGeneral}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
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
                <div className="lbl-input-data">Operating System</div>
                <Select
                  style={{ minWidth: 150 }}
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
                    store.getState().gen_hp_data.data.sof_os + "--sof_os"
                  }
                >
                  {dataOs.map((item) => (
                    <Option key={item.value}>{item.text}</Option>
                  ))}
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="sof_os_versi"
                    onChange={onChangeInputGeneral}
                    defaultValue={
                      store.getState().gen_hp_data.data.sof_os_versi
                    }
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Java</div>
                <Select
                  style={{ minWidth: 70 }}
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
                    store.getState().gen_hp_data.data.sof_java_status +
                    "--sof_java_status"
                  }
                >
                  <Option value="1--sof_java_status">Yes</Option>
                  <Option value="2--sof_java_status">No</Option>
                  <Option value="3--sof_java_status">N/A</Option>
                  <Option value="0--sof_java_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="sof_java"
                    defaultValue={store.getState().gen_hp_data.data.sof_java}
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

export default HardSoftWareHp;
