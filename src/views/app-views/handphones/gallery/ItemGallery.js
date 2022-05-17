import React from "react";
import {
  EditOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const ItemGallery = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="lay-hp-id">{props.id}</div>
      <div className="lay-hp-name">{props.nama_hp}</div>
      <div className="lay-hp-act-pict">
        <span
          style={{ padding: "5px", background: "#ff7600", borderRadius: "5px" }}
        >
          <a href={`/handphones/edit/gallery/${props.id}`}>
            <EditOutlined style={{ color: "#fff" }} />
          </a>
        </span>
      </div>
    </div>
  );
};
export default ItemGallery;
