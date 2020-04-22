import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Backdrop, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import { HomeHead } from "../UI/HomeHead";
import { Divider, SearcherCont, BgHome, NotFound } from "../styled/HomeStyles";
import { provincias } from "../../service/regions";
import { ContBody } from "../styled/globalStyles";
import {
  getAllPlans,
  getByRegion,
  getPlansPage,
  getTotal,
  getPlansPageRegion,
  getTotalRegion
} from "../../service/planService";
import { CardHome } from "../UI/Cards";
import { FooterHome } from "../UI/Footer";
import error from "../../images/error.svg";
import ScrollIntoView from "react-scroll-into-view";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export const Home = () => {
  const [search, setSearch] = useState(false);
  const [plans, setPlans] = useState([]);
  const [numPage, setNumPage] = useState(1);
  const [total, setTotal] = useState();
  const [pages, setPages] = useState();
  const [region, setRegion] = useState();

  const [numPageReg, setNumPageReg] = useState(1);
  const [totalReg, setTotalReg] = useState();
  const [pagesReg, setPagesReg] = useState();

  const handleChange = (event, value) => {
    setNumPage(value);
    getPlansPage(value).then(plans => setPlans(plans));
  };

  const handleChangeReg = (event, value) => {
    setNumPageReg(value);
    getPlansPageRegion(region, value).then(plans => setPlans(plans));
  };

  useEffect(() => {
    getPlansPage(numPage).then(plans => setPlans(plans));
    getTotal().then(total => {
      setTotal(total);
      setPages(cPages(total));
    });
  }, []);

  console.log(total);
  console.log(pages);

  const cPages = total => {
    let pages = Math.floor(total / 6);
    console.log(pages);
    if (total % 6 > 0) pages++;
    return pages;
  };

  const calcPages = total => {
    setPages(cPages(total));
  };

  const calcPagesReg = total => {
    setPagesReg(cPages(total));
  };

  const handleFilter = region => {
    setRegion(region);
    if (region === "all") {
      setSearch(false);
      setNumPage(1);
      getPlansPage(numPage).then(plans => setPlans(plans));
      getTotal().then(total => {
        setTotal(total);
        setPages(cPages(total));
      });
    } else {
      setSearch(true);
      setNumPageReg(1);
      getPlansPageRegion(region, numPageReg).then(plans => setPlans(plans));
      getTotalRegion(region).then(total => {
        setTotalReg(total);
        setPagesReg(cPages(total));
      });
    }
  };

  return (
    <>
      <HomeHead scrollPlans="#search"></HomeHead>
      <Divider id="search"></Divider>
      <BgHome>
        <ContBody>
          <SearcherCont data-aos="slide-up">
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
                    rate={plan.restaurant && plan.restaurant.rateAv}
                    totalComments={
                      plan.restaurant && plan.restaurant.totalComments
                    }
                  ></CardHome>
                );
              })
            )}
          </Grid>
          {!search ? (
            <>
              <p>Page {numPage}</p>
              <Pagination
                count={pages}
                color="primary"
                page={numPage}
                onChange={handleChange}
                style={{ margin: "40px auto 0px" }}
              />
            </>
          ) : (
            <>
              <p>Page {numPageReg}</p>
              <Pagination
                count={pagesReg}
                color="primary"
                page={numPageReg}
                onChange={handleChangeReg}
                style={{ margin: "40px auto 0px" }}
              />
            </>
          )}
        </ContBody>
      </BgHome>
      <FooterHome></FooterHome>
    </>
  );
};
