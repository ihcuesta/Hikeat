import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
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
                  value={region}
                  onChange={e => {
                    setRegion(e.target.value);
                    console.log(region);
                  }}
                  variant="outlined"
                />
              )}
            />
          </SearcherCont>

          <Grid container spacing={2}>
            {plans.length === 0 ? (
              <p>Loading</p>
            ) : (
              plans.map(plan => {
                return (
                  <CardHome
                    id={plan._id}
                    image={plan.image1}
                    region={plan.region}
                    city={plan.city}
                    name={plan.name}
                    restaurant={plan.restaurant}
                    date={plan.date}
                    time={plan.startTime}
                    descr={plan.shortDescr}
                    restid={plan.restid}
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
