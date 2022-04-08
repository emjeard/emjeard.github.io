import React, { useState, useEffect } from "react";
import { Button, Select, Spin, Card, Anchor, Affix } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaveOutlined } from "@ant-design/icons";
import { getSearchHp, getDetailHp, postEditHp } from "api/ApiData";
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
      .catch(() => {
        //console.log(e);
        setFirstLoading(false);
      });
  };

  const onSubmitHp = async () => {
    setUpdateLoading(true);
    let hp_pros = store.getState().hpproscons.pros_data;
    let hp_cons = store.getState().hpproscons.cons_data;
    await store.dispatch(HP_DATA_ACT("pros", hp_pros));
    await store.dispatch(HP_DATA_ACT("cons", hp_cons));

    let final_update = await store.getState().gen_hp_data.data;
    postEditHp(final_update).then((resp) => {
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
        //setTimeout(() => (window.location.href = "/handphones/list"), 3000);
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
        <div
          style={{
            fontSize: "1.4rem",
            padding: "10px 0px 0px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
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

export default EditHpFullApp;
