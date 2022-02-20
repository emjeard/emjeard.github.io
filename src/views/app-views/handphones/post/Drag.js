import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Progress } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const DragApp = (props) => {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (options) => {
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
    fmData.append("folder", "article");
    try {
      const res = await axios.post(
        "https://api.imagekit.io/v1/files/upload",
        fmData,
        config
      );

      onSuccess("Ok");
      props.parentCallback(res.data.url);
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
    <div style={{ width: 229, height: 195 }}>
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType="picture-card"
        defaultFileList={defaultFileList}
        style={{ width: "100%", minHeight: 195 }}
      >
        {defaultFileList.length >= 1 ? null : (
          <div>
            {props.image !== "" ? (
              <div>
                <img
                  src={props.image}
                  alt=""
                  style={{ width: 229, height: 195 }}
                />
              </div>
            ) : (
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined style={{ fontSize: "4rem" }} />
              </p>
            )}
          </div>
        )}
      </Upload>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </div>
  );
};

export default DragApp;
