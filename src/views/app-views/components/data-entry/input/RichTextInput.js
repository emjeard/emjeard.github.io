import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import htmlEditButton from "quill-html-edit-button";
import { postUploadAvatar } from "api/ApiData";
import debounce from "lodash/debounce";
import store from "redux/store";
import ADD_DATA from "redux/actions";

let quillObj = "";
const RichTextInput = (props) => {
  Quill.register({
    "modules/htmlEditButton": htmlEditButton,
  });

  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      postUploadAvatar(input.files[0], input.files[0].name).then((resp) => {
        const res = resp.data.url;
        const range = quillObj.getEditorSelection();

        quillObj.getEditor().insertEmbed(range.index, "image", res);
      });
    };
  };

  const onChangeDesc = (value) => {
    //props.parentCallback(value);
    store.dispatch(ADD_DATA(value));
    console.log("onChangeDesc", value);
  };

  return (
    <div>
      <ReactQuill
        style={{ overflow: "auto" }}
        ref={(el) => {
          quillObj = el;
        }}
        onChange={debounce(onChangeDesc, 2000)}
        defaultValue={store.getState().articles.description}
        value={store.getState().articles.description}
        modules={{
          htmlEditButton: {},
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [
                "font",
                "background",
                "color",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "script",
                "size",
                "header",
                "indent",
                "align",
              ],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ align: [] }],
              ["link", "image", "video", "formula"],
              ["clean"],
              [{ color: [] }],
            ],
            handlers: {
              image: imageHandler,
            },
          },
        }}
      />
    </div>
  );
};

export default RichTextInput;
