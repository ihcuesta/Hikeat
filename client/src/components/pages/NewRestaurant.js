import React from "react";
import { newRestaurant } from "../../service/restaurantService";
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
  FormGroup
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
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    console.log(data);
    const response = await newRestaurant(data);
    if (response) {
      history.push("/"); //mostrar pop up para ir al creador de plan o a la página de restaurante
    } else {
      console.log(errors);
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
              inputRef={register({ required: true })}
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
                inputRef={register({ required: true })}
                label="Kind"
                fullWidth
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
              name="desdescrRestaurantcription"
              label="Description"
              multiline
              rows="4"
              fullWidth="true"
              placeholder="Write about your awesome restaurant 🍽"
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
              style={{ width: "100%" }}
              inputRef={register({ required: true })}
              style={{ marginBottom: 40 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Region"
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
              variant="outlined"
              size="medium"
              fullWidth="true"
              InputProps={txtField}
              inputRef={register({ required: true })}
            />
            <TextField
              required
              placeholder="23 Mountain St."
              id="address"
              type="text"
              name="address"
              label="Address"
              variant="outlined"
              size="medium"
              fullWidth="true"
              InputProps={txtField}
              inputRef={register({ required: true })}
            />

            <TextField
              required
              placeholder="912 912 912"
              id="phone"
              type="number"
              name="phone"
              label="Phone"
              variant="outlined"
              size="medium"
              fullWidth="true"
              InputProps={txtField}
              inputRef={register({ required: true })}
            />

            <TextField
              required
              placeholder="info@restaurant.com"
              id="email"
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              size="medium"
              fullWidth="true"
              InputProps={txtField}
              inputRef={register({ required: true })}
            />

            <TextField
              id="website"
              placeholder="www.ivanherranz.com"
              type="text"
              name="website"
              label="Website"
              variant="outlined"
              size="medium"
              fullWidth="true"
              InputProps={txtField}
              inputRef={register({ required: true })}
            />
          </>
        );
      case 2:
        return "This is the bit I really care about!";
      case 3:
        return (
          <>
            <Grid container style={{ padding: "30px 20px" }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  control={<Switch color="primary" name="dogs" />}
                  label="Dogs allowed"
                />
                <br />
                <FormControlLabel
                  control={<Switch color="primary" name="terrace" />}
                  label="Terrace"
                />
                <br />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  control={<Switch color="primary" name="allergenCard" />}
                  label="Allergens card"
                />
                <br />
                <FormControlLabel
                  control={<Switch color="primary" name="kids" />}
                  label="Menu for kids"
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

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <FormBg>
      <FormTitle>New Restaurant</FormTitle>
      <FormCont style={{ paddingTop: 30 }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <Typography>All steps completed</Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  {getStepContent(activeStep)}
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Form>
      </FormCont>
    </FormBg>
  );
};
