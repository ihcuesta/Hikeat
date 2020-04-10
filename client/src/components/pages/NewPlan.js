import React, { useState } from "react";
import { newPlan } from "../../service/planService";
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
  Fab,
  OutlinedInput,
  InputAdornment
} from "@material-ui/core";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@material-ui/icons/Add";
import { s, txtField } from "../styled/globalStyles";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const NewPlan = ({ history }) => {
  const [name, setName] = useState("");
  const [shortDescr, setShortDescr] = useState("");
  const [longDescr, setLongDescr] = useState("");
  const [hikelevel, setHikelevel] = useState("");
  const [kms, setKms] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [lunch, lunchTime] = useState("");
  const [firstCourse, setFirstCourse] = useState([""]);
  const [secondCourse, setSecondCourse] = useState([]);
  const [dessert, setDessert] = useState([]);
  const [drinks, setDrinks] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [brunch, setBrunch] = useState(false);
  const [courses, setCourses] = useState(1);
  const [open, setOpen] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async data => {
    console.log(data);
    const response = await newPlan(data);
    console.log("Guardado");
    if (response) {
      handleClickOpen(); //mostrar pop up para ir al creador de plan o a la página de restaurante
    } else {
      console.log("Algo ha fallado");
    }
  };

  //   const genCourses = () => {
  //     setFirstCourse(..."");
  //     return (
  //       <TextField
  //         required
  //         label={`Option ${firstCourse.length - 1}`}
  //         fullWidth="true"
  //         placeholder={`Option ${firstCourse.length - 1}`}
  //         variant="outlined"
  //         value={firstCourse[firstCourse.length - 1]}
  //         onChange={e => setFirstCourse(...e.target.value)}
  //         InputProps={txtField}
  //       />
  //     );
  //   };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getSteps() {
    return ["", "", "", ""];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <TextField
              required
              id="planName"
              type="text"
              name="name"
              label="Plan name"
              variant="outlined"
              size="medium"
              fullWidth="true"
              value={name}
              onChange={e => setName(e.target.value)}
              InputProps={txtField}
            />

            <TextField
              required
              id="shortDescr"
              name="shortDescr"
              label="Short Description"
              multiline
              rows="4"
              fullWidth="true"
              placeholder="Write a few words to include in the home preview"
              variant="outlined"
              value={shortDescr}
              onChange={e => setShortDescr(e.target.value)}
              InputProps={txtField}
            />

            <TextField
              required
              id="longDescr"
              name="longDescr"
              label="Long Description"
              multiline
              rows="10"
              fullWidth="true"
              placeholder="Explain in detail your plan: ⛰ + 🥙"
              variant="outlined"
              value={longDescr}
              onChange={e => setShortDescr(e.target.value)}
              InputProps={txtField}
            />
          </>
        );
      case 1:
        return (
          <>
            <FormControl
              required
              variant="outlined"
              fullWidth
              style={{ marginBottom: 40 }}
            >
              <InputLabel id="hikelevel">Hike level</InputLabel>
              <Select
                labelId="hikelevel"
                id="hikelevel"
                name="hikelevel"
                label="Hike level"
                fullWidth
                value={hikelevel}
                onChange={e => setHikelevel(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select one</em>
                </MenuItem>
                <MenuItem value={"Easy peasy"}>Easy peasy</MenuItem>
                <MenuItem value={"Challenging"}>Challenging</MenuItem>
                <MenuItem value={"Hard"}>Hard</MenuItem>
                <MenuItem value={"Mountain runner"}>Mountain runner</MenuItem>
              </Select>
            </FormControl>
            <OutlinedInput
              id="kms"
              value={kms}
              label="Hike distance"
              endAdornment={<InputAdornment position="end">Kms</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
            />

            <TextField
              id="date"
              variant="outlined"
              label="Hike date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />

            <TextField
              id="startTime"
              variant="outlined"
              label="Start Time"
              type="time"
              name="startTime"
              defaultValue="08:00"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
            />

            <TextField
              id="lunchTime"
              variant="outlined"
              label="Alarm clock"
              type="time"
              name="lunchTime"
              defaultValue="14:30"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
            />

            <TextField
              id="maxBookings"
              variant="outlined"
              label="Max bookings allowed"
              type="number"
              name="maxBookings"
            />
          </>
        );
      case 2:
        return "Aquí las imágenes";
      case 3:
        return (
          <>
            <Typography variant="h3" component="h3">
              Menú
            </Typography>
            <Typography variant="h4" component="h4">
              First course
            </Typography>
            <Typography variant="p" component="p">
              Add as many options per course as you want to include:
            </Typography>
            {firstCourse.map((course, i) => {
              return (
                <TextField
                  required
                  label={`Option ${i}`}
                  fullWidth="true"
                  placeholder={`Option ${i}`}
                  variant="outlined"
                  value={course}
                  onChange={e => setFirstCourse(...e.target.value)}
                  InputProps={txtField}
                />
              );
            })}
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
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
    <>
      <FormBg>
        <FormTitle>New Plan</FormTitle>
        <FormCont style={{ paddingTop: 30 }}>
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit({});
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
              onClick={handleClose}
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
