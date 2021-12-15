import React, { useState, useEffect, useCallback } from "react";
import { Card, Pagination, Input } from "antd";
import ListHandphone from "./ListHandphone";
import { getListHp } from "api/ApiData";
import { Select, Button, Spin } from "antd";
import moment from "moment";
import utils from "utils";
import Sticky from "react-stickynode";

const { Search } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const ListHandphoneApp = () => {
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
    getListHp(page, many, filter)
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
            placeholder="Cari hp..."
            onSearch={(value) => searchArticle(value)}
            onChange={onChangeSearch}
            enterButton
          />
        </div>
        <Sticky enabled={true} top={70} innerZ={1}>
          <div style={{ display: "flex", backgroundColor: "#c10000" }}>
            <div className="rss-head-text lay-hp-id">id</div>
            <div className="rss-head-text lay-hp-name">Name</div>
            <div className="rss-head-text lay-hp-status">Status</div>
            <div className="rss-head-text lay-hp-complete">Lengkap</div>
            <div className="rss-head-text lay-hp-new-price">New Price</div>
            <div className="rss-head-text lay-hp-second-price">
              Second Price
            </div>
            <div className="rss-head-text lay-hp-shopee">Shopee</div>
            <div className="rss-head-text lay-hp-antutu">Antutu</div>
            <div className="rss-head-text lay-hp-update-shops">
              Update Shops
            </div>
            <div className="rss-head-text lay-hp-act-hp">Action Handphone</div>
            <div className="rss-head-text lay-hp-act-pict">Action Picture</div>
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
              <ListHandphone
                id={items.id}
                nama_hp={items.nama_hp}
                status={items.status}
                notes={items.notes}
                completeness={items.completeness}
                new_price={
                  items.new_price > 0
                    ? utils.formatRupiah(items.new_price, "Rp.")
                    : 0
                }
                second_price={
                  items.second_price > 0
                    ? utils.formatRupiah(items.second_price, "Rp.")
                    : 0
                }
                shopee={items.shopee}
                antutu={
                  items.antutu > 0 ? utils.formatRupiah(items.antutu, "") : 0
                }
                update_shops={
                  items.update_shops === ""
                    ? "-"
                    : moment(items.update_shops).format("MMM Do YYYY, HH:mm")
                }
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

export default ListHandphoneApp;
