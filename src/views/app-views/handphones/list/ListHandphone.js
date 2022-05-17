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
      <div className="lay-hp-name">{props.nama_hp}</div>
      <div className="lay-hp-status">
        <span
          style={{
            background:
              props.status === "Segera Hadir"
                ? "#1976D2"
                : props.status === "Tidak Tersedia"
                ? "#757575"
                : props.status === "Baru Dirilis"
                ? "#388E3C"
                : "transparent",
            padding: "3px 5px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          {props.status}
        </span>
      </div>
      <div className="lay-hp-complete">
        {props.notes !== "" ? (
          <span
            style={{
              padding: "5px",
              background: "#F9A825",
              borderRadius: "5px",
            }}
          >
            <Tooltip placement="rightBottom" title={props.notes}>
              <InfoCircleOutlined style={{ color: "#fff" }} />
            </Tooltip>
          </span>
        ) : (
          <span
            style={{
              padding: "5px",
              background: "#388E3C",
              borderRadius: "5px",
            }}
          >
            <CheckOutlined style={{ color: "#fff" }} />
          </span>
        )}
      </div>
      <div className="lay-hp-new-price">
        {props.new_price === 0 ? "-" : props.new_price}
      </div>
      <div className="lay-hp-second-price">
        {props.second_price === 0 ? "-" : props.second_price}
      </div>
      <div className="lay-hp-shopee">
        {props.shopee === "complete" ? (
          <span
            style={{
              padding: "5px",
              background: "#388E3C",
              borderRadius: "5px",
            }}
          >
            <CheckOutlined style={{ color: "#fff" }} />
          </span>
        ) : (
          props.shopee
        )}
      </div>
      <div className="lay-hp-antutu">
        {props.antutu === 0 ? "-" : props.antutu}
      </div>
      <div className="lay-hp-update-shops">{props.update_shops}</div>
      <div className="lay-hp-act-hp">
        <span
          style={{ padding: "5px", background: "#ff7600", borderRadius: "5px" }}
        >
          <a href={`/handphones/full/${props.id}`}>
            <EditOutlined style={{ color: "#fff" }} />
          </a>
        </span>
      </div>
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
export default ListHandphone;
