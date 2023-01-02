import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Progress } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import store from "redux/store";
import { HP_DATA_ACT, GEN_INPUT_ACT } from "redux/actions/Handphone";
import "./upload.css";
import { uploadImgIdc } from "api/ApiData";

const UploadImage = (props) => {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  console.log("defaultFileList", defaultFileList);

  const uploadImage = async (options) => {
    store.dispatch(GEN_INPUT_ACT("defaultFileList", defaultFileList));

    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      auth: {
        username: "jgjRPRWKM03LoK8DyFpF2kwfOFA=",
        password: "",
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    fmData.append("fileName", file.name);
    fmData.append(
      "folder",
      props.folder === undefined ? "article" : props.folder
    );
    try {
      const res = await axios.post(
        "https://api.imagekit.io/v1/files/upload",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log(props.image_type);
      if (props.image_type === "new_hp") {
        store.dispatch(HP_DATA_ACT("gambar", res.data.name));
      } else if (props.image_type === "galeri_hp") {
        let image_path =
          store.getState().gen_hp_data.galeri + "," + res.data.name;
        store.dispatch(
          GEN_INPUT_ACT("galeri", image_path.replace("undefined,", ""))
        );
        console.log("image_path", res.data.url);
        uploadImgIdc(res.data.url).then((resp) => {console.log(resp);})
      }
    } catch (err) {
      console.log("Eroor: ", err);
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setDefaultFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  return (
    <div>
      <Upload.Dragger
        id="upload_hp"
        accept="image/*"
        multiple={true}
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType="picture-card"
        defaultFileList={defaultFileList}
      >
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined style={{ fontSize: "4rem" }} />
        </p>
      </Upload.Dragger>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
};

export default UploadImage;
