import React, { useState, useEffect, useCallback } from "react";
import {
  Input,
  Select,
  Card,
  Tooltip,
  DatePicker,
  Button,
  Checkbox,
  BackTop,
} from "antd";
import { InfoCircleOutlined, SaveOutlined } from "@ant-design/icons";
import Drag from "./Drag";
import store from "redux/store";
import { GEN_INPUT_ACT } from "redux/actions/General";
import GeneralHp from "./GeneralHp";

const { Option } = Select;
const { TextArea } = Input;

const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

const PostHandphoneApp = () => {
  const [size, setSize] = useState("default");
  const [imageUrl, setImageUrl] = useState("");
  const [generalState, setGeneralState] = useState({
    image: "",
    description: "",
    category: "",
    country: "",
    website: "",
    facebook: "",
    facebook_id: "",
    twitter: "",
    address: "",
    email: "",
    phone: "",
    youtube: "",
    instagram: "",
  });

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  function onChangeMerk(value) {
    console.log(`selected ${value}`);
  }

  function onSearchMerk(val) {
    console.log("search:", val);
  }

  function onChangeModel(value) {
    console.log(`selected ${value}`);
  }

  function onSearchModel(val) {
    console.log("search:", val);
  }

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  const callback = useCallback((value) => {
    setImageUrl(value);
  }, []);

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    store.dispatch(GEN_INPUT_ACT(stateName, e.target.value));

    /* if (stateName === "gen_tipe") {
      store.dispatch(GEN_TIPE_ACT(e.target.value));
    } else if (stateName === "gen_add_info") {
      store.dispatch(GEN_ADD_INFO_ACT(e.target.value));
    } */
    /* setBrandState({
      ...brandState,
      [e.target.name]: e.target.value,
    }); */
  };
  const onSubmitHp = (e) => {
    console.log("gen_tipe", store.getState().gen_hp_data.gen_tipe);
    console.log("gen_add_info", store.getState().gen_hp_data.gen_add_info);
  };
  return (
    <div>
      <Card>
        <GeneralHp />
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
                    optionFilterProp="children"
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
                </div>
                <div style={{ margin: "30px 0px 0px 20px" }}>
                  <Input.Group compact>
                    <Button className="lay-group-label" style={{ width: 56 }}>
                      GSM
                    </Button>
                    <Select defaultValue="" style={{ width: 80 }}>
                      <Option value="jack">Yes</Option>
                      <Option value="lucy">No</Option>
                      <Option value="tom">N/A</Option>
                    </Select>
                  </Input.Group>
                </div>
                <div style={{ margin: "30px 0px 0px 20px" }}>
                  <Input.Group compact>
                    <Input
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
                    <Select defaultValue="" style={{ width: 80 }}>
                      <Option value="jack">Yes</Option>
                      <Option value="lucy">No</Option>
                      <Option value="tom">N/A</Option>
                    </Select>
                  </Input.Group>
                </div>
                <div style={{ margin: "30px 0px 0px 20px" }}>
                  <Input.Group compact>
                    <Input
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
                </div>
                <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                  <Input.Group compact>
                    <Input
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
                </div>
                <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                  <Input.Group compact>
                    <Input
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
                </div>
                <div style={{ width: 120, margin: "30px 0px 0px 20px" }}>
                  <Select
                    style={{ minWidth: 120 }}
                    showSearch
                    placeholder=""
                    optionFilterProp="children"
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
                </div>
                <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    placeholder=""
                    optionFilterProp="children"
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
                </div>
                <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                  <Input.Group compact>
                    <Input
                      defaultValue=""
                      style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                    />
                  </Input.Group>
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
                    onChange={onChangeModel}
                    onSearch={onSearchModel}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Yes</Option>
                    <Option value="lucy">No</Option>
                    <Option value="tom">N/A</Option>
                  </Select>
                </div>
                <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                  <Input.Group compact>
                    <Input
                      defaultValue=""
                      style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                    />
                  </Input.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#F0AD4E",
          }}
          className="lay-segment"
        >
          Screen
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
            ></div>
            <div
              className="layout-input-data-col"
              style={{
                width: "100%",
                padding: "10px",
                minHeight: 200,
              }}
            ></div>
          </div>
        </div>
        <Button
          onClick={onSubmitHp}
          type="primary"
          icon={<SaveOutlined />}
          style={{
            width: "-webkit-fill-available",
            margin: "15px 0px 10px 0px",
          }}
        >
          Save
        </Button>
      </Card>
      <BackTop>
        <div style={style} onClick={() => console.log("top")}>
          UP
        </div>
      </BackTop>
    </div>
  );
};

export default PostHandphoneApp;
