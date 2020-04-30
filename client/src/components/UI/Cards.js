import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useUser } from "../../service/authService";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Box
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { s } from "../styled/globalStyles";
import {
  LocationCont,
  RestCont,
  BodyCard,
  Rates,
  Social,
  ContChips
} from "../styled/CardStyled";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import WatchLaterOutlinedIcon from "@material-ui/icons/WatchLaterOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/Share";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import EuroRoundedIcon from "@material-ui/icons/EuroRounded";
import {
  newFavourite,
  deleteFavourite,
  getFavourite
} from "../../service/favouriteService";

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
  restid,
  rate,
  totalComments,
  price
}) => {
  const [favourite, setFavourite] = useState(false);
  const session = useUser();
  const history = useHistory();

  useEffect(() => {
    getFavourite(id).then(fav => {
      if (fav.length > 0) setFavourite(true);
      console.log(fav);
    });
  }, []);

  const handleFav = async id => {
    if (session) {
      if (!favourite) {
        const addFav = await newFavourite(id);
        console.log(addFav);
      } else {
        const deleteFav = await deleteFavourite(id);
        console.log(deleteFav);
      }
      setFavourite(!favourite);
    } else {
      history.push("/login");
    }
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card data-aos="fade-up">
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
          <Rates>
            <Box mt={0.3} component="fieldset" borderColor="transparent">
              <Rating name="read-only" value={rate} readOnly />
            </Box>
            <p>{totalComments} comments</p>
          </Rates>
          <ContChips>
            <Chip
              style={{
                padding: "20px 5px",
                color: s.dark,
                backgroundColor: s.light,
                marginRight: 5,
                marginBottom: 5
              }}
              size="medium"
              icon={<CalendarTodayIcon style={{ color: s.primary }} />}
              label={date}
            />

            <Chip
              style={{
                padding: "20px 5px",
                color: s.dark,
                backgroundColor: s.light,
                marginRight: 5,
                marginBottom: 5
              }}
              size="medium"
              icon={<WatchLaterOutlinedIcon style={{ color: s.primary }} />}
              label={time}
            />

            <Chip
              style={{
                padding: "20px 5px",
                color: s.dark,
                backgroundColor: s.light,
                marginBottom: 5
              }}
              size="medium"
              icon={<EuroRoundedIcon style={{ color: s.primary }} />}
              label={price}
            />
          </ContChips>
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

              <a
                style={{ color: s.primary }}
                href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.URL_FRONT}/plan/${id}`}
                target="_blank"
              >
                <FacebookIcon
                  color="primary"
                  style={{
                    fontSize: "35px",
                    marginLeft: 20,
                    cursor: "pointer"
                  }}
                ></FacebookIcon>
              </a>
              <a
                style={{ color: s.primary }}
                href={`https://twitter.com/home?status=${process.env.URL_FRONT}/plan/${id} Take a look of this Hikeat plan!`}
                target="_blank"
              >
                {/* <TwitterIcon
                  style={{
                    fontSize: "35px",
                    marginLeft: 20,
                    cursor: "pointer"
                  }}
                ></TwitterIcon> */}
              </a>
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

export const CardFav = ({
  id,
  image,
  city,
  region,
  name,
  restaurant,
  date,
  time,
  price,
  descr,
  restid,
  funcDelete
}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card data-aos="fade-up">
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
          <ContChips>
            <Chip
              style={{
                padding: "20px 5px",
                color: s.dark,
                backgroundColor: s.light,
                marginRight: 5
              }}
              size="medium"
              icon={<CalendarTodayIcon style={{ color: s.primary }} />}
              label={date}
            />

            <Chip
              style={{
                padding: "20px 5px",
                color: s.dark,
                backgroundColor: s.light,
                marginRight: 5
              }}
              size="medium"
              icon={<WatchLaterOutlinedIcon style={{ color: s.primary }} />}
              label={time}
            />

            <Chip
              style={{
                padding: "20px 5px",
                color: s.dark,
                backgroundColor: s.light
              }}
              size="medium"
              icon={<EuroRoundedIcon style={{ color: s.primary }} />}
              label={price}
            />
          </ContChips>
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
              <FavoriteOutlinedIcon
                style={{ fontSize: "35px", cursor: "pointer" }}
                onClick={funcDelete}
              ></FavoriteOutlinedIcon>

              <a
                style={{ color: s.primary }}
                href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.URL_FRONT}/plan/${id}`}
                target="_blank"
              >
                <FacebookIcon
                  color="primary"
                  style={{
                    fontSize: "35px",
                    marginLeft: 20,
                    cursor: "pointer"
                  }}
                ></FacebookIcon>
              </a>
              <a
                style={{ color: s.primary }}
                href={`https://twitter.com/home?status=${process.env.URL_FRONT}/plan/${id} Take a look of this Hikeat plan!`}
                target="_blank"
              >
                <TwitterIcon
                  style={{
                    fontSize: "35px",
                    marginLeft: 20,
                    cursor: "pointer"
                  }}
                ></TwitterIcon>
              </a>
            </Grid>
            <Grid item xs={6}>
              <Button
                component={Link}
                to={`/plan/${id}`}
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
