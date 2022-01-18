import React from "react";
import {
  EditOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const ListHandphone = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="lay-hp-id">{props.id}</div>
      <div
        style={{
          fontSize: "12px",
          padding: "5px 15px",
          maxWidth: "300px",
          width: 300,
          fontWeight: 500,
        }}
      >
        {props.nama_hp}
      </div>
      <div
        style={{
          fontSize: "12px",
          padding: "5px 15px",
          maxWidth: "300px",
          width: 300,
          fontWeight: 500,
        }}
      >
        {props.nama_hp2}
      </div>
      <div className="lay-hp-act-pict">
        <span
          style={{ padding: "5px", background: "#ff7600", borderRadius: "5px" }}
        >
          <a href={`/handphones/compare/edit/${props.id_hp_1}/${props.id_hp_2}`}>
            <EditOutlined style={{ color: "#fff" }} />
          </a>
        </span>
      </div>
    </div>
  );
};
export default ListHandphone;
