import React, { useState, useEffect } from "react";
import { Button, Select, Spin, Card, Anchor, Affix } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaveOutlined } from "@ant-design/icons";
import { getSearchHp, getDetailHp, postCreateHp } from "api/ApiData";
import { HP_PROS, HP_CONS } from "redux/actions/Handphone";
import store from "redux/store";
import { GEN_INPUT_ACT } from "redux/actions/General";
import GeneralHp from "../full/GeneralHp";
import NetworkHp from "../full/NetworkHp";
import ScreenHp from "../full/ScreenHp";
import HardSoftWareHp from "../full/HardSoftWareHp";
import MemoriHp from "../full/MemoriHp";
import ConnectivityHp from "../full/ConnectivityHp";
import CameraHp from "../full/CameraHp";
import FeaturesHp from "../full/FeaturesHp";
import BatteryHp from "../full/BatteryHp";
import BenchmarkHp from "../full/BenchmarkHp";
import DxOmarkHp from "../full/DxOmarkHp";
import CheckingHp from "../full/CheckingHp";
import NegativeWordsHp from "../full/NegativeWordsHp";
import PriceRangeHp from "../full/PriceRangeHp";
import ShopeeHp from "../full/ShopeeHp";
import LazadaHp from "../full/LazadaHp";
import ComparePopulerHp from "../full/ComparePopulerHp";
import ProsConsHp from "../full/ProsConsHp";
import { HP_DATA_ACT } from "redux/actions/Handphone";
const { Link } = Anchor;
const { Option } = Select;

