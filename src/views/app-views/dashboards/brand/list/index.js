import React, { useState, useEffect, useCallback } from "react";
import { Card, Pagination, Input } from "antd";
import ListBrand from "./ListBrand";
import { getListBrands } from "api/ApiData";
import { Select, Button, Spin } from "antd";
import moment from "moment";
import Sticky from "react-stickynode";
import truncate from "truncate";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const BrandListApp = () => {
  const [dataNews, setDataNews] = useState([]);
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
    retrieveDatahp(page, 10, keyword);
  }, []);

  const retrieveDatahp = (page, many, filter) => {
    setFirstLoading(true);
    page = page === null ? 1 : page;
    getListBrands(page, many, filter)
      .then((response) => {
        setDataNews(response.data);
        setTotalData(response.total_data);
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

  const searchBrand = (value) => {
    console.log(value);
    retrieveDatahp(1, 10, "&key=" + value);
    setCurrentPage(1);
    window.history.replaceState(null, "", "?page=1&key=" + value);
  };

  const onChangeSearch = (data) => {
    console.log("onChangeSearch", data.target.value);
    setKeysearch(data.target.value);
  };
  return (
    <div>
      <Card>
        <div style={{ margin: "10px 0px 20px", display: "flex" }}>
          <Search
            value={keysearch}
            placeholder="Cari brand..."
            onSearch={(value) => searchBrand(value)}
            onChange={onChangeSearch}
            enterButton
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ margin: "0px 0px 0px 20px" }}
            onClick={() => (window.location.href = "/dashboards/brand/create")}
          >
            Create Brand
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
              style={{ padding: "5px 15px", maxWidth: 170, width: 170 }}
            >
              Image
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 150, width: 150 }}
            >
              Name
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 400, width: 400 }}
            >
              Description
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 80, width: 80 }}
            >
              Created At
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 100, width: 100 }}
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
        {dataNews &&
          dataNews.map((items, index) => (
            <div
              style={{
                padding: "10px 0px",
                backgroundColor: index % 2 ? "#f7f7f7" : "white",
              }}
            >
              <ListBrand
                id={items.id}
                merk={items.merk}
                logo={items.logo}
                desc_company={truncate(items.desc_company, 150)}
                created={moment(items.created).format("MMMM Do YYYY, HH:mm")}
                modified={moment(items.modified).format("MMMM Do YYYY, HH:mm")}
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
    </div>
  );
};

export default BrandListApp;
