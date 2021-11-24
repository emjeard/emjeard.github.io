import React, { useState } from "react";
import { Select } from "antd";
import PopulerData from "./PopulerData";
import { Card } from "antd";

const { Option } = Select;

const HandphonePopulerApp = () => {
  return (
    <div>
      <Card>
        <PopulerData />
      </Card>
    </div>
  );
};

export default HandphonePopulerApp;
