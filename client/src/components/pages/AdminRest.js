import React, { useState, useEffect } from "react";
import { useUser } from "../../service/authService";
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
  Tooltip,
  IconButton
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
  GrayCont,
  DialogCont,
  ContClose
} from "../styled/Admin";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import { RestCont } from "../styled/CardStyled";
import { ContBody } from "../styled/globalStyles";
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
import { editBooking, getBookingsOfPlan } from "../../service/bookingService";
import { BodyCard, LocationCont } from "../styled/CardStyled";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Link } from "react-router-dom";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { CardFav } from "../UI/Cards";
import {
  getAllFavourites,
  deleteFavourite
} from "../../service/favouriteService";
import RestaurantRoundedIcon from "@material-ui/icons/RestaurantRounded";
import { getAllPlans } from "../../service/planService";

export const AdminRest = ({ history }) => {
  const session = useUser();
  const [allPlans, setAllPlans] = useState();
  const [bookingDetail, setBookingDetail] = useState();
  const [numhikers, setNumhikers] = useState(0);
  const [comments, setComments] = useState();
  const [planID, setPlanID] = useState();
  const [favs, setFavs] = useState();
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllPlans().then(plans => {
      setAllPlans(plans);
    });
  }, []);

  //   const openEdit = async bookingId => {
  //     getBookings(bookingId).then(booking => {
  //       console.log(booking);
  //     });
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
  };

  const retrieveBookingsDetail = planid => {
    getBookingsOfPlan(planid).then(booking => {
      setBookingDetail(booking.getBooking);
    });
    setOpen(true);
  };

  console.log(bookingDetail);

  return (
    <>
      <BgAdmin>
        {session && (
          <ContBody>
            <HeaderAdmin>
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
                      <Name>{session.user.username}</Name>

                      <Role>
                        <RestaurantRoundedIcon
                          style={{ color: "#FFF" }}
                        ></RestaurantRoundedIcon>
                        <h3>Restaurant owner</h3>
                      </Role>
                    </ContTit>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={6} spacing={10}>
                        <p style={{ color: "#FFF" }}>
                          {session.user.description}
                        </p>

                        <>
                          <TextAlign>
                            <p style={{ color: "#FFF" }}>Favourite course:</p>
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
                              <RestaurantIcon></RestaurantIcon>
                              <p>10 plans</p>
                            </Fav>
                            <Fav>
                              <PeopleAltRoundedIcon></PeopleAltRoundedIcon>
                              <p>45 hikers</p>
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

            <TitBookings>NEXT PLANS</TitBookings>
            <Grid container spacing={2}>
              {allPlans && allPlans.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                  You don't have plans. It's the moment to create the first one!
                </p>
              ) : (
                allPlans &&
                allPlans.map((plan, i) => {
                  return (
                    <>
                      <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Card data-aos="fade-up" elevation={3}>
                          <Link to={`plan/${plan._id}`}>
                            <CardMedia
                              style={{ height: 200 }}
                              image={plan.image1}
                            />
                          </Link>
                          <CardContent>
                            <LocationCont>
                              <LocationOnOutlinedIcon
                                style={{ width: 20, height: 20 }}
                              ></LocationOnOutlinedIcon>
                              <p>
                                {plan.restaurant.city}, {plan.restaurant.region}
                              </p>
                            </LocationCont>

                            <Typography
                              gutterBottom
                              variant="h3"
                              component="h3"
                            >
                              {plan.name}
                            </Typography>
                            <RestCont to={`/restaurant/${plan.restaurant._id}`}>
                              <RestaurantMenuOutlinedIcon
                                style={{
                                  width: 20,
                                  height: 20,
                                  color: s.primary
                                }}
                              ></RestaurantMenuOutlinedIcon>
                              <p>{plan.restaurant.name}</p>
                            </RestCont>
                            <Grid container spacing={1}>
                              <Grid item xs={5}>
                                <Chip
                                  style={{
                                    padding: "20px 5px",
                                    color: s.dark,
                                    backgroundColor: s.light
                                  }}
                                  size="medium"
                                  icon={
                                    <CalendarTodayIcon
                                      style={{ color: s.primary }}
                                    />
                                  }
                                  label={plan.date}
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <Chip
                                  style={{
                                    padding: "20px 5px",
                                    color: s.dark,
                                    backgroundColor: s.light
                                  }}
                                  size="medium"
                                  icon={
                                    <WatchLaterOutlinedIcon
                                      style={{ color: s.primary }}
                                    />
                                  }
                                  label={plan.startTime}
                                />
                              </Grid>
                            </Grid>
                            <BodyCard>{plan.shortDescr}</BodyCard>
                          </CardContent>
                          <NumHikers>
                            <PeopleAltRoundedIcon></PeopleAltRoundedIcon>
                            <p>{plan.counterBookings} persons</p>
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
                                  value={plan._id}
                                  onClick={e =>
                                    retrieveBookingsDetail(
                                      e.currentTarget.value
                                    )
                                  }
                                >
                                  SEE BOOKINGS
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
                                  // onClick={actionTwo}
                                >
                                  EDIT PLAN
                                </Button>
                              </Grid>
                            </Grid>
                          </CardActions>
                        </Card>
                      </Grid>

                      <Dialog open={open} onClose={handleClose}>
                        <DialogCont>
                          <ContClose>
                            <Tooltip title="Close" onClick={handleClose}>
                              <IconButton aria-label="close">
                                <CloseRoundedIcon style={{ color: "#FFF" }} />
                              </IconButton>
                            </Tooltip>
                          </ContClose>
                          {bookingDetail &&
                            bookingDetail.map(book => {
                              return (
                                <GrayCont>
                                  <Grid container>
                                    <Grid
                                      xs={12}
                                      sm={4}
                                      md={4}
                                      lg={4}
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                      }}
                                    >
                                      <Avatar
                                        src={book.user.image}
                                        style={{ marginRight: 10 }}
                                      />
                                      <p>{book.user.username}</p>
                                    </Grid>

                                    <Grid
                                      xs={12}
                                      sm={3}
                                      md={3}
                                      lg={3}
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                      }}
                                    >
                                      <PeopleAltRoundedIcon sixe="small"></PeopleAltRoundedIcon>
                                      <p style={{ marginLeft: 10 }}>
                                        {book.numhikers}
                                      </p>
                                    </Grid>
                                    <Grid xs={12} sm={5} md={5} lg={5}>
                                      {book.comments === "" ? (
                                        <p
                                          style={{
                                            color: "#999",
                                            fontWeight: 100
                                          }}
                                        >
                                          <i>No comments</i>
                                        </p>
                                      ) : (
                                        <p>{book.comments}</p>
                                      )}
                                    </Grid>
                                  </Grid>
                                </GrayCont>
                              );
                            })}
                        </DialogCont>
                      </Dialog>
                    </>
                  );
                })
              )}
            </Grid>
          </ContBody>
        )}
        <Footer></Footer>
      </BgAdmin>
      )}
    </>
  );
};
