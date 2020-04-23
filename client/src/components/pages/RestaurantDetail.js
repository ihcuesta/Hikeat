import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../service/authService";
import { useHistory } from "react-router";
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
  ContBtnComment,
  MapContainer
} from "../styled/RestDetailStyled";
import {
  Grid,
  Button,
  Box,
  Backdrop,
  CircularProgress,
  TextField,
  Collapse,
  IconButton,
  Avatar
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
import { getPlansOfRestaurant } from "../../service/planService";
import {
  fetchSingleRestaurant,
  checkIfManager
} from "../../service/restaurantService";
import { Footer } from "../UI/Footer";
import {
  newComment,
  getUserComment,
  editComment,
  getComments,
  deleteComment
} from "../../service/commentService";
import { getLatLong } from "../../service/geocodeService";
import { MapLeaflet } from "../UI/map";

export const RestaurantDetail = props => {
  const session = useUser();
  const history = useHistory();
  const [plans, setPlans] = useState([]);
  const [info, setInfo] = useState();
  const [allcomments, setAllcomments] = useState();
  const [stars, setStars] = useState(3);
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);
  const [hover, setHover] = useState(-1);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [iscomment, setIscomment] = useState();
  const [ismanager, setIsmanager] = useState(false);
  const [isOldCom, setIsOldCom] = useState(false);
  const [value, setValue] = useState(2);
  const [pos, setPos] = useState();

  useEffect(() => {
    const id = props.match.params.id;
    getPlansOfRestaurant(id).then(plans => {
      setPlans(plans);
    });
    fetchSingleRestaurant(id).then(restaurant => {
      setInfo(restaurant.restaurantId);
      setValue(restaurant.restaurantId.rateAv);
      setAllcomments(restaurant.commentsRes);
    });
    getUserComment(id).then(comment => {
      if (comment.length > 0) {
        setIsOldCom(true);
        setStars(comment[0].stars);
        setComment(comment[0].comment);
      }
    });
    checkIfManager(id).then(restaurant => {
      setIsmanager(restaurant.isManager);
    });

    getLatLong(id).then(coords => {
      console.log(coords.data);
      setPos(coords.data);
      console.log(pos);
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

  const deleteCom = async () => {
    setOpen(false);
    const response = await deleteComment(rest);
    getComments(rest).then(comments => {
      setAllcomments(comments);
    });
    setIsOldCom(false);
    setOpenDelete(true);
  };

  const handleSubmit = async (rest, stars, comment, isOldCom) => {
    setOpenDelete(false);
    if (isOldCom) {
      const date = getDate();
      const response = await editComment(rest, stars, comment, date);

      getComments(rest).then(comments => {
        setAllcomments(comments);
      });
      setOpen(true);
    } else {
      if (comment !== "") {
        const date = getDate();
        const response = await newComment(rest, stars, comment, date);

        getComments(rest).then(comments => {
          setAllcomments(comments);
        });
        setIsOldCom(true);
        setOpen(true);
        // response.data.isComment ? setIscomment(true) : setIscomment(false);
      } else {
        setValidated(true);
      }
    }
  };

  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent"
  };

  console.log(pos && pos.Latitude);

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
            <Rating name="read-only" value={value} readOnly />
          </Box>
          <p>{info && info.totalComments} comments</p>
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
                <Avatar
                  style={{
                    width: 50,
                    height: 50
                  }}
                  src={info && info.owner.image}
                ></Avatar>

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
              <MapContainer>
                {pos && (
                  <MapLeaflet
                    lat={pos.Latitude}
                    long={pos.Longitude}
                  ></MapLeaflet>
                )}
              </MapContainer>
            </Contact>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {allcomments &&
              allcomments.map(comment => {
                return (
                  <Opinion>
                    <Owner>
                      <Avatar
                        style={{
                          width: 50,
                          height: 50
                        }}
                        src={comment.user.image}
                      ></Avatar>

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
            {isOldCom ? (
              <TitComment>Edit comment</TitComment>
            ) : (
              <TitComment>Add comment</TitComment>
            )}
            <hr style={{ color: s.dark, width: "100%", marginBottom: 15 }} />
            <form
              onSubmit={e => {
                e.preventDefault();
                if (session) {
                  handleSubmit(rest, stars, comment, isOldCom);
                } else {
                  history.push("/login");
                }
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
                {isOldCom ? (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      style={{ marginRight: 10 }}
                    >
                      Edit comment
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteCom(rest)}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" color="secondary" type="submit">
                    Add comment
                  </Button>
                )}
              </ContBtnComment>
              <div style={{ width: "100%", marginTop: 10 }}>
                <Collapse in={open}>
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
                    {isOldCom ? (
                      <>Comment edited!</>
                    ) : (
                      <>Thank you for your comment!</>
                    )}
                  </Alert>
                </Collapse>

                <Collapse in={openDelete}>
                  <Alert
                    severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenDelete(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Comment deleted!
                  </Alert>
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
                  style={{
                    maxWidth: 150,
                    margin: "auto",
                    display: "block",
                    padding: "5px 35px"
                  }}
                  onClick={() => history.push(`/restaurant/${info._id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  component={Link}
                  style={{
                    maxWidth: 150,
                    color: s.error,
                    margin: "auto",
                    display: "block",
                    textAlign: "center",
                    marginTop: 15,
                    padding: "5px 35px"
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
      {/* <Divider></Divider>
      <BgHome>
        <ContBody>
          <Grid container spacing={2}>
            {plans && plans.length === 0 ? (
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
      </BgHome> */}

      <Footer></Footer>
    </>
  );
};
