import React, { useState, useEffect, useCallback } from "react";
import { Select, Card, Input, Spin, Pagination, Button, Modal } from "antd";
import { useHistory } from "react-router-dom";
import Sticky from "react-stickynode";
import { delDetailOpPack, getListOperatorPack } from "api/ApiData";
import ListPackage from "./ListPackage";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { confirm } = Modal;

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const ListOperatorPack = () => {
  const [dataNews, setDataNews] = useState([]);
  const [keysearch, setKeysearch] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstLoading, setFirstLoading] = useState(true);
  const history = useHistory();

  const routeChange = (newpath) => {
    history.push(newpath);
  };

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
    retrieveDatahp(page, 10, keyword);
  }, []);

  const retrieveDatahp = (page, many, filter) => {
    setFirstLoading(true);
    page = page === null ? 1 : page;
    getListOperatorPack(page, many, filter)
      .then((response) => {
        if (response.status === true) {
          setDataNews(response.data);
          setTotalData(response.total_data);
        } else {
          setDataNews([]);
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
    retrieveDatahp(pageNumber, 10, keyword);
    setCurrentPage(pageNumber);
    window.history.replaceState(null, "", "?page=" + pageNumber + keyword);
  };

  const searchArticle = (value) => {
    console.log(value);
    retrieveDatahp(1, 10, "&key=" + value);
    setCurrentPage(1);
    window.history.replaceState(null, "", "?page=1&key=" + value);
  };

  const onChangeSearch = (data) => {
    const keyword = data.target.value;
    console.log("onChangeSearch", keyword);
    setKeysearch(keyword);
    if (keyword.length >= 2) {
      searchArticle(keyword);
    }
  };

  const showConfirm = (item_id, item_name) => {
    confirm({
      title: "Do you want to delete these items?",
      content: item_name,
      async onOk() {
        return new Promise((resolve, reject) => {
          //setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          delDetailOpPack(item_id).then((response) => {
            if (response.status === true) {
              toast.success(response.message, {
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              setTimeout(
                () => (window.location.href = "/operators/packages/list"),
                3000
              );
              resolve();
            } else {
              resolve();
              toast.error("Gagal update data", {
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
  return (
    <div>
      <Card>
        <div style={{ margin: "10px 0px 20px", display: "flex" }}>
          <Search
            style={{ margin: "0px 20px 0px 0px" }}
            value={keysearch}
            placeholder="Cari paket operator..."
            onSearch={(value) => searchArticle(value)}
            onChange={onChangeSearch}
            enterButton
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => routeChange("/operators/packages/add")}
          ></Button>
        </div>
        <Sticky enabled={true} top={70} innerZ={1}>
          <div style={{ display: "flex", backgroundColor: "#F44336" }}>
            <div className="rss-head-text lay-hp-id">id</div>
            <div className="rss-head-text lay-hp-name">Name</div>
            <div className="rss-head-text lay-hp-name">Operator</div>
            <div className="rss-head-text lay-hp-name">Last Update</div>
            <div className="rss-head-text lay-hp-act-pict">Action</div>
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
        {dataNews &&
          dataNews.map((items, index) => (
            <div
              style={{
                padding: "10px 0px",
                backgroundColor: index % 2 ? "#f7f7f7" : "white",
              }}
            >
              <ListPackage
                id={items.id}
                name={items.name}
                operator={items.operator}
                last_update={moment
                  .unix(items.last_update / 1000)
                  .format("YYYY-MM-DD HH:mm:ss")}
                onDeleteItem={(id, name) => deleteItem(id, name)}
              />
            </div>
          ))}
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
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ListOperatorPack;
