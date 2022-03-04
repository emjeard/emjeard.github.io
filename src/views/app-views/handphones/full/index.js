import React, { useState, useEffect } from "react";
import { Button, Select, Spin, Card, Anchor, Affix } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaveOutlined } from "@ant-design/icons";
import { getSearchHp, getDetailHp } from "api/ApiData";
import { HP_PROS, HP_CONS } from "redux/actions/Handphone";
import store from "redux/store";
import { GEN_INPUT_ACT } from "redux/actions/General";
import GeneralHp from "./GeneralHp";
import NetworkHp from "./NetworkHp";
import ScreenHp from "./ScreenHp";
import HardSoftWareHp from "./HardSoftWareHp";
import MemoriHp from "./MemoriHp";
import ConnectivityHp from "./ConnectivityHp";
import CameraHp from "./CameraHp";
import FeaturesHp from "./FeaturesHp";
import BatteryHp from "./BatteryHp";
import BenchmarkHp from "./BenchmarkHp";
import DxOmarkHp from "./DxOmarkHp";
import CheckingHp from "./CheckingHp";
import NegativeWordsHp from "./NegativeWordsHp";
import PriceRangeHp from "./PriceRangeHp";
import ShopeeHp from "./ShopeeHp";
import LazadaHp from "./LazadaHp";
import ComparePopulerHp from "./ComparePopulerHp";
import ProsConsHp from "./ProsConsHp";
import { HP_DATA_ACT } from "redux/actions/Handphone";
const { Link } = Anchor;
const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const EditHpFullApp = (props) => {
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
    setFirstLoading(true);

    getDetailHp(id_hp)
      .then((response) => {
        const dataHp = response.data;

        setNamaHp(dataHp.namalengkap);

        store.dispatch(GEN_INPUT_ACT("data", dataHp));

        setPriceNewFromHp(dataHp.price_new_from);
        setPriceNewEndHp(dataHp.price_new_end);
        setPriceSecondFromHp(dataHp.price_second_from);
        setPriceSecondEndHp(dataHp.price_second_end);
        setUpdatedAt(dataHp.updated_at);
        setRilisIdn(dataHp.release_idn);
        setNegativeKey(dataHp.negative_keywords);
        setShopeeProdUrl(dataHp.shopee_hp);
        setShopeeAccUrl(dataHp.shopee_acc);
        setLazadaProdUrl(dataHp.lazada_hp);
        setLazadaAccUrl(dataHp.lazada_acc);
        const compare_hp = dataHp.hp_compare_list;
        for (let m = 0; m < compare_hp.length; m++) {
          setDefDataTagHp((oldArray) => [
            ...oldArray,
            {
              value: String(compare_hp[m].id),
              label: compare_hp[m].name,
              key: String(compare_hp[m].id),
            },
          ]);
        }

        setHpPros(dataHp.pros);
        setHpCons(dataHp.cons);
        store.dispatch(HP_PROS(dataHp.pros));
        store.dispatch(HP_CONS(dataHp.cons));
        setFirstLoading(false);
      })
      .catch((e) => {
        //console.log(e);
        setFirstLoading(false);
      });
  };

  const onChangeRilisDate = (date, dateString) => {
    setRilisIdn(dateString);
  };

  const onChangeUpdatedAt = (date, dateString) => {
    setUpdatedAt(dateString);
  };

  const getTagHp = (keyword) => {
    setLastFetchIdHp(+1);
    const fetchId = lastFetchIdHp;
    setDataTagHp([]);
    setHpLoading(true);
    getSearchHp(keyword).then((response) => {
      if (fetchId !== lastFetchIdHp) {
        // for fetch callback order
        return;
      }
      const data = response.data.map((item) => ({
        text: item.nama_hp,
        value: item.id,
      }));
      setDataTagHp(data);
      setHpLoading(false);
    });
  };

  const handleSearchHp = (value) => {
    //console.log(value);
    if (value.length > 0) {
      getTagHp(value);
    }
  };
  const handleChangeHp = (selectedItems) => {
    //console.log(selectedItems);
    setDefDataTagHp(selectedItems);
  };

  const onChangePriceNewFrom = (value) => {
    //const price_int = parseInt(value.replace("Rp. ", "").replace(/\./g, ""));
    //console.log(value);
    //const priceRp = utils.formatRupiah(value, "Rp. ")
    setPriceNewFromHp(value);
  };

  const onChangePriceNewEnd = (value) => {
    //const price_int = parseInt(value.replace("Rp. ", "").replace(/\./g, ""));
    //console.log(value);
    //const priceRp = utils.formatRupiah(value, "Rp. ")
    setPriceNewEndHp(value);
  };

  const onChangePriceSecondFrom = (value) => {
    //const price_int = parseInt(value.replace("Rp. ", "").replace(/\./g, ""));
    //console.log(value);
    //const priceRp = utils.formatRupiah(value, "Rp. ")
    setPriceSecondFromHp(value);
  };

  const onChangePriceSecondEnd = (value) => {
    //const price_int = parseInt(value.replace("Rp. ", "").replace(/\./g, ""));
    //console.log(value);
    //const priceRp = utils.formatRupiah(value, "Rp. ")
    setPriceSecondEndHp(value);
  };

  const onChangeNegativeKey = (e) => {
    setNegativeKey(e.target.value);
  };

  const onChangeShopeeProdUrl = (e) => {
    setShopeeProdUrl(e.target.value);
  };

  const onChangeShopeeAccUrl = (e) => {
    setShopeeAccUrl(e.target.value);
  };

  const onChangeLazProdUrl = (e) => {
    setLazadaProdUrl(e.target.value);
  };

  const onChangeLazAccUrl = (e) => {
    setLazadaAccUrl(e.target.value);
  };

  const onSubmitHp = (e) => {
    setUpdateLoading(true);
    let price_new_from = priceNewFromHp;
    let price_new_end = priceNewEndHp;
    let price_second_from = priceSecondFromHp;
    let price_second_end = priceSecondEndHp;
    let last_update = updatedAt;
    let rilis_idn = rilisIdn;
    let negative_keywords = negativeKey;
    let shopee_prod_url = shopeeProdUrl;
    let shopee_acc_url = shopeeAccUrl;
    let laz_prod_url = lazadaProdUrl;
    let laz_acc_url = lazadaAccUrl;

    let hp_pros = store.getState().hpproscons.pros_data;
    let hp_cons = store.getState().hpproscons.cons_data;
    store.dispatch(HP_DATA_ACT("pros", hp_pros));
    store.dispatch(HP_DATA_ACT("cons", hp_cons));

    let tagDevices = "";

    for (let i = 0; i < dataDefTagHp.length; i++) {
      tagDevices += dataDefTagHp[i].key + ",";
    }
    tagDevices = tagDevices.slice(0, -1);
    //console.log("price_new_from", price_new_from);
    //console.log("price_new_end", price_new_end);
    //console.log("price_second_from", price_second_from);
    //console.log("price_second_end", price_second_end);
    //console.log("last_update", last_update);
    //console.log("rilis_idn", rilis_idn);
    //console.log("negative_keywords", negative_keywords);
    //console.log("shopee_prod_url", shopee_prod_url);
    //console.log("shopee_acc_url", shopee_acc_url);
    //console.log("laz_prod_url", laz_prod_url);
    //console.log("laz_acc_url", laz_acc_url);
    //console.log("tagDevices", tagDevices);
    //console.log("hp_pros", hp_pros);
    //console.log("hp_cons", hp_cons);
    /* putUpdateHandphone(
      id_hp,
      hp_pros,
      hp_cons,
      tagDevices,
      rilis_idn,
      negative_keywords,
      shopee_prod_url,
      shopee_acc_url,
      laz_prod_url,
      laz_acc_url
    )
      .then((resp) => {
        //console.log("update", resp.data.status);
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
          toast.error(resp.data.message, {
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
      })
      .catch((err) => {
        toast.error("Gagal update artikel", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setUpdateLoading(false);
      }); */
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

export default EditHpFullApp;
