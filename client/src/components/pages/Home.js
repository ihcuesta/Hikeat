import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Backdrop, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { HomeHead } from "../UI/HomeHead";
import { Divider, SearcherCont, BgHome } from "../styled/HomeStyles";
import { provincias } from "../../service/regions";
import { ContBody } from "../styled/globalStyles";
import { getAllPlans } from "../../service/planService";
import { CardHome } from "../UI/Cards";
import { FooterHome } from "../UI/Footer";

export const Home = () => {
  const [region, setRegion] = useState();
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getAllPlans().then(plans => setPlans(plans));
  }, []);

  return (
    <>
      <HomeHead></HomeHead>
      <Divider></Divider>
      <BgHome>
        <ContBody>
          <SearcherCont>
            <Autocomplete
              required
              id="region"
              options={provincias}
              onChange={(event, value) =>
                value ? setRegion(value.nm) : setRegion("")
              }
              getOptionLabel={option => option.nm}
              style={{
                width: "100%",
                marginBottom: 40,
                backgroundColor: "#FFF"
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="🔍 Search by region"
                  variant="outlined"
                />
              )}
            />
          </SearcherCont>

          <Grid container spacing={2}>
            {plans.length === 0 ? (
              <Backdrop style={{ zIndex: 1000 }} open={true}>
                <CircularProgress color="primary" />
              </Backdrop>
            ) : (
              plans.map(plan => {
                return (
                  <CardHome
                    id={plan._id}
                    image={plan.image1}
                    region={plan.restaurant && plan.restaurant.region}
                    city={plan.restaurant && plan.restaurant.city}
                    name={plan.name}
                    restaurant={plan.restaurant && plan.restaurant.name}
                    date={plan.date}
                    time={plan.startTime}
                    descr={plan.shortDescr}
                    restid={plan.restaurant && plan.restaurant._id}
                  ></CardHome>
                );
              })
            )}
          </Grid>
        </ContBody>
      </BgHome>
      <FooterHome></FooterHome>
    </>
  );
};
