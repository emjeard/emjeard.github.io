import React from "react";
import { EditOutlined } from "@ant-design/icons";

const ListNews = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: "5px 0px",
          maxWidth: 60,
          width: 60,
          textAlign: "center",
        }}
      >
        {props.id}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 100, width: 100 }}>
        {props.published_at}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 400, width: 400 }}>
        {props.title}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 120, width: 120 }}>
        {props.media_portal}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 70, width: 70 }}>
        {props.headline}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 80, width: 80 }}>
        <span
          className={`${
            props.status === "pending"
              ? "rss-status-pending"
              : props.status === "unpublish"
              ? "rss-status-unpublished"
              : "rss-status-published"
          }`}
        >
          {props.status}
        </span>
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 100, width: 100 }}>
        {props.updated_at}
      </div>
      <div style={{ padding: "5px 15px" }}>
        <span
          style={{ padding: "5px", background: "#ff7600", borderRadius: "5px" }}
        >
          <EditOutlined style={{ color: "#fff" }} />
        </span>
      </div>
    </div>
  );
};
export default ListNews;
