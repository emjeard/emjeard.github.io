import React, { useState, useEffect } from "react";
import { Card, Spin, Checkbox, Row, Col, Select } from "antd";
import {
  getDetailRSS,
  getListTagGeneral,
  getListTagOs,
  getListTagBrand,
} from "api/ApiData";
import RichTextInput from "views/app-views/components/data-entry/input/RichTextInput";
import debounce from "lodash/debounce";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const RSSApp = (props) => {
  const [dataNews, setDataNews] = useState([]);
  const [dataTagGeneral, setDataTagGeneral] = useState([]);
  const [dataDefTagGeneral, setDefDataTagGeneral] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [dataTagOS, setDataTagOS] = useState([]);
  const [dataDefTagOS, setDefDataTagOS] = useState([]);
  const [dataTagBrand, setDataTagBrand] = useState([]);
  const [dataDefTagBrand, setDefDataTagBrand] = useState([]);
  const [lastFetchId, setLastFetchId] = useState(0);
  const [brandLoading, setBrandLoading] = useState(false);

  useEffect(() => {
    (async () => {
      getTagGeneral();
      getTagOs();
      retrieveData();
    })();
  }, []);

  const getTagGeneral = () => {
    getListTagGeneral().then((response) => {
      setDataTagGeneral(response.data);
    });
  };

  const getTagOs = () => {
    getListTagOs().then((response) => {
      console.log(response.data);
      setDataTagOS(response.data);
      //setDataTagOS(response.data);
    });
  };

  const getTagBrand = (keyword) => {
    setLastFetchId(+1);
    const fetchId = lastFetchId;
    setDataTagBrand([]);
    setBrandLoading(true);
    getListTagBrand(keyword).then((response) => {
      if (fetchId !== lastFetchId) {
        // for fetch callback order
        return;
      }
      const data = response.data.map((user) => ({
        text: user.label,
        value: user.value,
      }));
      setDataTagBrand(data);
      setBrandLoading(false);
    });
  };

  const retrieveData = () => {
    setFirstLoading(true);
    getDetailRSS(props.match.params.id)
      .then((response) => {
        setDataNews(response.data);
        const tag_general = response.data.tags_general;
        const tag_os = response.data.tags_os;
        console.log("tag_os", tag_os.length);

        for (var i = 0; i < tag_general.length; i++) {
          setDefDataTagGeneral(dataDefTagGeneral.push(tag_general[i].id));
        }
        for (var j = 0; j < tag_os.length; j++) {
          console.log("tags_os", tag_os[j].id);

          setDefDataTagOS((oldArray) => [...oldArray, tag_os[j].id]);
        }
        setFirstLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setFirstLoading(false);
      });
  };

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const handleChange = (selectedItems) => {
    setDefDataTagOS(selectedItems);
    console.log(selectedItems);
  };

  const handleChangeBrand = (selectedItems) => {
    console.log(selectedItems);
    setDefDataTagBrand(selectedItems);
  };

  const handleSearchBrand = (value) => {
    console.log(value);
    if (value.length > 0) {
      getTagBrand(value);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0px 20px 0px 0px", width: "100%" }}>
        <Card>
          <div>Edit rss {props.match.params.id}</div>
          <RichTextInput
            content={
              dataNews.description === undefined ? "-" : dataNews.description
            }
          />
        </Card>
      </div>
      <div style={{ minWidth: 355, maxWidth: 355 }}>
        <Card>
          <div>Category</div>
          <Checkbox.Group defaultValue={dataDefTagGeneral} onChange={onChange}>
            <Row>
              {dataTagGeneral.map((items) => (
                <Col span={12}>
                  <Checkbox value={items.value}>{items.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
          <div style={{ marginTop: 30 }}>Tagging</div>
          <div style={{ marginTop: 10 }}>OS</div>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select operating system"
            defaultValue={dataDefTagOS}
            value={dataDefTagOS}
            onChange={handleChange}
            optionLabelProp="label"
          >
            {dataTagOS.map((items) => (
              <Option value={items.value} label={items.label}>
                {items.label}
              </Option>
            ))}
          </Select>
          <div style={{ marginTop: 10 }}>Brand</div>
          <Select
            mode="multiple"
            labelInValue
            value={dataDefTagBrand}
            placeholder="Select users"
            notFoundContent={brandLoading ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={debounce(handleSearchBrand, 1000)}
            onChange={handleChangeBrand}
            style={{ width: "100%" }}
          >
            {dataTagBrand.map((d) => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </Select>
        </Card>
      </div>
    </div>
  );
};

export default RSSApp;
