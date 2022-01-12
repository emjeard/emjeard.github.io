import React, { useState, useEffect, useCallback } from "react";
import { Select, Button, Spin, Input } from "antd";
import PopulerData from "./PopulerData";
import { Card } from "antd";
import { getListHpEdChoice, putUpdateHpEditorChoice } from "api/ApiData";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";
import store from "redux/store";
import ADD_DATA from "redux/actions";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];
const { TextArea } = Input;

const KomparasiHandphoneApp = () => {
  const [dataHp, setDatahp] = useState([]);
  const [updDataHp, setUpdDataHp] = useState([]);
  const [name, setName] = useState("i'm Grand Parent");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [emptyData, setEmptyData] = useState([init_data]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    retrieveDatahp();
  }, []);

  const sendRequest = (e) => {
    // update state
    setLoading(true);
    // send the actual request
    let data_hp = "";
    for (let i = 0; i < updDataHp.length; i++) {
      data_hp += updDataHp[i] + ",";
    }
    data_hp = data_hp.slice(0, -1);
    let content = store.getState().articles.content;
    putUpdateHpEditorChoice(4, metaTitle, metaDesc, content, "image", data_hp)
      .then((response) => {
        setMessage(response.message);
      })
      .catch((e) => {
        setLoading(false);
      });
    // once the request is sent, update state again
    setLoading(false);
  }; // update the callback if the state changes

  const retrieveDatahp = () => {
    getListHpEdChoice(4)
      .then((response) => {
        setMetaTitle(response.data.title);
        setMetaDesc(response.data.description);
        setContent(response.data.content);
        store.dispatch(ADD_DATA(response.data.content));
        setDatahp(response.data.data_vs_hp);
        setLastUpdate(response.data.last_update);
        setIsSuccess(response.data.status);
        for (let i = 0; i < response.data.data_vs_hp.length; i++) {
          setUpdDataHp(
            updDataHp.push(
              response.data.data_vs_hp[i].id +
                "|" +
                response.data.data_vs_hp[i].id2
            )
          );
        }
        console.log(updDataHp);
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
    const index = parseInt(value.split("-")[1]) - 1;

    const posHp = value.split("-")[0];
    let idHpVs = updDataHp[index];

    if (posHp === "id") {
      const id_hp = value.split("-")[2];
      const id_hp2 = updDataHp[index].split("|")[1];
      idHpVs = id_hp + "|" + id_hp2;
    } else {
      const id_hp = updDataHp[index].split("|")[0];
      const id_hp2 = value.split("-")[2];
      idHpVs = id_hp + "|" + id_hp2;
    }
    setUpdDataHp((updDataHp[index] = idHpVs));
    console.log("updDataHp", updDataHp);
  }, []);

  const onChangeTitle = (e) => {
    setMetaTitle(e.target.value);
  };

  const onChangeDesc = (e) => {
    setMetaDesc(e.target.value);
    console.log(metaDesc);
  };
  return firstLoading === true ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
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
        {dataHp &&
          dataHp.map((items, index) => (
            <div style={{ margin: "10px 0px" }}>
              <PopulerData
                number={index + 1}
                nama_hp={items.nama_hp}
                image={items.image}
                nama_hp2={items.nama_hp2}
                image2={items.image2}
                setName={setName}
                parentCallback={callback}
              />
            </div>
          ))}

        <div style={{ margin: 10 }}>
          <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
            Meta Title / Head Title*
          </div>
          <Input
            placeholder="Meta title"
            allowClear
            onChange={onChangeTitle}
            value={metaTitle}
          />
          <div style={{ margin: "25px 0px 5px", fontWeight: 500 }}>
            Meta Description*
          </div>
          <TextArea
            placeholder="Meta description"
            allowClear
            onChange={onChangeDesc}
            value={metaDesc}
            style={{ minHeight: "60px", margin: "5px 0px 25px" }}
          />
          <CKEditorCustom />
        </div>

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
              </div>
              <div style={{ margin: "0px 0px 0px 10px" }}>
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
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default KomparasiHandphoneApp;
