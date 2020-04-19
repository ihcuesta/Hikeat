import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Head,
  ImgCont,
  Contact,
  Owner,
  OwnerTexts
} from "../styled/RestDetailStyled";
import {
  Grid,
  Button,
  Box,
  TextField,
  Paper,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {
  ContBody,
  BodyText,
  BodyLight,
  EditCont
} from "../styled/globalStyles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FilterHdrRoundedIcon from "@material-ui/icons/FilterHdrRounded";
import { CardRestaurant } from "../UI/Cards";
import { fetchSinglePlan, checkIfManager } from "../../service/planService";
import {
  NameRest,
  Hike,
  HikeTitle,
  Highlights,
  Infographic,
  InfographImg,
  Menu,
  MenuTitle,
  Course,
  Organizer,
  RestContact,
  DetailsContact,
  Date,
  Time,
  DateText,
  Location,
  TitleBooking,
  Booking,
  BookButton,
  Legend,
  IconsCont
} from "../styled/PlanDetailStyled";
import infographic from "../../images/infographic.svg";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import veggies from "../../images/veggies.svg";
import gluten from "../../images/gluten.svg";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import QueryBuilderRoundedIcon from "@material-ui/icons/QueryBuilderRounded";
import { s } from "../styled/globalStyles";
import { Gap } from "../styled/globalStyles";
import { RestaurantCard } from "../UI/RestaurantCard";
import { TitleRest } from "../styled/PlanDetailStyled";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MapIcon from "@material-ui/icons/Map";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { Footer } from "../UI/Footer";
import { newBooking } from "../../service/bookingService";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/Share";
import { getComments } from "../../service/commentService";
import { SheetsRegistry } from "jss";

export const PlanDetail = (props, { history }) => {
  const [info, setInfo] = useState([]);
  const [numhikers, setNumhikers] = useState(0);
  const [comments, setComments] = useState();
  const [planid, setPlanid] = useState();
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [newbooking, setNewbooking] = useState();
  const [ismanager, setIsmanager] = useState();
  const [allComments, setAllComments] = useState();

  useEffect(() => {
    const id = props.match.params.id;

    fetchSinglePlan(id).then(plan => {
      setPlanid(plan.planId._id);
      setInfo(plan.planId);
      getComments(plan.planId.restaurant._id).then(comments => {
        console.log(comments);
        setAllComments(comments);
      });
    });

    checkIfManager(id).then(restaurant => {
      setIsmanager(restaurant.isManager);
    });
  }, []);

  console.log(
    allComments &&
      allComments.map(comment => {
        return comment.comment;
      })
  );

  const handleClickOpen = isNewBooking => {
    if (isNewBooking) {
      setNewbooking(true);
    } else {
      setNewbooking(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (planid, numhikers, comments) => {
    if (numhikers > 0) {
      const response = await newBooking({ planid, numhikers, comments });
      if (response) {
        handleClickOpen(response.isNewBooking); //mostrar pop up
      } else {
        console.log("Algo ha fallado");
      }
    } else {
      setValidated(true);
    }
  };

  return info === 0 ? (
    <Backdrop style={{ zIndex: 1000 }} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  ) : (
    <>
      <ContBody>
        <Head>
          <p>
            <i>{info.restaurant && info.restaurant.city}</i>
          </p>
          <h1>{info.name}</h1>
          <NameRest>{info.restaurant && info.restaurant.name}</NameRest>
        </Head>

        <ImgCont>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <img src={info.image1} width="100%" height="auto" />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info.image2} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info.image3} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info.image4} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info.image5} width="100%" height="auto" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ImgCont>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Hike>
              <HikeTitle>
                <FilterHdrRoundedIcon></FilterHdrRoundedIcon>
              </HikeTitle>
              <HikeTitle>
                <h3>THE HIKING TRAIL</h3>
              </HikeTitle>
              <BodyLight>{info.longDescr}</BodyLight>
              {info.highlights &&
                info.highlights.map(highlight => {
                  return (
                    <Highlights>
                      <CheckCircleOutlineRoundedIcon color="primary"></CheckCircleOutlineRoundedIcon>
                      <p>{highlight}</p>
                    </Highlights>
                  );
                })}
            </Hike>
            <Hike>
              <Infographic>
                <p>{info.startTime}</p>
                <p>
                  {info.kms} kms
                  <br></br>
                  <b>{info.hikelevel}</b>
                </p>
                <p>{info.lunchTime}</p>
              </Infographic>
              <InfographImg>
                <img src={infographic} width="100%" height="auto" />
              </InfographImg>
            </Hike>
            <Hike>
              {info.breakfast && (
                <Chip
                  icon={<FreeBreakfastIcon />}
                  label="Breakfast"
                  color={s.dark}
                  style={{ padding: "20px 5px", marginRight: 10 }}
                />
              )}

              {info.brunch && (
                <Chip
                  icon={<FastfoodIcon />}
                  label="Snacks"
                  color={s.dark}
                  style={{ padding: "20px 5px", marginRight: 10 }}
                />
              )}

              <Chip
                icon={<MapIcon />}
                label="Guidance"
                color={s.dark}
                style={{ padding: "20px 5px", marginRight: 10 }}
              />
            </Hike>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Menu>
              <MenuTitle>
                <RestaurantMenuOutlinedIcon></RestaurantMenuOutlinedIcon>
              </MenuTitle>
              <MenuTitle>
                <h3>MENU</h3>
              </MenuTitle>
              <MenuTitle>
                <p>First course</p>
              </MenuTitle>
              {info.firstCourse &&
                info.firstCourse.map(option => {
                  return (
                    <Course>
                      <i>{option.course}</i>
                      {option.vegans && (
                        <img src={veggies} width="20" height="auto" />
                      )}
                      {option.celiacs && (
                        <img src={gluten} width="18" height="auto" />
                      )}
                    </Course>
                  );
                })}
              <MenuTitle>
                <p>Second course</p>
              </MenuTitle>
              {info.secondCourse &&
                info.secondCourse.map(option => {
                  return (
                    <Course>
                      <i>{option.course}</i>
                      {option.vegans && (
                        <img src={veggies} width="20" height="auto" />
                      )}
                      {option.celiacs && (
                        <img src={gluten} width="18" height="auto" />
                      )}
                    </Course>
                  );
                })}
              <MenuTitle>
                <p>Dessert</p>
              </MenuTitle>
              {info.dessert &&
                info.dessert.map(option => {
                  return (
                    <Course>
                      <i>{option.course}</i>
                      {option.vegans && (
                        <img src={veggies} width="20" height="auto" />
                      )}
                      {option.celiacs && (
                        <img src={gluten} width="18" height="auto" />
                      )}
                    </Course>
                  );
                })}

              {(info.bread || info.drinks || info.coffee) && (
                <>
                  <hr width="50" style={{ marginTop: 30 }} />
                  <MenuTitle>
                    <p>Also included</p>
                  </MenuTitle>
                </>
              )}

              {info.bread && (
                <Course>
                  <i>Bread</i>
                </Course>
              )}
              {info.drinks && (
                <Course>
                  <i>Drinks</i>
                </Course>
              )}
              {info.coffee && (
                <Course>
                  <i>Coffee</i>
                </Course>
              )}
              <Legend>
                <div>
                  <img src={veggies} width="20" height="auto" />
                  <p>* Appropiate for vegans</p>
                </div>
                <div>
                  <img src={gluten} width="20" height="auto" />
                  <p>* Gluten free</p>
                </div>
              </Legend>
            </Menu>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            {ismanager && (
              <EditCont>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ minWidth: 150, margin: "auto", display: "block" }}
                >
                  Edit
                </Button>
                <Button
                  component={Link}
                  style={{
                    minWidth: 150,
                    color: s.error,
                    margin: "auto",
                    display: "block",
                    textAlign: "center",
                    marginTop: 15
                  }}
                >
                  Delete
                </Button>
              </EditCont>
            )}
            <Contact>
              <Owner>
                <img src={info.owner && info.owner.image} />
                <OwnerTexts>
                  <p>
                    <i>Organizer</i>
                  </p>
                  <Organizer>{info.owner && info.owner.username}</Organizer>
                  <RestContact>
                    {info.restaurant && info.restaurant.name}
                  </RestContact>
                </OwnerTexts>
              </Owner>
              <DetailsContact>
                <Date>
                  <CalendarTodayIcon
                    style={{ color: s.dark, width: 35, height: "auto" }}
                  ></CalendarTodayIcon>
                  <DateText>
                    <p>
                      <b>Date</b>
                    </p>
                    <p>{info.date}</p>
                  </DateText>
                </Date>
                <Time>
                  <QueryBuilderRoundedIcon
                    style={{ color: s.dark, width: 35, height: "auto" }}
                  ></QueryBuilderRoundedIcon>
                  <DateText>
                    <p>
                      <b>Time</b>
                    </p>
                    <p>{info.startTime}</p>
                  </DateText>
                </Time>
              </DetailsContact>
              <DetailsContact>
                <Location>
                  <LocationOnIcon
                    style={{ color: s.dark, width: 35, height: "auto" }}
                  ></LocationOnIcon>
                  <DateText>
                    <p>
                      <b>Start Point</b>
                    </p>
                    <p>{info.restaurant && info.restaurant.name}</p>
                    <p>
                      {info.restaurant && info.restaurant.address}.{" "}
                      {info.restaurant && info.restaurant.city},{" "}
                      {info.restaurant && info.restaurant.region}.
                    </p>
                  </DateText>
                </Location>
              </DetailsContact>
            </Contact>

            <Paper elevation={5} style={{ padding: "5%" }}>
              <TitleBooking>BOOKING</TitleBooking>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(planid, numhikers, comments);
                }}
              >
                <TextField
                  name="numhikers"
                  id="outlined-basic"
                  label="Persons"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={numhikers}
                  onChange={e => setNumhikers(e.target.value)}
                  error={numhikers === 0 && validated}
                  helperText={
                    numhikers === 0 && validated
                      ? "You must book for at least 1 person"
                      : " "
                  }
                />
                <Gap></Gap>
                <TextField
                  name="comments"
                  id="outlined-basic"
                  label="Comments"
                  variant="outlined"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                />
                <Gap></Gap>
                <BookButton>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ width: 150 }}
                    type="submit"
                  >
                    BOOK
                  </Button>
                </BookButton>
              </form>
            </Paper>
            <IconsCont>
              <FavoriteBorderOutlinedIcon
                color="primary"
                style={{ fontSize: "35px" }}
              ></FavoriteBorderOutlinedIcon>
              <ShareIcon
                color="primary"
                style={{ fontSize: "35px", marginLeft: 20, marginRight: 20 }}
              ></ShareIcon>
            </IconsCont>
          </Grid>
        </Grid>
        <TitleRest>THE RESTAURANT</TitleRest>
        {allComments && (
          <RestaurantCard
            img1={info.restaurant && info.restaurant.image1}
            img2={info.restaurant && info.restaurant.image2}
            img3={info.restaurant && info.restaurant.image3}
            kind={info.restaurant && info.restaurant.kind}
            name={info.restaurant && info.restaurant.name}
            descr={info.restaurant && info.restaurant.descr}
            address={info.restaurant && info.restaurant.address}
            city={info.restaurant && info.restaurant.city}
            region={info.restaurant && info.restaurant.region}
            phone={info.restaurant && info.restaurant.phone}
            website={info.restaurant && info.restaurant.website}
            email={info.restaurant && info.restaurant.email}
            comments={allComments}
          ></RestaurantCard>
        )}
      </ContBody>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {newbooking ? (
            <>
              <DialogTitle id="alert-dialog-title" style={{ color: s.dark }}>
                {"Booking done!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  You have a date in {info.restaurant.name} on {info.date} at{" "}
                  {info.startTime}!
                </DialogContentText>
              </DialogContent>
            </>
          ) : (
            <>
              <DialogTitle
                id="alert-dialog-title"
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  alignItems: "center"
                }}
              >
                <ErrorOutlineOutlinedIcon
                  style={{ color: "red" }}
                ></ErrorOutlineOutlinedIcon>
                {"Error"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please, modify your booking in Admin.
                </DialogContentText>
              </DialogContent>
            </>
          )}

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={() => history.push("/admin")}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Admin
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer></Footer>
    </>
  );
};
