import React, { Component } from "react";
import MyCustomUploadAdapterPlugin from "./MyCustomUploadAdapterPlugin";
import Editor from "ckeditor-inponsel";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import store from "redux/store";
import ADD_DATA from "redux/actions";
import { HP_PROS, HP_CONS, HP_DATA_ACT } from "redux/actions/Handphone";
import { INPUT_1_ACT } from "redux/actions/FormInput";

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
            heading: {
              options: [
                {
                  model: "paragraph",
                  view: "p",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
              ],
            },
            fontSize: {
              options: [
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                23,
                25,
                27,
                29,
                31,
                33,
                35,
              ],
            },
          }}
          data={
            this.props.editor_type === undefined
              ? store.getState().articles.content.replace(/\\\\n/g, "")
              : this.props.editor_type === "hp_pros"
              ? store.getState().hpproscons.pros_data.replace(/\\\\n/g, "")
              : this.props.editor_type === "brand"
              ? store.getState().form_input.form_1_data.replace(/\\\\n/g, "")
              : this.props.editor_type === "additional_info"
              ? store
                  .getState()
                  .gen_hp_data.data.additional_info.replace(/\\\\n/g, "")
              : this.props.editor_type === "dscp"
              ? store.getState().gen_hp_data.data.dscp.replace(/\\\\n/g, "")
              : store.getState().hpproscons.cons_data.replace(/\\\\n/g, "")
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
                : this.props.editor_type === "brand"
                ? INPUT_1_ACT(data)
                : this.props.editor_type === "additional_info"
                ? HP_DATA_ACT("additional_info", data)
                : this.props.editor_type === "dscp"
                ? HP_DATA_ACT("dscp", data)
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
