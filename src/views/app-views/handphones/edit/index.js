import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Select,
  Spin,
  Card,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SaveOutlined } from "@ant-design/icons";
import CKEditorCustom from "views/app-views/components/data-entry/input/CKEditorCustom";
import { getSearchHp, getDetailHp, putUpdateHandphone } from "api/ApiData";
import debounce from "lodash/debounce";
import moment from "moment";
import { HP_PROS, HP_CONS } from "redux/actions/Handphone";
import store from "redux/store";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const EditHpApp = (props) => {
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
        setPriceNewFromHp(dataHp.price_new_from);
        setPriceNewEndHp(dataHp.price_new_end);
        setPriceSecondFromHp(dataHp.price_second_from);
        setPriceSecondEndHp(dataHp.price_second_end);
        setUpdatedAt(dataHp.last_update);
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
    putUpdateHandphone(
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
        <div style={{ fontSize: "30px", padding: "10px", fontWeight: 500 }}>
          {namaHp}
        </div>
        <div
          style={{
            background: "#999999",
            padding: "5px 10px",
            borderRadius: "10px",
            color: "white",
            fontWeight: 500,
          }}
        >
          Status
        </div>
        <div style={{ padding: "0px 10px" }}>
          <div style={{ color: "red", marginTop: 15 }}>Harga Baru</div>
          <div style={{ display: "flex", marginTop: 5 }}>
            <div style={{}}>
              <div>Termurah</div>
              <InputNumber
                style={{ minWidth: "225px" }}
                formatter={(value) =>
                  `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                onChange={onChangePriceNewFrom}
                value={priceNewFromHp}
                placeholder="Termurah"
                allowClear
              />
            </div>
            <div style={{ margin: "0px 0px 0px 25px" }}>
              <div>Tertinggi</div>
              <InputNumber
                style={{ minWidth: "225px" }}
                formatter={(value) =>
                  `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                onChange={onChangePriceNewEnd}
                value={priceNewEndHp}
                placeholder="Tertinggi"
                allowClear
              />
            </div>
          </div>
          <div style={{ color: "red", marginTop: 25 }}>Harga Bekas</div>
          <div style={{ display: "flex", marginTop: 5 }}>
            <div>
              <div>Termurah</div>
              <InputNumber
                style={{ minWidth: "225px" }}
                formatter={(value) =>
                  `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                onChange={onChangePriceSecondFrom}
                value={priceSecondFromHp}
                placeholder="Termurah"
                allowClear
              />
            </div>
            <div style={{ margin: "0px 0px 0px 25px" }}>
              <div>Tertinggi</div>
              <InputNumber
                style={{ minWidth: "225px" }}
                formatter={(value) =>
                  `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")}
                onChange={onChangePriceSecondEnd}
                value={priceSecondEndHp}
                placeholder="Tertinggi"
                allowClear
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 25 }}>
            <div>
              <div>Update terakhir</div>
              <DatePicker
                onChange={onChangeUpdatedAt}
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
                defaultValue={
                  updatedAt === ""
                    ? ""
                    : moment(updatedAt, "YYYY-MM-DD HH:mm:ss")
                }
                value={
                  updatedAt === ""
                    ? ""
                    : moment(updatedAt, "YYYY-MM-DD HH:mm:ss")
                }
                style={{ minWidth: "225px" }}
              />
            </div>
            <div style={{ margin: "0px 0px 0px 25px" }}>
              <div>Rilis di Indonesia</div>
              <DatePicker
                onChange={onChangeRilisDate}
                format="YYYY-MM-DD"
                defaultValue={
                  rilisIdn === "" ? "" : moment(rilisIdn, "YYYY-MM-DD")
                }
                value={rilisIdn === "" ? "" : moment(rilisIdn, "YYYY-MM-DD")}
                style={{ minWidth: "225px" }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            margin: "25px 0px 0px 0px",
            background: "#D47227",
            padding: "5px 10px",
            borderRadius: "10px",
            color: "white",
            fontWeight: 500,
          }}
        >
          Negative keywords
        </div>
        <div style={{ padding: "0px 10px", margin: "10px 0px 0px 0px" }}>
          <Input
            placeholder="Negative keywords"
            value={negativeKey}
            onChange={onChangeNegativeKey}
            style={{ width: "100%" }}
            allowClear
          />
        </div>
        <div
          style={{
            margin: "25px 0px 0px 0px",
            background: "#D47227",
            padding: "5px 10px",
            borderRadius: "10px",
            color: "white",
            fontWeight: 500,
          }}
        >
          Shopee
        </div>
        <div style={{ padding: "0px 10px", margin: "10px 0px 0px 0px" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                minWidth: "150px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Product URL
            </div>
            <Input
              value={shopeeProdUrl}
              onChange={onChangeShopeeProdUrl}
              placeholder="http"
              style={{ width: "100%" }}
              allowClear
            />
          </div>
        </div>
        <div style={{ padding: "0px 10px", margin: "10px 0px 0px 0px" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                minWidth: "150px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Accessories URL
            </div>
            <Input
              value={shopeeAccUrl}
              onChange={onChangeShopeeAccUrl}
              placeholder="http"
              style={{ width: "100%" }}
              allowClear
            />
          </div>
        </div>
        <div
          style={{
            margin: "25px 0px 0px 0px",
            background: "#D47227",
            padding: "5px 10px",
            color: "white",
            fontWeight: 500,
            borderRadius: "10px",
          }}
        >
          Lazada
        </div>
        <div style={{ padding: "0px 10px", margin: "10px 0px 0px 0px" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                minWidth: "150px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Product URL
            </div>
            <Input
              value={lazadaProdUrl}
              onChange={onChangeLazProdUrl}
              placeholder="http"
              style={{ width: "100%" }}
              allowClear
            />
          </div>
        </div>
        <div style={{ padding: "0px 10px", margin: "10px 0px 0px 0px" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                minWidth: "150px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Accessories URL
            </div>
            <Input
              value={lazadaAccUrl}
              onChange={onChangeLazAccUrl}
              placeholder="http"
              style={{ width: "100%" }}
              allowClear
            />
          </div>
        </div>
        <div
          style={{
            margin: "25px 0px 0px 0px",
            background: "#cf3939",
            padding: "5px 10px",
            color: "white",
            fontWeight: 500,
            borderRadius: "10px",
          }}
        >
          Komparasi Populer
        </div>
        <div style={{ padding: "0px 10px", margin: "10px 0px 0px 0px" }}>
          <div style={{ display: "flex" }}>
            <Select
              mode="multiple"
              labelInValue
              value={dataDefTagHp}
              placeholder="Select hp"
              notFoundContent={hpLoading ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={debounce(handleSearchHp, 1000)}
              onChange={handleChangeHp}
              style={{ width: "100%", height: "auto !important" }}
            >
              {dataTagHp.map((item) => (
                <Option key={item.value}>{item.text}</Option>
              ))}
            </Select>
          </div>
        </div>
        <div
          style={{
            margin: "25px 0px 0px 0px",
            background: "#5DC1C7",
            padding: "5px 10px",
            color: "white",
            fontWeight: 500,
            borderRadius: "10px",
          }}
        >
          Kelebihan dan Kekurangan
        </div>
        <div
          style={{
            fontWeight: 500,
            color: "#313131",
            padding: "0px 0px 5px",
            margin: "20px 0px 0px 0px",
          }}
        >
          <div>{`Kelebihan ${namaHp}`}</div>
          <div style={{ margin: "5px 0px 0px" }}>
            <CKEditorCustom editor_type={"hp_pros"} />
            <div>Contoh :</div>
            <div>
              <ul>
                <li>Daya tahan baterai cukup lama</li>
                <li>Desain ringkas dengan Invinity V Display</li>
              </ul>
            </div>
          </div>
          <div
            style={{
              fontWeight: 500,
              color: "#313131",
              padding: "0px 0px 5px",
              margin: "20px 0px 0px 0px",
            }}
          >{`Kekurangan ${namaHp}`}</div>
          <div style={{ margin: "5px 0px 0px" }}>
            <CKEditorCustom editor_type={"hp_cons"} />
            <div>Contoh:</div>
            <ul>
              <li>Kinerja kurang gesit</li>
              <li>Memori internal hanya 16GB&nbsp;</li>
            </ul>
          </div>
        </div>
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

export default EditHpApp;
