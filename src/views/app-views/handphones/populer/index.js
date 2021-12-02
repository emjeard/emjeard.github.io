import React, { useState, useEffect, useCallback } from "react";
import { Select, Button, Spin } from "antd";
import PopulerData from "./PopulerData";
import { Card } from "antd";
import { getListHpEdChoice, putUpdateHpEditorChoice } from "api/ApiData";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const HandphonePopulerApp = () => {
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
    await putUpdateHpEditorChoice(1, "title", "desc", "image", data_hp)
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
    getListHpEdChoice(1)
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

export default HandphonePopulerApp;
