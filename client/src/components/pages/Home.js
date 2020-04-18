import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Backdrop, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { HomeHead } from "../UI/HomeHead";
import { Divider, SearcherCont, BgHome, NotFound } from "../styled/HomeStyles";
import { provincias } from "../../service/regions";
import { ContBody } from "../styled/globalStyles";
import { getAllPlans, getByRegion } from "../../service/planService";
import { CardHome } from "../UI/Cards";
import { FooterHome } from "../UI/Footer";
import error from "../../images/error.svg";

export const Home = () => {
  const [search, setSearch] = useState(false);
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getAllPlans().then(plans => setPlans(plans));
  }, []);

  const handleFilter = region => {
    if (region === "all") {
      getAllPlans().then(plans => setPlans(plans));
    } else {
      setSearch(true);
      getByRegion(region).then(plans => {
        setPlans(plans);
      });
    }
  };

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
              onChange={(event, value) => {
                // handleFilter(region);
                value ? handleFilter(value.nm) : handleFilter("all");
              }}
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
            {plans && plans.length === 0 && search && (
              <NotFound>
                <img src={error} />
                <p>No plan found in this region</p>
              </NotFound>
            )}
            {plans && plans.length === 0 && !search ? (
              <Backdrop style={{ zIndex: 1000 }} open={true}>
                <CircularProgress color="primary" />
              </Backdrop>
            ) : (
              plans &&
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
