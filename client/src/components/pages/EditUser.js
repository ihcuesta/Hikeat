import React, { useState, useEffect } from "react";
import { useUser, editUser, editUserUpdate } from "../../service/authService";
import { useUserSetter } from "../../service/authService";
import { useForm } from "react-hook-form";
import { Form, FormBg, FormCont, FormTitle, RadioCont } from "../styled/Forms";
import {
  TextField,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Fab,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { s, txtField, AddImg, ContIcon } from "../styled/globalStyles";
import placeholder from "../../images/placeholder-profile.jpg";
import { uploadPhoto, deletePhoto } from "../../service/uploadService";
import DeleteIcon from "@material-ui/icons/Delete";
import { FooterAlt } from "../UI/Footer";
import { Error, Gap } from "../styled/globalStyles";

export const EditUser = ({ history }) => {
  const session = useUser();
  const [image, setImage] = useState();
  const [fav, setFav] = useState("");
  const [description, setDescription] = useState("");
  const setUser = useUserSetter();
  const [openspin, setOpenspin] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    editUser().then(user => {
      setImage(user && user.image);
      setFav(user && user.fav);
      setDescription(user && user.description);
    });
  }, []);

  const handleSubmit = async (image, description, fav) => {
    if (fav !== "" && description !== "") {
      const response = await editUserUpdate(image, description, fav);
      console.log(response);
      if (response) {
        if (session && session.user.role === "Hiker") {
          history.push("/hiker/admin");
        }
        if (session && session.user.role === "Restaurant Owner") {
          history.push("/owner/admin");
        }
      } else {
        console.log("errors");
      }
    } else {
      setValidated(true);
    }
  };

  const handleChangeFile = async (e, setImg) => {
    setOpenspin(true);
    const imgForm = new FormData();
    imgForm.append("imageUrl", e.target.files[0]);
    const resp = await uploadPhoto(imgForm);
    if (resp) {
      console.log(resp);
      let cloudimage = resp.data.secure_url;
      cloudimage = cloudimage.split("upload/");
      cloudimage =
        cloudimage[0] + "upload/c_scale,h_300,w_300/" + cloudimage[1];
      // setValue("image", cloudimage);
      setImage(cloudimage);
    }
    setOpenspin(false);
  };

  const deleteImage = async (img, setImg) => {
    let public_id = img.split("/hikeat");
    public_id = "hikeat" + public_id[1];
    public_id = public_id.slice(0, -4);
    console.log(public_id);
    const resp = await deletePhoto({ public_id });
    if (resp) {
      console.log("Image deleted in Cloudinary");
    }
    setImg("");
  };

  return (
    <>
      <FormBg>
        <FormTitle>Edit Profile</FormTitle>
        <FormCont>
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(image, description, fav);
            }}
          >
            <p>Profile picture:</p>
            <AddImg style={{ width: 200, height: 200, marginBottom: 30 }}>
              <label for="file-input1">
                <img
                  width="200"
                  height="200"
                  src={image === "" ? "/placeholder-profile.jpg" : image}
                />
              </label>

              {/* <input type="text" name="image" value={register} /> */}

              <input
                id="file-input1"
                type="file"
                onChange={e => handleChangeFile(e, setImage)}
              />
              <ContIcon>
                {image === "" ? (
                  ""
                ) : (
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={() => deleteImage(image, setImage)}
                  >
                    <DeleteIcon color="#FFF"></DeleteIcon>
                  </Fab>
                )}
              </ContIcon>
            </AddImg>
            <TextField
              required
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              name="description"
              label="Description"
              multiline
              rows="4"
              fullWidth="true"
              placeholder="Write about you and your love to hiking/cooking! 😎"
              variant="outlined"
              helperText={
                description === "" && validated ? (
                  <Error>Empty field!</Error>
                ) : (
                  <Error></Error>
                )
              }
            />

            <Gap></Gap>
            <TextField
              required
              id="fav"
              value={fav}
              onChange={e => setFav(e.target.value)}
              name="fav"
              label={
                session && session.user.role === "Hiker"
                  ? "Your favourite hike"
                  : "Your favourite course"
              }
              fullWidth="true"
              placeholder={
                session && session.user.role === "Hiker"
                  ? "Your favourite hike"
                  : "Your favourite course"
              }
              variant="outlined"
              helperText={
                fav === "" && validated ? (
                  <Error>Empty field!</Error>
                ) : (
                  <Error></Error>
                )
              }
            />

            <Gap></Gap>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
            >
              Update
            </Button>
          </Form>
        </FormCont>
        <FooterAlt></FooterAlt>
      </FormBg>
      <Backdrop style={{ zIndex: 1000 }} open={openspin}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};
