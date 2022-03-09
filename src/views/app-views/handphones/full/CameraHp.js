import React, { useState, useEffect } from "react";
import { Input, Select, Button, Tag } from "antd";
import store from "redux/store";
import { getListHpMemJen, getListHpMemKap } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const CameraHp = () => {
  const [dataMemJen, setDataMemJen] = useState([]);
  const [dataMemKap, setDataMemKap] = useState([]);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getListMemJen();
    getListMemKap();
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

  const getListMemJen = () => {
    getListHpMemJen().then((response) => {
      const data = response.data.map((item) => ({
        text: item.mem_jen,
        value: item.id + "--mem_eksternal",
      }));
      setDataMemJen(data);
    });
  };
  const getListMemKap = () => {
    getListHpMemKap().then((response) => {
      const data = response.data.map((item) => ({
        text: item.mem_kap,
        value: item.id + "--mem_eksternal_kap",
      }));
      setDataMemKap(data);
    });
  };
  return (
    <div>
      <div
        id="camera" 
        className="lay-segment affix-camera"
      >
        Camera
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
            <div className="lbl-input-data" style={{ minWidth: 150 }}>
              Kamera Utama
            </div>
            <Select
              style={{ minWidth: 100 }}
              showSearch
              placeholder=""
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={
                store.getState().gen_hp_data.data.kam_utama_status +
                "--kam_utama_status"
              }
            >
              <Option value="1--kam_utama_status">Yes</Option>
              <Option value="2--kam_utama_status">No</Option>
              <Option value="3--kam_utama_status">N/A</Option>
              <Option value="0--kam_utama_status">N/A</Option>
            </Select>
          </div>
          <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
            <Input.Group compact>
              <Input
                name="kam_utama_total"
                onChange={onChangeInputGeneral}
                defaultValue={store.getState().gen_hp_data.data.kam_utama_total}
                style={{ width: 65, margin: "0px 0px 0px 0px" }}
              />
              <Button className="lay-group-label">lensa</Button>
            </Input.Group>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "230px", margin: "15px 0px 0px 0px" }}>
            <Input.Group compact>
              <Input
                name="kam_utama"
                onChange={onChangeInputGeneral}
                defaultValue={store.getState().gen_hp_data.data.kam_utama}
                style={{ width: 125, margin: "0px 0px 0px 0px" }}
              />
              <Button className="lay-group-label">MP</Button>
            </Input.Group>
          </div>
          <div style={{ width: "-webkit-fill-available", margin: "15px 10px 0px 20px" }}>
            <Input
              name="kam_utama2"
              onChange={onChangeInputGeneral}
              defaultValue={store.getState().gen_hp_data.data.kam_utama2}
              style={{ width: "-webkit-fill-available", margin: "0px 0px 0px 0px" }}
            />
          </div>
        </div>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Lensa 2, lensa 3, dst </div>
          <TextArea
            name="kam_utama_ket"
            defaultValue={store.getState().gen_hp_data.data.kam_utama_ket}
            onChange={onChangeInputGeneral}
            style={{ width: "100%", margin: "0px 0px 0px 0px" }}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div className="lay-subsegment" style={{ display: "flex" }}>
          <div>
            <div className="lbl-input-data">Lampu Kilat</div>
            <Select
              style={{ minWidth: 170 }}
              showSearch
              placeholder=""
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={
                store.getState().gen_hp_data.data.kam_led_flash_status +
                "--kam_led_flash_status"
              }
            >
              <Option value="1--kam_led_flash_status">Yes</Option>
              <Option value="2--kam_led_flash_status">No</Option>
              <Option value="3--kam_led_flash_status">N/A</Option>
              <Option value="0--kam_led_flash_status">N/A</Option>
            </Select>
          </div>
          <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
            <Input.Group compact>
              <Input
                name="kam_led_flash"
                defaultValue={store.getState().gen_hp_data.data.kam_led_flash}
                onChange={onChangeInputGeneral}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
              />
            </Input.Group>
          </div>
        </div>
        <div className="lay-subsegment">
          <div>
            <div className="lbl-input-data">Fitur Kamera</div>
          </div>
          <div style={{ width: "100%" }}>
            <Input
              name="kam_fitur"
              defaultValue={store.getState().gen_hp_data.data.kam_fitur}
              onChange={onChangeInputGeneral}
              style={{ width: "100%", margin: "0px 0px 0px 0px" }}
            />
          </div>
        </div>
        <div className="lay-subsegment" style={{ display: "flex" }}>
          <div>
            <div className="lbl-input-data">Video Recorder</div>
            <Select
              style={{ minWidth: 170 }}
              showSearch
              placeholder=""
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={
                store.getState().gen_hp_data.data.kam_video_status +
                "--kam_video_status"
              }
            >
              <Option value="1--kam_video_status">Yes</Option>
              <Option value="2--kam_video_status">No</Option>
              <Option value="3--kam_video_status">N/A</Option>
              <Option value="0--kam_video_status">N/A</Option>
            </Select>
          </div>
          <div style={{ margin: "30px 0px 0px 20px" }}>
            <Select
              style={{ minWidth: 170 }}
              showSearch
              placeholder=""
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={
                store.getState().gen_hp_data.data.kam_video_hd +
                "--kam_video_hd"
              }
            >
              <Option value="101--kam_video_hd">4K UHD 2160p</Option>
              <Option value="102--kam_video_hd">8K UHD 4320p</Option>
              <Option value="1--kam_video_hd">Belum HD</Option>
              <Option value="3--kam_video_hd">HD 1080p</Option>
              <Option value="2--kam_video_hd">HD 720p</Option>
              <Option value="100--kam_video_hd">N/A</Option>
              <Option value="103--kam_video_hd">QHD 1440p</Option>
            </Select>
          </div>
          <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
            <Input.Group compact>
              <Input
                name="kam_video"
                defaultValue={store.getState().gen_hp_data.data.kam_video}
                onChange={onChangeInputGeneral}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
              />
            </Input.Group>
          </div>
        </div>
        <div className="lay-subsegment" style={{ display: "flex" }}>
          <div>
            <div className="lbl-input-data" style={{ minWidth: 150 }}>
              Kamera Depan
            </div>
            <Select
              style={{ minWidth: 100 }}
              showSearch
              placeholder=""
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={
                store.getState().gen_hp_data.data.kam_depan_status +
                "--kam_depan_status"
              }
            >
              <Option value="1--kam_depan_status">Yes</Option>
              <Option value="2--kam_depan_status">No</Option>
              <Option value="3--kam_depan_status">N/A</Option>
              <Option value="0--kam_depan_status">N/A</Option>
            </Select>
          </div>
          <div style={{ margin: "30px 0px 0px 20px" }}>
            <Input.Group compact>
              <Input
                name="kam_depan_total"
                onChange={onChangeInputGeneral}
                defaultValue={store.getState().gen_hp_data.data.kam_depan_total}
                style={{ width: 65, margin: "0px 0px 0px 0px" }}
              />
              <Button className="lay-group-label">lensa</Button>
            </Input.Group>
          </div>
          <div style={{ margin: "0px 0px 0px 50px" }}>
            <div className="lbl-input-data" style={{ minWidth: 150 }}>
              Native Video Call
            </div>
            <Select
              style={{ minWidth: 100 }}
              showSearch
              placeholder=""
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={
                store.getState().gen_hp_data.data.kam_nat_vcall +
                "--kam_nat_vcall"
              }
            >
              <Option value="1--kam_nat_vcall">Yes</Option>
              <Option value="2--kam_nat_vcall">No</Option>
              <Option value="3--kam_nat_vcall">N/A</Option>
              <Option value="0--kam_nat_vcall">N/A</Option>
            </Select>
          </div>
        </div>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Keterangan Tambahan </div>
          <TextArea
            name="kam_depan"
            defaultValue={store.getState().gen_hp_data.data.kam_depan}
            onChange={onChangeInputGeneral}
            style={{ width: "100%", margin: "0px 0px 0px 0px" }}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default CameraHp;
