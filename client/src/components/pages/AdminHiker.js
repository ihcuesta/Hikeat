import React, { useState, useEffect } from "react";
import { useUser } from "../../service/authService";
import { useHistory } from "react-router";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Avatar,
  Dialog,
  Chip,
  CardActions,
  Card,
  CardMedia,
  CardContent,
  Backdrop,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import {
  HeaderAdmin,
  Pic,
  Name,
  Role,
  Fav,
  ContFav,
  ContTit,
  Level,
  WrapperResp,
  TextAlign,
  TitBookings,
  BgAdmin,
  EditBookingCont,
  EditBookingBg,
  NumHikers,
  Descr,
  RoleWrap
} from "../styled/Admin";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import { RestCont, ContChips } from "../styled/CardStyled";
import { ContBody, changeFormat } from "../styled/globalStyles";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import ExploreIcon from "@material-ui/icons/Explore";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import { Footer } from "../UI/Footer";
import { whoami } from "../../service/authService";
import { CardBookings } from "../UI/Cards";
import { getAllBookings, getEditBooking } from "../../service/bookingService";
import { TitleBooking, Booking, BookButton } from "../styled/PlanDetailStyled";
import { Gap, s } from "../styled/globalStyles";
import { editBooking, deleteBooking } from "../../service/bookingService";
import { BodyCard, LocationCont } from "../styled/CardStyled";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Link } from "react-router-dom";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import { CardFav } from "../UI/Cards";
import {
  getAllFavourites,
  deleteFavourite
} from "../../service/favouriteService";
import EuroRoundedIcon from "@material-ui/icons/EuroRounded";

