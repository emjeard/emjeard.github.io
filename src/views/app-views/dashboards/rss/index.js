import React, { useState, useEffect, useCallback } from "react";
import { Card, Pagination } from "antd";
import ListNews from "./ListNews";
import { getListNews } from "api/ApiData";
import { Select, Button, Spin } from "antd";
import moment from "moment";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const RSSApp = () => {
  const [dataNews, setDataNews] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    const urlPath = new URL(window.location.href);
    const page = urlPath.searchParams.get("page");
    setCurrentPage(parseInt(page === null ? 1 : page));
    retrieveDatahp(page, 10, "");
  }, []);

  const retrieveDatahp = (page, many, filter) => {
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
    retrieveDatahp(pageNumber, 10, "");
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
    window.history.replaceState(null, "", "?page=" + pageNumber);
  };
  return (
    <div>
      <Card>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {firstLoading && <Spin size="large" />}
        </div>
        <div style={{ display: "flex", backgroundColor: "#c10000" }}>
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
            Published at
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
            Updated at
          </div>
          <div className="rss-head-text" style={{ padding: "5px 15px" }}>
            Action
          </div>
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

export default RSSApp;
