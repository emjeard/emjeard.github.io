import React, { useState, useEffect, useCallback } from "react";
import { Select, Button, Spin, Input } from "antd";
import { Card } from "antd";
import {
  getCompareHp,
  putUpdateCompareHp,
  getGenerateCompareHp,
} from "api/ApiData";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";
import store from "redux/store";
import ADD_DATA from "redux/actions";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { TextArea } = Input;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const CompareEditHp = (props) => {
  const id_hp1 = props.match.params.id;
  const id_hp2 = props.match.params.id2;
  const [idCompare, setIdCompare] = useState(0);
  const [message, setMessage] = useState("");
  const [dataHpName, setDataHpName] = useState([]);
  const [dataHpName2, setDataHpName2] = useState([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [metaDesc, setMetaDesc] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    retrieveDatahp();
  }, []);

  const getCompareData = () => {
    getCompareHp(id_hp1, id_hp2)
      .then((response) => {
        if (response.status === true) {
          const dataPage = response.data;
          const fullname = dataPage.nama_hp_1;
          const fullname2 = dataPage.nama_hp_2;
          const slug = dataPage.slug_hp_1;
          const slug2 = dataPage.slug_hp_2;
          setIdCompare(dataPage.id);
          let desc = dataPage.description;
          desc = desc
            .replace(/font-size:0/g, "font-size:0px;display:none;")
            .replace(
              `<strong>Perbedaan ${fullname} vs ${fullname2}</strong>`,
              `<strong style="font-weight: 400;">Perbedaan ${fullname} vs ${fullname2}</strong>`
            )
            .replace("Sekilas Perbandingan ", "Perbandingan ")
            .replace(/spesifikasi-harga-/g, "")
            .replace(
              "/" + slug + "-" + id_hp1,
              "https://www.inponsel.com" + "/" + slug + "-" + id_hp1
            )
            .replace(
              "/" + slug2 + "-" + id_hp2,
              "https://www.inponsel.com" + "/" + slug2 + "-" + id_hp2
            )
            .replace(
              `<strong>${fullname}</strong>`,
              `<strong><a href="https://www.inponsel.com/${slug}-${id_hp1}">${fullname}</a></strong>`
            )
            .replace(
              `<strong>${fullname2}</strong>`,
              `<strong><a href="https://www.inponsel.com/${slug2}-${id_hp2}">${fullname2}</a></strong>`
            )
            .replace(
              `<p style="padding: 0;margin: 20px 0px 0px 0px">Perbedaan`,
              `<per>Perbedaan`
            )
            .replace(
              /(.*)<per>.*?<\/p>/g,
              `<p style="padding: 0;margin: 20px 0px 0px 0px">Informasi harga terbaru kedua handphone dapat dilihat di halaman <a href="https://www.inponsel.com/${slug}-${id_hp1}/harga"><b>harga ${fullname}</b></a> dan <a href="https://www.inponsel.com/${slug2}-${id_hp2}/harga"><b>harga ${fullname2}</b></a>.</p>`
            )
            .replace(/, sedangkan/g, ", sementara")
            .replace(/<a href/g, "<a style='font-weight:500;' href")
            .replace(
              "Berikut detil spesifikasi kamera keduanya",
              `Berikut detil <a style='font-weight:500;' href="https://www.inponsel.com/komparasi">perbandingan spesifikasi hp</a> kamera keduanya`
            );
          setDataHpName(dataPage.nama_hp_1);
          setDataHpName2(dataPage.nama_hp_2);
          setMetaDesc(dataPage.meta_desc);
          setContent(dataPage.description);
          setLastUpdate(dataPage.updated_at);
          store.dispatch(ADD_DATA(desc));
          setFirstLoading(false);
          setHasData(true);
        } else {
          setHasData(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setFirstLoading(false);
      });
  };

  const generateData = () => {
    getGenerateCompareHp(id_hp1, id_hp2).then((response) => {
      console.log(response.status);
    });
  };

  const retrieveDatahp = async () => {
    setFirstLoading(true);
    getCompareData();
    if (hasData === false) {
      generateData();
    }
    getCompareData();
  };
  const onChangeDesc = (e) => {
    setMetaDesc(e.target.value);
    console.log(metaDesc);
  };

  const sendRequest = (e) => {
    // update state
    setLoading(true);
    // send the actual request
    let content = store.getState().articles.content;
    putUpdateCompareHp(idCompare, metaDesc, content)
      .then((response) => {
        setMessage(response.message);
        if (response.status === true) {
          toast.success(response.message, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          /* setTimeout(
            () => (window.location.href = "/dashboards/rss/list"),
            3000
          ); */
        } else {
          toast.error("Gagal update data", {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        toast.error("Gagal update data", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    // once the request is sent, update state again
    setLoading(false);
  }; // update the callback if the state changes

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
        <div>
          Compare Edit {dataHpName} vs {dataHpName2} dashboard
          <div style={{ margin: 10 }}>
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
            </div>
          </div>
        </div>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default CompareEditHp;
