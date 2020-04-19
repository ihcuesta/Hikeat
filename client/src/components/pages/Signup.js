import React, { useState } from "react";
import { doSignup, useUserSetter } from "../../service/authService";
import { useForm } from "react-hook-form";
import { Form, FormBg, FormCont, FormTitle, RadioCont } from "../styled/Forms";
import {
  TextField,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Fab
} from "@material-ui/core";
import { s, txtField, AddImg, ContIcon } from "../styled/globalStyles";
import placeholder from "../../images/placeholder.jpg";
import { uploadPhoto, deletePhoto } from "../../service/uploadService";
import DeleteIcon from "@material-ui/icons/Delete";
import { FooterAlt } from "../UI/Footer";

export const Signup = ({ history }) => {
  const [image, setImage] = useState("");
  const { register, handleSubmit, errors, setValue } = useForm();
  const setUser = useUserSetter();
  const [favLabel, setFavLabel] = useState("Your favourite...");

  const onSubmit = async data => {
    console.log(data);
    const response = await doSignup(data);
    if (response) {
      setUser(response);
      history.push("/"); //redirect to home after signup & login
    } else {
      console.log(errors);
    }
  };

  const changeFav = role => {
    if (role === "Hiker") {
      setFavLabel("Your favourite hike");
    }
    if (role === "Restaurant owner") {
      setFavLabel("Your favourite course");
    }
  };

  const handleChangeFile = async (e, setImg) => {
    const imgForm = new FormData();
    imgForm.append("imageUrl", e.target.files[0]);
    const resp = await uploadPhoto(imgForm);
    if (resp) {
      console.log(resp);
      let cloudimage = resp.data.secure_url;
      cloudimage = cloudimage.split("upload/");
      cloudimage =
        cloudimage[0] + "upload/c_scale,h_300,w_300/" + cloudimage[1];
      setValue("image", cloudimage);
      setImage(cloudimage);
    }
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
    setValue("image", "");
    setImage("");
  };

  return (
    <>
      <FormBg>
        <FormTitle>Sign up</FormTitle>
        <FormCont>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              placeholder="Like Hikwoman o SuperHiker 😜"
              id="username"
              type="text"
              name="username"
              label="Username"
              variant="outlined"
              size="medium"
              fullWidth="true"
              inputRef={register({
                required: {
                  value: true,
                  message: "Username required"
                }
              })}
              InputProps={txtField}
            />
            {errors.username ? <span>{errors.username.message}</span> : ""}

            <TextField
              required
              placeholder="8 characters, at least 1 letter and 1 number"
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              size="medium"
              fullWidth="true"
              inputRef={register({
                required: {
                  value: true,
                  message: "Password required"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "The password should include minimum eight characters, at least one letter and one number"
                }
              })}
              InputProps={txtField}
            />
            {errors.password ? <span>{errors.password.message}</span> : ""}

            <p>Add your profile picture:</p>
            <AddImg style={{ width: 200, height: 200, marginBottom: 30 }}>
              <label for="file-input1">
                <img src={image === "" ? placeholder : image} />
              </label>

              <input type="text" name="image" ref={register} />

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

            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup required aria-label="role" name="role">
              <RadioCont>
                <FormControlLabel
                  required
                  onClick={() => changeFav("Hiker")}
                  style={{ color: s.dark, marginRight: 30 }}
                  value="Hiker"
                  control={<Radio color="primary" />}
                  label="Hiker"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Role required"
                    }
                  })}
                />
                <FormControlLabel
                  required
                  onClick={() => changeFav("Restaurant owner")}
                  style={{ color: s.dark }}
                  value="Restaurant Owner"
                  control={<Radio color="primary" />}
                  label="Restaurant owner"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Role required"
                    }
                  })}
                />
              </RadioCont>
            </RadioGroup>
            {errors.role ? <span>{errors.role.message}</span> : ""}

            <TextField
              required
              id="description"
              name="description"
              label="Description"
              multiline
              rows="4"
              fullWidth="true"
              placeholder="Write about you and your love to hiking/cooking! 😎"
              variant="outlined"
              inputRef={register({
                required: {
                  value: true,
                  message: "Description required"
                },
                maxLength: 100
              })}
              InputProps={txtField}
            />
            {errors.description ? (
              <span>{errors.description.message}</span>
            ) : (
              ""
            )}

            <TextField
              required
              id="fav"
              name="fav"
              label={favLabel}
              fullWidth="true"
              placeholder={favLabel}
              variant="outlined"
              inputRef={register({
                required: {
                  value: true,
                  message: "Input required"
                },
                maxLength: 100
              })}
              InputProps={txtField}
            />
            {errors.description ? (
              <span>{errors.description.message}</span>
            ) : (
              ""
            )}

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
            >
              SIGN UP
            </Button>
          </Form>
        </FormCont>
      </FormBg>
      <FooterAlt></FooterAlt>
    </>
  );
};
