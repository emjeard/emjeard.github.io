import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ItemModel = (props) => {
  const deleteItem = (item_id, item_name) => {
    props.onDeleteItem(item_id, item_name);
  };

  const updateItem = (item_id, item_name) => {
    props.onUpdateItem(item_id, item_name);
  };
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
      <div style={{ padding: "5px 15px", maxWidth: 250, width: 250 }}>
        {props.jbat}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 250, width: 250 }}>
        {props.created}
      </div>
      <div style={{ padding: "5px 15px", maxWidth: 250, width: 250 }}>
        {props.modified}
      </div>
      <div style={{ padding: "5px 15px", display: "flex" }}>
        <div
          onClick={() => updateItem(props.id, props.jbat)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ff7600",
            borderRadius: "5px",
            width: 25,
            height: 25,
            cursor: "pointer",
            marginLeft: 10,
          }}
        >
          <EditOutlined style={{ color: "#fff" }} />
        </div>
        <div
          onClick={() => deleteItem(props.id, props.jbat)}
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
export default ItemModel;