export const AdminHiker = () => {
  const history = useHistory();
  const session = useUser();
  const [allBookings, setAllBookings] = useState(0);
  const [oldhikers, setOldhikers] = useState(0);
  const [numhikers, setNumhikers] = useState(0);
  const [comments, setComments] = useState();
  const [bookingID, setBookingID] = useState();
  const [planID, setPlanID] = useState();
  const [favs, setFavs] = useState(0);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCanc, setOpenCanc] = useState(false);

  useEffect(() => {
    getAllBookings().then(bookings => {
      setAllBookings(bookings.getBooking);
    });
    getAllFavourites().then(favs => {
      setFavs(favs);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCanc = () => {
    setOpenCanc(false);
  };

  const handleCancel = async bookingID => {
    const cancel = await deleteBooking(bookingID);
    console.log(deleteBooking);
    getAllBookings().then(bookings => {
      setAllBookings(bookings.getBooking);
    });
  };

  const handleSubmit = async (bookingID, oldhikers, numhikers, comments) => {
    console.log(numhikers);
    const newcounter = numhikers - oldhikers;
    const editBook = await editBooking(
      bookingID,
      newcounter,
      numhikers,
      comments
    );
    getAllBookings().then(bookings => {
      setAllBookings(bookings.getBooking);
    });
    setOpen(false);
  };

  const retrieveEdit = value => {
    setPlanID(value);
    getEditBooking(value).then(booking => {
      setOldhikers(booking.bookingToEdit.numhikers);
      setNumhikers(booking.bookingToEdit.numhikers);
      setComments(booking.bookingToEdit.comments);
      setBookingID(booking.bookingToEdit._id);
    });
    setOpen(true);
  };

  const deleteFav = async id => {
    console.log("entra");
    const deleteFav = await deleteFavourite(id);
    getAllFavourites().then(favs => {
      setFavs(favs);
    });
  };

  const getKms = allBookings => {
    if (allBookings) {
      let counter = 0;
      allBookings.forEach(booking => {
        counter += booking.planid.kms;
      });
      return counter;
    } else {
      return 0;
    }
  };

  return (
    <>
      <BgAdmin>
        {allBookings === 0 || favs === 0 ? (
          <Backdrop style={{ zIndex: 1000 }} open={true}>
            <CircularProgress color="primary" />
          </Backdrop>
        ) : (
          !session && history.push("/login")
        )}
        {session && (
          <>
            <ContBody>
              <HeaderAdmin data-aos="fade-right">
                <Grid container>
                  <Grid item xs={12} sm={12} md={4} style={{ minHeight: 300 }}>
                    <Pic>
                      <Avatar
                        style={{
                          width: 250,
                          height: 250
                        }}
                        src={session.user.image}
                      ></Avatar>
                    </Pic>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <WrapperResp>
                      <ContTit>
                        <Name>
                          {session.user.username}
                          <span>
                            {" "}
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => history.push("/profile/edit")}
                              style={{
                                color: s.primary,
                                backgroundColor: "#FFF"
                              }}
                            >
                              Edit Profile
                            </Button>
                          </span>
                          {/* <span>
                          {" "}
                          <Button
                            variant="outlined"
                            size="small"
                            style={{ color: "#FFF" }}
                          >
                            Delete
                          </Button>
                        </span> */}
                        </Name>

                        <Role>
                          <RoleWrap>
                            <FilterHdrIcon
                              style={{ color: "#FFF" }}
                            ></FilterHdrIcon>
                            <h3>Hiker</h3>
                          </RoleWrap>
                        </Role>
                      </ContTit>
                      <Grid container>
                        <Grid item xs={12} sm={6} md={6} spacing={10}>
                          <Descr>{session.user.description}</Descr>

                          <>
                            <TextAlign>
                              <p style={{ color: "#FFF" }}>Favourite hike:</p>
                              <p style={{ marginTop: -15, color: "#FFF" }}>
                                <i>{session.user.fav}</i>
                              </p>
                            </TextAlign>
                          </>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} spacing={10}>
                          <ContFav>
                            <>
                              <Fav>
                                <ExploreIcon></ExploreIcon>
                                <p>{getKms(allBookings)} kms</p>
                              </Fav>
                              <Fav>
                                <RestaurantIcon></RestaurantIcon>
                                <p>{allBookings.length} plans</p>
                              </Fav>
                            </>

                            {/* <TextAlign>
                            <p style={{ color: "#FFF" }}>LEVEL 1</p>
                          </TextAlign> */}
                            <Level>Newie</Level>
                          </ContFav>
                        </Grid>
                      </Grid>
                    </WrapperResp>
                  </Grid>
                </Grid>
              </HeaderAdmin>

              <TitBookings>NEXT BOOKINGS</TitBookings>
              <Grid container spacing={2}>
                {allBookings && allBookings.length === 0 ? (
                  <p
                    style={{
                      textAlign: "center",
                      marginRight: "auto",
                      marginLeft: "auto",
                      display: "block"
                    }}
                  >
                    Still thinking in the next hike? ⛰
                  </p>
                ) : (
                  allBookings &&
                  allBookings.map((booking, i) => {
                    return (
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <Card data-aos="fade-up" elevation={3}>
                            <Link to={`/plan/${booking.planid._id}`}>
                              <CardMedia
                                style={{ height: 200 }}
                                image={booking.planid.image1}
                              />
                            </Link>
                            <CardContent>
                              <LocationCont>
                                <LocationOnOutlinedIcon
                                  style={{ width: 20, height: 20 }}
                                ></LocationOnOutlinedIcon>
                                <p>
                                  {booking.restid.city}, {booking.restid.region}
                                </p>
                              </LocationCont>

                              <Typography
                                gutterBottom
                                variant="h3"
                                component="h3"
                              >
                                {booking.planid.name}
                              </Typography>
                              <RestCont
                                to={`/restaurant/${booking.restid._id}`}
                              >
                                <RestaurantMenuOutlinedIcon
                                  style={{
                                    width: 20,
                                    height: 20,
                                    color: s.primary
                                  }}
                                ></RestaurantMenuOutlinedIcon>
                                <p>{booking.restid.name}</p>
                              </RestCont>
                              <ContChips>
                                <Chip
                                  style={{
                                    padding: "20px 5px",
                                    color: s.dark,
                                    backgroundColor: s.light,
                                    marginRight: 5
                                  }}
                                  size="medium"
                                  icon={
                                    <CalendarTodayIcon
                                      style={{ color: s.primary }}
                                    />
                                  }
                                  label={booking.planid.date}
                                />

                                <Chip
                                  style={{
                                    padding: "20px 5px",
                                    color: s.dark,
                                    backgroundColor: s.light,
                                    marginRight: 5
                                  }}
                                  size="medium"
                                  icon={
                                    <WatchLaterOutlinedIcon
                                      style={{ color: s.primary }}
                                    />
                                  }
                                  label={booking.planid.startTime}
                                />

                                <Chip
                                  style={{
                                    padding: "20px 5px",
                                    color: s.dark,
                                    backgroundColor: s.light
                                  }}
                                  size="medium"
                                  icon={
                                    <EuroRoundedIcon
                                      style={{ color: s.primary }}
                                    />
                                  }
                                  label={changeFormat(booking.planid.price)}
                                />
                              </ContChips>

                              <BodyCard>{booking.planid.shortDescr}</BodyCard>
                            </CardContent>
                            <NumHikers>
                              <PeopleAltRoundedIcon></PeopleAltRoundedIcon>
                              <p>{booking.numhikers} persons</p>
                            </NumHikers>
                            <CardActions
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                paddingBottom: 10,
                                backgroundColor: "#EEE"
                              }}
                            >
                              <Grid container style={{ width: "100%" }}>
                                <Grid
                                  item
                                  xs={6}
                                  style={{
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    boxSizing: "border-box"
                                  }}
                                >
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    value={booking.planid._id}
                                    onClick={e =>
                                      retrieveEdit(e.currentTarget.value)
                                    }
                                  >
                                    EDIT BOOKING
                                  </Button>
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  style={{
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    boxSizing: "border-box"
                                  }}
                                >
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    // value={booking._id}
                                    onClick={() => setOpenCanc(true)}
                                  >
                                    CANCEL BOOKING
                                  </Button>
                                </Grid>
                              </Grid>
                            </CardActions>
                          </Card>
                        </Grid>

                        <Dialog open={open} onClose={handleClose}>
                          <EditBookingCont>
                            <Typography
                              gutterBottom
                              variant="h3"
                              component="h3"
                            >
                              {booking.planid.name}
                            </Typography>
                            <RestCont to="#">
                              <RestaurantMenuOutlinedIcon
                                style={{
                                  width: 20,
                                  height: 20,
                                  color: s.primary
                                }}
                              ></RestaurantMenuOutlinedIcon>
                              <p>{booking.restid.name}</p>
                            </RestCont>
                            <ContChips>
                              <Chip
                                style={{
                                  padding: "20px 5px",
                                  color: s.dark,
                                  backgroundColor: s.light,
                                  marginRight: 5
                                }}
                                size="medium"
                                icon={
                                  <CalendarTodayIcon
                                    style={{ color: s.primary }}
                                  />
                                }
                                label={booking.planid.date}
                              />

                              <Chip
                                style={{
                                  padding: "20px 5px",
                                  color: s.dark,
                                  backgroundColor: s.light,
                                  marginRight: 5
                                }}
                                size="medium"
                                icon={
                                  <WatchLaterOutlinedIcon
                                    style={{ color: s.primary }}
                                  />
                                }
                                label={booking.planid.startTime}
                              />

                              <Chip
                                style={{
                                  padding: "20px 5px",
                                  color: s.dark,
                                  backgroundColor: s.light
                                }}
                                size="medium"
                                icon={
                                  <EuroRoundedIcon
                                    style={{ color: s.primary }}
                                  />
                                }
                                label={changeFormat(booking.planid.price)}
                              />
                            </ContChips>
                            <Gap></Gap>
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                handleSubmit(
                                  bookingID,
                                  oldhikers,
                                  numhikers,
                                  comments
                                );
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

                              <TextField
                                name="comments"
                                id="outlined-basic"
                                label=""
                                placeholder="Comments"
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
                                  UPDATE
                                </Button>
                              </BookButton>
                            </form>
                          </EditBookingCont>
                        </Dialog>

                        <Dialog
                          open={openCanc}
                          onClose={handleCloseCanc}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <>
                            <DialogTitle
                              id="alert-dialog-title"
                              style={{ color: s.dark }}
                            >
                              {"Confirm cancel booking"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you sure that you want to cancel the booking
                                for {booking.planid.name} on{" "}
                                {booking.planid.date} for {booking.numhikers}{" "}
                                persons?
                              </DialogContentText>
                            </DialogContent>
                          </>

                          <DialogActions>
                            <Button onClick={handleCloseCanc} color="primary">
                              Back
                            </Button>
                            <Button
                              onClick={() => handleCancel(booking._id)}
                              color="secondary"
                              variant="contained"
                              autoFocus
                            >
                              Cancel booking
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    );
                  })
                )}
              </Grid>

              <TitBookings>FAVOURITES</TitBookings>
              <Grid container spacing={2}>
                {favs.length === 0 && (
                  <p
                    style={{
                      textAlign: "center",
                      marginRight: "auto",
                      marginLeft: "auto",
                      display: "block"
                    }}
                  >
                    You don't have favourites yet. Take a look of our plans! 😉
                  </p>
                )}
                {favs.length > 0 &&
                  favs.map(fav => {
                    return (
                      <CardFav
                        id={fav && fav.planid._id}
                        image={fav && fav.planid.image1}
                        region={fav && fav.restid.region}
                        city={fav && fav.restid.city}
                        name={fav && fav.planid.name}
                        restaurant={fav && fav.restid.name}
                        date={fav && fav.planid.date}
                        time={fav && fav.planid.startTime}
                        descr={fav && fav.planid.shortDescr}
                        restid={fav && fav.restid._id}
                        funcDelete={() => deleteFav(fav.planid._id)}
                      ></CardFav>
                    );
                  })}
              </Grid>
            </ContBody>

            <Footer></Footer>
          </>
        )}
        )}
      </BgAdmin>
    </>
  );
};
