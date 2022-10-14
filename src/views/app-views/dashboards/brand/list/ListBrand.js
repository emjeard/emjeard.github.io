import React from "react";
import { EditOutlined } from "@ant-design/icons";

const ListBrand = (props) => {
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
      <div style={{ padding: "5px 15px", maxWidth: 170, width: 170 }}>
        <img
          src={
            props.logo.includes("ik.imagekit.io")
              ? props.logo
              : "https://is3.cloudhost.id/inps/images/brands/" + props.logo
          }
          alt={props.merk}
          width={150}
        />
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 150, width: 150 }}>
        {props.merk}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 400, width: 400 }}>
        {props.desc_company}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 100, width: 100 }}>
        {props.created}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 100, width: 100 }}>
        {props.modified}
      </div>
      <div style={{ padding: "5px 15px" }}>
        <span
          style={{ padding: "5px", background: "#ff7600", borderRadius: "5px" }}
        >
          <a href={`/dashboards/brand/edit/${props.id}`}>
            <EditOutlined style={{ color: "#fff" }} />
          </a>
        </span>
      </div>
    </div>
  );
};
export default ListBrand;
