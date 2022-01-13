import React, { useState, useRef, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import { getSearchMore } from "api/ApiData";
import debounce from "lodash/debounce";

const SearchInput = (props) => {
  const { active, close, isMobile, mode } = props;
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);

  const onChange = (data) => {
    setValue(data);
  };
  const onSearch = (data) => {
    if (data.length >= 2) {
      console.log("onSearch", data);
      retrieveData(data);
    }
  };

  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: "right",
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (type, title, id, count) => ({
    value: title,
    label: (
      <a
        className="link-edit"
        href={
          type === "hp"
            ? `/handphones/edit/${id}`
            : `/dashboards/rss/edit/${id}`
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {title}
          <span></span>
        </div>
      </a>
    ),
  });

  const retrieveData = (keyword) => {
    getSearchMore(keyword)
      .then((response) => {
        let optionsHp = [];
        let optionsArticle = [];

        const dataHp = response.data.data_hp;
        const dataArticle = response.data.data_article;

        for (let i = 0; i < dataHp.length; i++) {
          optionsHp.push(
            renderItem("hp", dataHp[i].nama_hp, dataHp[i].id, 100000)
          );
        }

        for (let i = 0; i < dataArticle.length; i++) {
          optionsArticle.push(
            renderItem("rss", dataArticle[i].judul, dataArticle[i].id, 100000)
          );
        }

        setOptions([
          {
            label: renderTitle("Handphones"),
            options: optionsHp,
          },
          {
            label: renderTitle("Articles"),
            options: optionsArticle,
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const autofocus = () => {
    inputRef.current.focus();
  };

  if (active) {
    autofocus();
  }

  const onSelect = (value, option) => {};

  return (
    <AutoComplete
      ref={inputRef}
      className={`nav-search-input ${isMobile ? "is-mobile" : ""} ${
        mode === "light" ? "light" : ""
      }`}
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={500}
      onChange={onChange}
      onSearch={onSearch}
      onSelect={onSelect}
      options={options}
      value={value}
    >
      <Input
        placeholder="Cari Hp dan Artikel..."
        prefix={<SearchOutlined className="mr-0" />}
      />
    </AutoComplete>
  );
};

export default SearchInput;
