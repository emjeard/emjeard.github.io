import React, { useState, useRef, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import { getSearchMore } from "api/ApiData";
import store from "redux/store";
import { HP_SELECT_1, HP_SELECT_2 } from "redux/actions/Handphone";
import "react-quill/dist/quill.snow.css";

const SearchInput = (props) => {
  const { active, close, isMobile, mode } = props;
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const inputRef = useRef(null);

  const onChange = (data) => {
    const value = data.split("<>");
    setValue(value[0]);
  };
  const onSearch = (data) => {
    if (data.length >= 2) {
      console.log("onSearch", data);
      retrieveData(data);
    }
  };

  const renderTitle = (title, hpOnly) => (
    <span>
      {title}
      {hpOnly === true ? (
        ""
      ) : (
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
      )}
    </span>
  );

  const renderItem = (type, title, id, count, hpOnly) => ({
    value: title + "<>" + id,
    label:
      hpOnly === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {title}
          <span></span>
        </div>
      ) : (
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
            renderItem(
              "hp",
              dataHp[i].nama_hp,
              dataHp[i].id,
              100000,
              props.hpOnly
            )
          );
        }

        if (props.hpOnly === true) {
          setOptions([
            {
              label: renderTitle("Handphones", true),
              options: optionsHp,
            },
          ]);
        } else {
          for (let i = 0; i < dataArticle.length; i++) {
            optionsArticle.push(
              renderItem(
                "rss",
                dataArticle[i].judul,
                dataArticle[i].id,
                100000,
                false
              )
            );
          }
          setOptions([
            {
              label: renderTitle("Handphones", false),
              options: optionsHp,
            },
            {
              label: renderTitle("Articles", false),
              options: optionsArticle,
            },
          ]);
        }
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

  const onSelect = (value, option) => {
    console.log(value);
    console.log(option);
    console.log(props.hp_select);
    if (props.hp_select === 1) {
      store.dispatch(HP_SELECT_1(value));
    } else if (props.hp_select === 2) {
      store.dispatch(HP_SELECT_2(value));
    } else {
    }
    checkCompare();
  };

  const checkCompare = () => {
    let id_hp1 = 0;
    let id_hp2 = 0;
    if (store.getState().hpproscons.hp_1 !== undefined) {
      id_hp1 = store.getState().hpproscons.hp_1.split("<>")[1];
    }
    if (store.getState().hpproscons.hp_2 !== undefined) {
      id_hp2 = store.getState().hpproscons.hp_2.split("<>")[1];
    }
    console.log(id_hp1);
    console.log(id_hp2);
    if (id_hp1 !== 0 && id_hp2 !== 0) {
      window.location.href = `/handphones/compare/edit/${id_hp1}/${id_hp2}`;
    }
  };

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
        placeholder={
          props.hpOnly === true ? "Cari Hp..." : "Cari Hp dan Artikel..."
        }
        prefix={<SearchOutlined className="mr-0" />}
      />
    </AutoComplete>
  );
};

export default SearchInput;
