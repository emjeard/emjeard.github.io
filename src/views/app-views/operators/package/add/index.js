import React, { useState, useEffect, useCallback } from "react";
import { Select, Spin, Input, Card, Button, Checkbox } from "antd";
import CreateOperator from "./CreateOperator";
import { postCreateOpPackage } from "api/ApiData";
import { SaveOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const AddOperator = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [dataTagBrand, setDataTagBrand] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
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
    postCreateOpPackage(final_update).then((resp) => {
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
  return (
    <div>
      <Card>
        <CreateOperator />
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
      </Card>
    </div>
  );
};

export default AddOperator;
