import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Progress } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { getToken } from "api/ApiData";
import slugify from "slugify";

const DragS3 = (props) => {
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    console.log("file", file);
    const imgName = file.name;
    const timestamp = Math.floor(Date.now() / 1000);
    const file_type = imgName.split(".").pop();
    const splits = imgName.split(".");
    splits.pop();
    const fixedUrl = splits.join(".");
    let final_img_name = slugify(fixedUrl) + "-" + timestamp + "." + file_type;
    console.log("fileName", final_img_name);

    let final_folder = "portal/";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", final_img_name);
    formData.append("folder_path", final_folder);
    const config = {
      headers: {
        Authorization: "Basic " + btoa("inps2jtd0ll5ru5:222m1lSSSu5"),
        "ADM-Token": getToken(),
        "content-type": "multipart/form-data",
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

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "admin/upload/s3",
        formData,
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
    <div style={{ maxWidth: 640 }}>
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType="picture-card"
        defaultFileList={defaultFileList}
        style={{ width: "100%", height: 100 }}
      >
        {defaultFileList.length >= 1 ? null : (
          <div>
            {props.image !== "" ? (
              <div>
                <img
                  src={props.image}
                  alt=""
                  style={{ maxWidth: 400, maxHeight: 140 }}
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

export default DragS3;
