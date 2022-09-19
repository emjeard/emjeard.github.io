import React from "react";
import {
  EditOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const ItemListOperator = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="lay-hp-id">{props.id}</div>
      <div className="lay-hp-name">{props.name}</div>
      <div className="lay-hp-name">
        <img
          src={"https://is3.cloudhost.id/inps/images/operator/" + props.logo}
          alt={props.name}
          width={75}
        />
      </div>
      <div className="lay-hp-name">{props.last_update.split("T")[0]}</div>
      <div className="lay-hp-act-pict">
        <span
          style={{ padding: "5px", background: "#ff7600", borderRadius: "5px" }}
        >
          <a href={`/operators/edit/${props.id}`}>
            <EditOutlined style={{ color: "#fff" }} />
          </a>
        </span>
      </div>
    </div>
  );
};
export default ItemListOperator;
