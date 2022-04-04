import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  Button,
} from "antd";
import store from "redux/store";
import { GEN_INPUT_ACT } from "redux/actions/General";
import { getListHpSimCard, getListHpModel, getListHpStatus } from "api/ApiData";

const { Option } = Select;
const { TextArea } = Input;

const NetworkHp = () => {
  const [dataSimcard, setDataSimcard] = useState([]);
  const [dataHpModel, setDataHpModel] = useState([]);
  const [dataHpStatus, setDataHpStatus] = useState([]);
  const [dataDefTagBrand, setDefDataTagBrand] = useState([]);
  const [size, setSize] = useState("default");

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
    store.dispatch(GEN_INPUT_ACT(stateName, stateValue));
  };


  const onChangeSelectGeneral = (selectedItems, option) => {
    const splitOptions = option.value.split("--");
    const stateName = splitOptions[1];
    const valueSelect = splitOptions[0];
    store.dispatch(GEN_INPUT_ACT(stateName, parseInt(valueSelect)));
  };


  const getListSimcard = () => {
    getListHpSimCard().then((response) => {
      const data = response.data.map((item) => ({
        text: item.model,
        value: item.id + "--net_sc",
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
      <div
        id="network"
        style={{
          background: "#D9534F",
        }}
        className="lay-segment"
      >
        Network
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <div
            className="layout-input-data-col"
            style={{
              width: "100%",
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
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="yes--net_2g">Yes</Option>
                  <Option value="no--net_2g">No</Option>
                  <Option value="na--net_2g">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Button className="lay-group-label" style={{ width: 56 }}>
                    GSM
                  </Button>
                  <Select
                    defaultValue=""
                    style={{ width: 80 }}
                    onChange={onChangeSelectGeneral}
                  >
                    <Option value="yes--net_gsm">Yes</Option>
                    <Option value="no--net_gsm">No</Option>
                    <Option value="na--net_gsm">N/A</Option>
                  </Select>
                </Input.Group>
              </div>
              <div style={{ margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="net_gsm_info"
                    onChange={onChangeInputGeneral}
                    defaultValue=""
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
                    defaultValue=""
                    style={{ width: 80 }}
                    onChange={onChangeSelectGeneral}
                  >
                    <Option value="yes--net_cdma">Yes</Option>
                    <Option value="no--net_cdma">No</Option>
                    <Option value="na--net_cdma">N/A</Option>
                  </Select>
                </Input.Group>
              </div>
              <div style={{ margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="net_cdma_info"
                    onChange={onChangeInputGeneral}
                    defaultValue=""
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
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="yes--net_3g">Yes</Option>
                  <Option value="no--net_3g">No</Option>
                  <Option value="na--net_3g">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <TextArea
                  style={{ width: "100%" }}
                  value={""}
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
                >
                  <Option value="yes--net_4g">Yes</Option>
                  <Option value="no--net_4g">No</Option>
                  <Option value="na--net_4g">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <TextArea
                  style={{ width: "100%" }}
                  value={""}
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
                >
                  <Option value="yes--net_5g">Yes</Option>
                  <Option value="no--net_5g">No</Option>
                  <Option value="na--net_5g">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <TextArea
                  style={{ width: "100%" }}
                  value={""}
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
                  value={""}
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
                >
                  <Option value="yes--net_gprs">Yes</Option>
                  <Option value="no--net_gprs">No</Option>
                  <Option value="na--net_gprs">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="net_gprs_info"
                    onChange={onChangeInputGeneral}
                    defaultValue=""
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
                >
                  <Option value="yes--net_edge">Yes</Option>
                  <Option value="no--net_edge">No</Option>
                  <Option value="na--net_edge">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="net_edge_info"
                    onChange={onChangeInputGeneral}
                    defaultValue=""
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
                    name="net_simcard_info"
                    onChange={onChangeInputGeneral}
                    defaultValue=""
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
                >
                  <Option value="yes--net_multisim">Yes</Option>
                  <Option value="no--net_multisim">No</Option>
                  <Option value="na--net_multisim">N/A</Option>
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
                >
                  <Option value="1--net_multisim_total">Dual-SIM</Option>
                  <Option value="2--net_multisim_total">Triple-SIM</Option>
                  <Option value="3--net_multisim_total">Quad-SIM</Option>
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
                >
                  <Option value="1--net_multisim_gsmcdma">GSM-GSM</Option>
                  <Option value="2--net_multisim_gsmcdma">GSM-CDMA</Option>
                  <Option value="3--net_multisim_gsmcdma">CDMA-CDMA</Option>
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
                >
                  <Option value="yes--net_dualon">Yes</Option>
                  <Option value="no--net_dualon">No</Option>
                  <Option value="na--net_dualon">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="net_dualon_info"
                    onChange={onChangeInputGeneral}
                    defaultValue=""
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