const init_data = {
  id: "",
  model: "",
  merk: "",
  codename: "",
  id_merk: "",
  ketamb: "",
  gambar: "",
  sp_image: "",
  namalengkap: "",
  slug: "",
  spek_article: "",
  umu_tags: "",
  umu_dim_panjang: "",
  umu_dim_lebar: "",
  umu_dim_tebal: "",
  umu_dim_ket: "",
  umu_bobot: "",
  umu_bobot_ket: "",
  umu_diumumkan_sta: "",
  umu_diumumkan: "",
  umu_status: "",
  umu_status_ket: "",
  umu_model: "",
  umu_warna_ponsel: "",
  jar_2g_status: "",
  jar_2g_gsm_status: "",
  jar_2g_gsm: "",
  jar_2g_cdma_status: "",
  jar_2g_cdma: "",
  jar_3g_status: "",
  jar_3g: "",
  jar_4g_status: "",
  jar_4g: "",
  jar_5g_status: "",
  jar_5g: "",
  jar_gprs_status: "",
  jar_gprs: "",
  jar_edge_status: "",
  jar_edge: "",
  jar_multi_status: "",
  jar_multi_tipe1: "",
  jar_multi_tipe2: "",
  jar_dualon: "",
  jar_multi_ket: "",
  jar_sc: "",
  jar_sc_ket: "",
  jar_bwidth: "",
  lay_size_diagonal: "",
  lay_size_vertikal: "",
  lay_size_horizontal: "",
  lay_size_diagonal_ket: "",
  lay_size_ppi: "",
  lay_tipe_layar: "",
  lay_size_status: "",
  lay_touchscreen: "",
  lay_touchscreen_status: "",
  lay_warna_layar: "",
  lay_warna_ket: "",
  lay_sensor: "",
  lay_sensor_status: "",
  lay_proteksi: "",
  lay_proteksi_status: "",
  lay_multitouch: "",
  lay_multitouch_status: "",
  lay_fprint_status: "",
  lay_fprint_position: "",
  lay_fprint: "",
  lay_ext: "",
  lay_tambahan: "",
  har_info: "",
  har_chipset: "",
  har_cpu_core: "",
  har_cpu_clock: "",
  har_cpu_jenpros: "",
  har_gpu: "",
  har_semua_ket: "",
  sof_os: "",
  sof_os_versi: "",
  sof_java: "",
  sof_java_status: "",
  mem_internal: "",
  mem_internal_1: "",
  mem_internal_2: "",
  mem_internal_3: "",
  mem_internal_4: "",
  mem_internal_5: "",
  mem_internal_6: "",
  mem_internal_7: "",
  mem_eksternal: "",
  mem_eksternal_kap: "",
  mem_eksternal_s: "",
  mem_ram: "",
  mem_ram_1: "",
  mem_ram_2: "",
  mem_ram_3: "",
  mem_ram_4: "",
  mem_ram_5: "",
  mem_ram_6: "",
  mem_ram_7: "",
  mem_rom: "",
  mem_rom_1: "",
  mem_rom_2: "",
  mem_rom_3: "",
  mem_rom_4: "",
  mem_rom_5: "",
  mem_rom_6: "",
  mem_rom_7: "",
  mem_internal_ket: "",
  mem_ram_ket: "",
  mem_rom_ket: "",
  mem_ekternal_ket: "",
  mem_phonebook: "",
  mem_semua_ket: "",
  kon_wlan: "",
  kon_wlan_status: "",
  kon_bluetooth: "",
  kon_bluetooth_status: "",
  kon_usb: "",
  kon_usb_status: "",
  kon_35mm_jack: "",
  kon_35mm_jack_ket: "",
  kon_infrared: "",
  kon_infrared_ket: "",
  kon_hdmi_status: "",
  kon_hdmi: "",
  kon_tvoutput_status: "",
  kon_tvoutput: "",
  kon_nfc: "",
  kon_nfc_status: "",
  kam_utama_total: "",
  kam_depan_total: "",
  kam_utama: "",
  kam_utama2: "",
  kam_utama_status: "",
  kam_utama_ket: "",
  kam_led_flash_status: "",
  kam_led_flash: "",
  kam_fitur: "",
  kam_video: "",
  kam_video_hd: "",
  kam_video_status: "",
  kam_depan: "",
  kam_depan_status: "",
  kam_nat_vcall: "",
  fit_musik_status: "",
  fit_musik: "",
  fit_radio_status: "",
  fit_radio: "",
  fit_gps_status: "",
  fit_gps: "",
  fit_tvanalog: "",
  fit_tvanalog_ket: "",
  fit_browser_status: "",
  fit_browser: "",
  fit_wresistant_status: "",
  fit_wresistant: "",
  fit_pesan: "",
  fit_lain: "",
  bat_kapasitas: "",
  bat_kapasitas_s: "",
  bat_fcharge_status: "",
  bat_fcharge: "",
  bat_wcharge_status: "",
  bat_wcharge: "",
  bat_model: "",
  bat_bicara: "",
  bat_siaga: "",
  bat_musik: "",
  antutu_article: "",
  antutu_score1: "",
  antutu_score2: "",
  antutu_score3: "",
  antutu_url_1: "",
  antutu_url_2: "",
  antutu_url_3: "",
  antutu_youtube: "",
  antutu_ket_1: "",
  antutu_ket_2: "",
  antutu_ket_3: "",
  dx_mob_total: "",
  dx_mob_photo: "",
  dx_mob_video: "",
  dx_mob_urlreview: "",
  dx_self_total: "",
  dx_self_photo: "",
  dx_self_video: "",
  dx_self_urlreview: "",
  by: "",
  by_mod: "",
  created: "",
  modified: "",
  jml_komentar: "",
  tnggp_bgs: "",
  tnggp_krg: "",
  nilai_desain: "",
  nilai_layar: "",
  nilai_kinerja: "",
  nilai_apps: "",
  nilai_kamera: "",
  nilai_audio: "",
  nilai_baterai: "",
  nilai_hrga: "",
  nilai_overall: "",
  total_votes: "",
  stat_harga: "",
  stat_harga_1: "",
  stat_harga_2: "",
  stat_harga_3: "",
  stat_harga_4: "",
  stat_harga_5: "",
  stat_harga_6: "",
  stat_harga_7: "",
  hrg_baru: "",
  hrg_baru_ket: "",
  hrg_baru_1: "",
  hrg_baru_ket_1: "",
  hrg_baru_2: "",
  hrg_baru_ket_2: "",
  hrg_baru_3: "",
  hrg_baru_ket_3: "",
  hrg_baru_4: "",
  hrg_baru_ket_4: "",
  hrg_baru_5: "",
  hrg_baru_ket_5: "",
  hrg_baru_6: "",
  hrg_baru_ket_6: "",
  hrg_baru_7: "",
  hrg_baru_ket_7: "",
  hrg_bekas: "",
  hrg_bekas_ket: "",
  hrg_bekas_1: "",
  hrg_bekas_ket_1: "",
  hrg_bekas_2: "",
  hrg_bekas_ket_2: "",
  hrg_bekas_3: "",
  hrg_bekas_ket_3: "",
  hrg_bekas_4: "",
  hrg_bekas_ket_4: "",
  hrg_bekas_5: "",
  hrg_bekas_ket_5: "",
  hrg_bekas_6: "",
  hrg_bekas_ket_6: "",
  hrg_bekas_7: "",
  hrg_bekas_ket_7: "",
  hrg_turun_baru: "",
  hrg_turun_baru_1: "",
  hrg_turun_baru_2: "",
  hrg_turun_baru_3: "",
  hrg_turun_baru_4: "",
  hrg_turun_baru_5: "",
  hrg_turun_baru_6: "",
  hrg_turun_baru_7: "",
  hrg_turun_bekas: "",
  hrg_turun_bekas_1: "",
  hrg_turun_bekas_2: "",
  hrg_turun_bekas_3: "",
  hrg_turun_bekas_4: "",
  hrg_turun_bekas_5: "",
  hrg_turun_bekas_6: "",
  hrg_turun_bekas_7: "",
  sta_garansi: "",
  pkt_jual: "",
  info_tambahan: "",
  update_harga: "",
  jml_hits: "",
  stat_pbaru: "",
  trig_umu_status: "",
  checkingdata: "",
  checkingdata_hp: "",
  syncdb: "",
  shopee_hp: "",
  shopee_acc: "",
  blibli_hp: "",
  blibli_acc: "",
  id_hp: "",
  price_new_from: "",
  price_new_end: "",
  price_second_from: "",
  price_second_end: "",
  total_offer: "",
  created_at: "",
  last_update: "",
  release_idn: "",
  negative_keywords: "",
  lazada_hp: "",
  lazada_acc: "",
  hp_compare: "",
  hp_compare_list: "",
  pros: "",
  cons: "",
};

