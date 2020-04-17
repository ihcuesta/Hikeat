import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box } from "@material-ui/core";
import { s, BodyLight } from "../styled/globalStyles";
import rest1 from "../../images/rest/rest1.jpg";
import rest2 from "../../images/rest/rest2.jpg";
import rest3 from "../../images/rest/rest3.jpg";
import {
  Rates,
  Owner,
  InfoBullets,
  Opinion,
  RateOp,
  RatesOp,
  OpText
} from "../styled/RestDetailStyled";

import { Rating } from "@material-ui/lab";

import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

import { BgRestCard, OpinionsBox } from "../styled/RestCardStyled";

export const RestaurantCard = ({
  kind,
  name,
  address,
  city,
  region,
  descr,
  phone,
  website,
  email
}) => {
  return (
    <>
      <Paper elevation={1}>
        <BgRestCard>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <img src={rest1} width="100%" height="auto" />
              <Grid container>
                <Grid item xs={6}>
                  <img src={rest2} width="100%" height="auto" />
                </Grid>
                <Grid item xs={6}>
                  <img src={rest3} width="100%" height="auto" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4}>
              <div style={{ color: s.dark }}>
                <p style={{ marginBottom: 5, fontSize: 14 }}>
                  <i>{kind}</i>
                </p>
                <Link
                  to="#"
                  style={{
                    fontSize: 18,

                    color: s.primary,
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                >
                  {name}
                </Link>
                <p
                  style={{
                    marginTop: 5,
                    marginBottom: 0
                  }}
                >
                  <i>
                    {address}. {city}, {region}.
                  </i>
                </p>
                <Rates
                  style={{
                    marginLeft: 0,
                    width: 245,
                    marginTop: -5,
                    marginBottom: -10
                  }}
                >
                  <Box
                    style={{ marginLeft: -15 }}
                    mt={0.3}
                    component="fieldset"
                    borderColor="transparent"
                  >
                    <Rating name="read-only" value="5" readOnly />
                  </Box>
                  <p>23 opinions</p>
                </Rates>
                <BodyLight style={{ marginBottom: 30 }}>{descr}</BodyLight>
                <InfoBullets>
                  <Grid container>
                    <Grid item xs={3} align="center">
                      <PhoneIcon></PhoneIcon>
                    </Grid>
                    <Grid item xs={9}>
                      {phone}
                    </Grid>
                  </Grid>
                </InfoBullets>
                <InfoBullets>
                  <Grid container>
                    <Grid item xs={3} align="center">
                      <LanguageIcon></LanguageIcon>
                    </Grid>
                    <Grid item xs={9}>
                      {website}
                    </Grid>
                  </Grid>
                </InfoBullets>
                <InfoBullets>
                  <Grid container>
                    <Grid item xs={3} align="center">
                      <MailOutlineIcon></MailOutlineIcon>
                    </Grid>
                    <Grid item xs={9}>
                      {email}
                    </Grid>
                  </Grid>
                </InfoBullets>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <OpinionsBox>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      A, in labore expedita, doloribus laboriosam ab tempore
                      inventore corrupti ut nostrum amet quidem qui dolor
                      numquam cumque ullam impedit rerum dicta ipsum! Repellat,
                      consequuntur! Quod eius nisi explicabo praesentium vero!
                      Culpa, et laborum sit a ipsam adipisci ad quasi eligendi
                      voluptatibus.
                    </BodyLight>
                  </OpText>
                </Opinion>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      A, in labore expedita, doloribus laboriosam ab tempore
                      inventore corrupti ut nostrum amet quidem qui dolor
                      numquam cumque ullam impedit rerum dicta ipsum! Repellat,
                      consequuntur! Quod eius nisi explicabo praesentium vero!
                      Culpa, et laborum sit a ipsam adipisci ad quasi eligendi
                      voluptatibus.
                    </BodyLight>
                  </OpText>
                </Opinion>
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      A, in labore expedita, doloribus laboriosam ab tempore
                      inventore corrupti ut nostrum amet quidem qui dolor
                      numquam cumque ullam impedit rerum dicta ipsum! Repellat,
                      consequuntur! Quod eius nisi explicabo praesentium vero!
                      Culpa, et laborum sit a ipsam adipisci ad quasi eligendi
                      voluptatibus.
                    </BodyLight>
                  </OpText>
                </Opinion>
              </OpinionsBox>
            </Grid>
          </Grid>
        </BgRestCard>
      </Paper>
    </>
  );
};
