import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import htmlEditButton from "quill-html-edit-button";

const RichTextInput = ({
  id,
  onChange,
  defaultValue = "",
  placeholder = "",
  style = {},
  className = "",
}) => {
  Quill.register({
    "modules/htmlEditButton": htmlEditButton,
  });

  return (
    <ReactQuill
      className={className}
      style={style}
      id={id}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      modules={{
        htmlEditButton: {},
      }}
    />
  );
};

export default RichTextInput;
