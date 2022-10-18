import React, { useState, useEffect, useCallback } from "react";
import { Card, Pagination, Input, Modal } from "antd";
import {
  getListDeviceStatus,
  postDeviceStatus,
  putDeviceStatus,
  delDeviceStatus,
} from "api/ApiData";
import { Select, Button, Spin } from "antd";
import moment from "moment";
import Sticky from "react-stickynode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ItemModel from "./ItemModel";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import store from "redux/store";

const { Search } = Input;
const { confirm } = Modal;

const UmuModelApp = () => {
  const [dataInput, setDataInput] = useState("");
  const [dataItem, setDataItem] = useState([]);
  const [keysearch, setKeysearch] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    const urlPath = new URL(window.location.href);
    const page = urlPath.searchParams.get("page");
    let keyword = urlPath.searchParams.get("key");
    if (keyword !== null) {
      setKeysearch(keyword);
      keyword = "&key=" + keyword;
    } else {
      keyword = "";
    }
    setCurrentPage(parseInt(page === null ? 1 : page));
    retrieveData(page, 10, keyword);
  }, []);

  const retrieveData = (page, many, filter) => {
    setFirstLoading(true);
    page = page === null ? 1 : page;
    getListDeviceStatus(page, many, filter)
      .then((response) => {
        if (response.status === 200) {
          setDataItem(response.data.data);
          setTotalData(response.data.total_data);
        } else {
          setDataItem([]);
          setTotalData(0);
        }

        setFirstLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setFirstLoading(false);
      });
  };
  const onChange = (pageNumber) => {
    const urlPath = new URL(window.location.href);
    let keyword = urlPath.searchParams.get("key");

    if (keyword !== null) {
      setKeysearch(keyword);
      keyword = "&key=" + keyword;
    } else {
      keyword = "";
    }
    retrieveData(pageNumber, 10, keyword);
    setCurrentPage(pageNumber);
    window.history.replaceState(null, "", "?page=" + pageNumber + keyword);
  };

  const searchData = (value) => {
    console.log(value);
    retrieveData(1, 10, "&key=" + value);
    setCurrentPage(1);
    window.history.replaceState(null, "", "?page=1&key=" + value);
  };

  const onChangeSearch = (data) => {
    console.log("onChangeSearch", data.target.value);
    setKeysearch(data.target.value);
  };

  const showUpdate = (item_id, item_name) => {
    confirm({
      title: "Do you want to update these items?",
      content: (
        <div>
          <Input
            placeholder="Contoh: Flip"
            allowClear
            defaultValue={item_name}
            onChange={onChangeInput}
          />
        </div>
      ),
      async onOk() {
        return new Promise((resolve, reject) => {
          putDeviceStatus(
            item_id,
            store.getState().gen_hp_data.data.data_label
          ).then((response) => {
            if (response.status === 200) {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              resolve();
              retrieveData(1, 10, "");
            } else {
              resolve();
              toast.error(response.data.message, {
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
          });
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  const onChangeInput = (e) => {
    setDataInput(e.target.value);
    store.dispatch(HP_DATA_ACT("data_label", e.target.value));
  };

  const showCreate = () => {
    confirm({
      title: "Create status",
      content: (
        <div>
          <Input
            placeholder="Contoh: Flip"
            allowClear
            onChange={onChangeInput}
            focus={"start"}
            autofocus
          />
        </div>
      ),
      async onOk() {
        return new Promise((resolve, reject) => {
          postDeviceStatus(store.getState().gen_hp_data.data.data_label).then(
            (response) => {
              if (response.status === 201) {
                toast.success(response.data.message, {
                  position: "top-right",
                  autoClose: true,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
                resolve();
                retrieveData(1, 10, "");
              } else {
                resolve();
                toast.error(response.data.message, {
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
            }
          );
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };

  const showConfirm = (item_id, item_name) => {
    confirm({
      title: "Do you want to delete these items?",
      content: item_name,
      async onOk() {
        return new Promise((resolve, reject) => {
          //setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          delDeviceStatus(item_id).then((response) => {
            if (response.status === 200) {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              resolve();
              retrieveData(1, 10, "");
            } else {
              resolve();
              toast.error(response.data.message, {
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
          });
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };
  const deleteItem = (item_id, item_name) => {
    showConfirm(item_id, item_name);
  };

  const updateItem = (item_id, item_name) => {
    showUpdate(item_id, item_name);
  };

  const createItem = () => {
    showCreate();
  };
  return (
    <div>
      <Card>
        <div style={{ margin: "10px 0px 20px", display: "flex" }}>
          <Search
            value={keysearch}
            placeholder="Cari model..."
            onSearch={(value) => searchData(value)}
            onChange={onChangeSearch}
            enterButton
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ margin: "0px 0px 0px 20px" }}
            onClick={createItem}
          >
            Create Status
          </Button>
        </div>
        <Sticky enabled={true} top={70} innerZ={1}>
          <div style={{ display: "flex", backgroundColor: "#F44336" }}>
            <div
              className="rss-head-text"
              style={{ padding: "5px 0px", maxWidth: 50, width: 50 }}
            >
              id
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 250, width: 250 }}
            >
              Name
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 250, width: 250 }}
            >
              Created At
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 250, width: 250 }}
            >
              Update At
            </div>
            <div className="rss-head-text" style={{ padding: "5px 15px" }}>
              Action
            </div>
          </div>
        </Sticky>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {firstLoading && (
            <span style={{ padding: "50px 0px" }}>
              <Spin size="large" />
            </span>
          )}
        </div>
        {dataItem &&
          dataItem.map((items, index) => (
            <div
              style={{
                padding: "10px 0px",
                backgroundColor: index % 2 ? "#f7f7f7" : "white",
              }}
            >
              <ItemModel
                id={items.id}
                status={items.status}
                created={moment(items.created).format("MMMM Do YYYY, HH:mm")}
                modified={moment(items.modified).format("MMMM Do YYYY, HH:mm")}
                onDeleteItem={(id, status) => deleteItem(id, status)}
                onUpdateItem={(id, status) => updateItem(id, status)}
              />
            </div>
          ))}
        {firstLoading === false ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px 0px 0px",
            }}
          >
            <Pagination
              showQuickJumper
              showSizeChanger={false}
              defaultCurrent={currentPage}
              current={currentPage}
              total={totalData}
              onChange={onChange}
            />
          </div>
        ) : (
          ""
        )}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default UmuModelApp;
