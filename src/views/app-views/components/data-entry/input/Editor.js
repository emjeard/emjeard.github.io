import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import debounce from "lodash/debounce";
import store from "redux/store";
import ADD_DATA from "redux/actions";
import "react-quill/dist/quill.snow.css";

export const Editor = () => {
  const [state, setState] = React.useState({ value: null });
  const [quillObj, setQuillObj] = React.useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };
  const onChangeDesc = (value) => {
    //props.parentCallback(value);
    store.dispatch(ADD_DATA(value));
  };

  return (
    <div className="text-editor">
      <EditorToolbar quillObj={quillObj} />
      <ReactQuill
        ref={(el) => {
          setQuillObj(el);
        }}
        theme="snow"
        onChange={debounce(onChangeDesc, 2000)}
        defaultValue={store.getState().articles.content}
        value={store.getState().articles.content}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
