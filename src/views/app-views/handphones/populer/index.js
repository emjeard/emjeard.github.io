import React, { useState, useEffect, useCallback } from "react";
import { Select, Button } from "antd";
import PopulerData from "./PopulerData";
import { Card } from "antd";
import { getListHpEdChoice, putUpdateHpEditorChoice } from "api/ApiData";
import { EditOutlined, LoginOutlined } from "@ant-design/icons";

const { Option } = Select;

const HandphonePopulerApp = () => {
  const [dataHp, setDatahp] = useState([]);
  const [updDataHp, setUpdDataHp] = useState([]);
  const [name, setName] = useState("i'm Grand Parent");
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveDatahp();
  }, []);

  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return;
    // update state
    setIsSending(true);
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
        setIsSending(false);
        setLoading(false);
      });
    // once the request is sent, update state again
    setIsSending(false);
    setLoading(false);
  }, []); // update the callback if the state changes

  const retrieveDatahp = () => {
    getListHpEdChoice(1)
      .then((response) => {
        setDatahp(response.data.data_hp);
        for (let i = 0; i < response.data.data_hp.length; i++) {
          setUpdDataHp(updDataHp.push(response.data.data_hp[i].id));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDatahp();
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{message}</div>
          <div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={sendRequest}
              loading={loading}
            >
              Simpan
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HandphonePopulerApp;
