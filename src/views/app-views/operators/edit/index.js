import React, { useState, useEffect, useCallback } from "react";
import { Select, Spin, Modal, Card, Button, Checkbox } from "antd";
import General from "../components/General";
import store from "redux/store";
import { GEN_INPUT_ACT } from "redux/actions/General";
import {
  getDetailOp,
  putUpdateOp,
  postUploadFile,
  delDetailOp,
} from "api/ApiData";
import WebSosMed from "../components/WebSosMed";
import AdditionalInfo from "../components/AdditionalInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaveOutlined } from "@ant-design/icons";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import moment from "moment";
const { confirm } = Modal;

const { Option } = Select;
const init_data = {
  id: 0,
  nm_op_parent: "",
  tag: "",
  logo: "",
  dscp: "",
  addr: "",
  c_center: "",
  em: "",
  url: "",
  fb: "",
  tw: "",
  instagrm: "",
  ytube: "",
  ch: "",
  tiktok: "",
  ord: 0,
  created: "",
  modified: "",
};
const reset_data = [];

const OperatorEdit = (props) => {
  const id_op = props.match.params.id;
  const [imgLogo, setImgLogo] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [dataTagBrand, setDataTagBrand] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    setFirstLoading(true);

    getDetailOp(id_op)
      .then((response) => {
        const dataOp = response.data;
        store.dispatch(GEN_INPUT_ACT("data", dataOp));

        setFirstLoading(false);
      })
      .catch(() => {
        //console.log(e);
        setFirstLoading(false);
      });
  };

  const upload_file = async () => {
    await postUploadFile(
      store.getState().gen_hp_data.data.img_file,
      "",
      "images/operator/"
    ).then((resp) => {
      console.log("object", resp);
      const img_logo = resp.data.message.replace(
        "https://is3.cloudhost.id/inps/images/operator/",
        ""
      );
      setImgLogo(img_logo);
      store.dispatch(HP_DATA_ACT("logo", img_logo));
    });
  };

  const update_data = async () => {
    const final_update = await store.getState().gen_hp_data.data;
    putUpdateOp(final_update).then((resp) => {
      console.log(resp);
      if (resp.data.status === true) {
        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        //setTimeout(() => (window.location.href = "/operators/list"), 3000);
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
      setUpdateLoading(false);
    });
  };
  const onSubmitData = async (e) => {
    const updated_at = Date.now();
    const modified = moment(updated_at).format("YYYY-MM-DD HH:mm:ss");
    store.dispatch(HP_DATA_ACT("modified", modified));
    setUpdateLoading(true);

    if (store.getState().gen_hp_data.data.img_file === undefined) {
      update_data();
    } else {
      await upload_file();
      await update_data();
    }
  };

  const onSubmitDel = async (e) => {
    confirm({
      title: "Do you want to delete these items?",
      content: store.getState().gen_hp_data.data.name,
      async onOk() {
        return new Promise((resolve, reject) => {
          //setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          delDetailOp(id_op).then((response) => {
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
              setTimeout(
                () => (window.location.href = "/operators/list"),
                3000
              );
              resolve();
            } else {
              resolve();
              toast.error("Gagal menghapus data", {
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
          });
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
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
        <General />
        <WebSosMed />
        <AdditionalInfo />
        {updateLoading ? (
          ""
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={onSubmitData}
              type="primary"
              icon={<SaveOutlined />}
              style={{
                margin: "15px 10px 10px 0px",
                background: "#009933",
                borderColor: "#009933",
                width: 200,
              }}
            >
              Simpan
            </Button>
            <Button
              onClick={onSubmitDel}
              type="primary"
              icon={<SaveOutlined />}
              style={{
                width: 200,
                margin: "15px 0px 10px 10px",
                background: "#C10000",
                borderColor: "#C10000",
              }}
            >
              Hapus
            </Button>
          </div>
        )}
        {updateLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        )}

        <ToastContainer />
      </Card>
    </div>
  );
};

export default OperatorEdit;
