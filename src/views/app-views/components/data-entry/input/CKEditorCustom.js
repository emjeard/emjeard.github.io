import React, { Component } from "react";
import MyCustomUploadAdapterPlugin from "./MyCustomUploadAdapterPlugin";
import Editor from "ckeditor-inponsel";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import store from "redux/store";
import ADD_DATA from "redux/actions";
import { HP_PROS, HP_CONS } from "redux/actions/Handphone";

class CKEditorCustom extends Component {
  render() {
    return (
      <div className="App">
        <CKEditor
          editor={Editor}
          config={{
            placeholder:
              this.props.editor_type === undefined
                ? ""
                : this.props.editor_type === "hp_pros"
                ? ""
                : "",
            extraPlugins: [MyCustomUploadAdapterPlugin],
            toolbar: {
              items: [
                "alignment",
                "undo",
                "redo",
                "blockQuote",
                "bold",
                "link",
                "ckfinder",
                "code",
                "codeBlock",
                "selectAll",
                "fontBackgroundColor",
                "fontColor",
                "fontFamily",
                "fontSize",
                "heading",
                "htmlEmbed",
                "imageTextAlternative",
                "toggleImageCaption",
                "insertImage",
                "resizeImage",
                "imageStyle:inline",
                "imageStyle:alignLeft",
                "imageStyle:alignRight",
                "imageStyle:alignCenter",
                "imageStyle:alignBlockLeft",
                "imageStyle:alignBlockRight",
                "imageStyle:block",
                "imageStyle:side",
                "imageStyle:wrapText",
                "imageStyle:breakText",
                "indent",
                "outdent",
                "italic",
                "linkImage",
                "numberedList",
                "bulletedList",
                "mediaEmbed",
                "pageBreak",
                "specialCharacters",
                "restrictedEditingException",
                "strikethrough",
                "subscript",
                "superscript",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "toggleTableCaption",
                "tableCellProperties",
                "tableProperties",
                "underline",
                "sourceEditing",
              ],
              shouldNotGroupWhenFull: true,
            },
          }}
          data={
            this.props.editor_type === undefined
              ? store.getState().articles.content
              : this.props.editor_type === "hp_pros"
              ? store.getState().hpproscons.pros_data
              : store.getState().hpproscons.cons_data
          }
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            //console.log(Array.from(editor.ui.componentFactory.names()));
            const data = editor.getData();
            //console.log({ event, editor, data });
            store.dispatch(
              this.props.editor_type === undefined
                ? ADD_DATA(data)
                : this.props.editor_type === "hp_pros"
                ? HP_PROS(data)
                : HP_CONS(data)
            );
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default CKEditorCustom;
