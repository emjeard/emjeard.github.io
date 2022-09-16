import React from "react";
import { Select } from "antd";
import { Card } from "antd";
import CreateOperator from "./CreateOperator";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const AddOperator = () => {
  return (
    <div>
      <Card>
        <CreateOperator/>
      </Card>
    </div>
  );
};

export default AddOperator;
