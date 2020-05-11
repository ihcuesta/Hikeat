import React, { useState, useEffect } from "react";
import { useUser } from "../../service/authService";
import {
  HeroLanding,
  TitleLanding,
  DishCont,
  ContInfoDish,
  GapGray
} from "../styled/LandingStyled";
import { s } from "../styled/globalStyles";
import { Grid, Button } from "@material-ui/core";
import RestaurantOutlinedIcon from "@material-ui/icons/RestaurantOutlined";
import FilterHdrOutlinedIcon from "@material-ui/icons/FilterHdrOutlined";
import PeopleIcon from "@material-ui/icons/People";
import { Divider } from "../styled/HomeStyles";
import { FooterHome } from "../UI/Footer";

export const LandingRest = () => {
  return (
    <>
      <HeroLanding>
        <Grid container>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <ContInfoDish>
              <TitleLanding>
                Let's{" "}
                <span style={{ color: s.primary, fontWeight: "bold" }}>
                  cook
                </span>{" "}
                a plan!
              </TitleLanding>
              <p style={{ fontSize: 18 }}>
                Include your restaurant in Hikeat and start creating plans in
                your region.
              </p>
              <Grid container style={{ marginTop: 30 }}>
                <Grid item xs={2}>
                  <RestaurantOutlinedIcon color="primary" fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <p style={{ marginTop: 7 }}>
                    Register your restaurant in Hikeat.
                  </p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <FilterHdrOutlinedIcon color="primary" fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <p style={{ marginTop: 7 }}>
                    Create plans in your region (hike + menu).
                  </p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2}>
                  <PeopleIcon color="primary" fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <p style={{ marginTop: 7 }}>Receive your guests!</p>
                </Grid>
              </Grid>
              <Button
                color="secondary"
                variant="contained"
                style={{ marginTop: 30, width: 150 }}
              >
                SIGN UP
              </Button>
            </ContInfoDish>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <DishCont>
              <img
                className="dish dish1"
                src="https://res.cloudinary.com/dnmktvry5/image/upload/v1589117538/hikeat/dish3_klqpg0.png"
              />
              <img
                className="dish dish2"
                src="https://res.cloudinary.com/dnmktvry5/image/upload/v1589117538/hikeat/dish1_bjlvns.png"
              />
              <img
                className="dish dish3"
                src="https://res.cloudinary.com/dnmktvry5/image/upload/v1589117540/hikeat/dish2_ywhmjg.png"
              />
            </DishCont>
          </Grid>
        </Grid>
      </HeroLanding>
      <Divider></Divider>
      <GapGray></GapGray>

      <FooterHome></FooterHome>
    </>
  );
};