const PostHandphoneApp = (props) => {
  const id_hp = props.match.params.id;
  const [namaHp, setNamaHp] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [dataDefTagHp, setDefDataTagHp] = useState([]);
  const [hpLoading, setHpLoading] = useState(false);
  const [lastFetchIdHp, setLastFetchIdHp] = useState(0);
  const [dataTagHp, setDataTagHp] = useState([]);
  const [priceNewFromHp, setPriceNewFromHp] = useState("0");
  const [priceNewEndHp, setPriceNewEndHp] = useState("0");
  const [priceSecondFromHp, setPriceSecondFromHp] = useState("0");
  const [priceSecondEndHp, setPriceSecondEndHp] = useState("0");
  const [updatedAt, setUpdatedAt] = useState("");
  const [rilisIdn, setRilisIdn] = useState("");
  const [negativeKey, setNegativeKey] = useState("");
  const [shopeeProdUrl, setShopeeProdUrl] = useState("");
  const [shopeeAccUrl, setShopeeAccUrl] = useState("");
  const [lazadaProdUrl, setLazadaProdUrl] = useState("");
  const [lazadaAccUrl, setLazadaAccUrl] = useState("");
  const [hpComparePopuler, setHpComparePopuler] = useState("");
  const [hpPros, setHpPros] = useState("");
  const [hpCons, setHpCons] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [top, setTop] = useState(10);

  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);

  const retrieveData = () => {
    store.dispatch(GEN_INPUT_ACT("data", init_data));
    setFirstLoading(false);
  };

  const onSubmitHp = async () => {
    setUpdateLoading(true);
    let hp_pros = store.getState().hpproscons.pros_data;
    let hp_cons = store.getState().hpproscons.cons_data;
    await store.dispatch(HP_DATA_ACT("pros", hp_pros));
    await store.dispatch(HP_DATA_ACT("cons", hp_cons));

    let final_update = await store.getState().gen_hp_data.data;
    postCreateHp(final_update).then((resp) => {
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
        setTimeout(() => (window.location.href = "/handphones/list"), 3000);
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
  function scrollToTargetAdjusted(id_element) {
    var element = document.getElementById(id_element);
    var headerOffset = 130;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
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
      <div className="lay-root-affix">
        <div
          className="lay-segment-affix affix-general"
          onClick={() => scrollToTargetAdjusted("general")}
        >
          General
        </div>
        <div
          className="lay-segment-affix affix-network"
          onClick={() => scrollToTargetAdjusted("network")}
        >
          Network
        </div>
        <div
          className="lay-segment-affix affix-screen"
          onClick={() => scrollToTargetAdjusted("screen")}
        >
          Screen
        </div>
        <div
          className="lay-segment-affix affix-hardwaresoftware"
          onClick={() => scrollToTargetAdjusted("hardwaresoftware")}
        >
          Hardware & Software
        </div>
        <div
          className="lay-segment-affix affix-memori"
          onClick={() => scrollToTargetAdjusted("memori")}
        >
          Memori
        </div>
        <div
          className="lay-segment-affix affix-connectivity"
          onClick={() => scrollToTargetAdjusted("connectivity")}
        >
          Connectivity
        </div>
        <div
          className="lay-segment-affix affix-camera"
          onClick={() => scrollToTargetAdjusted("camera")}
        >
          Camera
        </div>
        <div
          className="lay-segment-affix affix-features"
          onClick={() => scrollToTargetAdjusted("features")}
        >
          Features
        </div>
        <div
          className="lay-segment-affix affix-battery"
          onClick={() => scrollToTargetAdjusted("battery")}
        >
          Battery
        </div>
        <div
          className="lay-segment-affix affix-benchmark"
          onClick={() => scrollToTargetAdjusted("benchmark")}
        >
          Benchmark
        </div>
        <div
          className="lay-segment-affix affix-dxomark"
          onClick={() => scrollToTargetAdjusted("dxomark")}
        >
          DxOmark
        </div>
        <div
          className="lay-segment-affix affix-price"
          onClick={() => scrollToTargetAdjusted("price")}
        >
          Price
        </div>
        <div
          className="lay-segment-affix affix-negativekeywords"
          onClick={() => scrollToTargetAdjusted("negativekeywords")}
        >
          Negative Keywords
        </div>
        <div
          className="lay-segment-affix affix-shopee"
          onClick={() => scrollToTargetAdjusted("shopee")}
        >
          Shopee
        </div>
        <div
          className="lay-segment-affix affix-lazada"
          onClick={() => scrollToTargetAdjusted("lazada")}
        >
          Lazada
        </div>
        <div
          className="lay-segment-affix affix-comparehp"
          onClick={() => scrollToTargetAdjusted("comparehp")}
        >
          Komparasi Populer
        </div>
        <div
          className="lay-segment-affix affix-proscons"
          onClick={() => scrollToTargetAdjusted("proscons")}
        >
          Kelebihan & Kekurangan
        </div>
      </div>
      <Card style={{ margin: "55px 0px 0px 0px" }}>
        <div style={{ fontSize: "30px", padding: "10px", fontWeight: 500 }}>
          {namaHp}
        </div>
        <GeneralHp />
        <NetworkHp />
        <ScreenHp />
        <HardSoftWareHp />
        <MemoriHp />
        <ConnectivityHp />
        <CameraHp />
        <FeaturesHp />
        <BatteryHp />
        <BenchmarkHp />
        <DxOmarkHp />
        <PriceRangeHp />
        <NegativeWordsHp />
        <ShopeeHp />
        <LazadaHp />
        <ComparePopulerHp />
        <ProsConsHp />
        <CheckingHp />
        {updateLoading ? (
          ""
        ) : (
          <Button
            onClick={onSubmitHp}
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
      </Card>
      <ToastContainer />
    </div>
  );
};

export default PostHandphoneApp;
