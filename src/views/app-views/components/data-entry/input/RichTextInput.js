import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import htmlEditButton from "quill-html-edit-button";

const RichTextInput = (props) => {
  Quill.register({
    "modules/htmlEditButton": htmlEditButton,
  });

  return (
    <ReactQuill
      defaultValue={props.content}
      value={props.content}
      modules={{
        htmlEditButton: {},
      }}
    />
  );
};

export default RichTextInput;
