import React, { useState, useEffect } from "react";
import { useUserSetter } from "../../service/authService";
import {
  editRestaurant,
  fetchEditRestaurant
} from "../../service/restaurantService";
import { uploadPhoto, deletePhoto } from "../../service/uploadService";
import { regions } from "../../service/api";
import { useForm } from "react-hook-form";
import { Form, FormBg, FormCont, FormTitle } from "../styled/Forms";
import {
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Grid,
  Switch,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Fab,
  FormHelperText,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { provincias } from "../../service/regions";
import {
  AddImg,
  ContAddImg,
  ContIcon,
  s,
  txtField,
  Gap,
  Error
} from "../styled/globalStyles";
import placeholder from "../../images/placeholder.jpg";
import DeleteIcon from "@material-ui/icons/Delete";
import { FooterAlt } from "../UI/Footer";

const getRegions = async () => {
  const reg = await regions();
  console.log(reg.data);
  return reg.data;
};

export const EditRestaurant = (props, { history }) => {
  const setUser = useUserSetter();
  const [name, setName] = useState("");
  const [kind, setKind] = useState("");
  const [descr, setDescr] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [dogs, setDogs] = useState(false);
  const [terrace, setTerrace] = useState(false);
  const [allergenCard, setAllergenCard] = useState(false);
  const [kids, setKids] = useState(false);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [validated0, setValidated0] = useState(false);
  const [validated1, setValidated1] = useState(false);
  const [open, setOpen] = useState(false);
  const [openspin, setOpenspin] = useState(false);
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    const id = props.match.params.id;
    fetchEditRestaurant(id).then(restaurant => {
      setRestaurant(restaurant);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmail = email => {
    if (email === "" && validated1) {
      return "Empty field!";
    } else if (
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email) ===
        false &&
      validated1
    ) {
      return "That's not a valid email";
    } else {
      return " ";
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
    setImg("");
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
        cloudimage[0] + "upload/c_scale,h_525,w_700/" + cloudimage[1];
      setImg(cloudimage);
    }
    setOpenspin(false);
  };

  const handleSubmit = async data => {
    console.log(data);
    const response = await editRestaurant(data);
    // const setRestUser = await addRestUser();
    // console.log(setRestUser);
    // setRestUser
    //   ? setUser(setRestUser)
    //   : console.log("Impossible to setUser from New Restaurant Form");
    console.log("Guardado");
    if (response) {
      handleClickOpen(); //mostrar pop up para ir al creador de plan o a la página de restaurante
    } else {
      console.log("Algo ha fallado");
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getSteps() {
    return ["Info", "Contact", "Images", "Other"];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <TextField
              required
              id="restaurantName"
              type="text"
              name="name"
              label="Restaurant name"
              variant="outlined"
              size="medium"
              fullWidth="true"
              value={name}
              onChange={e => setName(e.target.value)}
              error={name === "" && validated0}
              helperText={name === "" && validated0 ? "Empty field!" : " "}
            />
            <Gap></Gap>
            <FormControl required variant="outlined" fullWidth>
              <InputLabel id="restaurantKindLabel">Kind</InputLabel>
              <Select
                labelId="restaurantKind"
                id="restaurantKind"
                name="kind"
                label="Kind"
                fullWidth
                value={kind}
                onChange={e => setKind(e.target.value)}
                error={kind === "" && validated0}
                helperText={kind === "" && validated0 ? "Empty field!" : " "}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Traditional"}>Traditional</MenuItem>
                <MenuItem value={"Tapas"}>Tapas</MenuItem>
                <MenuItem value={"Italian"}>Italian</MenuItem>
                <MenuItem value={"American"}>American</MenuItem>
                <MenuItem value={"Asian"}>Asian</MenuItem>
              </Select>
              {kind === "" && validated0 ? (
                <Error>Empty field!</Error>
              ) : (
                <Error></Error>
              )}
            </FormControl>
            <Gap></Gap>

            <TextField
              required
              id="descrRestaurant"
              name="descrRestaurant"
              label="Description"
              multiline
              rows="4"
              fullWidth="true"
              placeholder="Write about your awesome restaurant 🍽"
              variant="outlined"
              value={descr}
              onChange={e => setDescr(e.target.value)}
              error={descr === "" && validated0}
              helperText={descr === "" && validated0 ? "Empty field!" : " "}
            />
            <Gap></Gap>
            <Gap></Gap>
          </>
        );
      case 1:
        return (
          <>
            <Autocomplete
              required
              id="region"
              options={provincias}
              onChange={(event, value) =>
                value ? setRegion(value.nm) : setRegion("")
              }
              getOptionLabel={option => option.nm}
              style={{ width: "100%" }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Region"
                  required
                  variant="outlined"
                  error={region === "" && validated1}
                  helperText={
                    region === "" && validated1 ? (
                      <Error>Empty field!</Error>
                    ) : (
                      <Error></Error>
                    )
                  }
                />
              )}
            />
            <Gap></Gap>
            <TextField
              required
              placeholder="Hallstatt"
              id="city"
              type="text"
              name="city"
              label="City"
              value={city}
              onChange={e => setCity(e.target.value)}
              variant="outlined"
              size="medium"
              fullWidth="true"
              error={city === "" && validated1}
              helperText={
                city === "" && validated1 ? (
                  <Error>Empty field!</Error>
                ) : (
                  <Error></Error>
                )
              }
            />
            <Gap></Gap>
            <TextField
              required
              placeholder="23 Mountain St."
              id="address"
              type="text"
              name="address"
              label="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              variant="outlined"
              size="medium"
              fullWidth="true"
              error={address === "" && validated1}
              helperText={
                address === "" && validated1 ? (
                  <Error>Empty field!</Error>
                ) : (
                  <Error></Error>
                )
              }
            />
            <Gap></Gap>

            <TextField
              required
              placeholder="912 912 912"
              id="phone"
              type="number"
              name="phone"
              label="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              variant="outlined"
              size="medium"
              fullWidth="true"
              error={phone === "" && validated1}
              helperText={
                phone === "" && validated1 ? (
                  <Error>Empty field!</Error>
                ) : (
                  <Error></Error>
                )
              }
            />
            <Gap></Gap>

            <TextField
              required
              placeholder="info@restaurant.com"
              id="email"
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              variant="outlined"
              size="medium"
              fullWidth="true"
              error={email === "" && validated1}
              helperText={<Error>{handleEmail(email)}</Error>}
            />
            <Gap></Gap>

            <TextField
              id="website"
              placeholder="www.ivanherranz.com"
              type="text"
              name="website"
              label="Website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              variant="outlined"
              size="medium"
              fullWidth="true"
              helperText={<Error></Error>}
            />
            <Gap></Gap>
            <Gap></Gap>
          </>
        );
      case 2:
        return (
          <>
            <Typography
              component="h3"
              align="center"
              color="primary"
              style={{ marginTop: 15, marginBottom: 15 }}
            >
              Images
            </Typography>
            <ContAddImg>
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  style={{ cursor: "pointer" }}
                >
                  <AddImg>
                    <label for="file-input1">
                      <img src={image1 === "" ? placeholder : image1} />
                    </label>

                    <input
                      id="file-input1"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage1)}
                    />
                    <ContIcon>
                      {image1 === "" ? (
                        ""
                      ) : (
                        <Fab
                          size="small"
                          color="secondary"
                          onClick={() => deleteImage(image1, setImage1)}
                        >
                          <DeleteIcon color="#FFF"></DeleteIcon>
                        </Fab>
                      )}
                    </ContIcon>
                  </AddImg>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <AddImg>
                    <label for="file-input2">
                      <img src={image2 === "" ? placeholder : image2} />
                    </label>

                    <input
                      id="file-input2"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage2)}
                    />

                    <ContIcon>
                      {image2 === "" ? (
                        ""
                      ) : (
                        <Fab
                          size="small"
                          color="secondary"
                          onClick={() => deleteImage(image2, setImage2)}
                        >
                          <DeleteIcon color="#FFF"></DeleteIcon>
                        </Fab>
                      )}
                    </ContIcon>
                  </AddImg>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <AddImg>
                    <label for="file-input3">
                      <img src={image3 === "" ? placeholder : image3} />
                    </label>

                    <input
                      id="file-input3"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage3)}
                    />

                    <ContIcon>
                      {image3 === "" ? (
                        ""
                      ) : (
                        <Fab
                          size="small"
                          color="secondary"
                          onClick={() => deleteImage(image3, setImage3)}
                        >
                          <DeleteIcon color="#FFF"></DeleteIcon>
                        </Fab>
                      )}
                    </ContIcon>
                  </AddImg>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <AddImg>
                    <label for="file-input4">
                      <img src={image4 === "" ? placeholder : image4} />
                    </label>

                    <input
                      id="file-input4"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage4)}
                    />

                    <ContIcon>
                      {image4 === "" ? (
                        ""
                      ) : (
                        <Fab
                          size="small"
                          color="secondary"
                          onClick={() => deleteImage(image4, setImage4)}
                        >
                          <DeleteIcon color="#FFF"></DeleteIcon>
                        </Fab>
                      )}
                    </ContIcon>
                  </AddImg>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <AddImg>
                    <label for="file-input5">
                      <img src={image5 === "" ? placeholder : image5} />
                    </label>

                    <input
                      id="file-input5"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage5)}
                    />

                    <ContIcon>
                      {image5 === "" ? (
                        ""
                      ) : (
                        <Fab
                          size="small"
                          color="secondary"
                          onClick={() => deleteImage(image5, setImage5)}
                        >
                          <DeleteIcon color="#FFF"></DeleteIcon>
                        </Fab>
                      )}
                    </ContIcon>
                  </AddImg>
                </Grid>
              </Grid>
            </ContAddImg>
          </>
        );
      case 3:
        return (
          <>
            <Grid container style={{ padding: "30px 20px" }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  control={<Switch color="primary" name="dogs" />}
                  label="Dogs allowed"
                  value={dogs}
                  checked={dogs}
                  onChange={e => setDogs(!dogs)}
                />
                <br />
                <FormControlLabel
                  control={<Switch color="primary" name="terrace" />}
                  label="Terrace"
                  value={terrace}
                  checked={terrace}
                  onChange={e => setTerrace(!terrace)}
                />
                <br />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  control={<Switch color="primary" name="allergenCard" />}
                  label="Allergens card"
                  value={allergenCard}
                  checked={allergenCard}
                  onChange={e => setAllergenCard(!allergenCard)}
                />
                <br />
                <FormControlLabel
                  control={<Switch color="primary" name="kids" />}
                  label="Menu for kids"
                  value={kids}
                  checked={kids}
                  onChange={e => setKids(!kids)}
                />
                <br />
              </Grid>
            </Grid>
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleErrors = currentStep => {
    switch (currentStep) {
      case 0:
        if (name !== "" && kind !== "" && descr !== "") {
          handleNext();
        } else {
          setValidated0(true);
        }
        break;
      case 1:
        if (
          region !== "" &&
          city !== "" &&
          address !== "" &&
          email !== "" &&
          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email) &&
          phone !== ""
        ) {
          handleNext();
        } else {
          setValidated1(true);
        }
        break;
      case 2:
        handleNext();
        break;
      case 3:
        handleNext();
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <FormBg>
        <FormTitle>New Restaurant</FormTitle>
        <FormCont style={{ paddingTop: 30 }}>
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit({
                name,
                kind,
                descr,
                region,
                city,
                address,
                phone,
                email,
                website,
                image1,
                image2,
                image3,
                image4,
                image5,
                dogs,
                terrace,
                kids,
                allergenCard
              });
            }}
          >
            <div>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography style={{ marginTop: 30, marginBottom: 30 }}>
                      Is all the information correct?{" "}
                    </Typography>
                    {/* <Button onClick={handleReset}>Reset</Button> */}
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button variant="contained" color="secondary" type="submit">
                      Create
                    </Button>
                  </div>
                ) : (
                  <div>
                    {getStepContent(activeStep)}
                    <div>
                      <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                      </Button>
                      {activeStep === steps.length ? (
                        <></>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleErrors(activeStep)}
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Form>
        </FormCont>
      </FormBg>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Restaurant created!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The fun has only just begun! Do you wanna create a Hikeat plan?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => history.push("/")} color="primary">
              Not now
            </Button>
            <Button
              onClick={() => history.push("/plan/new")}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Let's create a plan!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Backdrop style={{ zIndex: 1000 }} open={openspin}>
        <CircularProgress color="primary" />
      </Backdrop>
      <FooterAlt></FooterAlt>
    </>
  );
};
