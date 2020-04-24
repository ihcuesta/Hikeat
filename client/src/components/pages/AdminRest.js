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
  Tooltip,
  IconButton,
  Backdrop,
  CircularProgress
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
  ContClose,
  Descr,
  RoleWrap
} from "../styled/Admin";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import { RestCont, ContChips } from "../styled/CardStyled";
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
import { Gap, s, changeFormat } from "../styled/globalStyles";
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
import { fetchRestCardAdmin } from "../../service/restaurantService";
import { RestaurantCard } from "../UI/RestaurantCard";
import EuroRoundedIcon from "@material-ui/icons/EuroRounded";

export const AdminRest = props => {
  const session = useUser();
  const history = useHistory();
  const [allPlans, setAllPlans] = useState(0);
  const [totalPlans, setTotalPlans] = useState();
  const [totalHikers, setTotalHikers] = useState();
  const [bookingDetail, setBookingDetail] = useState();
  const [infoRest, setInfoRest] = useState(0);
  const [allComments, setAllComments] = useState(0);
  const [numhikers, setNumhikers] = useState(0);
  const [comments, setComments] = useState();
  const [planID, setPlanID] = useState();
  const [favs, setFavs] = useState();
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllPlans().then(plans => {
      setAllPlans(plans);
      setTotalPlans(plans.length);
      setTotalHikers(getTotalHikers(plans));
    });
    fetchRestCardAdmin().then(restaurant => {
      console.log(restaurant);
      if (restaurant.rest.length > 0) {
        setInfoRest(restaurant.rest[0]);
      } else {
        setInfoRest([]);
      }

      setAllComments(restaurant.commentsRes);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const retrieveBookingsDetail = planid => {
    getBookingsOfPlan(planid).then(booking => {
      setBookingDetail(booking.getBooking);
    });
    setOpen(true);
  };

  const getTotalHikers = plans => {
    let counter = 0;
    plans.forEach(plan => {
      counter += plan.counterBookings;
    });
    return counter;
  };

  return (
    <>
      <BgAdmin>
        {infoRest === 0 || allPlans === 0 || allComments === 0 ? (
          <Backdrop style={{ zIndex: 1000 }} open={true}>
            <CircularProgress color="primary" />
          </Backdrop>
        ) : (
          !session && history.push("/login")
        )}
        {session && (
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
                        {session.user.username}{" "}
                        <span>
                          {" "}
                          <Button
                            variant="contained"
                            size="small"
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
                          <RestaurantRoundedIcon
                            style={{ color: "#FFF" }}
                          ></RestaurantRoundedIcon>
                          <h3>Restaurant owner</h3>
                        </RoleWrap>
                      </Role>
                    </ContTit>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={6} spacing={10}>
                        <Descr>{session.user.description}</Descr>

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
                              <p>{totalPlans} plans</p>
                            </Fav>
                            <Fav>
                              <PeopleAltRoundedIcon></PeopleAltRoundedIcon>
                              <p>{totalHikers} hikers</p>
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
                <Grid xs={12}>
                  <p
                    style={{
                      textAlign: "center",
                      marginRight: "auto",
                      marginLeft: "auto",
                      display: "block"
                    }}
                  >
                    You don't have plans. It's the moment to create the first
                    one!
                  </p>
                  <Button
                    style={{
                      marginRight: "auto",
                      marginLeft: "auto",
                      display: "block"
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={
                      infoRest && infoRest.length === 0
                        ? () => history.push(`/restaurant/new`)
                        : () => history.push(`/plan/new`)
                    }
                  >
                    Create plan
                  </Button>
                </Grid>
              ) : (
                allPlans &&
                allPlans.map((plan, i) => {
                  return (
                    <>
                      <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Card data-aos="fade-up" elevation={3}>
                          <Link to={`/plan/${plan._id}`}>
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
                                label={plan.date}
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
                                label={plan.startTime}
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
                                label={changeFormat(plan.price)}
                              />
                            </ContChips>

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
                                  onClick={() =>
                                    history.push(`/plan/${plan._id}/edit`)
                                  }
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

            <TitBookings>RESTAURANT</TitBookings>
            {infoRest && infoRest.length === 0 ? (
              <>
                <p
                  style={{
                    textAlign: "center"
                  }}
                >
                  You haven't include your restaurant yet.
                </p>
                <Button
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    display: "block"
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push("/restaurant/new")}
                >
                  Create restaurant
                </Button>
              </>
            ) : (
              <>
                <RestaurantCard
                  id={infoRest && infoRest._id}
                  img1={infoRest && infoRest.image1}
                  img2={infoRest && infoRest.image2}
                  img3={infoRest && infoRest.image3}
                  kind={infoRest && infoRest.kind}
                  name={infoRest && infoRest.name}
                  address={infoRest && infoRest.address}
                  city={infoRest && infoRest.city}
                  region={infoRest && infoRest.region}
                  descr={infoRest && infoRest.descr}
                  phone={infoRest && infoRest.phone}
                  website={infoRest && infoRest.website}
                  email={infoRest && infoRest.email}
                  comments={allComments && allComments}
                ></RestaurantCard>
                <Button
                  style={{
                    marginTop: -20,
                    marginRight: "auto",
                    marginLeft: "auto",
                    display: "block"
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    history.push(`/restaurant/${infoRest._id}/edit`)
                  }
                >
                  Edit restaurant
                </Button>
              </>
            )}
          </ContBody>
        )}
        <Footer></Footer>
      </BgAdmin>
    </>
  );
};
