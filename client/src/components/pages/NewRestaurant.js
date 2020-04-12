import React, { useState } from "react";
import { newRestaurant } from "../../service/restaurantService";
import { uploadPhoto } from "../../service/uploadService";
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
  DialogTitle
} from "@material-ui/core";
import { s, txtField } from "../styled/globalStyles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { provincias } from "../../service/regions";

const getRegions = async () => {
  const reg = await regions();
  console.log(reg.data);
  return reg.data;
};

export const NewRestaurant = ({ history }) => {
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
  const [imagePreview1, setImagePreview1] = useState("");
  const [imagePreview2, setImagePreview2] = useState("");
  const [imagePreview3, setImagePreview3] = useState("");
  const [imagePreview4, setImagePreview4] = useState("");
  const [imagePreview5, setImagePreview5] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFile = async (e, setImg, setImgPreview) => {
    // setImg(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    const imgForm = new FormData();
    imgForm.append("imageUrl", e.target.files[0]);
    const resp = await uploadPhoto(imgForm);
    if (resp) {
      setImg(resp.data.secure_url);
    }
  };

  // const CloudinarySubmit = async (img, setImg) => {
  //   const imgForm = new FormData();
  //   imgForm.append("imageUrl", img);
  //   const resp = await uploadPhoto(imgForm);
  //   if (resp) {
  //     setImg(resp.data.secure_url);
  //   }

  //   console.log(resp.data.secure_url);
  // };

  const handleSubmit = async data => {
    // CloudinarySubmit(image1, setImage1);
    // CloudinarySubmit(image2, setImage2);

    console.log(data);
    const response = await newRestaurant(data);
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
    return ["Information", "Contact", "Pictures", "Other"];
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
              InputProps={txtField}
            />
            <FormControl
              required
              variant="outlined"
              fullWidth
              style={{ marginBottom: 40 }}
            >
              <InputLabel id="restaurantKindLabel">Kind</InputLabel>
              <Select
                labelId="restaurantKind"
                id="restaurantKind"
                name="kind"
                label="Kind"
                fullWidth
                value={kind}
                onChange={e => setKind(e.target.value)}
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
            </FormControl>
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
              InputProps={txtField}
            />
          </>
        );
      case 1:
        return (
          <>
            <Autocomplete
              required
              id="region"
              options={provincias}
              getOptionLabel={option => option.nm}
              style={{ width: "100%", marginBottom: 40 }}
              onChange={(event, value) => setRegion(value.nm)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Region"
                  value={region}
                  required
                  variant="outlined"
                />
              )}
            />
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
              InputProps={txtField}
            />
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
              InputProps={txtField}
            />

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
              InputProps={txtField}
            />

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
              InputProps={txtField}
            />

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
              InputProps={txtField}
            />
          </>
        );
      case 2:
        return (
          <>
            <input
              type="file"
              onChange={e => handleChangeFile(e, setImage1, setImagePreview1)}
            />
            <img src={imagePreview1} />

            <input
              type="file"
              onChange={e => handleChangeFile(e, setImage2, setImagePreview2)}
            />
            <img src={imagePreview2} />
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
    console.log(
      name,
      kind,
      descr,
      region,
      city,
      address,
      phone,
      email,
      website,
      dogs,
      terrace,
      allergenCard,
      kids
    );
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    console.log(
      name,
      kind,
      descr,
      region,
      city,
      address,
      phone,
      email,
      website,
      dogs,
      terrace,
      allergenCard,
      kids
    );
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
                          onClick={handleNext}
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
    </>
  );
};
