import React, { useState, useEffect, useCallback } from "react";
import { Card, Pagination, Input } from "antd";
import ListNews from "./ListNews";
import { getListNews } from "api/ApiData";
import { Select, Button, Spin } from "antd";
import moment from "moment";
import Sticky from "react-stickynode";

const { Search } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const RSSListApp = () => {
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
    getListNews(page, many, filter)
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

  const searchArticle = (value) => {
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
        <div style={{ margin: "10px 0px 20px" }}>
          <Search
            value={keysearch}
            placeholder="Cari artikel..."
            onSearch={(value) => searchArticle(value)}
            onChange={onChangeSearch}
            enterButton
          />
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
              style={{ padding: "5px 15px", maxWidth: 100, width: 100 }}
            >
              Published
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 400, width: 400 }}
            >
              Title
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 120, width: 120 }}
            >
              Media Portal
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 70, width: 70 }}
            >
              Headline
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 80, width: 80 }}
            >
              Status
            </div>
            <div
              className="rss-head-text"
              style={{ padding: "5px 15px", maxWidth: 100, width: 100 }}
            >
              Updated
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
              <ListNews
                id={items.id}
                published_at={moment(items.published_at).format(
                  "MMMM Do YYYY, HH:mm"
                )}
                title={items.title}
                media_portal={items.media_portal}
                headline={items.headline}
                status={items.status}
                updated_at={moment(items.updated_at).format(
                  "MMMM Do YYYY, HH:mm"
                )}
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

export default RSSListApp;
