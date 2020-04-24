import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Box, Avatar } from "@material-ui/core";
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
  id,
  img1,
  img2,
  img3,
  kind,
  name,
  address,
  city,
  region,
  descr,
  phone,
  website,
  email,
  comments,
  rate,
  totalComments
}) => {
  return (
    <>
      <Paper elevation={1}>
        <BgRestCard>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={4} md={4} lg={4}>
              <img
                src={img1 ? img1 : "/placeholder4.jpg"}
                width="100%"
                height="auto"
              />
              {/* <Grid container>
                <Grid item xs={6}>
                  <img
                    src={img2 ? img2 : "/placeholder4.jpg"}
                    width="100%"
                    height="auto"
                  />
                </Grid>
                <Grid item xs={6}>
                  <img
                    src={img3 ? img3 : "/placeholder4.jpg"}
                    width="100%"
                    height="auto"
                  />
                </Grid>
              </Grid> */}
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4}>
              <div style={{ color: s.dark }}>
                <p style={{ marginBottom: 5, fontSize: 14 }}>
                  <i>{kind}</i>
                </p>
                <Link
                  to={`/restaurant/${id}`}
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
                    width: 270,
                    marginTop: -5,
                    marginBottom: 30
                  }}
                >
                  <Box
                    style={{ marginLeft: -15 }}
                    mt={0.3}
                    component="fieldset"
                    borderColor="transparent"
                  >
                    <Rating name="read-only" value={rate} readOnly />
                  </Box>
                  <p>{totalComments} comments</p>
                </Rates>
                {/* <BodyLight style={{ marginBottom: 30 }}>{descr}</BodyLight> */}
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
                {comments && comments.length === 0 ? (
                  <p style={{ marginTop: 20, marginLeft: 20 }}>
                    <i>No comments yet</i>
                  </p>
                ) : (
                  comments &&
                  comments.map(comment => {
                    return (
                      <Opinion>
                        <Owner>
                          <Avatar
                            style={{
                              width: 50,
                              height: 50
                            }}
                            src={comment.user.image}
                          ></Avatar>
                          <RateOp>
                            <p>{comment.user.username}</p>
                            <RatesOp>
                              <Box
                                component="fieldset"
                                borderColor="transparent"
                              >
                                <Rating name="read-only" value="4" readOnly />
                              </Box>
                              <p>
                                <i>{comment.date}</i>
                              </p>
                            </RatesOp>
                          </RateOp>
                        </Owner>
                        <OpText>
                          <BodyLight>{comment.comment}</BodyLight>
                        </OpText>
                      </Opinion>
                    );
                  })
                )}
              </OpinionsBox>
            </Grid>
          </Grid>
        </BgRestCard>
      </Paper>
    </>
  );
};
