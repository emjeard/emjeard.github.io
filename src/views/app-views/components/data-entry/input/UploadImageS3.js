import { postUploadAvatar, postUploadFile } from "api/ApiData";
import slugify from "slugify";

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });

          return toBase64(file).then((cFile) => {
            const imgName = file.name;
            const timestamp = Math.floor(Date.now() / 1000);
            const file_type = imgName.split(".").pop();
            const splits = imgName.split(".");
            splits.pop();
            const fixedUrl = splits.join(".");
            let final_img_name =
              slugify(fixedUrl) + "-" + timestamp + "." + file_type;

            postUploadFile(
              file,
              final_img_name,
              "images/article/content/"
            ).then((resp) => {
              console.log(resp.data.message);
              if (resp.status) {
                this.loader.uploaded = true;
                resolve({
                  default: resp.data.message,
                });
              } else {
                reject(`Couldn't upload file: ${file.name}.`);
              }
            });
          });
        })
    );
  }
}

export default function UploadImageS3(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}
