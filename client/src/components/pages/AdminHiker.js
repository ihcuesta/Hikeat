import React, { useState, useEffect } from "react";
import { useUser } from "../../service/authService";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Avatar
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
  BgAdmin
} from "../styled/Admin";
import { ContBody } from "../styled/globalStyles";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import ExploreIcon from "@material-ui/icons/Explore";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import { Footer } from "../UI/Footer";
import { whoami } from "../../service/authService";
import { CardBookings } from "../UI/Cards";
import { getAllBookings } from "../../service/bookingService";

export const AdminHiker = ({ history }) => {
  const session = useUser();
  const [allBookings, setAllBookings] = useState();
  useEffect(() => {
    getAllBookings().then(bookings => {
      setAllBookings(bookings.getBooking);
    });
  }, []);

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
                          <TextAlign>
                            <p style={{ color: "#FFF" }}>LEVEL 1</p>
                          </TextAlign>
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
                allBookings.map(booking => {
                  return (
                    <CardBookings
                      id={booking._id}
                      image={booking.planid.image1}
                      city={booking.restid.city}
                      region={booking.restid.region}
                      name={booking.planid.name}
                      restaurant={booking.restid.name}
                      date={booking.planid.date}
                      time={booking.planid.startTime}
                      descr={booking.planid.shortDescr}
                      restid={booking.restid._id}
                      role={session.user.role}
                      //  actionOne={}
                      //  actionTwo
                    ></CardBookings>
                  );
                })
              )}
            </Grid>
          </ContBody>
        )}

        <Footer></Footer>
      </BgAdmin>
    </>
  );
};
