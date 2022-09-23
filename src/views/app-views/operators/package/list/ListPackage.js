import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const ListPackage = (props) => {
  const deleteItem = (item_id, item_name) => {
    props.onDeleteItem(item_id, item_name);
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="lay-hp-id">{props.id}</div>
      <div className="lay-hp-name">{props.name}</div>
      <div className="lay-hp-name">{props.operator}</div>
      <div className="lay-hp-name">{props.last_update}</div>
      <div
        className="lay-hp-act-pict"
        style={{ display: "flex", width: "200px", maxWidth: 200 }}
      >
        <span
          style={{
            padding: "5px",
            background: "#ff7600",
            borderRadius: "5px",
            width: 25,
            height: 25,
          }}
        >
          <a href={`/operators/packages/edit/${props.id}`}>
            <EditOutlined style={{ color: "#fff" }} />
          </a>
        </span>
        <div
          onClick={() => deleteItem(props.id, props.name)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ff0000",
            borderRadius: "5px",
            width: 25,
            height: 25,
            cursor: "pointer",
            marginLeft: 10,
          }}
        >
          <DeleteOutlined style={{ color: "#fff" }} />
        </div>
      </div>
    </div>
  );
};
export default ListPackage;
