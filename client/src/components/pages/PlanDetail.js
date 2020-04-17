import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Head,
  ImgCont,
  Contact,
  Owner,
  OwnerTexts
} from "../styled/RestDetailStyled";
import { Grid, Button, Box, TextField, Paper, Chip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { ContBody, BodyText, BodyLight } from "../styled/globalStyles";
import rest1 from "../../images/rest/rest1.jpg";
import rest2 from "../../images/rest/rest2.jpg";
import rest3 from "../../images/rest/rest3.jpg";
import rest4 from "../../images/rest/rest4.jpg";
import rest5 from "../../images/rest/rest5.jpeg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FilterHdrRoundedIcon from "@material-ui/icons/FilterHdrRounded";
import { CardRestaurant } from "../UI/Cards";
import { fetchSinglePlan } from "../../service/planService";
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
  Legend
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

export const PlanDetail = props => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    fetchSinglePlan(id).then(plan => {
      console.log(plan);
      setInfo(plan.planId);
    });
  }, []);
  console.log(info.firstCourse);
  return info === 0 ? (
    <p>Loading...</p>
  ) : (
    <>
      <ContBody>
        <Head>
          <p>
            <i>{info.city}</i>
          </p>
          <h1>{info.name}</h1>
          <NameRest>{info.restaurant}</NameRest>
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
            <Contact>
              <Owner>
                <img src="#" />
                <OwnerTexts>
                  <p>
                    <i>Organizer</i>
                  </p>
                  <Organizer>{info.owner}</Organizer>
                  <RestContact>{info.restaurant}</RestContact>
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
                    <p>{info.restaurant}</p>
                    <p>
                      {info.restid && info.restid.address}. {info.city},{" "}
                      {info.region}.
                    </p>
                  </DateText>
                </Location>
              </DetailsContact>
            </Contact>

            <Paper elevation={5} style={{ padding: "5%" }}>
              <TitleBooking>BOOKING</TitleBooking>
              <form>
                <TextField
                  id="outlined-basic"
                  label="Persons"
                  variant="outlined"
                  type="number"
                  fullWidth
                />
                <Gap></Gap>
                <TextField
                  id="outlined-basic"
                  label="Comments"
                  variant="outlined"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                />
                <Gap></Gap>
                <BookButton>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ width: 150 }}
                  >
                    BOOK
                  </Button>
                </BookButton>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <TitleRest>THE RESTAURANT</TitleRest>
        <RestaurantCard
          kind={info.restid && info.restid.kind}
          name={info.restid && info.restid.name}
          descr={info.restid && info.restid.descr}
          address={info.restid && info.restid.address}
          city={info.city}
          region={info.region}
          phone={info.restid && info.restid.phone}
          website={info.restid && info.restid.website}
          email={info.restid && info.restid.email}
        ></RestaurantCard>
      </ContBody>
      <Footer></Footer>
    </>
  );
};
