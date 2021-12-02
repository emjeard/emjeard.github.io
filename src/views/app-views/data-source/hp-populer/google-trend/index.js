import React from "react";
import { Select } from "antd";
import { Card } from "antd";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const GoogleTrendApp = () => {
  return (
    <div>
      <Card>
        <div>Google Trend dashboard</div>
      </Card>
    </div>
  );
};

export default GoogleTrendApp;
