import React, { useState, useEffect } from "react";
import { Card, Input } from "antd";
import { getDetailRSS } from "api/ApiData";
import RichTextInput from "views/app-views/components/data-entry/input/RichTextInput";

const { Search } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const RSSApp = (props) => {
  const [dataNews, setDataNews] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    setFirstLoading(true);
    getDetailRSS(props.match.params.id)
      .then((response) => {
        console.log(response.data);
        setDataNews(response.data);
        setFirstLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setFirstLoading(false);
      });
  };

  return (
    <div>
      <Card>
        <div>Edit rss {props.match.params.id}</div>
        <RichTextInput
          content={dataNews.description === undefined ? "-" : dataNews.description}
        />
      </Card>
    </div>
  );
};

export default RSSApp;
