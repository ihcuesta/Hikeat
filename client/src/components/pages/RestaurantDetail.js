import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Head,
  Rates,
  ImgCont,
  Contact,
  Owner,
  OwnerTexts,
  InfoBullets,
  Opinion,
  RateOp,
  RatesOp,
  OpText,
  InfoIcon,
  IconsCont,
  TitComment,
  ContRating,
  ContBtnComment
} from "../styled/RestDetailStyled";
import {
  Grid,
  Button,
  Box,
  Backdrop,
  CircularProgress,
  TextField,
  Collapse,
  IconButton
} from "@material-ui/core";
import { Rating, Alert } from "@material-ui/lab";
import {
  ContBody,
  BodyText,
  BodyLight,
  s,
  Error,
  EditCont
} from "../styled/globalStyles";
import CloseIcon from "@material-ui/icons/Close";
import PhoneIcon from "@material-ui/icons/Phone";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PetsIcon from "@material-ui/icons/Pets";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Divider, BgHome } from "../styled/HomeStyles";
import { CardLastPlansRest } from "../UI/Cards";
import { getLastPlansRest } from "../../service/planService";
import {
  fetchSingleRestaurant,
  checkIfManager
} from "../../service/restaurantService";
import { Footer } from "../UI/Footer";
import { newComment } from "../../service/commentService";

