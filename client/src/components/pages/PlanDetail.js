import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useUser } from "../../service/authService";
import "./../../App.css";
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
  CircularProgress,
  Avatar
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
import {
  fetchSinglePlan,
  checkIfManager,
  deletePlan
} from "../../service/planService";
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
  IconsCont,
  Price
} from "../styled/PlanDetailStyled";
import infographic from "../../images/infographic.svg";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import veggies from "../../images/veggies.svg";
import gluten from "../../images/gluten.svg";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import QueryBuilderRoundedIcon from "@material-ui/icons/QueryBuilderRounded";
import { s, changeFormat } from "../styled/globalStyles";
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
import { getLatLong } from "../../service/geocodeService";
import { MapContainer } from "../styled/RestDetailStyled";
import { MapLeaflet } from "../UI/map";

export const PlanDetail = props => {
  const session = useUser();
  const history = useHistory();
  const [info, setInfo] = useState([]);
  const [numhikers, setNumhikers] = useState(1);
  const [comments, setComments] = useState();
  const [planid, setPlanid] = useState();
  const [restid, setRestid] = useState();
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [newbooking, setNewbooking] = useState();
  const [ismanager, setIsmanager] = useState();
  const [allComments, setAllComments] = useState();
  const [pos, setPos] = useState();
  const [totPrice, setTotPrice] = useState();

  useEffect(() => {
    const id = props.match.params.id;

    fetchSinglePlan(id).then(plan => {
      setPlanid(plan.planId._id);
      setInfo(plan.planId);
      setTotPrice(plan.planId.price);
      setRestid(plan.planId.restaurant._id);
      getComments(plan.planId.restaurant._id).then(comments => {
        console.log(comments);
        setAllComments(comments);
      });
      getLatLong(plan.planId.restaurant._id).then(coords => {
        console.log(coords.data);
        setPos(coords.data);
        console.log(pos);
      });
    });

    checkIfManager(id).then(restaurant => {
      setIsmanager(restaurant.isManager);
    });
  }, []);

  const id = props.match.params.id;

  console.log(
    allComments &&
      allComments.map(comment => {
        return comment.comment;
      })
  );

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleDelete = id => {
    deletePlan(id).then(del => {
      console.log(del);
    });
    history.push("/owner/admin");
  };

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

  const handleSubmit = async (planid, restid, numhikers, comments) => {
    if (numhikers > 0) {
      const response = await newBooking({
        planid,
        restid,
        numhikers,
        comments
      });
      if (response) {
        console.log(response.isNewBooking);
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
          <NameRest
            onClick={() => history.push(`/restaurant/${info.restaurant._id}`)}
          >
            {info.restaurant && info.restaurant.name}
          </NameRest>
        </Head>

        <ImgCont>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <img
                src={info.image1 ? info.image1 : "/placeholder4.jpg"}
                width="100%"
                height="auto"
                data-aos="fade-down"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-delay="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <img
                    src={info.image2 ? info.image2 : "/placeholder4.jpg"}
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="100"
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <img
                    src={info.image3 ? info.image3 : "/placeholder4.jpg"}
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="200"
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} className="imgMov">
                  <img
                    src={info.image4 ? info.image4 : "/placeholder4.jpg"}
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="300"
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} className="imgMov">
                  <img
                    src={info.image5 ? info.image5 : "/placeholder4.jpg"}
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="400"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ImgCont>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Hike
              data-aos="fade-right"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="100"
            >
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
            <Hike
              data-aos="fade-right"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="200"
            >
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
            <Hike
              data-aos="fade-right"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="300"
            >
              {info.breakfast && (
                <Chip
                  icon={<FreeBreakfastIcon />}
                  label="Breakfast"
                  color={s.dark}
                  style={{
                    padding: "20px 5px",
                    marginRight: 10,
                    marginBottom: 5
                  }}
                />
              )}

              {info.brunch && (
                <Chip
                  icon={<FastfoodIcon />}
                  label="Snacks"
                  color={s.dark}
                  style={{
                    padding: "20px 5px",
                    marginRight: 10,
                    marginBottom: 5
                  }}
                />
              )}

              <Chip
                icon={<MapIcon />}
                label="Guidance"
                color={s.dark}
                style={{
                  padding: "20px 5px",
                  marginRight: 10,
                  marginBottom: 5
                }}
              />
            </Hike>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Menu
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="400"
            >
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
                  <p>* Vegan friendly</p>
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
                  onClick={() => history.push(`/plan/${id}/edit`)}
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
                  onClick={handleClickOpenDel}
                >
                  Delete
                </Button>
              </EditCont>
            )}
            <Contact
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="500"
            >
              <Owner>
                <Avatar
                  style={{
                    width: 50,
                    height: 50
                  }}
                  src={info.owner && info.owner.image}
                ></Avatar>

                <OwnerTexts>
                  <p>
                    <i>Organizer</i>
                  </p>
                  <Organizer>{info.owner && info.owner.username}</Organizer>
                  <RestContact
                    onClick={() =>
                      history.push(`/restaurant/${info.restaurant._id}`)
                    }
                  >
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
                      <b>Starting Point</b>
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
              <MapContainer>
                {pos && (
                  <MapLeaflet
                    lat={pos.Latitude}
                    long={pos.Longitude}
                  ></MapLeaflet>
                )}
              </MapContainer>
            </Contact>

            <Paper
              elevation={5}
              style={{ padding: "5%" }}
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="500"
            >
              <TitleBooking>BOOKING</TitleBooking>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (session) {
                    handleSubmit(planid, restid, numhikers, comments);
                  } else {
                    history.push("/login");
                  }
                }}
              >
                <TextField
                  name="numhikers"
                  id="outlined-basic"
                  label="Guests"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={numhikers}
                  onChange={e => {
                    setNumhikers(e.target.value);
                    setTotPrice(e.target.value * info.price);
                  }}
                  error={numhikers === 0 && validated}
                  helperText={
                    numhikers === 0 && validated
                      ? "You must book for at least 1 person"
                      : " "
                  }
                />

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
                  <Price>{changeFormat(totPrice)} € </Price>
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
            {/* <IconsCont>
              <FavoriteBorderOutlinedIcon
                color="primary"
                style={{ fontSize: "35px" }}
              ></FavoriteBorderOutlinedIcon>
              <ShareIcon
                color="primary"
                style={{ fontSize: "35px", marginLeft: 20, marginRight: 20 }}
              ></ShareIcon>
            </IconsCont> */}
          </Grid>
        </Grid>
        <TitleRest>THE RESTAURANT</TitleRest>
        {allComments && (
          <RestaurantCard
            id={info.restaurant && info.restaurant._id}
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
            rate={info.restaurant && info.restaurant.rateAv}
            totalComments={info.restaurant && info.restaurant.totalComments}
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
                  You have a date in {info && info.restaurant.name} on{" "}
                  {info && info.date} at {info && info.startTime}!
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
              onClick={() => history.push("/hiker/admin")}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Admin
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openDel}
          onClose={handleCloseDel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <>
            <DialogTitle id="alert-dialog-title" style={{ color: s.dark }}>
              {"Confirm delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure that you want to delete this plan?<br></br>
                This action is irreversible.
              </DialogContentText>
            </DialogContent>
          </>

          <DialogActions>
            <Button onClick={handleCloseDel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(id)}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer></Footer>
    </>
  );
};
