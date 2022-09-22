import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  Spin,
  Checkbox,
  Row,
  Col,
  Select,
  Input,
  Radio,
} from "antd";
import {
  getDetailRSS,
  getListTagGeneral,
  getListTagOs,
  getListTagBrand,
  getListTagOp,
  getSearchHp,
  postCreateArticle,
} from "api/ApiData";
import Parser from "html-react-parser";
import debounce from "lodash/debounce";
import moment from "moment";
import { SaveOutlined } from "@ant-design/icons";
import store from "redux/store";
import ADD_DATA from "redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";
import ImageUpload from "views/app-views/components/data-entry/input/ImageUpload";
import CKEditorCustomS3 from "views/app-views/components/data-entry/input/CKEditorCustomS3";
const { Option } = Select;
const { TextArea } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const CreateRSSApp = (props) => {
  const [dataNews, setDataNews] = useState([]);
  const [dataTagGeneral, setDataTagGeneral] = useState([]);
  const [dataDefTagGeneral, setDefDataTagGeneral] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [dataTagOS, setDataTagOS] = useState([]);
  const [dataDefTagOS, setDefDataTagOS] = useState([]);
  const [dataTagOp, setDataTagOp] = useState([]);
  const [dataDefTagOp, setDefDataTagOp] = useState([]);
  const [dataTagBrand, setDataTagBrand] = useState([]);
  const [dataDefTagBrand, setDefDataTagBrand] = useState([]);
  const [lastFetchIdBrand, setLastFetchIdBrand] = useState(0);
  const [brandLoading, setBrandLoading] = useState(false);

  const [dataTagHp, setDataTagHp] = useState([]);
  const [dataDefTagHp, setDefDataTagHp] = useState([]);
  const [lastFetchIdHp, setLastFetchIdHp] = useState(0);
  const [hpLoading, setHpLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [rssStatus, setRssStatus] = useState("pending");
  const [rssHadPushed, setHadPushed] = useState("");
  const [rssHideImage, setHideImage] = useState("");
  const [portalName, setPortalName] = useState("");
  const [portalId, setPortalId] = useState("");

  const onChangeRssStatus = (e) => {
    console.log("radio checked", e.target.value);
    setRssStatus(e.target.value);
  };
  useEffect(() => {
    (async () => {
      getTagGeneral();
      getTagOs();
      getTagOp();
      retrieveData();
    })();
  }, []);

  const getTagGeneral = () => {
    getListTagGeneral().then((response) => {
      console.log(response.data);
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

  const getTagOp = () => {
    getListTagOp().then((response) => {
      setDataTagOp(response.data);
      //setDataTagOS(response.data);
    });
  };

  const getTagBrand = (keyword) => {
    setLastFetchIdBrand(+1);
    const fetchId = lastFetchIdBrand;
    setDataTagBrand([]);
    setBrandLoading(true);
    getListTagBrand(keyword).then((response) => {
      if (fetchId !== lastFetchIdBrand) {
        // for fetch callback order
        return;
      }
      const data = response.data.map((item) => ({
        text: item.label,
        value: item.value,
      }));
      setDataTagBrand(data);
      setBrandLoading(false);
    });
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

  const retrieveData = () => {
    setFirstLoading(false);
  };

  const onChangeGen = (checkedValues) => {
    setDefDataTagGeneral(checkedValues);
    console.log("checked = ", checkedValues);
  };

  const handleChangeOs = (selectedItems) => {
    setDefDataTagOS(selectedItems);
    console.log(selectedItems);
  };

  const handleChangeOp = (selectedItems) => {
    setDefDataTagOp(selectedItems);
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

  const handleChangeHp = (selectedItems) => {
    console.log(selectedItems);
    setDefDataTagHp(selectedItems);
  };

  const handleSearchHp = (value) => {
    console.log(value);
    if (value.length > 0) {
      getTagHp(value);
    }
  };

  const callback = useCallback((value) => {
    setImageUrl(value);
  }, []);

  const onChangeTitleJudul = (e) => {
    setTitle(e.target.value);
  };

  const onChangeTitle = (e) => {
    setMetaTitle(e.target.value);
  };

  const onChangeDesc = (e) => {
    setMetaDesc(e.target.value);
  };

  const callbackDesc = useCallback((value) => {
    setNewDescription(value);
  }, []);

  const onSubmitRss = (e) => {
    console.log("title", title);
    //console.log("desc", store.getState().articles.content);

    let content = store.getState().articles.content;
    let tagGeneral = "";
    let tagOs = "";
    let tagBrand = "";
    let tagDevices = "";
    let tagOp = "";
    let portal_id = portalId;
    let status = rssStatus;
    let hadPushed = rssHadPushed;
    let hideImages = rssHideImage;
    let meta_title = metaTitle;
    let meta_desc = metaDesc;
    let meta_image = store.getState().form_input.form_1_img_data;

    if (
      title === "" ||
      content === "" ||
      meta_title === "" ||
      meta_desc === "" ||
      portal_id === ""
    ) {
      let warning_message = "";
      if (title === "") {
        warning_message = "Judul tidak boleh kosong";
      } else if (content === "") {
        warning_message = "Konten tidak boleh kosong";
      } else if (meta_title === "") {
        warning_message = "Meta title tidak boleh kosong";
      } else if (meta_desc === "") {
        warning_message = "Meta description tidak boleh kosong";
      } else if (portal_id === "") {
        warning_message = "Portal belum dipilih";
      }
      toast.error(warning_message, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setUpdateLoading(true);

      for (let i = 0; i < dataDefTagGeneral.length; i++) {
        tagGeneral += dataDefTagGeneral[i] + ",";
      }
      tagGeneral = tagGeneral.slice(0, -1);

      for (let i = 0; i < dataDefTagOS.length; i++) {
        tagOs += dataDefTagOS[i] + ",";
      }
      tagOs = tagOs.slice(0, -1);

      for (let i = 0; i < dataDefTagBrand.length; i++) {
        tagBrand += dataDefTagBrand[i].key + ",";
      }
      tagBrand = tagBrand.slice(0, -1);

      for (let i = 0; i < dataDefTagHp.length; i++) {
        tagDevices += dataDefTagHp[i].key + ",";
      }
      tagDevices = tagDevices.slice(0, -1);

      for (let i = 0; i < dataDefTagOp.length; i++) {
        tagOp += dataDefTagOp[i] + ",";
      }
      tagOp = tagOp.slice(0, -1);

      console.log("tagGeneral", tagGeneral);
      console.log("tagOs", tagOs);
      console.log("tagBrand", tagBrand);
      console.log("tagDevices", tagDevices);
      console.log("tagOp", tagOp);

      postCreateArticle(
        portal_id,
        title,
        description,
        content,
        tagGeneral,
        tagOs,
        tagBrand,
        "",
        tagDevices,
        tagOp,
        status,
        hadPushed,
        hideImages,
        meta_title,
        meta_desc,
        meta_image
      )
        .then((resp) => {
          console.log("update", resp.data.status);
          if (resp.data.status === true) {
            toast.success(resp.data.message, {
              position: "top-right",
              autoClose: true,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            /* setTimeout(
              () => (window.location.href = "/dashboards/rss/list"),
              3000
            ); */
          } else {
            toast.error(resp.data.message, {
              position: "top-right",
              autoClose: true,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          setUpdateLoading(false);
        })
        .catch((err) => {
          toast.error("Gagal update artikel", {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setUpdateLoading(false);
        });
    }
  };

  function onChangePortal(value) {
    console.log(`selected ${value}`);
    setPortalId(value);
  }

  function onSearchPortal(val) {
    console.log("search:", val);
  }

  return firstLoading === true ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0px 20px 0px 0px", width: "100%" }}>
        <Card style={{ margin: "15px 0px 0px" }}>
          <Input
            size="large"
            placeholder="Judul"
            style={{ margin: "15px 0px 20px 0px" }}
            value={title}
            onChange={onChangeTitleJudul}
          />
          <CKEditorCustomS3 />
          <div style={{ margin: "15px 0px", height: 200 }}>
            <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
              Header Image *
            </div>
            <ImageUpload img_pos={"1"} />
          </div>
          <div>
            <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
              Meta Title / Head Title*
            </div>
            <Input
              placeholder="Meta title"
              allowClear
              onChange={onChangeTitle}
              value={metaTitle}
            />
            <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
              Meta Description*
            </div>
            <TextArea
              placeholder="Meta description"
              allowClear
              onChange={onChangeDesc}
              value={metaDesc}
              style={{ minHeight: "150px" }}
            />
          </div>
        </Card>
      </div>
      <div
        style={{
          minWidth: 355,
          maxWidth: 355,
          margin: "15px 0px 0px 0px",
          position: "sticky",
          alignSelf: "flex-start",
          top: "15px",
        }}
      >
        <Card>
          <div>Portal</div>
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder="Pilih portal"
            optionFilterProp="children"
            onChange={onChangePortal}
            onSearch={onSearchPortal}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="0">InPonsel</Option>
            <Option value="46">Editorial</Option>
            <Option value="49">Editorial Content</Option>
            <Option value="50">Editorial News</Option>
          </Select>
          ,<div>Category</div>
          <Checkbox.Group
            defaultValue={dataDefTagGeneral}
            onChange={onChangeGen}
          >
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
            style={{ width: "100%", height: "auto !important" }}
            placeholder="select operating system"
            defaultValue={dataDefTagOS}
            value={dataDefTagOS}
            onChange={handleChangeOs}
            optionLabelProp="label"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {dataTagOS.map((items) => (
              <Option value={items.value} label={items.label}>
                {items.label}
              </Option>
            ))}
          </Select>
          <div style={{ margin: "10px 0px 15px 0px" }}>Brand</div>
          <Select
            mode="multiple"
            labelInValue
            value={dataDefTagBrand}
            placeholder="Select brand"
            notFoundContent={brandLoading ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={debounce(handleSearchBrand, 1000)}
            onChange={handleChangeBrand}
            style={{ width: "100%", height: "auto !important" }}
          >
            {dataTagBrand.map((item) => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
          <div style={{ margin: "10px 0px 15px 0px" }}>Operator</div>
          <Select
            mode="multiple"
            style={{ width: "100%", height: "auto !important" }}
            placeholder="select operator"
            defaultValue={dataDefTagOp}
            value={dataDefTagOp}
            onChange={handleChangeOp}
            optionLabelProp="label"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {dataTagOp.map((items) => (
              <Option value={items.value} label={items.label}>
                {items.label}
              </Option>
            ))}
          </Select>
          <div style={{ margin: "10px 0px 15px 0px" }}>Device</div>
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
          <div style={{ marginTop: 25, fontWeight: 500 }}>Last updated</div>
          <div style={{ marginTop: 5 }}>
            {lastUpdate === ""
              ? ""
              : moment(lastUpdate).format("MMMM Do YYYY, HH:mm")}
          </div>
          <div style={{ marginTop: 25, fontWeight: 500 }}>Source Link</div>
          <div style={{ marginTop: 5 }}>
            <a href={"https://www.inponsel.com/news?url=" + sourceLink}>
              {sourceLink}
            </a>
          </div>
          <div style={{ marginTop: 25, fontWeight: 500 }}>Status</div>
          <div>
            <Radio.Group onChange={onChangeRssStatus} value={rssStatus}>
              <Radio value={"publish"}>Publish</Radio>
              <Radio value={"unpublish"}>Unpublish</Radio>
            </Radio.Group>
          </div>
          {updateLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="large" />
            </div>
          )}
          <Button
            onClick={onSubmitRss}
            type="primary"
            icon={<SaveOutlined />}
            style={{
              width: "-webkit-fill-available",
              margin: "15px 0px 10px 0px",
            }}
          >
            Save
          </Button>
          <ToastContainer />
        </Card>
      </div>
    </div>
  );
};

export default CreateRSSApp;
