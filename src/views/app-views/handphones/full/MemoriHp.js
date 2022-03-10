import React, { useState, useEffect } from "react";
import { Input, Select, Button, Tag } from "antd";
import store from "redux/store";
import { getListHpMemJen, getListHpMemKap } from "api/ApiData";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const MemoriHp = () => {
  const [dataMemJen, setDataMemJen] = useState([]);
  const [dataMemKap, setDataMemKap] = useState([]);
  const [dataMemEksS, setDataMemEksS] = useState([]);

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

    if (stateName.includes("mem_ram") && !stateName.includes("mem_ram_ket")) {
      store.dispatch(HP_DATA_ACT(stateName, parseInt(stateValue)));
    } else if (
      stateName.includes("mem_rom") &&
      !stateName.includes("mem_rom_ket")
    ) {
      store.dispatch(HP_DATA_ACT(stateName, parseInt(stateValue)));
    } else if (
      stateName.includes("mem_internal") &&
      !stateName.includes("mem_internal_ket")
    ) {
      store.dispatch(HP_DATA_ACT(stateName, parseInt(stateValue)));
    } else {
      store.dispatch(HP_DATA_ACT(stateName, stateValue));
    }
  };

  const onChangeSelectGeneral = (selectedItems, option) => {
    const splitOptions = option.value.split("--");
    const stateName = splitOptions[1];
    const valueSelect = splitOptions[0];
    store.dispatch(HP_DATA_ACT(stateName, parseInt(valueSelect)));

    if (stateName.includes("mem_eksternal_s")) {
      setDataMemEksS(store.getState().gen_hp_data.data.mem_eksternal_s);
    }
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
      <div id="memori" className="lay-segment affix-memori">
        Memori
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          padding: "10px",
          minHeight: 200,
        }}
      >
        <div className="lay-subsegment">
          <div className="lbl-input-data">RAM</div>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ margin: "0px 0px 0px 0px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_1"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_1}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_2"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_2}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_3"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_3}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_4"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_4}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_5"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_5}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_6"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_6}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 105 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_7"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_7}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
                <Button className="lay-group-label">MB</Button>
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 340 }}>
              <Input.Group compact>
                <Input
                  name="mem_ram_ket"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_ram_ket}
                  style={{ width: 340, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
          </div>
        </div>
        <div className="lay-subsegment">
          <div className="lbl-input-data">ROM</div>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ margin: "0px 0px 0px 0px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_1"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_1}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_2"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_2}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_3"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_3}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_4"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_4}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_5"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_5}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 65 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_6"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_6}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 105 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_7"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_7}
                  style={{ width: 65, margin: "0px 0px 0px 0px" }}
                />
                <Button className="lay-group-label">MB</Button>
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 340 }}>
              <Input.Group compact>
                <Input
                  name="mem_rom_ket"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_rom_ket}
                  style={{ width: 340, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
          </div>
        </div>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Internal</div>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ margin: "0px 0px 0px 0px", width: 75 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal"
                  onChange={onChangeInputGeneral}
                  defaultValue={store.getState().gen_hp_data.data.mem_internal}
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 75 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_1"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_1
                  }
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 75 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_2"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_2
                  }
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 75 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_3"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_3
                  }
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 75 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_4"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_4
                  }
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 75 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_5"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_5
                  }
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 75 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_6"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_6
                  }
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 115 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_7"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_7
                  }
                  style={{ width: 75, margin: "0px 0px 0px 0px" }}
                />
                <Button className="lay-group-label">MB</Button>
              </Input.Group>
            </div>
            <div style={{ margin: "0px 0px 0px 10px", width: 257 }}>
              <Input.Group compact>
                <Input
                  name="mem_internal_ket"
                  onChange={onChangeInputGeneral}
                  defaultValue={
                    store.getState().gen_hp_data.data.mem_internal_ket
                  }
                  style={{ width: 257, margin: "0px 0px 0px 0px" }}
                />
              </Input.Group>
            </div>
          </div>
        </div>
        <div className="lay-subsegment" style={{ display: "flex" }}>
          <div>
            <div className="lbl-input-data">Eksternal</div>
            <Select
              style={{ minWidth: 70 }}
              showSearch
              placeholder=""
              defaultValue={
                store.getState().gen_hp_data.data.mem_eksternal_s === ""
                  ? undefined
                  : store.getState().gen_hp_data.data.mem_eksternal_s +
                    "--mem_eksternal_s"
              }
              optionFilterProp="children"
              onChange={onChangeSelectGeneral}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="1--mem_eksternal_s">Yes</Option>
              <Option value="2--mem_eksternal_s">No</Option>
              <Option value="3--mem_eksternal_s">N/A</Option>
              <Option value="0--mem_eksternal_s">N/A</Option>
            </Select>
          </div>
          <div style={{ margin: "30px 0px 0px 20px" }}>
            <Input.Group compact>
              <Select
                defaultValue={
                  store.getState().gen_hp_data.data.mem_eksternal === ""
                    ? undefined
                    : store.getState().gen_hp_data.data.mem_eksternal === ""
                    ? ""
                    : store.getState().gen_hp_data.data.mem_eksternal +
                      "--mem_eksternal"
                }
                disabled={
                  store.getState().gen_hp_data.data.mem_eksternal_s === 1
                    ? false
                    : true
                }
                style={{ width: 180 }}
                onChange={onChangeSelectGeneral}
              >
                {dataMemJen.map((item) => (
                  <Option key={item.value}>{item.text}</Option>
                ))}
              </Select>
            </Input.Group>
          </div>
          <Tag
            color="#2db7f5"
            style={{ height: 25, margin: "30px 0px 0px 50px" }}
          >
            MEMORY UP TO
          </Tag>
          <div style={{ margin: "30px 0px 0px 20px" }}>
            <Input.Group compact>
              <Select
                defaultValue={
                  store.getState().gen_hp_data.data.mem_eksternal_kap === ""
                    ? undefined
                    : store.getState().gen_hp_data.data.mem_eksternal_kap === ""
                    ? ""
                    : store.getState().gen_hp_data.data.mem_eksternal_kap +
                      "--mem_eksternal_kap"
                }
                disabled={
                  store.getState().gen_hp_data.data.mem_eksternal_s === 1
                    ? false
                    : true
                }
                style={{ width: 100 }}
                onChange={onChangeSelectGeneral}
              >
                {dataMemKap.map((item) => (
                  <Option key={item.value}>{item.text + " GB"}</Option>
                ))}
              </Select>
            </Input.Group>
          </div>
          <div style={{ margin: "30px 0px 0px 20px" }}>
            <Input.Group compact>
              <Input
                name="mem_ekternal_ket"
                disabled={
                  store.getState().gen_hp_data.data.mem_eksternal_s === 1
                    ? false
                    : true
                }
                onChange={onChangeInputGeneral}
                defaultValue={
                  store.getState().gen_hp_data.data.mem_ekternal_ket
                }
                style={{ width: 250, margin: "0px 0px 0px 0px" }}
              />
            </Input.Group>
          </div>
        </div>
        <div className="lay-subsegment">
          <div className="lbl-input-data">Keterangan Tambahan </div>
          <TextArea
            name="mem_semua_ket"
            defaultValue={store.getState().gen_hp_data.data.mem_semua_ket}
            onChange={onChangeInputGeneral}
            style={{ width: "100%", margin: "0px 0px 0px 0px" }}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default MemoriHp;
