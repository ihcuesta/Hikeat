import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip
} from "@material-ui/core";
import { s } from "../styled/globalStyles";
import { LocationCont, RestCont, BodyCard } from "../styled/CardStyled";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/Share";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { newFavourite, deleteFavourite } from "../../service/favouriteService";

export const CardHome = ({
  id,
  image,
  city,
  region,
  name,
  restaurant,
  date,
  time,
  descr,
  restid
}) => {
  const [favourite, setFavourite] = useState(false);
  const handleFav = async id => {
    if (!favourite) {
      const addFav = await newFavourite(id);
      console.log(addFav);
    } else {
      const deleteFav = await deleteFavourite(id);
      console.log(deleteFav);
    }
    setFavourite(!favourite);
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <Link to={`plan/${id}`}>
          <CardMedia style={{ height: 200 }} image={image} />
        </Link>
        <CardContent>
          <LocationCont>
            <LocationOnOutlinedIcon
              style={{ width: 20, height: 20 }}
            ></LocationOnOutlinedIcon>
            <p>
              {city}, {region}
            </p>
          </LocationCont>

          <Typography gutterBottom variant="h3" component="h3">
            {name}
          </Typography>
          <RestCont to={`/restaurant/${restid}`}>
            <RestaurantMenuOutlinedIcon
              style={{
                width: 20,
                height: 20,
                color: s.primary
              }}
            ></RestaurantMenuOutlinedIcon>
            <p>{restaurant}</p>
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
                icon={<CalendarTodayIcon style={{ color: s.primary }} />}
                label={date}
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
                icon={<WatchLaterOutlinedIcon style={{ color: s.primary }} />}
                label={time}
              />
            </Grid>
          </Grid>
          <BodyCard>{descr}</BodyCard>
        </CardContent>

        <CardActions
          style={{
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              {favourite ? (
                <FavoriteOutlinedIcon
                  style={{ fontSize: "35px", cursor: "pointer" }}
                  onClick={() => handleFav(id)}
                ></FavoriteOutlinedIcon>
              ) : (
                <FavoriteBorderOutlinedIcon
                  style={{ fontSize: "35px", cursor: "pointer" }}
                  onClick={() => handleFav(id)}
                ></FavoriteBorderOutlinedIcon>
              )}

              <ShareIcon
                style={{ fontSize: "35px", marginLeft: 20, cursor: "pointer" }}
              ></ShareIcon>
            </Grid>
            <Grid item xs={6}>
              <Button
                component={Link}
                to={`plan/${id}`}
                fullWidth
                variant="contained"
                color="secondary"
              >
                MORE INFO
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export const CardLastPlansRest = ({
  image,
  city,
  region,
  name,
  restaurant,
  date,
  time,
  descr
}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card>
        <CardActionArea>
          <CardMedia style={{ height: 140 }} image={image} />
          <CardContent>
            <LocationCont>
              <LocationOnOutlinedIcon
                style={{ width: 20, height: 20 }}
              ></LocationOnOutlinedIcon>
              <p>
                {city}, {region}
              </p>
            </LocationCont>

            <Typography gutterBottom variant="h3" component="h3">
              {name}
            </Typography>
            <RestCont to="#">
              <RestaurantMenuOutlinedIcon
                style={{
                  width: 20,
                  height: 20,
                  color: s.primary
                }}
              ></RestaurantMenuOutlinedIcon>
              <p>{restaurant}</p>
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
                  icon={<CalendarTodayIcon style={{ color: s.primary }} />}
                  label={date}
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
                  icon={<WatchLaterOutlinedIcon style={{ color: s.primary }} />}
                  label={time}
                />
              </Grid>
            </Grid>
            <BodyCard>{descr}</BodyCard>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
