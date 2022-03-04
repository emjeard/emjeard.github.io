import React, { useState, useEffect } from "react";
import { Input, Select, Spin, InputNumber } from "antd";
import { getSearchHp, getDetailHp, putUpdateHandphone } from "api/ApiData";
import debounce from "lodash/debounce";

import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";

const { Option } = Select;
const { TextArea } = Input;

const ComparePopulerHp = () => {
  const [dataDefTagHp, setDefDataTagHp] = useState([]);
  const [dataTagHp, setDataTagHp] = useState([]);
  const [hpLoading, setHpLoading] = useState(false);
  const [lastFetchIdHp, setLastFetchIdHp] = useState(0);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    const compare_hp = store.getState().gen_hp_data.data.hp_compare_list;
    for (let m = 0; m < compare_hp.length; m++) {
      setDefDataTagHp((oldArray) => [
        ...oldArray,
        {
          value: String(compare_hp[m].id),
          label: compare_hp[m].name,
          key: String(compare_hp[m].id),
        },
      ]);
    }
  };

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;

    if (stateName.includes("__cb")) {
      stateValue = e.target.checked;
    }
    store.dispatch(HP_DATA_ACT(stateName, stateValue));
  };

  const getTagHp = (keyword) => {
    setLastFetchIdHp(+1);
    const fetchId = lastFetchIdHp;
    setDataTagHp([]);
    setHpLoading(true);
    getSearchHp(keyword).then((response) => {
      if (fetchId !== lastFetchIdHp) {
        // for fetch callback order
        return;
      }
      const data = response.data.map((item) => ({
        text: item.nama_hp,
        value: item.id,
      }));
      setDataTagHp(data);
      setHpLoading(false);
    });
  };

  const handleSearchHp = (value) => {
    //console.log(value);
    if (value.length > 0) {
      getTagHp(value);
    }
  };

  const handleChangeHp = (selectedItems) => {
    setDefDataTagHp(selectedItems);
    let dataHp = "";
    selectedItems.map((item) => (dataHp += item.value + ","));
    dataHp = dataHp.substring(0, dataHp.length - 1);
    store.dispatch(HP_DATA_ACT("hp_compare", dataHp));
  };
  return (
    <div>
      <div id="comparehp" className="lay-segment affix-comparehp">
        Komparasi Populer
      </div>
      <div
        className="layout-input-data-col"
        style={{
          width: "100%",
          padding: "10px",
        }}
      >
        <div className="lay-subsegment">
          <div style={{ padding: "0px 10px", margin: "0px 0px 0px 0px" }}>
            <div style={{ display: "flex" }}>
              <Select
                mode="multiple"
                labelInValue
                value={dataDefTagHp}
                placeholder="Select hp"
                notFoundContent={hpLoading ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={debounce(handleSearchHp, 1000)}
                onChange={handleChangeHp}
                style={{ width: "100%", height: "auto !important" }}
              >
                {dataTagHp.map((item) => (
                  <Option key={item.value}>{item.text}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePopulerHp;
