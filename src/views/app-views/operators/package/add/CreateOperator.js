import React, { useState, useEffect, useCallback } from "react";
import { Select, Spin, Input, InputNumber, Button, Checkbox } from "antd";
import store from "redux/store";
import slugify from "slugify";
import { GEN_INPUT_ACT } from "redux/actions/General";
import { InfoCircleOutlined, SaveOutlined } from "@ant-design/icons";
import GeneralOperator from "../components/General";
import ActivePeriode from "../components/ActivePeriode";
import DataOperator from "../components/Data";
import Telpon from "../components/Telpon";
import AreaOperator from "../components/Area";
import AdditionalInfo from "../components/AdditionalInfo";

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
  telpon_add_info: "",
  area_layanan: "",
  area_layanan_propinsi: "",
  area_layanan_kota: "",
  area_layanan_kota_list: [],
  area_layanan_negara: "",
  additional_info: "",
  created_by: "",
  updated_at_u: 0,
  created_at: "",
  updated_at: "",
};
const reset_data = [];

const CreateOperator = () => {
  const [dataTagBrand, setDataTagBrand] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    store.dispatch(GEN_INPUT_ACT("data", init_data));
    setFirstLoading(false);
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
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        Data Operator Seluler: Telpon, SMS, Paket Data
      </div>
      <GeneralOperator />
      <ActivePeriode />
      <DataOperator />
      <Telpon />
      <AreaOperator />
      <AdditionalInfo />
    </div>
  );
};

export default CreateOperator;