export const RestaurantDetail = props => {
  const [plans, setPlans] = useState([]);
  const [info, setInfo] = useState();
  const [allcomments, setAllcomments] = useState();
  const [stars, setStars] = useState(3);
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);
  const [hover, setHover] = useState(-1);
  const [open, setOpen] = useState(false);
  const [iscomment, setIscomment] = useState();
  const [ismanager, setIsmanager] = useState(false);

  useEffect(() => {
    getLastPlansRest().then(plans => setPlans(plans));
    const id = props.match.params.id;
    fetchSingleRestaurant(id).then(restaurant => {
      setInfo(restaurant.restaurantId);
      setAllcomments(restaurant.commentsRes);
    });
    checkIfManager(id).then(restaurant => {
      setIsmanager(restaurant.isManager);
    });
  }, []);

  const rest = info && info._id;
  const getDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return dd + "-" + mm + "-" + yyyy;
  };

  const handleSubmit = async (rest, stars, comment) => {
    if (comment !== "") {
      const date = getDate();
      const response = await newComment(rest, stars, comment, date);
      console.log(response.data.isComment);
      if (response) setOpen(true);
      response.data.isComment ? setIscomment(true) : setIscomment(false);
    } else {
      setValidated(true);
    }
  };

  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent"
  };

  return info === 0 ? (
    <Backdrop style={{ zIndex: 1000 }} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  ) : (
    <>
      <ContBody>
        <Head>
          <p>
            <i>{info && info.kind}</i>
          </p>
          <h1>{info && info.name}</h1>
        </Head>
        <Rates>
          <Box mt={0.3} component="fieldset" borderColor="transparent">
            <Rating name="read-only" value="5" readOnly />
          </Box>
          <p>23 opinions</p>
        </Rates>
        <ImgCont>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <img src={info && info.image1} width="100%" height="auto" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info && info.image2} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info && info.image3} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info && info.image4} width="100%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <img src={info && info.image5} width="100%" height="auto" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ImgCont>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Contact>
              <Owner>
                <img src={info && info.owner.image} />
                <OwnerTexts>
                  <p>
                    <i>Restaurant owner</i>
                  </p>
                  <p>{info && info.owner.username}</p>
                </OwnerTexts>
              </Owner>
              <BodyLight styles={{ paddingBottom: 30 }}>
                {info && info.descr}
                <br></br>
                <br></br>
              </BodyLight>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <PhoneIcon></PhoneIcon>
                  </Grid>
                  <Grid item xs={9}>
                    {info && info.phone}
                  </Grid>
                </Grid>
              </InfoBullets>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <LanguageIcon></LanguageIcon>
                  </Grid>
                  <Grid item xs={9}>
                    {info && info.website}
                  </Grid>
                </Grid>
              </InfoBullets>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <MailOutlineIcon></MailOutlineIcon>
                  </Grid>
                  <Grid item xs={9}>
                    {info && info.email}
                  </Grid>
                </Grid>
              </InfoBullets>
              <InfoBullets>
                <Grid container>
                  <Grid item xs={3} align="center">
                    <LocationOnIcon></LocationOnIcon>
                  </Grid>
                  <Grid item xs={9}>
                    {info && info.city}, {info && info.region}
                  </Grid>
                </Grid>
              </InfoBullets>
            </Contact>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {allcomments &&
              allcomments.map(comment => {
                return (
                  <Opinion>
                    <Owner>
                      <img src={comment.user.image}></img>
                      <RateOp>
                        <p>{comment.user.username}</p>
                        <RatesOp>
                          <Box component="fieldset" borderColor="transparent">
                            <Rating
                              name="read-only"
                              value={comment.stars}
                              readOnly
                            />
                          </Box>
                          <p>
                            <i>{comment.date}</i>
                          </p>
                        </RatesOp>
                      </RateOp>
                    </Owner>
                    <OpText>
                      <BodyLight>{comment.comment}</BodyLight>
                    </OpText>
                  </Opinion>
                );
              })}

            <TitComment>Add comment</TitComment>
            <hr style={{ color: s.dark, width: "100%", marginBottom: 15 }} />
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(rest, stars, comment);
              }}
            >
              <ContRating>
                <Rating
                  name="hover-feedback"
                  value={stars}
                  precision={1}
                  onChange={(event, newValue) => {
                    setStars(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {stars !== null && (
                  <Box ml={2}>{labels[hover !== -1 ? hover : stars]}</Box>
                )}
              </ContRating>
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                placeholder="Write something useful for new hikers! 🖊"
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                value={comment}
                onChange={e => setComment(e.target.value)}
                error={comment === "" && validated}
                helperText={
                  comment === "" && validated ? (
                    <Error>
                      Please, write something useful for next hikers
                    </Error>
                  ) : (
                    <Error></Error>
                  )
                }
              />
              <ContBtnComment>
                <Button variant="contained" color="secondary" type="submit">
                  Add comment
                </Button>
              </ContBtnComment>
              <div style={{ width: "100%", marginTop: 10 }}>
                <Collapse in={open}>
                  {!iscomment ? (
                    <Alert
                      severity="success"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      Thank you for your comment!
                    </Alert>
                  ) : (
                    <Alert
                      severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                    >
                      You have already starred this restaurant.
                    </Alert>
                  )}
                </Collapse>
              </div>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            {ismanager && (
              <EditCont>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ minWidth: 150, margin: "auto", display: "block" }}
                >
                  Edit
                </Button>
                <Button
                  component={Link}
                  style={{
                    minWidth: 150,
                    color: s.error,
                    margin: "auto",
                    display: "block",
                    textAlign: "center",
                    marginTop: 15
                  }}
                >
                  Delete
                </Button>
              </EditCont>
            )}
            <IconsCont>
              {info && info.dogs ? (
                <InfoIcon>
                  <PetsIcon color="primary"></PetsIcon>
                  <p>Dogs</p>
                </InfoIcon>
              ) : (
                ""
              )}
              {info && info.kids ? (
                <InfoIcon>
                  <ChildCareIcon color="primary"></ChildCareIcon>
                  <p>Kids menu</p>
                </InfoIcon>
              ) : (
                ""
              )}
              {info && info.allergenCard ? (
                <InfoIcon>
                  <LocalPharmacyIcon color="primary"></LocalPharmacyIcon>
                  <p>Allergens card</p>
                </InfoIcon>
              ) : (
                ""
              )}
              {info && info.terrace ? (
                <InfoIcon>
                  <BeachAccessIcon color="primary"></BeachAccessIcon>
                  <p>Terrace</p>
                </InfoIcon>
              ) : (
                ""
              )}
            </IconsCont>
          </Grid>
        </Grid>
      </ContBody>
      <Divider></Divider>
      <BgHome>
        <ContBody>
          <Grid container spacing={2}>
            {plans.length === 0 ? (
              <p>Loading</p>
            ) : (
              plans.map(plan => {
                return (
                  <CardLastPlansRest
                    image={plan.image1}
                    region={plan.region}
                    city={plan.city}
                    name={plan.name}
                    restaurant={plan.restaurant}
                    date={plan.date}
                    time={plan.startTime}
                    descr={plan.shortDescr}
                  ></CardLastPlansRest>
                );
              })
            )}
          </Grid>
        </ContBody>
      </BgHome>

      <Footer></Footer>
    </>
  );
};
