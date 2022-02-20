import React, { useState, useEffect, useCallback } from "react";
import { Input, Select, Card, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import Drag from "./Drag";

const { Option } = Select;
const { TextArea } = Input;

const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

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
            padding: "5px 10px",
            borderRadius: "10px",
            color: "white",
            fontWeight: 500,
          }}
        >
          General
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="layout-input-data"
            style={{
              width: "100%",
              padding: "10px",
              minHeight: 200,
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
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
              <div style={{ margin: "0px 0px 0px 20px" }}>
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
            <div style={{ marginTop: "20px" }}>
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
            <div style={{ marginTop: "20px" }}>
              <div className="lbl-input-data">Keterangan Tambahan</div>
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <div className="lbl-input-data">Gambar</div>
              <Drag parentCallback={callback} image={""} />
            </div>
          </div>
          <div
            className="layout-input-data"
            style={{
              width: "100%",
              minHeight: 200,
              padding: "10px",
            }}
          >
            <div>
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
            <div style={{ marginTop: "20px" }}>
              <div className="lbl-input-data">Dimensi</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Input
                  addonAfter={
                    <span style={{ fontSize: "12px" }}>mm (panjang)</span>
                  }
                  defaultValue=""
                  style={{ width: 170 }}
                />
                <Input
                  addonAfter={
                    <span style={{ fontSize: "12px" }}>mm (lebar)</span>
                  }
                  defaultValue=""
                  style={{ width: 150, margin: "0px 0px 0px 20px" }}
                />
                <Input
                  addonAfter={
                    <span style={{ fontSize: "12px" }}>mm (tebal)</span>
                  }
                  defaultValue=""
                  style={{ width: 150, margin: "10px 0px 0px 0px" }}
                />
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div className="lbl-input-data">Bobot</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Input
                  addonAfter={<span style={{ fontSize: "12px" }}>gram</span>}
                  defaultValue=""
                  style={{ width: 120 }}
                />
                <Input
                  defaultValue=""
                  style={{ width: 250, margin: "0px 0px 0px 20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostHandphoneApp;
