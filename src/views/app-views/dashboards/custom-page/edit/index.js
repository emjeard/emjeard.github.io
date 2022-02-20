import React, { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
import { Card } from "antd";
import { AutoComplete } from "antd";
import { getRootPathSitePage } from "api/ApiData";
const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];

const EditCustomPage = () => {
  const [value, setValue] = useState("");
  const [rootPath, setRootPath] = useState([]);

  useEffect(() => {
    getCategoryRootPath();
  }, []);

  const getCategoryRootPath = () => {
    getRootPathSitePage().then((response) => {
      console.log(response);
      const root_path = response.data;
      for (let m = 0; m < root_path.length; m++) {
        console.log(root_path[m].root_path);
        setRootPath((oldArray) => [
          ...oldArray,
          {
            value: root_path[m].root_path,
          },
        ]);
      }
    });
  };

  const onChange = (data) => {
    console.log(data);
    setValue(data);
  };
  const onSearch = (data) => {
    console.log(data);
  };
  const onSelect = (value, option) => {
    console.log(value);
    console.log(option);
  };
  return (
    <div>
      <Card>
        <div>Edit Custom Page dashboard</div>
        <AutoComplete
          style={{
            width: 200,
          }}
          onChange={onChange}
          onSearch={onSearch}
          onSelect={onSelect}
          options={rootPath}
          value={value}
          placeholder="try to type `b`"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Card>
    </div>
  );
};

export default EditCustomPage;
