import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import store from "redux/store";
import { getListHpSimCard, getListHpModel, getListHpStatus } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const NetworkHp = () => {
  const [dataSimcard, setDataSimcard] = useState([]);
  const [dataHpModel, setDataHpModel] = useState([]);
  const [dataHpStatus, setDataHpStatus] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getListSimcard();
    getTagModelHp();
    getHpStatus();
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

  const getListSimcard = () => {
    getListHpSimCard().then((response) => {
      const data = response.data.map((item) => ({
        text: item.model,
        value: item.id + "--jar_sc",
      }));
      setDataSimcard(data);
    });
  };
  const getTagModelHp = () => {
    getListHpModel().then((response) => {
      const data = response.data.map((item) => ({
        text: item.model,
        value: item.id + "--gen_model",
      }));
      setDataHpModel(data);
    });
  };

  const getHpStatus = () => {
    getListHpStatus().then((response) => {
      const data = response.data.map((item) => ({
        text: item.status,
        value: item.id + "--gen_hpstatus",
      }));
      setDataHpStatus(data);
    });
  };

  return (
    <div>
      <div id="network" className="lay-segment affix-network">
        Network
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
                <div className="lbl-input-data">2G</div>
                <Select
                  style={{ minWidth: 70 }}
                  showSearch
                  placeholder=""
                  defaultValue={
                    store.getState().gen_hp_data.data.jar_2g_status +
                    "--jar_2g_status"
                  }
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1--jar_2g_status">Yes</Option>
                  <Option value="2--jar_2g_status">No</Option>
                  <Option value="3--jar_2g_status">N/A</Option>
                  <Option value="0--jar_2g_status">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Button className="lay-group-label" style={{ width: 56 }}>
                    GSM
                  </Button>
                  <Select
                    defaultValue={
                      store.getState().gen_hp_data.data.jar_2g_status +
                      "--jar_2g_gsm_status"
                    }
                    style={{ width: 80 }}
                    onChange={onChangeSelectGeneral}
                  >
                    <Option value="1--jar_2g_gsm_status">Yes</Option>
                    <Option value="2--jar_2g_gsm_status">No</Option>
                    <Option value="3--jar_2g_gsm_status">N/A</Option>
                    <Option value="0--jar_2g_gsm_status">N/A</Option>
                  </Select>
                </Input.Group>
              </div>
              <div style={{ margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="jar_2g_gsm"
                    onChange={onChangeInputGeneral}
                    defaultValue={store.getState().gen_hp_data.data.jar_2g_gsm}
                    style={{ width: 176, margin: "0px 0px 0px 0px" }}
                  />
                  <Button className="lay-group-label">MHz</Button>
                </Input.Group>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "30px 0px 0px 90px" }}>
                <Input.Group compact>
                  <Button className="lay-group-label">CDMA</Button>
                  <Select
                    defaultValue={
                      store.getState().gen_hp_data.data.jar_2g_status +
                      "--jar_2g_cdma_status"
                    }
                    style={{ width: 80 }}
                    onChange={onChangeSelectGeneral}
                  >
                    <Option value="1--jar_2g_cdma_status">Yes</Option>
                    <Option value="2--jar_2g_cdma_status">No</Option>
                    <Option value="3--jar_2g_cdma_status">N/A</Option>
                    <Option value="0--jar_2g_cdma_status">N/A</Option>
                  </Select>
                </Input.Group>
              </div>
              <div style={{ margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="jar_2g_cdma"
                    onChange={onChangeInputGeneral}
                    defaultValue={store.getState().gen_hp_data.data.jar_2g_cdma}
                    style={{ width: 176, margin: "0px 0px 0px 0px" }}
                  />
                  <Button className="lay-group-label">MHz</Button>
                </Input.Group>
              </div>
            </div>
            <div style={{ display: "flex" }} className="lay-subsegment">
              <div>
                <div className="lbl-input-data">3G</div>
                <Select
                  style={{ minWidth: 70 }}
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  defaultValue={
                    store.getState().gen_hp_data.data.jar_3g_status +
                    "--jar_3g_status"
                  }
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1--jar_3g_status">Yes</Option>
                  <Option value="2--jar_3g_status">No</Option>
                  <Option value="3--jar_3g_status">N/A</Option>
                  <Option value="0--jar_3g_status">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <TextArea
                  name="jar_3g"
                  style={{ width: "100%" }}
                  defaultValue={store.getState().gen_hp_data.data.jar_3g}
                  placeholder=""
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
            <div style={{ display: "flex" }} className="lay-subsegment">
              <div>
                <div className="lbl-input-data">4G</div>
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
                    store.getState().gen_hp_data.data.jar_3g_status +
                    "--jar_4g_status"
                  }
                >
                  <Option value="1--jar_4g_status">Yes</Option>
                  <Option value="2--jar_4g_status">No</Option>
                  <Option value="3--jar_4g_status">N/A</Option>
                  <Option value="0--jar_4g_status">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <TextArea
                  name="jar_4g"
                  style={{ width: "100%" }}
                  defaultValue={store.getState().gen_hp_data.data.jar_4g}
                  placeholder=""
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
            <div style={{ display: "flex" }} className="lay-subsegment">
              <div>
                <div className="lbl-input-data">5G</div>
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
                    store.getState().gen_hp_data.data.jar_3g_status +
                    "--jar_5g_status"
                  }
                >
                  <Option value="1--jar_5g_status">Yes</Option>
                  <Option value="2--jar_5g_status">No</Option>
                  <Option value="3--jar_5g_status">N/A</Option>
                  <Option value="0--jar_5g_status">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <TextArea
                  style={{ width: "100%" }}
                  name="jar_5g"
                  defaultValue={store.getState().gen_hp_data.data.jar_5g}
                  placeholder=""
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
            <div className="lay-subsegment">
              <div>
                <div className="lbl-input-data">Bandwidth</div>
              </div>
              <div style={{ margin: "0px 0px 0px 0px", width: "100%" }}>
                <TextArea
                  style={{ width: "100%" }}
                  name="jar_bwidth"
                  defaultValue={store
                    .getState()
                    .gen_hp_data.data.jar_bwidth.replace(/; /g, "\n")}
                  placeholder=""
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
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
                <div className="lbl-input-data">GPRS</div>
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
                    store.getState().gen_hp_data.data.jar_gprs_status +
                    "--jar_gprs_status"
                  }
                >
                  <Option value="1--jar_gprs_status">Yes</Option>
                  <Option value="2--jar_gprs_status">No</Option>
                  <Option value="3--jar_gprs_status">N/A</Option>
                  <Option value="0--jar_gprs_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="jar_gprs"
                    onChange={onChangeInputGeneral}
                    defaultValue={store.getState().gen_hp_data.data.jar_gprs}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">EDGE</div>
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
                    store.getState().gen_hp_data.data.jar_edge_status +
                    "--jar_edge_status"
                  }
                >
                  <Option value="1--jar_edge_status">Yes</Option>
                  <Option value="2--jar_edge_status">No</Option>
                  <Option value="3--jar_edge_status">N/A</Option>
                  <Option value="0--jar_edge_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="jar_edge"
                    defaultValue={store.getState().gen_hp_data.data.jar_edge}
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Jenis SIM Card</div>
                <Select
                  style={{ minWidth: 120 }}
                  defaultValue={
                    store.getState().gen_hp_data.data.jar_sc + "--jar_sc"
                  }
                  showSearch
                  placeholder=""
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {dataSimcard.map((item) => (
                    <Option key={item.value}>{item.text}</Option>
                  ))}
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="jar_multi_ket"
                    onChange={onChangeInputGeneral}
                    defaultValue={
                      store.getState().gen_hp_data.data.jar_multi_ket
                    }
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Multi Sim</div>
                <Select
                  style={{ minWidth: 120 }}
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
                    store.getState().gen_hp_data.data.jar_multi_status +
                    "--jar_multi_status"
                  }
                >
                  <Option value="1--jar_multi_status">Yes</Option>
                  <Option value="2--jar_multi_status">No</Option>
                  <Option value="3--jar_multi_status">N/A</Option>
                  <Option value="0--jar_multi_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: 120, margin: "30px 0px 0px 20px" }}>
                <Select
                  style={{ minWidth: 120 }}
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
                    store.getState().gen_hp_data.data.jar_multi_tipe1 +
                    "--jar_multi_tipe1"
                  }
                >
                  <Option value="1--jar_multi_tipe1">Dual-SIM</Option>
                  <Option value="2--jar_multi_tipe1">Triple-SIM</Option>
                  <Option value="3--jar_multi_tipe1">Quad-SIM</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Select
                  style={{ width: "100%" }}
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
                    store.getState().gen_hp_data.data.jar_multi_tipe2 +
                    "--jar_multi_tipe2"
                  }
                >
                  <Option value="1--jar_multi_tipe2">GSM-GSM</Option>
                  <Option value="2--jar_multi_tipe2">GSM-CDMA</Option>
                  <Option value="3--jar_multi_tipe2">CDMA-CDMA</Option>
                </Select>
              </div>
            </div>
            <div
              className="lay-subsegment"
              style={{ display: "flex", margin: "0px 0px 0px 140px" }}
            >
              <div>
                <div className="lbl-input-data">Dual-ON</div>
                <Select
                  style={{ minWidth: 120 }}
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
                    store.getState().gen_hp_data.data.jar_dualon +
                    "--jar_dualon"
                  }
                >
                  <Option value="1--jar_dualon">Yes</Option>
                  <Option value="2--jar_dualon">No</Option>
                  <Option value="3--jar_dualon">N/A</Option>
                  <Option value="0--jar_dualon">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="jar_multi_ket"
                    onChange={onChangeInputGeneral}
                    defaultValue={
                      store.getState().gen_hp_data.data.jar_multi_ket
                    }
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

export default NetworkHp;
