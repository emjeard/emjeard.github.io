import React, { useState, useEffect, useCallback } from "react";
import { Select, Spin, Input, Card, Button, Checkbox } from "antd";
import { getSearchHp, getDetailOp, postEditHp } from "api/ApiData";
import { SaveOutlined } from "@ant-design/icons";
import { putUpdateOpPackage } from "api/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GEN_INPUT_ACT } from "redux/actions/General";
import GeneralOperator from "../components/General";
import ActivePeriode from "../components/ActivePeriode";
import DataOperator from "../components/Data";
import Telpon from "../components/Telpon";
import AreaOperator from "../components/Area";
import AdditionalInfo from "../components/AdditionalInfo";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
const { TextArea } = Input;

const { Option } = Select;
const init_data = {
  name: "",
  jenis_layanan: "",
  id_operator: "",
  jenis_paket: "",
  price: "",
  masa_aktiv_periode: "",
  masa_aktiv_durasi: "",
  data_jaringan: "",
  data_kecepatan_mbps: "",
  data_jenis_paket: "",
  data_kuota_mb: "",
  telpon_sesama_menit: "",
  telpon_sesama_menit_unl: 0,
  sms_sesama: "",
  sms_sesama_unl: 0,
  telpon_antar_operator_menit: "",
  telpon_antar_operator_menit_unl: 0,
  sms_antar_operator: "",
  sms_antar_operator_unl: 0,
  area_layanan: "",
  area_layanan_propinsi: "",
  area_layanan_kota: "",
  area_layanan_negara: "",
  additional_info: "",
  created_by: "",
  updated_at_u: "",
  created_at: "",
  updated_at: "",
};
const reset_data = [];

const EditOperatorPack = (props) => {
  const id_op = props.match.params.id;
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
  const onSubmitData = async (e) => {
    const created_at = Date.now();
    const updated_at = Date.now();
    let updated_at_u = store.getState().gen_hp_data.data.updated_at_u;
    store.dispatch(HP_DATA_ACT("created_at", created_at));
    store.dispatch(HP_DATA_ACT("updated_at", updated_at));
    if (updated_at_u === "") {
      store.dispatch(HP_DATA_ACT("updated_at_u", updated_at));
    }
    setUpdateLoading(true);
    let final_update = await store.getState().gen_hp_data.data;
    putUpdateOpPackage(final_update).then((resp) => {
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
        setTimeout(
          () => (window.location.href = "/operators/packages/list"),
          3000
        );
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
    <Card>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          Data Operator Seluler: Telpon, SMS, Paket Data
        </div>
        <GeneralOperator />
        <ActivePeriode />
        <DataOperator />
        <Telpon />
        <AreaOperator />
        <AdditionalInfo />
        {updateLoading ? (
          ""
        ) : (
          <Button
            onClick={onSubmitData}
            type="primary"
            icon={<SaveOutlined />}
            style={{
              width: "-webkit-fill-available",
              margin: "15px 0px 10px 0px",
            }}
          >
            Save
          </Button>
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
      </div>
    </Card>
  );
};

export default EditOperatorPack;
