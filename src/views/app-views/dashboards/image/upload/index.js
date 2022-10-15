import React, { useState, useEffect } from "react";
import { Card, Spin, Button, Input } from "antd";
import { CloudUploadOutlined, CopyOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import store from "redux/store";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import { GEN_INPUT_ACT } from "redux/actions/General";
import slugify from "slugify";
import { postUploadFile } from "api/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const reset_data = [];
const init_data = {
  id: 0,
  img_path: "",
};

const UploadImage = (props) => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [dataImgOp, setDataImgOp] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [imgSize, setImgSize] = useState("");
  const [imgName, setImgName] = useState("");
  const [imgFileName, setImgFileName] = useState("");
  const [imgFile, setImgFile] = useState({});
  const [respUpload, setRespUpload] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const hiddenFileInput = React.useRef(null);
  useEffect(() => {
    (async () => {
      retrieveData();
    })();
  }, []);
  const retrieveData = () => {
    store.dispatch(GEN_INPUT_ACT("data", init_data));
    setFirstLoading(false);
  };

  const onChangeInputGeneral = (e) => {
    const stateName = e.target.name;
    let stateValue = e.target.value;
    if (stateValue === "") {
      stateValue = null;
    }
    setImgPath(stateValue);
  };
  const check_img_res = (e) => {};

  const handleChangeImage = async (e) => {
    let img_file = e.target.files[0];
    setDataImgOp(URL.createObjectURL(img_file));
    setImgSize(img_file.size);
    setImgName(img_file.name);
    setImgFile(img_file);
    window.URL.createObjectURL(img_file);
    console.log("img_file", img_file);
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const upload_file = async (final_img_name) => {
    await postUploadFile(
      imgFile,
      final_img_name,
      "images/" + imgPath + "/"
    ).then((resp) => {
      console.log("object", resp);
      setImgUrl(resp.data.message);
      setRespUpload(resp.data.status);
    });
  };
  const onSubmitData = async (e) => {
    //upload_file();
    const maxSize = 10 * 1000000;
    console.log("imgPath", imgPath);
    console.log("imgName", imgName);
    console.log("imgSize", imgSize);
    if (imgSize > maxSize) {
      toast.error("Ukuran maksimal gambar 10Mb", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const timestamp = Math.floor(Date.now() / 1000);
      const file_type = imgName.split(".").pop();
      const splits = imgName.split(".");
      splits.pop();
      const fixedUrl = splits.join(".");
      let final_img_name =
        slugify(fixedUrl) + "-" + timestamp + "." + file_type;
      console.log("fileName", final_img_name);
      setImgFileName(final_img_name);
      upload_file(final_img_name);
    }
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
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div className="lbl-input-data" style={{ color: "#aaa" }}>
            Image Path
          </div>
          <Input
            placeholder="Contoh: operator/portal/2022/12/20"
            style={{ minWidth: 230 }}
            name="img_path"
            onChange={onChangeInputGeneral}
            defaultValue={imgPath}
          />
        </div>
      </div>
      <div>
        <div className="lay-subsegment">
          <div>
            Contoh: https://ik.imagekit.io/inponsel/images/
            <b>img/2022/09/13</b>/ iPhone-14-Pro-Max-hands-on-telset-696x373.jpg
          </div>
          <div>Karakter yang di bold / tebal adalah contoh dari image path</div>
          <div
            className="col-12"
            style={{ padding: 0, margin: 0, textAlign: "center" }}
          >
            <input
              ref={hiddenFileInput}
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={handleChangeImage}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px 0px 0px",
            }}
          >
            {dataImgOp === "" ? (
              <p className="ant-upload-drag-icon" onClick={handleClick}>
                <CloudUploadOutlined style={{ fontSize: "4rem" }} />
              </p>
            ) : (
              <img src={dataImgOp} alt="img" width="500px" />
            )}
          </div>
          {respUpload === true ? (
            <div style={{ padding: "20px 0px" }}>
              Image URL: {imgUrl}
              <span style={{ padding: "0px 0px 0px 10px" }}>
                <CopyOutlined
                  onClick={() => navigator.clipboard.writeText(imgUrl)}
                />
              </span>
            </div>
          ) : (
            ""
          )}
          {updateLoading ? (
            ""
          ) : imgName === "" ? (
            ""
          ) : (
            <Button
              onClick={onSubmitData}
              type="primary"
              icon={<CloudUploadOutlined />}
              style={{
                width: "-webkit-fill-available",
                margin: "15px 0px 10px 0px",
              }}
            >
              Upload
            </Button>
          )}
        </div>
      </div>
      <ToastContainer />
    </Card>
  );
};

export default UploadImage;
