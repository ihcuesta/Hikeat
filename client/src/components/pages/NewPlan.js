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
  InputAdornment,
  Paper,
  IconButton,
  Container
} from "@material-ui/core";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { s, txtField, txtFieldAlt } from "../styled/globalStyles";

export const NewPlan = ({ history }) => {
  const [name, setName] = useState("");
  const [shortDescr, setShortDescr] = useState("");
  const [longDescr, setLongDescr] = useState("");
  const [hikelevel, setHikelevel] = useState("");
  const [kms, setKms] = useState(0);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [lunchTime, setLunchTime] = useState("14:30");
  const [maxBookings, setMaxBookings] = useState(0);
  const [firstCourse, setFirstCourse] = useState([
    { course: "", vegans: false, celiacs: false }
  ]);
  const [secondCourse, setSecondCourse] = useState([
    { course: "", vegans: false, celiacs: false }
  ]);
  const [dessert, setDessert] = useState([
    { course: "", vegans: false, celiacs: false }
  ]);
  const [bread, setBread] = useState(false);
  const [drinks, setDrinks] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [brunch, setBrunch] = useState(false);
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

  const addCourse = (category, setCategory) => {
    const newElem = { course: "", vegans: false, celiacs: false };
    setCategory([...category, newElem]);
  };

  const removeCourse = (i, category, setCategory) => {
    let newArr = category.slice();
    newArr.splice(i, 1);
    setCategory(newArr);
  };

  const handleChange = (e, i, category, setCategory) => {
    let newArr = category.slice();
    newArr[i].course = e.target.value;
    setCategory(newArr);
  };

  const vegans = (e, i, category, setCategory) => {
    let newArr = category.slice();
    newArr[i].vegans = !newArr[i].vegans;
    setCategory(newArr);
  };

  const celiacs = (e, i, category, setCategory) => {
    let newArr = category.slice();
    newArr[i].celiacs = !newArr[i].celiacs;
    setCategory(newArr);
    console.log(category);
  };

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
              onChange={e => setLongDescr(e.target.value)}
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
                style={{ color: s.dark }}
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
              type="number"
              value={kms}
              label="Hike distance"
              style={{
                color: s.dark,
                maxWidth: 150,
                marginBottom: "7%"
              }}
              InputLabelProps={{
                shrink: true
              }}
              endAdornment={<InputAdornment position="end">Kms</InputAdornment>}
              onChange={e => setKms(e.target.value)}
            />

            <TextField
              id="date"
              fullWidth
              variant="outlined"
              label="Hike date"
              type="date"
              color={s.dark}
              style={{
                color: s.dark
              }}
              defaultValue="2020-04-20"
              InputLabelProps={{
                shrink: true
              }}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <Grid container style={{ marginTop: "7%", marginBottom: "7%" }}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                style={{ paddingRight: "3%" }}
              >
                <TextField
                  id="startTime"
                  fullWidth
                  variant="outlined"
                  label="Start Time"
                  type="time"
                  name="startTime"
                  defaultValue="08:00"
                  style={{
                    color: s.dark
                  }}
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                style={{ paddingLeft: "3%" }}
              >
                <TextField
                  id="lunchTime"
                  fullWidth
                  variant="outlined"
                  label="Lunch time"
                  type="time"
                  name="lunchTime"
                  defaultValue="14:30"
                  style={{
                    color: s.dark
                  }}
                  value={lunchTime}
                  onChange={e => setLunchTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              id="maxBookings"
              fullWidth
              variant="outlined"
              label="Max bookings allowed"
              type="number"
              name="maxBookings"
              style={{
                color: s.dark
              }}
              value={maxBookings}
              onChange={e => setMaxBookings(e.target.value)}
            />
            <Grid container style={{ marginTop: "7%", marginBottom: "7%" }}>
              <Grid item item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="breakfast"
                      color="primary"
                      checked={breakfast}
                      onChange={e => setBreakfast(!breakfast)}
                    />
                  }
                  label="Breakfast included ☕️"
                />
              </Grid>
              <Grid item item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  control={
                    <Switch
                      name="brunch"
                      color="primary"
                      checked={brunch}
                      onChange={e => setBrunch(!brunch)}
                    />
                  }
                  label="Brunch included 🥪"
                />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return "Aquí las imágenes";
      case 3:
        return (
          <>
            <Typography
              variant="h2"
              component="h2"
              color="primary"
              align="center"
              style={{ marginBottom: 15 }}
            >
              Menú
            </Typography>

            <Paper
              elevation={2}
              style={{
                marginBottom: "7%",
                padding: "5%",
                borderRadius: 5
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                style={{ fontWeight: 500, color: s.dark }}
              >
                First course
              </Typography>
              <Typography
                variant="p"
                component="p"
                gutterBottom
                style={{ marginBottom: "7%", color: s.dark }}
              >
                Add as many options per course as you want to include:
              </Typography>

              {firstCourse.map((c, i) => {
                return (
                  <>
                    <Container style={{ marginBottom: "7%" }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                          Option {i + 1}
                        </InputLabel>
                        <OutlinedInput
                          required
                          fullWidth
                          id="outlined-adornment-password"
                          type="text"
                          placeholder={`Option ${i + 1}`}
                          value={c.course}
                          style={{ color: s.dark }}
                          onChange={e =>
                            handleChange(e, i, firstCourse, setFirstCourse)
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton edge="end">
                                <DeleteIcon
                                  onClick={() =>
                                    removeCourse(i, firstCourse, setFirstCourse)
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>

                      <Container style={{ marginTop: 4, marginLeft: 5 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              name="vegans"
                              color="primary"
                              checked={c.vegans}
                              onChange={e =>
                                vegans(e, i, firstCourse, setFirstCourse)
                              }
                            />
                          }
                          label="Vegans"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              name="vegans"
                              color="primary"
                              checked={c.celiacs}
                              onChange={e =>
                                celiacs(e, i, firstCourse, setFirstCourse)
                              }
                            />
                          }
                          label="Celiacs"
                        />
                      </Container>
                    </Container>
                  </>
                );
              })}
              <Container
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "flex-end"
                }}
              >
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => addCourse(firstCourse, setFirstCourse)}
                >
                  <AddIcon />
                </Fab>
              </Container>
            </Paper>

            <Paper
              elevation={2}
              style={{
                marginBottom: "7%",
                padding: "5%",
                borderRadius: 5
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                style={{ fontWeight: 500, color: s.dark }}
              >
                Second course
              </Typography>
              <Typography
                variant="p"
                component="p"
                gutterBottom
                style={{ marginBottom: "7%", color: s.dark }}
              >
                Add as many options per course as you want to include:
              </Typography>

              {secondCourse.map((c, i) => {
                return (
                  <>
                    <Container style={{ marginBottom: "7%" }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                          Option {i + 1}
                        </InputLabel>
                        <OutlinedInput
                          required
                          fullWidth
                          id="outlined-adornment-password"
                          type="text"
                          placeholder={`Option ${i + 1}`}
                          value={c.course}
                          style={{ color: s.dark }}
                          onChange={e =>
                            handleChange(e, i, secondCourse, setSecondCourse)
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton edge="end">
                                <DeleteIcon
                                  onClick={() =>
                                    removeCourse(
                                      i,
                                      secondCourse,
                                      setSecondCourse
                                    )
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>

                      <Container style={{ marginTop: 4, marginLeft: 5 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              name="vegans"
                              color="primary"
                              checked={c.vegans}
                              onChange={e =>
                                vegans(e, i, secondCourse, setSecondCourse)
                              }
                            />
                          }
                          label="Vegans"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              name="vegans"
                              color="primary"
                              checked={c.celiacs}
                              onChange={e =>
                                celiacs(e, i, secondCourse, setSecondCourse)
                              }
                            />
                          }
                          label="Celiacs"
                        />
                      </Container>
                    </Container>
                  </>
                );
              })}
              <Container
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "flex-end"
                }}
              >
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => addCourse(secondCourse, setSecondCourse)}
                >
                  <AddIcon />
                </Fab>
              </Container>
            </Paper>

            <Paper
              elevation={2}
              style={{
                marginBottom: "7%",
                padding: "5%",
                borderRadius: 5
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                style={{ fontWeight: 500, color: s.dark }}
              >
                Dessert
              </Typography>
              <Typography
                variant="p"
                component="p"
                gutterBottom
                style={{ marginBottom: "7%", color: s.dark }}
              >
                Add as many options per course as you want to include:
              </Typography>

              {dessert.map((c, i) => {
                return (
                  <>
                    <Container style={{ marginBottom: "7%" }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                          Option {i + 1}
                        </InputLabel>
                        <OutlinedInput
                          required
                          fullWidth
                          id="outlined-adornment-password"
                          type="text"
                          placeholder={`Option ${i + 1}`}
                          value={c.course}
                          style={{ color: s.dark }}
                          onChange={e =>
                            handleChange(e, i, dessert, setDessert)
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton edge="end">
                                <DeleteIcon
                                  onClick={() =>
                                    removeCourse(i, dessert, setDessert)
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                      </FormControl>

                      <Container style={{ marginTop: 4, marginLeft: 5 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              name="vegans"
                              color="primary"
                              checked={c.vegans}
                              onChange={e => vegans(e, i, dessert, setDessert)}
                            />
                          }
                          label="Vegans"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              name="vegans"
                              color="primary"
                              checked={c.celiacs}
                              onChange={e => celiacs(e, i, dessert, setDessert)}
                            />
                          }
                          label="Celiacs"
                        />
                      </Container>
                    </Container>
                  </>
                );
              })}
              <Container
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "flex-end"
                }}
              >
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => addCourse(dessert, setDessert)}
                >
                  <AddIcon />
                </Fab>
              </Container>
            </Paper>

            <Typography variant="h4" component="h4">
              Also included:
            </Typography>
            <Container style={{ marginTop: 20, marginBottom: "7%" }}>
              <FormControlLabel
                control={
                  <Switch
                    name="bread"
                    color="primary"
                    checked={bread}
                    onChange={e => setBread(!bread)}
                  />
                }
                label="Bread 🥖"
              />

              <FormControlLabel
                control={
                  <Switch
                    name="drinks"
                    color="primary"
                    checked={drinks}
                    onChange={e => setDrinks(!drinks)}
                  />
                }
                label="Drinks 🍺"
              />

              <FormControlLabel
                control={
                  <Switch
                    name="coffee"
                    color="primary"
                    checked={coffee}
                    onChange={e => setCoffee(!coffee)}
                  />
                }
                label="Coffee ☕️"
              />
            </Container>
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
      shortDescr,
      longDescr,
      hikelevel,
      kms,
      typeof date,
      typeof startTime,
      typeof lunchTime,
      maxBookings,
      breakfast,
      brunch,
      firstCourse,
      secondCourse,
      dessert,
      bread,
      drinks,
      coffee
    );
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    console.log(
      name,
      shortDescr,
      longDescr,
      hikelevel,
      kms,
      date,
      startTime,
      lunchTime,
      maxBookings,
      breakfast,
      brunch,
      firstCourse,
      secondCourse,
      dessert,
      bread,
      drinks,
      coffee
    );
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
              handleSubmit({
                name,
                shortDescr,
                longDescr,
                hikelevel,
                kms,
                date,
                startTime,
                lunchTime,
                maxBookings,
                breakfast,
                brunch,
                firstCourse,
                secondCourse,
                dessert,
                bread,
                drinks,
                coffee
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
          <DialogTitle id="alert-dialog-title">{"Plan created!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Congrats! You can manage your plans from your profile. Ready to
              receive your hikers?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => history.push("/")} color="primary">
              Homepage
            </Button>
            <Button
              onClick={handleClose}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Profile
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
