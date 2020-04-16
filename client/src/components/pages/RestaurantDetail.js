import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Head,
  Rates,
  ImgCont,
  Contact,
  Owner,
  OwnerTexts,
  InfoBullets,
  Opinion,
  RateOp,
  RatesOp,
  OpText,
  InfoIcon,
  IconsCont
} from "../styled/RestDetailStyled";
import { Grid, Button, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { ContBody, BodyText, BodyLight } from "../styled/globalStyles";
import rest1 from "../../images/rest/rest1.jpg";
import rest2 from "../../images/rest/rest2.jpg";
import rest3 from "../../images/rest/rest3.jpg";
import rest4 from "../../images/rest/rest4.jpg";
import rest5 from "../../images/rest/rest5.jpeg";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PetsIcon from "@material-ui/icons/Pets";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Divider, BgHome } from "../styled/HomeStyles";
import { CardRestaurant } from "../UI/Cards";
import { getLastPlansRest } from "../../service/planService";

export const RestaurantDetail = () => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getLastPlansRest().then(plans => setPlans(plans));
  }, []);
  return (
    <>
      <ContBody>
        <Head>
          <p>
            <i>Italian</i>
          </p>
          <h1>Ristorante Pepino</h1>
        </Head>
        <Rates>
          <Box mt={0.3} component="fieldset" borderColor="transparent">
            <Rating name="read-only" value="5" readOnly />
          </Box>
          <p>23 opinions</p>
        </Rates>
        <ImgCont>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <img src={rest1} width="100%" height="auto" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={rest2} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={rest3} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={rest4} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={rest5} width="100%" height="auto" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ImgCont>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Contact>
              <Owner>
                <img src="#" />
                <OwnerTexts>
                  <p>
                    <i>Restaurant owner</i>
                  </p>
                  <p>Don Pepino</p>
                </OwnerTexts>
              </Owner>
              <BodyLight styles={{ paddingBottom: 30 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum qui
                ratione consectetur asperiores nisi. Aliquid quod praesentium
                illum earum saepe ex facere odio architecto esse dolores!
                Consequatur provident sit doloremque laborum soluta dicta totam
                aspernatur iste illum accusantium obcaecati iusto eum commodi,
                tempora nihil quisquam assumenda dolorum. Blanditiis, modi
                ducimus.<br></br>
                <br></br>
              </BodyLight>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <PhoneIcon></PhoneIcon>
                  </Grid>
                  <Grid item xs={9}>
                    657 345 789
                  </Grid>
                </Grid>
              </InfoBullets>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <LanguageIcon></LanguageIcon>
                  </Grid>
                  <Grid item xs={9}>
                    www.ristorantepepino.com
                  </Grid>
                </Grid>
              </InfoBullets>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <MailOutlineIcon></MailOutlineIcon>
                  </Grid>
                  <Grid item xs={9}>
                    info@ristorantepepino.com
                  </Grid>
                </Grid>
              </InfoBullets>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <LocationOnIcon></LocationOnIcon>
                  </Grid>
                  <Grid item xs={9}>
                    El Escorial, Madrid
                  </Grid>
                </Grid>
              </InfoBullets>
            </Contact>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Opinion>
              <Owner>
                <img src="#"></img>
                <RateOp>
                  <p>Pedro Rodríguez</p>
                  <RatesOp>
                    <Box component="fieldset" borderColor="transparent">
                      <Rating name="read-only" value="4" readOnly />
                    </Box>
                    <p>
                      <i>05/07/2020</i>
                    </p>
                  </RatesOp>
                </RateOp>
              </Owner>
              <OpText>
                <BodyLight>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in
                  labore expedita, doloribus laboriosam ab tempore inventore
                  corrupti ut nostrum amet quidem qui dolor numquam cumque ullam
                  impedit rerum dicta ipsum! Repellat, consequuntur! Quod eius
                  nisi explicabo praesentium vero! Culpa, et laborum sit a ipsam
                  adipisci ad quasi eligendi voluptatibus.
                </BodyLight>
              </OpText>
            </Opinion>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <IconsCont>
              <InfoIcon>
                <PetsIcon color="primary"></PetsIcon>
                <p>Dogs</p>
              </InfoIcon>
              <InfoIcon>
                <ChildCareIcon color="primary"></ChildCareIcon>
                <p>Kids menu</p>
              </InfoIcon>
              <InfoIcon>
                <LocalPharmacyIcon color="primary"></LocalPharmacyIcon>
                <p>Allergens card</p>
              </InfoIcon>
              <InfoIcon>
                <BeachAccessIcon color="primary"></BeachAccessIcon>
                <p>Terrace</p>
              </InfoIcon>
            </IconsCont>
          </Grid>
        </Grid>
      </ContBody>
      <Divider></Divider>
      <BgHome>
        <ContBody>
          <Grid container spacing={2}>
            {plans.length === 0 ? (
              <p>Loading</p>
            ) : (
              plans.map(plan => {
                return (
                  <CardRestaurant
                    image={plan.image1}
                    region={plan.region}
                    city={plan.city}
                    name={plan.name}
                    restaurant={plan.restaurant}
                    date={plan.date}
                    time={plan.startTime}
                    descr={plan.shortDescr}
                  ></CardRestaurant>
                );
              })
            )}
          </Grid>
        </ContBody>
      </BgHome>
    </>
  );
};
