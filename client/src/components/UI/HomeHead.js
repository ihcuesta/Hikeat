import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { ContHead, Hero } from "../styled/HomeStyles";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";
import { s } from "../styled/globalStyles";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export const HomeHead = () => {
  return (
    <Hero>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}></Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <ContHead>
              <Typography
                variant="h1"
                component="h1"
                color="primary"
                gutterBottom
                data-aos="fade-left"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
              >
                <span style={{ color: s.dark }}>Hik</span>eat
              </Typography>
              <div
                data-aos="fade-left"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
                data-aos-delay="50"
              >
                <h3 style={{ color: s.dark }}>
                  Is there anything better than a<br />
                  <b style={{ color: s.primary }}>good meal</b> after a{" "}
                  <b>hiking trail</b>?
                </h3>
                <p>
                  No one better than the local restaurants to give you advice.
                </p>
              </div>
              <br />
              <div
                data-aos="fade-left"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
                data-aos-delay="100"
              >
                <Grid container>
                  <Grid item xs={2}>
                    <ExploreOutlinedIcon color="primary" fontSize="large" />
                  </Grid>
                  <Grid item xs={10}>
                    <p style={{ marginTop: 0 }}>
                      Go to the restaurant early, get tips and a tasty
                      breakfast.
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2}>
                    <FilterHdrOutlinedIcon color="primary" fontSize="large" />
                  </Grid>
                  <Grid item xs={10}>
                    <p style={{ marginTop: 0 }}>
                      Enjoy & share a morning of hiking with other hikers.
                    </p>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={2}>
                    <RestaurantOutlinedIcon color="primary" fontSize="large" />
                  </Grid>
                  <Grid item xs={10}>
                    <p style={{ marginTop: 0 }}>
                      Come back to the restaurant to enjoy a delicious meal!
                    </p>
                  </Grid>
                </Grid>
              </div>
              <Button
                data-aos="fade-left"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
                data-aos-delay="150"
                style={{
                  margin: "30px auto 0px auto",
                  textAlign: "center",
                  borderRadius: 20,
                  width: "80%"
                }}
                component={Link}
                size="medium"
                variant="contained"
                color="secondary"
                to="#"
              >
                see plans
              </Button>
            </ContHead>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  );
};
