import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import { ContHead, Hero, PicHome } from "../styled/HomeStyles";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";
import { s } from "../styled/globalStyles";
import ScrollIntoView from "react-scroll-into-view";

export const HomeHead = ({ scrollPlans }) => {
  return (
    <Hero>
      <Grid container style={{ padding: 0, margin: 0 }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={7}
          xl={7}
          style={{ padding: 0, margin: 0 }}
        >
          <PicHome>
            <img
              className="framehome"
              src="https://res.cloudinary.com/dnmktvry5/image/upload/v1588551450/hikeat/static/Exclude_ayqfns.png"
            />
            <img
              className="pichome"
              src="https://res.cloudinary.com/dnmktvry5/image/upload/v1588523378/hikeat/static/pic-header_jusswy.jpg"
            />
          </PicHome>
        </Grid>
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
            {/* <img
                width="380"
                height="auto"
                src="https://res.cloudinary.com/dnmktvry5/image/upload/v1588172715/hikeat/static/Hikeat_fbv3u3.svg"
              /> */}
            <div
              data-aos="fade-left"
              data-aos-duration="400"
              data-aos-easing="ease-in-out"
              data-aos-delay="50"
            >
              <h3 style={{ color: s.dark, fontWeight: 400, fontSize: 25 }}>
                Is there anything better than a<br />
                <b style={{ color: s.primary }}>good meal</b> after a{" "}
                <b>hike</b>?
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
                    Go to the restaurant early, get tips and a tasty breakfast.
                  </p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <FilterHdrOutlinedIcon color="primary" fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <p style={{ marginTop: 0 }}>
                    Enjoy & share a morning hike with other hikers.
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
            <ScrollIntoView selector={scrollPlans}>
              <Button
                component={Link}
                to="#intro"
                data-scroll
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
                to="#plans"
              >
                see plans
              </Button>
            </ScrollIntoView>
          </ContHead>
        </Grid>
      </Grid>
    </Hero>
  );
};
