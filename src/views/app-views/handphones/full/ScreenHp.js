import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "antd";
import store from "redux/store";
import { getListHpLayarSensor, getListHpLayarWarna } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const ScreenHp = () => {
  const [dataLayarWarna, setDataLayarWarna] = useState([]);
  const [dataLayarSensor, setDataLayarSensor] = useState([]);
  let childrenSensor = [];

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    getLayarWarna();
    getLayarSensor();
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

  const getLayarWarna = () => {
    getListHpLayarWarna().then((response) => {
      const data = response.data.map((item) => ({
        text: item.warna,
        value: item.id + "--lay_warna_layar",
      }));
      setDataLayarWarna(data);
    });
  };

  const getLayarSensor = () => {
    getListHpLayarSensor().then((response) => {
      const data = response.data.map((item) => ({
        text: item.sensor,
        value: item.id + "--lay_sensor",
      }));
      setDataLayarSensor(data);
    });
  };

  const onChangeTagsSensor = (selectedItems, option) => {
    let stateValue = selectedItems;
    let finalStateValue = "";
    for (let i = 0; i < stateValue.length; i++) {
      finalStateValue += stateValue[i] + ",";
    }
    finalStateValue = finalStateValue.slice(0, -1).replace(/--lay_sensor/g, "");

    store.dispatch(HP_DATA_ACT("lay_sensor", finalStateValue));
  };

  const tagsRepl = store
    .getState()
    .gen_hp_data.data.lay_sensor.replace(/, /g, ",");
  const tags = tagsRepl.split(",");
  let tagsArr = [];
  for (let i = 0; i < tags.length; i++) {
    tagsArr.push(tags[i] + "--lay_sensor");
  }

  return (
    <div>
      <div id="screen" className="lay-segment affix-screen">
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
                <div className="lbl-input-data">Touchscreen</div>
                <Select
                  style={{ minWidth: 70 }}
                  showSearch
                  placeholder=""
                  defaultValue={
                    store.getState().gen_hp_data.data.lay_touchscreen_status +
                    "--lay_touchscreen_status"
                  }
                  optionFilterProp="children"
                  onChange={onChangeSelectGeneral}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="1--lay_touchscreen_status">Yes</Option>
                  <Option value="2--lay_touchscreen_status">No</Option>
                  <Option value="3--lay_touchscreen_status">N/A</Option>
                  <Option value="0--lay_touchscreen_status">N/A</Option>
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Select
                    defaultValue={
                      store.getState().gen_hp_data.data.lay_touchscreen +
                      "--lay_touchscreen"
                    }
                    style={{ width: 150 }}
                    onChange={onChangeSelectGeneral}
                  >
                    <Option value="1--lay_touchscreen">Capacitive</Option>
                    <Option value="2--lay_touchscreen">Resistive</Option>
                    <Option value="3--lay_touchscreen">N/A</Option>
                    <Option value="0--lay_touchscreen">N/A</Option>
                  </Select>
                </Input.Group>
              </div>
            </div>

            <div style={{ display: "flex" }} className="lay-subsegment">
              <div style={{ width: "100%" }}>
                <div className="lbl-input-data">Jenis Layar</div>
                <Input
                  name="lay_tipe_layar"
                  style={{ width: "100%" }}
                  defaultValue={
                    store.getState().gen_hp_data.data.lay_tipe_layar
                  }
                  placeholder=""
                />
              </div>
            </div>
            <div style={{ display: "flex" }} className="lay-subsegment">
              <div>
                <div className="lbl-input-data">Warna</div>
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
                    store.getState().gen_hp_data.data.lay_warna_layar +
                    "--lay_warna_layar"
                  }
                >
                  {dataLayarWarna.map((item) => (
                    <Option key={item.value}>{item.text}</Option>
                  ))}
                </Select>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: "100%" }}>
                <Input
                  name="lay_warna_ket"
                  style={{ width: "100%" }}
                  defaultValue={store.getState().gen_hp_data.data.lay_warna_ket}
                  placeholder=""
                />
              </div>
            </div>
            <div style={{ display: "flex" }} className="lay-subsegment">
              <div>
                <div className="lbl-input-data">Ukuran</div>
                <Input.Group compact>
                  <Input
                    name="lay_size_diagonal"
                    onChange={onChangeInputGeneral}
                    defaultValue={
                      store.getState().gen_hp_data.data.lay_size_diagonal
                    }
                    style={{ width: 65, margin: "0px 0px 0px 0px" }}
                  />
                  <Button className="lay-group-label">inch</Button>
                </Input.Group>
              </div>
              <div style={{ margin: "30px 0px 0px 20px", width: 339 }}>
                <Input
                  name="lay_size_diagonal_ket"
                  style={{ width: "100%" }}
                  defaultValue={
                    store.getState().gen_hp_data.data.lay_size_diagonal_ket
                  }
                  placeholder=""
                />
              </div>
            </div>
            <div className="lay-subsegment">
              <div>
                <div className="lbl-input-data">Resolusi</div>
                <div style={{ width: "100%", display: "flex" }}>
                  <div>
                    <Input.Group compact>
                      <Input
                        name="lay_size_horizontal"
                        onChange={onChangeInputGeneral}
                        defaultValue={
                          store.getState().gen_hp_data.data.lay_size_horizontal
                        }
                        style={{ width: 75, margin: "0px 0px 0px 0px" }}
                      />
                      <Button className="lay-group-label">
                        px (horizontal)
                      </Button>
                    </Input.Group>
                  </div>
                  <div style={{ margin: "0px 0px 0px 20px" }}>
                    <Input.Group compact>
                      <Input
                        name="lay_size_vertikal"
                        onChange={onChangeInputGeneral}
                        defaultValue={
                          store.getState().gen_hp_data.data.lay_size_vertikal
                        }
                        style={{ width: 75, margin: "0px 0px 0px 0px" }}
                      />
                      <Button className="lay-group-label">px (vertikal)</Button>
                    </Input.Group>
                  </div>
                </div>
                <div style={{ margin: "15px 0px 0px 0px" }}>
                  <Input.Group compact>
                    <Input
                      name="lay_size_ppi"
                      onChange={onChangeInputGeneral}
                      defaultValue={
                        store.getState().gen_hp_data.data.lay_size_ppi
                      }
                      style={{ width: 75, margin: "0px 0px 0px 0px" }}
                    />
                    <Button className="lay-group-label">PPI</Button>
                  </Input.Group>
                </div>
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
                <div className="lbl-input-data">Proteksi</div>
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
                    store.getState().gen_hp_data.data.lay_proteksi_status +
                    "--lay_proteksi_status"
                  }
                >
                  <Option value="1--lay_proteksi_status">Yes</Option>
                  <Option value="2--lay_proteksi_status">No</Option>
                  <Option value="3--lay_proteksi_status">N/A</Option>
                  <Option value="0--lay_proteksi_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="lay_proteksi"
                    onChange={onChangeInputGeneral}
                    defaultValue={
                      store.getState().gen_hp_data.data.lay_proteksi
                    }
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Multitouch</div>
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
                    store.getState().gen_hp_data.data.lay_multitouch_status +
                    "--lay_multitouch_status"
                  }
                >
                  <Option value="1--lay_multitouch_status">Yes</Option>
                  <Option value="2--lay_multitouch_status">No</Option>
                  <Option value="3--lay_multitouch_status">N/A</Option>
                  <Option value="0--lay_multitouch_status">N/A</Option>
                </Select>
              </div>
              <div style={{ width: "100%", margin: "30px 0px 0px 20px" }}>
                <Input.Group compact>
                  <Input
                    name="lay_multitouch"
                    defaultValue={
                      store.getState().gen_hp_data.data.lay_multitouch
                    }
                    onChange={onChangeInputGeneral}
                    style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                  />
                </Input.Group>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Sensor</div>
                <Select
                  mode="multiple"
                  name="gen_tags"
                  placeholder=""
                  defaultValue={tagsArr}
                  onChange={onChangeTagsSensor}
                  style={{ width: "100%" }}
                >
                  {dataLayarSensor.map((item) => (
                    <Option key={item.value}>{item.text}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="lay-subsegment" style={{ display: "flex" }}>
              <div>
                <div className="lbl-input-data">Finger Print</div>
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
                    store.getState().gen_hp_data.data.lay_fprint_status +
                    "--lay_fprint_status"
                  }
                >
                  <Option value="1--lay_fprint_status">Yes</Option>
                  <Option value="2--lay_fprint_status">No</Option>
                  <Option value="3--lay_fprint_status">N/A</Option>
                  <Option value="0--lay_fprint_status">N/A</Option>
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
                    store.getState().gen_hp_data.data.lay_fprint_position +
                    "--lay_fprint_position"
                  }
                >
                  <Option value="1--lay_fprint_position">Front</Option>
                  <Option value="2--lay_fprint_position">Back</Option>
                  <Option value="4--lay_fprint_position">On-screen</Option>
                  <Option value="5--lay_fprint_position">Edge-side</Option>
                  <Option value="3--lay_fprint_position">N/A</Option>
                </Select>
              </div>
            </div>
            <div style={{ margin: "15px 0px 0px 0px" }}>
              <Input
                name="lay_fprint"
                defaultValue={store.getState().gen_hp_data.data.lay_fprint}
                onChange={onChangeInputGeneral}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
              />
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Eksternal</div>
              <Input
                name="lay_ext"
                defaultValue={store.getState().gen_hp_data.data.lay_ext}
                onChange={onChangeInputGeneral}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
              />
            </div>
            <div className="lay-subsegment">
              <div className="lbl-input-data">Keterangan Tambahan </div>
              <TextArea
                name="lay_tambahan"
                defaultValue={store.getState().gen_hp_data.data.lay_tambahan}
                onChange={onChangeInputGeneral}
                style={{ width: "100%", margin: "0px 0px 0px 0px" }}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenHp;
