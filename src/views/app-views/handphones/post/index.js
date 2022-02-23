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
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import Drag from "./Drag";

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
  return (
    <div>
      <Card>
        <div
          style={{
            background: "#999999",
          }}
          className="lay-segment"
        >
          General
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="layout-input-data-col"
            style={{
              width: "100%",
              padding: "10px",
              minHeight: 200,
            }}
          >
            <div style={{ display: "flex" }}>
              <div className="lay-subsegment">
                <div className="lbl-input-data">Merek</div>
                <Select
                  style={{ minWidth: 200 }}
                  showSearch
                  placeholder="Pilih merek"
                  optionFilterProp="children"
                  onChange={onChangeMerk}
                  onSearch={onSearchMerk}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </div>
              <div
                className="lay-subsegment"
                style={{ margin: "0px 0px 0px 20px" }}
              >
                <div className="lbl-input-data">
                  <Tooltip
                    placement="rightTop"
                    title={"Contoh: Galaxy S22"}
                    color={"orange"}
                    key={"orange"}
                  >
                    <span style={{ marginRight: 6 }}>Tipe</span>
                    <InfoCircleOutlined />
                  </Tooltip>
                </div>
                <Input
                  placeholder="Contoh: Galaxy S22"
                  style={{ minWidth: 230 }}
                />
              </div>
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Tags</div>
              <Select
                mode="tags"
                size={size}
                placeholder="Please select"
                defaultValue={["a10", "c12"]}
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                {children}
              </Select>
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Keterangan Tambahan</div>
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Gambar</div>
              <Drag parentCallback={callback} image={""} />
            </div>
          </div>
          <div
            className="layout-input-data-col"
            style={{
              width: "100%",
              minHeight: 200,
              padding: "10px",
            }}
          >
            <div className="lay-subsegment">
              <div className="lbl-input-data">Model</div>
              <Select
                style={{ minWidth: 230 }}
                showSearch
                placeholder="Pilih merek"
                optionFilterProp="children"
                onChange={onChangeModel}
                onSearch={onSearchModel}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Dimensi</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Input
                  addonAfter={
                    <span className="lay-group-label">mm (panjang)</span>
                  }
                  defaultValue=""
                  style={{ width: 170 }}
                />
                <Input
                  addonAfter={
                    <span className="lay-group-label">mm (lebar)</span>
                  }
                  defaultValue=""
                  style={{ width: 150, margin: "0px 0px 0px 20px" }}
                />
                <Input
                  addonAfter={
                    <span className="lay-group-label">mm (tebal)</span>
                  }
                  defaultValue=""
                  style={{ width: 150, margin: "10px 0px 0px 0px" }}
                />
              </div>
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Bobot</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Input
                  addonAfter={<span className="lay-group-label">gram</span>}
                  defaultValue=""
                  style={{ width: 120 }}
                />
                <Input
                  defaultValue=""
                  style={{ width: 250, margin: "0px 0px 0px 20px" }}
                />
              </div>
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Warna</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Input
                  defaultValue=""
                  style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                />
              </div>
            </div>
            <div className="lay-subsegment">
              <div style={{ display: "flex" }}>
                <div>
                  <div className="lbl-input-data">Diumumkan</div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Input.Group compact>
                      <DatePicker style={{ width: 130 }} />
                      <Button
                        style={{ width: 80, padding: "5px 0px 0px 0px" }}
                        icon={
                          <Checkbox
                            defaultChecked
                            style={{
                              position: "relative",
                              top: "-5px",
                            }}
                          />
                        }
                      >
                        <span
                          style={{
                            position: "relative",
                            top: "-5px",
                            margin: "0px 0px 0px 5px",
                          }}
                        >
                          N/A
                        </span>
                      </Button>
                    </Input.Group>
                  </div>
                </div>
                <div style={{ margin: "0px 0px 0px 20px" }}>
                  <div className="lbl-input-data">Status</div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Select
                      style={{ minWidth: 230 }}
                      showSearch
                      placeholder="Pilih status"
                      optionFilterProp="children"
                      onChange={onChangeModel}
                      onSearch={onSearchModel}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            ></div>
          </div>
        </div>
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
