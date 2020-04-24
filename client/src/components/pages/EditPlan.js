import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchEditPlan, editPlan } from "../../service/planService";
import { Form, FormBg, FormCont, FormTitle } from "../styled/Forms";
import { uploadPhoto, deletePhoto } from "../../service/uploadService";
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
  Container,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import {
  AddImg,
  ContAddImg,
  ContIcon,
  s,
  txtField,
  Error,
  Gap
} from "../styled/globalStyles";
import placeholder from "../../images/placeholder.jpg";
import DeleteIcon from "@material-ui/icons/Delete";

// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@material-ui/icons/Add";
import { FooterAlt } from "../UI/Footer";

export const EditPlan = props => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [shortDescr, setShortDescr] = useState("");
  const [longDescr, setLongDescr] = useState("");
  const [highlights, setHighlights] = useState([""]);
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
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [validated0, setValidated0] = useState(false);
  const [validated1, setValidated1] = useState(false);
  const [validated3, setValidated3] = useState(false);
  const [open, setOpen] = useState();
  const [openspin, setOpenspin] = useState();

  useEffect(() => {
    const id = props.match.params.id;
    fetchEditPlan(id).then(rest => {
      console.log(rest);
      setName(rest.planToEdit.name);
      setShortDescr(rest.planToEdit.shortDescr);
      setLongDescr(rest.planToEdit.longDescr);
      setHighlights(rest.planToEdit.highlights);
      setHikelevel(rest.planToEdit.hikelevel);
      setKms(rest.planToEdit.kms);
      setDate(rest.planToEdit.date);
      setStartTime(rest.planToEdit.startTime);
      setLunchTime(rest.planToEdit.lunchTime);
      setMaxBookings(rest.planToEdit.maxBookings);

      setFirstCourse(rest.planToEdit.firstCourse);
      setSecondCourse(rest.planToEdit.secondCourse);
      setDessert(rest.planToEdit.dessert);
      setBread(rest.planToEdit.bread);
      setDrinks(rest.planToEdit.drinks);
      setCoffee(rest.planToEdit.coffee);
      setBreakfast(rest.planToEdit.breakfast);
      setBrunch(rest.planToEdit.brunch);
      setImage1(rest.planToEdit.image1);
      setImage2(rest.planToEdit.image2);
      setImage3(rest.planToEdit.image3);
      setImage4(rest.planToEdit.image4);
      setImage5(rest.planToEdit.image5);
    });
  }, []);

  const id = props.match.params.id;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    setImg(null);
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

  const handleSubmit = async (
    name,
    shortDescr,
    longDescr,
    highlights,
    hikelevel,
    kms,
    date,
    startTime,
    lunchTime,
    image1,
    image2,
    image3,
    image4,
    image5,
    maxBookings,
    breakfast,
    brunch,
    firstCourse,
    secondCourse,
    dessert,
    bread,
    drinks,
    coffee
  ) => {
    const response = await editPlan(id, {
      name,
      shortDescr,
      longDescr,
      highlights,
      hikelevel,
      kms,
      date,
      startTime,
      lunchTime,
      image1,
      image2,
      image3,
      image4,
      image5,
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
    console.log("Guardado");
    if (response) {
      handleClickOpen(); //mostrar pop up para ir al creador de plan o a la página de restaurante
    } else {
      console.log("Algo ha fallado");
    }
  };

  const addHighlight = () => {
    if (highlights.length < 5) {
      const newElem = "";
      setHighlights([...highlights, newElem]);
    }
  };

  const removeHighlight = i => {
    let newArr = highlights.slice();
    newArr.splice(i, 1);
    setHighlights(newArr);
  };

  const handleHighlight = (e, i) => {
    let newArr = highlights.slice();
    newArr[i] = e.target.value;
    setHighlights(newArr);
  };

  const addCourse = (category, setCategory) => {
    if (category.length < 5) {
      const newElem = { course: "", vegans: false, celiacs: false };
      setCategory([...category, newElem]);
    }
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
    return ["Info", "Hike", "Images", "Menu"];
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
              error={name === "" && validated0}
              helperText={name === "" && validated0 ? "Empty field!" : " "}
            />
            <Gap></Gap>

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
              error={shortDescr === "" && validated0}
              helperText={
                shortDescr === "" && validated0 ? "Empty field!" : " "
              }
            />
            <Gap></Gap>

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
              error={longDescr === "" && validated0}
              helperText={longDescr === "" && validated0 ? "Empty field!" : " "}
            />
            <Gap></Gap>

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
                Highlights
              </Typography>
              <Typography
                variant="p"
                component="p"
                gutterBottom
                style={{ marginBottom: "7%", color: s.dark }}
              >
                Add as headlines the most interesting highlights of the hike:
              </Typography>

              {highlights.map((h, i) => {
                return (
                  <>
                    <Container style={{ marginBottom: "7%" }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">
                          Highlight {i + 1} &nbsp;
                        </InputLabel>
                        <OutlinedInput
                          required
                          fullWidth
                          id="outlined-adornment-password"
                          type="text"
                          placeholder={`Highlight ${i + 1}`}
                          value={h}
                          style={{ color: s.dark }}
                          onChange={e => handleHighlight(e, i)}
                          error={i === 0 && highlights[0] === "" && validated0}
                          endAdornment={
                            i > 0 && (
                              <InputAdornment position="end">
                                <IconButton edge="end">
                                  <DeleteIcon
                                    onClick={() => removeHighlight(i)}
                                  />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                          labelWidth={70}
                        />
                      </FormControl>

                      {i === 0 && highlights[0] === "" && validated0 ? (
                        <Error>Empty field!</Error>
                      ) : (
                        " "
                      )}
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
                  onClick={() => addHighlight()}
                >
                  <AddIcon />
                </Fab>
              </Container>
            </Paper>
          </>
        );
      case 1:
        return (
          <>
            <FormControl required variant="outlined" fullWidth>
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
                error={hikelevel === "" && validated1}
                helperText={
                  hikelevel === "" && validated1 ? "Empty field!" : " "
                }
              >
                <MenuItem value="">
                  <em>Select one</em>
                </MenuItem>
                <MenuItem value={"Easy peasy"}>Easy peasy</MenuItem>
                <MenuItem value={"Challenging"}>Challenging</MenuItem>
                <MenuItem value={"Hard"}>Hard</MenuItem>
                <MenuItem value={"Mountain runner"}>Mountain runner</MenuItem>
              </Select>
              {hikelevel === "" && validated1 ? (
                <Error>Empty field!</Error>
              ) : (
                <Error></Error>
              )}
            </FormControl>
            <Gap></Gap>
            <div>
              <OutlinedInput
                id="kms"
                name="kms"
                type="number"
                value={kms}
                label="Hike distance"
                style={{
                  color: s.dark,
                  maxWidth: 150
                }}
                InputLabelProps={{
                  shrink: true
                }}
                endAdornment={
                  <InputAdornment position="end">Kms</InputAdornment>
                }
                onChange={e => setKms(e.target.value)}
                error={kms === 0 && validated1}
                helperText={kms === "" && validated1 ? "Empty field!" : " "}
              />
              {kms === 0 && validated1 ? (
                <Error>Include the kms</Error>
              ) : (
                <Error></Error>
              )}
            </div>
            <Gap></Gap>

            <TextField
              id="date"
              name="date"
              fullWidth
              variant="outlined"
              label="Hike date"
              type="date"
              color={s.dark}
              style={{
                color: s.dark
              }}
              defaultValue="20-04-2020"
              InputLabelProps={{
                shrink: true
              }}
              value={date}
              onChange={e => setDate(e.target.value)}
              error={date === "" && validated1}
              helperText={date === "" && validated1 ? "Empty field!" : " "}
            />
            <Gap></Gap>
            <Grid container>
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
              <Error></Error>
            </Grid>
            <Gap></Gap>
            <div>
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
                error={maxBookings === 0 && validated1}
              />
              {maxBookings === 0 && validated1 ? (
                <Error>Include the maximum of bookings allowed</Error>
              ) : (
                <Error></Error>
              )}
            </div>
            <Gap></Gap>
            <Grid container>
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
                      <img src={image1 === null ? placeholder : image1} />
                    </label>

                    <input
                      id="file-input1"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage1)}
                    />
                    <ContIcon>
                      {image1 === null ? (
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
                      <img src={image2 === null ? placeholder : image2} />
                    </label>

                    <input
                      id="file-input2"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage2)}
                    />

                    <ContIcon>
                      {image2 === null ? (
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
                      <img src={image3 === null ? placeholder : image3} />
                    </label>

                    <input
                      id="file-input3"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage3)}
                    />

                    <ContIcon>
                      {image3 === null ? (
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
                      <img src={image4 === null ? placeholder : image4} />
                    </label>

                    <input
                      id="file-input4"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage4)}
                    />

                    <ContIcon>
                      {image4 === null ? (
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
                      <img src={image5 === null ? placeholder : image5} />
                    </label>

                    <input
                      id="file-input5"
                      type="file"
                      onChange={e => handleChangeFile(e, setImage5)}
                    />

                    <ContIcon>
                      {image5 === null ? (
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
                          error={
                            i === 0 &&
                            firstCourse[0].course === "" &&
                            validated3
                          }
                          endAdornment={
                            i > 0 && (
                              <InputAdornment position="end">
                                <IconButton edge="end">
                                  <DeleteIcon
                                    onClick={() =>
                                      removeCourse(
                                        i,
                                        firstCourse,
                                        setFirstCourse
                                      )
                                    }
                                  />
                                </IconButton>
                              </InputAdornment>
                            )
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
                      {i === 0 && firstCourse[0].course === "" && validated3 ? (
                        <Error>Empty field!</Error>
                      ) : (
                        " "
                      )}
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
                          error={
                            i === 0 &&
                            secondCourse[0].course === "" &&
                            validated3
                          }
                          helperText={
                            i === 0 &&
                            secondCourse[0].course === "" &&
                            validated3
                              ? "Empty field!"
                              : " "
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
                      {i === 0 &&
                      secondCourse[0].course === "" &&
                      validated3 ? (
                        <Error>Empty field!</Error>
                      ) : (
                        " "
                      )}
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
                          error={
                            i === 0 && dessert[0].course === "" && validated3
                          }
                          helperText={
                            i === 0 && dessert[0].course === "" && validated3
                              ? "Empty field!"
                              : " "
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
                      {i === 0 && dessert[0].course === "" && validated3 ? (
                        <Error>Empty field!</Error>
                      ) : (
                        " "
                      )}
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
    console.log(date);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleErrors = currentStep => {
    switch (currentStep) {
      case 0:
        if (name !== "" && shortDescr !== "" && longDescr !== "") {
          handleNext();
        } else {
          setValidated0(true);
        }
        break;
      case 1:
        if (hikelevel !== "" && kms > 0 && date !== "" && maxBookings > 0) {
          handleNext();
        } else {
          setValidated1(true);
        }
        break;
      case 2:
        handleNext();
        break;
      case 3:
        if (
          firstCourse[0].course !== "" &&
          secondCourse[0].course !== "" &&
          dessert[0].course !== ""
        ) {
          handleNext();
        } else {
          setValidated3(true);
        }
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <FormBg>
        <FormTitle>Edit Plan</FormTitle>
        <FormCont style={{ paddingTop: 30 }}>
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(
                name,
                shortDescr,
                longDescr,
                highlights,
                hikelevel,
                kms,
                date,
                startTime,
                lunchTime,
                image1,
                image2,
                image3,
                image4,
                image5,
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
          <DialogTitle id="alert-dialog-title">{"Plan updated!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Plan correctly modified according to your new inputs 😉
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => history.push("/admin")} color="primary">
              Admin
            </Button>
            <Button
              onClick={() => history.push(`/plan/${id}`)}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Plan page
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop style={{ zIndex: 1000 }} open={openspin}>
          <CircularProgress color="primary" />
        </Backdrop>
      </div>
      <FooterAlt></FooterAlt>
    </>
  );
};
