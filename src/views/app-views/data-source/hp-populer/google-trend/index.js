import React from "react";
import { Select } from "antd";
import { Card } from "antd";
import GoogleTrends from "./GoogleTrends";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];
//<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("RELATED_QUERIES", {"comparisonItem":[{"keyword":"/m/050k8","geo":"ID","time":"now 7-d"}],"category":390,"property":""}, {"exploreQuery":"cat=390&date=now%207-d&geo=ID&q=%2Fm%2F050k8","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>
const GoogleTrendApp = () => {
  return (
    <div>
      <Card>
        <div>Google Trend dashboard</div>
        <div style={{ display: "flex" }}>
          <div id="widget1" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget1"
              type="RELATED_TOPICS"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="0"
            />
          </div>
          <div id="widget2" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget2"
              type="RELATED_QUERIES"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="0"
            />
          </div>
        </div>
        <div style={{ display: "flex", margin: "10px 0px 0px 0px" }}>
          <div id="widget3" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget3"
              type="RELATED_TOPICS"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
            />
          </div>
          <div id="widget4" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget4"
              type="RELATED_QUERIES"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GoogleTrendApp;
