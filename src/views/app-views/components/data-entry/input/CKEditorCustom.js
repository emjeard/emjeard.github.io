import React, { Component } from "react";
import MyCustomUploadAdapterPlugin from "./MyCustomUploadAdapterPlugin";
import Editor from "ckeditor-inponsel";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import store from "redux/store";
import ADD_DATA from "redux/actions";

const editorConfiguration = {
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
};

class CKEditorCustom extends Component {
  render() {
    return (
      <div className="App">
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={store.getState().articles.content}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            //console.log(Array.from(editor.ui.componentFactory.names()));
            const data = editor.getData();
            //console.log({ event, editor, data });
            store.dispatch(ADD_DATA(data));
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
