import { postUploadAvatar } from "api/ApiData";

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
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("folder", "article/content");

            postUploadAvatar(file, file.name).then((resp) => {
              console.log(resp.data.url);
              if (resp.status) {
                this.loader.uploaded = true;
                resolve({
                  default: resp.data.url+"?tr=f-webp",
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

// ...

export default function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}
