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
  CardContent
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
  NumHikers
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
import { editBooking } from "../../service/bookingService";
import { BodyCard, LocationCont } from "../styled/CardStyled";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Link } from "react-router-dom";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";

export const AdminHiker = ({ history }) => {
  const session = useUser();
  const [allBookings, setAllBookings] = useState();
  const [numhikers, setNumhikers] = useState(0);
  const [comments, setComments] = useState();
  const [planID, setPlanID] = useState();
  const [restid, setRestid] = useState();
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllBookings().then(bookings => {
      setAllBookings(bookings.getBooking);
    });
  }, []);

  const openEdit = async bookingId => {
    console.log("entra");
    getEditBooking(bookingId).then(booking => {
      console.log(booking);
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (planid, numhikers, comments) => {
    const editBook = await editBooking(planid, { numhikers, comments });
    setOpen(false);
  };

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

                      {session.user.role === "Hiker" ? (
                        <Role>
                          <FilterHdrIcon
                            style={{ color: "#FFF" }}
                          ></FilterHdrIcon>
                          <h3>Hiker</h3>
                        </Role>
                      ) : (
                        <Role>
                          <RestaurantMenuOutlinedIcon
                            style={{ color: "#FFF" }}
                          ></RestaurantMenuOutlinedIcon>
                          <h3>Restaurant owner</h3>
                        </Role>
                      )}
                    </ContTit>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={6} spacing={10}>
                        <p style={{ color: "#FFF" }}>
                          {session.user.description}
                        </p>
                        {session.user.role === "Hiker" ? (
                          <>
                            <TextAlign>
                              <p style={{ color: "#FFF" }}>Favourite hike:</p>
                              <p style={{ marginTop: -15, color: "#FFF" }}>
                                <i>{session.user.fav}</i>
                              </p>
                            </TextAlign>
                          </>
                        ) : (
                          <>
                            <TextAlign>
                              <p style={{ color: "#FFF" }}>Favourite course:</p>
                              <p style={{ marginTop: -15, color: "#FFF" }}>
                                <i>{session.user.fav}</i>
                              </p>
                            </TextAlign>
                          </>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} spacing={10}>
                        <ContFav>
                          {session.user.role === "Hiker" ? (
                            <>
                              <Fav>
                                <ExploreIcon></ExploreIcon>
                                <p>45 kms</p>
                              </Fav>
                              <Fav>
                                <RestaurantIcon></RestaurantIcon>
                                <p>10 plans</p>
                              </Fav>
                            </>
                          ) : (
                            <>
                              <Fav>
                                <DirectionsWalkIcon></DirectionsWalkIcon>
                                <p>70 hikers</p>
                              </Fav>
                              <Fav>
                                <RestaurantIcon></RestaurantIcon>
                                <p>25 plans</p>
                              </Fav>
                            </>
                          )}
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
            <Grid container>
              {allBookings && allBookings.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                  You don't have bookings. Take a look for a new plan!
                </p>
              ) : (
                allBookings &&
                allBookings.map((booking, i) => {
                  return (
                    <>
                      <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Card data-aos="fade-up" elevation={3}>
                          <Link to={`plan/${booking.planid._id}`}>
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
                            <RestCont to={`/restaurant/${booking.restid._id}`}>
                              <RestaurantMenuOutlinedIcon
                                style={{
                                  width: 20,
                                  height: 20,
                                  color: s.primary
                                }}
                              ></RestaurantMenuOutlinedIcon>
                              <p>{booking.restid.name}</p>
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
                                  label={booking.planid.date}
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
                                  label={booking.planid.startTime}
                                />
                              </Grid>
                            </Grid>
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
                                  onClick={() => {
                                    setPlanID(booking.planid._id);
                                    openEdit(planID);
                                  }}
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
                                  // onClick={actionTwo}
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
                          <Typography gutterBottom variant="h3" component="h3">
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
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
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
                                label={booking.planid.date}
                              />
                            </Grid>
                            <Grid item xs={6}>
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
                                label={booking.planid.startTime}
                              />
                            </Grid>
                          </Grid>
                          <Gap></Gap>
                          <form
                            onSubmit={e => {
                              e.preventDefault();
                              handleSubmit(planID, numhikers, comments);
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
                                UPDATE
                              </Button>
                            </BookButton>
                          </form>
                        </EditBookingCont>
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
