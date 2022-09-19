import React, { useState, useEffect, useCallback } from "react";
import { Select, Card, Input, Spin, Pagination, Button } from "antd";
import { useHistory } from "react-router-dom";
import Sticky from "react-stickynode";
import { getListOperator } from "api/ApiData";
import ItemListOperator from "./ItemListOperator";
import moment from "moment";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const ListOperator = () => {
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
    getListOperator(page, many, filter)
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
            onClick={() => routeChange("/operators/add")}
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
              <ItemListOperator
                id={items.id}
                name={items.name}
                logo={items.logo}
                last_update={items.modified}
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
    </div>
  );
};

export default ListOperator;
