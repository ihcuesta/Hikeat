import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { HomeHead } from "../UI/HomeHead";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Divider, SearcherCont, BgHome } from "../styled/HomeStyles";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { provincias } from "../../service/regions";
import { s, ContBody } from "../styled/globalStyles";
import hero from "../../images/hero-img.jpg";
import { LocationCont, RestCont, BodyCard } from "../styled/CardStyled";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ShareIcon from "@material-ui/icons/Share";

export const Home = () => {
  const [region, setRegion] = useState();
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
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 140 }}
                    image={hero}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <LocationCont>
                      <LocationOnOutlinedIcon
                        style={{ width: 20, height: 20 }}
                      ></LocationOnOutlinedIcon>
                      <p>Manzanares el Real, Madrid</p>
                    </LocationCont>

                    <Typography gutterBottom variant="h3" component="h3">
                      Lizard
                    </Typography>
                    <RestCont to="#">
                      <RestaurantMenuOutlinedIcon
                        style={{ width: 20, height: 20, color: s.primary }}
                      ></RestaurantMenuOutlinedIcon>
                      <p>Taberna Casa Paco</p>
                    </RestCont>
                    <Grid container spacing={1}>
                      <Grid item xs={5}>
                        <Chip
                          style={{
                            padding: "20px 5px",
                            color: s.dark,
                            backgroundColor: s.light
                          }}
                          size="medium"
                          icon={
                            <CalendarTodayIcon style={{ color: s.primary }} />
                          }
                          label="03/04/2020"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Chip
                          style={{
                            padding: "20px 5px",
                            color: s.dark,
                            backgroundColor: s.light
                          }}
                          size="medium"
                          icon={
                            <WatchLaterOutlinedIcon
                              style={{ color: s.primary }}
                            />
                          }
                          label="8:00"
                        />
                      </Grid>
                    </Grid>
                    <BodyCard>
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </BodyCard>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <FavoriteBorderOutlinedIcon
                        style={{ fontSize: "35px" }}
                      ></FavoriteBorderOutlinedIcon>
                      {/* <FavoriteOutlinedIcon></FavoriteOutlinedIcon> */}
                      <ShareIcon
                        style={{ fontSize: "35px", marginLeft: 20 }}
                      ></ShareIcon>
                    </Grid>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="secondary">
                        MORE INFO
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 140 }}
                    image={hero}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 140 }}
                    image={hero}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </ContBody>
      </BgHome>
    </>
  );
};
