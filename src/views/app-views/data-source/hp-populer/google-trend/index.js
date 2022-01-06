import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Spin } from "antd";
import GoogleTrends from "./GoogleTrends";
import PopulerData from "./PopulerData";
import { getListHpEdChoice, putUpdateHpEditorChoice } from "api/ApiData";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];
const GoogleTrendApp = () => {
  const [dataHp, setDatahp] = useState([]);
  const [updDataHp, setUpdDataHp] = useState([]);
  const [name, setName] = useState("i'm Grand Parent");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [emptyData, setEmptyData] = useState([init_data]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    retrieveDatahp();
  }, []);

  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (loading) return;
    // update state
    setLoading(true);
    // send the actual request
    let data_hp = "";
    for (let i = 0; i < updDataHp.length; i++) {
      data_hp += updDataHp[i] + ",";
    }
    data_hp = data_hp.slice(0, -1);
    await putUpdateHpEditorChoice(
      2,
      "Hp Populer - Google Trend",
      "desc",
      "content",
      "image",
      data_hp
    )
      .then((response) => {
        setMessage(response.message);
      })
      .catch((e) => {
        setLoading(false);
      });
    // once the request is sent, update state again
    setLoading(false);
  }, []); // update the callback if the state changes

  const retrieveDatahp = () => {
    getListHpEdChoice(2)
      .then((response) => {
        setDatahp(response.data.data_hp);
        setLastUpdate(response.data.last_update);
        setIsSuccess(response.data.status);
        for (let i = 0; i < response.data.data_hp.length; i++) {
          setUpdDataHp(updDataHp.push(response.data.data_hp[i].id));
        }
        setFirstLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setFirstLoading(false);
      });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const resetData = () => {
    for (let i = 0; i < 9; i++) {
      setEmptyData(emptyData.push(init_data));
    }
    setDatahp(emptyData);
    setEmptyData([]);
    console.log("resetData", emptyData);
  };
  const callback = useCallback((value) => {
    console.log("name", value);
    const index = parseInt(value.split("-")[0]) - 1;
    const idHp = parseInt(value.split("-")[1]);
    setUpdDataHp((updDataHp[index] = idHp));
    console.log("updDataHp", updDataHp);
  }, []);

  return (
    <div>
      <Card>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "red",
            padding: "0px 0px 0px 10px",
          }}
        >
          WEB SEARCH
        </div>
        <div style={{ padding: "10px 0px 0px 10px" }}>All Categories</div>
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
              property=""
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
              property=""
            />
          </div>
        </div>
        <div style={{ padding: "10px 0px 0px 10px" }}>
          Mobile Phone Category
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
              property=""
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
              property=""
            />
          </div>
        </div>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "red",
            padding: "30px 0px 0px 10px",
          }}
        >
          GOOGLE SHOPPING
        </div>
        <div style={{ padding: "10px 0px 0px 10px" }}>All Categories</div>
        <div style={{ display: "flex" }}>
          <div id="widget5" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget5"
              type="RELATED_TOPICS"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="0"
              property="froogle"
            />
          </div>
          <div id="widget6" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget6"
              type="RELATED_QUERIES"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="0"
              property="froogle"
            />
          </div>
        </div>
        <div style={{ padding: "10px 0px 0px 10px" }}>
          Mobile Phone Category
        </div>
        <div style={{ display: "flex", margin: "10px 0px 0px 0px" }}>
          <div id="widget7" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget7"
              type="RELATED_TOPICS"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
              property="froogle"
            />
          </div>
          <div id="widget8" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget8"
              type="RELATED_QUERIES"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
              property="froogle"
            />
          </div>
        </div>

        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "red",
            padding: "30px 0px 0px 10px",
          }}
        >
          IMAGE SEARCH
        </div>
        <div style={{ padding: "10px 0px 0px 10px" }}>All Categories</div>
        <div style={{ display: "flex" }}>
          <div id="widget9" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget9"
              type="RELATED_TOPICS"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="0"
              property="images"
            />
          </div>
          <div id="widget10" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget10"
              type="RELATED_QUERIES"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="0"
              property="images"
            />
          </div>
        </div>
        <div style={{ padding: "10px 0px 0px 10px" }}>
          Mobile Phone Category
        </div>
        <div style={{ display: "flex", margin: "10px 0px 0px 0px" }}>
          <div id="widget11" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget11"
              type="RELATED_TOPICS"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
              property="images"
            />
          </div>
          <div id="widget12" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget12"
              type="RELATED_QUERIES"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
              property="images"
            />
          </div>
        </div>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "red",
            padding: "30px 0px 0px 10px",
          }}
        >
          YOUTUBE
        </div>
        <div style={{ padding: "10px 0px 0px 10px" }}>
          Mobile Phone Category
        </div>
        <div style={{ display: "flex", margin: "10px 0px 0px 0px" }}>
          <div id="widget13" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget13"
              type="RELATED_TOPICS"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
              property="youtube"
            />
          </div>
          <div id="widget14" style={{ margin: 10, width: "100%" }}>
            <GoogleTrends
              widget="widget14"
              type="RELATED_QUERIES"
              keyword="/m/050k8"
              url="https://ssl.gstatic.com/trends_nrtr/2790_RC01/embed_loader.js"
              geo="ID"
              time="now 7-d"
              category="390"
              property="youtube"
            />
          </div>
        </div>
        {isSuccess === false ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={reloadPage}
              style={{
                width: 180,
                backgroundColor: "#219653",
                border: "none",
              }}
            >
              Reload
            </Button>
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            margin: "30px 0px 10px 0px",
            backgroundColor: "#f1f1f1",
            padding: "5px 10px",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          Rekapitulasi
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {firstLoading && <Spin size="large" />}
        </div>
        {dataHp &&
          dataHp.map((items, index) => (
            <div style={{ margin: "10px 0px" }}>
              <PopulerData
                number={index + 1}
                nama_hp={items.nama_hp}
                image={items.image}
                setName={setName}
                parentCallback={callback}
              />
            </div>
          ))}
        <div style={{ margin: "0px 0px 0px 13px" }}>
          {lastUpdate === ""
            ? ""
            : `Last updated: ${moment(lastUpdate).format(
                "MMMM Do YYYY, HH:mm"
              )}`}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0px 0px 0px",
          }}
        >
          {message}
        </div>
        {isSuccess === false ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "30px 0px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                {firstLoading === true ? (
                  ""
                ) : (
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={sendRequest}
                    loading={loading}
                    style={{
                      width: 180,
                      backgroundColor: "#219653",
                      border: "none",
                    }}
                  >
                    Simpan
                  </Button>
                )}
              </div>
              <div style={{ margin: "0px 0px 0px 10px" }}>
                {firstLoading === true ? (
                  ""
                ) : (
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={resetData}
                    loading={loading}
                    style={{
                      width: 180,
                      backgroundColor: "#dd3030",
                      border: "none",
                    }}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GoogleTrendApp;
