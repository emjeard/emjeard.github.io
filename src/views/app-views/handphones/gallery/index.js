import React, { useState, useEffect } from "react";
import { Card, Select, Spin, Button } from "antd";
import { getListGalleryHp, putUpdateGalleryHp } from "api/ApiData";
import Gallery from "react-grid-gallery";
import CheckButton from "./CheckButton";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "redux/store";
import slugify from "slugify";
import { HP_DATA_ACT } from "redux/actions/Handphone";
import UploadImage from "views/app-views/components/data-entry/upload/UploadImage";
import { useSelector } from "react-redux";
import Utils from "utils";

const { Option } = Select;
const init_data = { id: 0, nama_hp: "", image: "" };
const reset_data = [];
const IMAGES = [];
const GalleryHp = (props) => {
  const [firstLoading, setFirstLoading] = useState(true);
  const [galleryData, setGalleryData] = useState([]);
  const [imagesGallery, setImagesGallery] = useState([]);
  const [selectAllCheckedS, setSelectAllCheckedS] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [namaHp, setNamaHp] = useState("");
  const [delImage, setDelImage] = useState("");
  const [oriImage, setOriImage] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(280);
  const { defaultFileList } = useSelector((state) => state.gen_hp_data);

  const id_hp = props.match.params.id;

  useEffect(() => {
    retrieveData();
    setImagesGallery(IMAGES);
  }, []);

  const retrieveData = () => {
    const setData = () =>
      new Promise((resolve) => {
        getListGalleryHp(id_hp).then((response) => {
          console.log("object", response.status);
          if (response.status === 200) {
            const dataHp = response.data.data;
            setOriImage(dataHp.galeri);
            setNamaHp(dataHp.nama_hp);
            const split_gallery = dataHp.galeri.split(",");
            for (let i = 0; i < split_gallery.length; i++) {
              setGalleryData((galleryData) => [
                ...galleryData,
                split_gallery[i],
              ]);
              setImagesGallery((imagesGallery) => [
                ...imagesGallery,
                {
                  src:
                    "https://ik.imagekit.io/inponsel/images/galeri/" +
                    split_gallery[i],
                  thumbnail:
                    "https://ik.imagekit.io/inponsel/images/galeri/" +
                    split_gallery[i],
                  thumbnailWidth: 350,
                  thumbnailHeight: 350,
                  caption: "",
                  isSelected: false,
                },
              ]);
            }
          } else {
            setOriImage("");
          }

          resolve();
        });
      });

    setData().then(() => {
      setFirstLoading(false);
    });
  };

  const getGallery = () => {
    console.log("Gallery ", galleryData);
  };

  const allImagesSelected = (images) => {
    var f = images.filter(function (img) {
      return img.isSelected === true;
    });
    return f.length === images.length;
  };

  const onSelectImage = (index, image) => {
    var images = imagesGallery.slice();
    var img = images[index];
    //setSelectedImage((selectedImage) => [...selectedImage, index]);

    if (img.hasOwnProperty("isSelected")) {
      img.isSelected = !img.isSelected;
    } else {
      img.isSelected = true;
    }
    setImagesGallery(images);

    if (allImagesSelected(images)) {
      setSelectAllCheckedS(true);
    } else {
      setSelectAllCheckedS(false);
    }

    const image_select = getSelectedImages().toString();
    console.log("image_select", image_select);
    if (image_select !== "") {
      const split_selected = image_select.split(",");
      let del_img_path = "";
      for (let index = 0; index < split_selected.length; index++) {
        del_img_path +=
          imagesGallery[split_selected[index]].src.replace(
            "https://ik.imagekit.io/inponsel/images/galeri/",
            ""
          ) + ",";
      }
      console.log("select", del_img_path);
      setDelImage(del_img_path);
      setSelectedImage(split_selected);
    } else {
      setSelectedImage([]);
    }
  };
  const getSelectedImages = () => {
    var selected = [];
    for (var i = 0; i < imagesGallery.length; i++) {
      if (imagesGallery[i].isSelected === true) {
        selected.push(i);
      }
    }
    return selected;
  };

  const onClickSelectAll = () => {
    var selectAllChecked = !selectAllCheckedS;
    setSelectAllCheckedS(selectAllChecked);

    var images = imagesGallery.slice();
    if (selectAllChecked) {
      for (var i = 0; i < imagesGallery.length; i++) {
        images[i].isSelected = true;
      }
      setSelectedImage(images);
      let del_img_path = "";
      for (let index = 0; index < imagesGallery.length; index++) {
        del_img_path +=
          imagesGallery[index].src.replace(
            "https://ik.imagekit.io/inponsel/images/galeri/",
            ""
          ) + ",";
      }
      setDelImage(del_img_path);
    } else {
      for (var j = 0; j < imagesGallery.length; j++) {
        images[j].isSelected = false;
      }
      setSelectedImage([]);
      setDelImage("");
    }
    setImagesGallery(images);
  };

  const onDeleteImages = () => {
    setUpdateLoading(true);
    const del_image = delImage.slice(0, -1);
    const del_image_split = del_image.split(",");
    let ori_image_split = oriImage.split(",");
    let final_image = "";
    for (let i = 0; i < ori_image_split.length; i++) {
      for (let j = 0; j < del_image_split.length; j++) {
        if (ori_image_split[i] === del_image_split[j]) {
          ori_image_split.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < ori_image_split.length; i++) {
      final_image += ori_image_split[i] + ",";
    }
    console.log("final", final_image.replace(/(^,)|(,$)/g, ""));
    putUpdateGalleryHp(id_hp, final_image.replace(/(^,)|(,$)/g, ""))
      .then((resp) => {
        console.log("update", resp);
        if (resp.status === true) {
          toast.success(resp.message, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => (window.location.href = "/handphones/list"), 3000);
        } else {
          toast.error(resp.message, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setUpdateLoading(false);
      })
      .catch((err) => {
        toast.error("Gagal update galeri", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setUpdateLoading(false);
      });
  };

  const onUpdateImages = () => {
    setUpdateLoading(true);
    let final_image = oriImage;
    final_image += "," + store.getState().gen_hp_data.galeri;
    console.log("final_image", final_image.replace(/(^,)|(,$)/g, ""));

    putUpdateGalleryHp(id_hp, final_image.replace(/(^,)|(,$)/g, ""))
      .then((resp) => {
        console.log("update", resp);
        if (resp.status === true) {
          toast.success(resp.message, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(
            () => (window.location.href = "/handphones/gallery/" + id_hp),
            3000
          );
        } else {
          toast.error(resp.message, {
            position: "top-right",
            autoClose: true,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        setUpdateLoading(false);
      })
      .catch((err) => {
        toast.error("Gagal update galeri", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setUpdateLoading(false);
      });
  };

  return firstLoading === true ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 400,
      }}
    >
      <Spin size="large" />
    </div>
  ) : (
    <div>
      <Card>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              padding: "0px 20px",
              fontWeight: 500,
            }}
          >
            {namaHp}
          </div>
          {oriImage === "" && (
            <div
              style={{
                fontSize: 22,
                display: "flex",
                justifyContent: "center",
                padding: "50px 0px",
              }}
            >
              Galeri masih kosong
            </div>
          )}
          {oriImage !== "" && (
            <div>
              <CheckButton
                index={0}
                isSelected={selectAllCheckedS}
                onClick={onClickSelectAll}
                parentHover={true}
                color={"rgba(0,0,0,0.54)"}
                selectedColor={"#4285f4"}
                hoverColor={"rgba(0,0,0,0.54)"}
              />
              <div
                style={{
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                select all
              </div>
              <Gallery
                images={imagesGallery}
                onSelectImage={onSelectImage}
                showLightboxThumbnails={true}
              />
            </div>
          )}
          {selectedImage.length === 0 || updateLoading === true ? (
            ""
          ) : (
            <Button
              onClick={onDeleteImages}
              type="primary"
              icon={<DeleteOutlined />}
              style={{
                width: "-webkit-fill-available",
                margin: "15px 0px 10px 0px",
              }}
            >
              Delete
            </Button>
          )}
          <div style={{ margin: "20px 0px 0px 0px" }}>
            <div
              style={{
                position: "relative",
                minHeight:
                  defaultFileList === undefined
                    ? previewHeight
                    : defaultFileList.length <= 4
                    ? 510
                    : defaultFileList.length > 4
                    ? 780
                    : defaultFileList.length > 8
                    ? 1210
                    : 2400,
              }}
            >
              <UploadImage
                image={""}
                image_type={"galeri_hp"}
                folder={"images/galeri"}
              />
            </div>
            {updateLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin size="large" />
              </div>
            )}

            {defaultFileList === undefined || defaultFileList.length === 0 ? (
              ""
            ) : (
              <Button
                onClick={onUpdateImages}
                type="primary"
                icon={<SaveOutlined />}
                style={{
                  width: "-webkit-fill-available",
                  margin: "15px 0px 10px 0px",
                }}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default GalleryHp;
