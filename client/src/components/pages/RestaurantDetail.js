import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../service/authService";
import { useHistory } from "react-router";
import "./../../App.css";
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
  MapContainer,
  ContImgResp
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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { Rating, Alert } from "@material-ui/lab";
import {
  ContBody,
  BodyText,
  BodyLight,
  s,
  Error,
  EditCont,
  EditContBar
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
  checkIfManager,
  deleteRestaurant
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
  const [openNew, setOpenNew] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdited, setOpenEdited] = useState(false);
  const [iscomment, setIscomment] = useState();
  const [ismanager, setIsmanager] = useState(false);
  const [isOldCom, setIsOldCom] = useState(false);
  const [value, setValue] = useState(2);
  const [pos, setPos] = useState();
  const [totComments, setTotalComments] = useState();

  useEffect(() => {
    const id = props.match.params.id;
    getPlansOfRestaurant(id).then(plans => {
      setPlans(plans);
    });
    fetchSingleRestaurant(id).then(restaurant => {
      setInfo(restaurant.restaurantId);
      setValue(restaurant.restaurantId.rateAv);
      setAllcomments(restaurant.commentsRes);
      setTotalComments(restaurant.restaurantId.totalComments);
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

  const id = props.match.params.id;
  const rest = info && info._id;
  const getDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return dd + "-" + mm + "-" + yyyy;
  };

  // const editCom = async () => {
  //   setOpen(false);
  //   const response = await deleteComment(rest);
  //   getComments(rest).then(comments => {
  //     setAllcomments(comments);
  //   });
  //   setIsOldCom(false);
  //   setOpenDelete(true);
  // };

  const handleClickOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleDelete = id => {
    deleteRestaurant(id).then(del => {
      console.log(del);
    });
    history.push("/owner/admin");
  };

  const commentDelete = id => {
    deleteComment(id).then(comment => {
      console.log(comment);
      getComments(id).then(comments => {
        setAllcomments(comments);
      });
      fetchSingleRestaurant(rest).then(restaurant => {
        setValue(restaurant.restaurantId.rateAv);
        setTotalComments(restaurant.restaurantId.totalComments);
      });
    });
    setIsOldCom(false);
    setOpenDelete(true);
    setOpenEdited(false);
    setOpenNew(false);
  };

  const handleSubmit = async (rest, stars, comment, isOldCom) => {
    if (comment !== "") {
      setOpenDelete(false);

      if (isOldCom) {
        setOpenNew(false);
        const date = getDate();
        const response = await editComment(rest, comment, date);

        getComments(rest).then(comments => {
          setAllcomments(comments);
        });
        setOpenEdited(true);
      } else {
        setOpenEdited(false);
        const date = getDate();
        const response = await newComment(rest, stars, comment, date);

        getComments(rest).then(comments => {
          setAllcomments(comments);
        });
        fetchSingleRestaurant(rest).then(restaurant => {
          setValue(restaurant.restaurantId.rateAv);
          setTotalComments(restaurant.restaurantId.totalComments);
        });
        setIsOldCom(true);
        setOpenNew(true);
        // response.data.isComment ? setIscomment(true) : setIscomment(false);
      }
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

  console.log(pos && pos.Latitude);

  return info === 0 ? (
    <Backdrop style={{ zIndex: 1000 }} open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  ) : (
    <>
      {ismanager && (
        <EditContBar>
          <Button
            variant="contained"
            color="secondary"
            style={{ minWidth: 150, margin: "auto", display: "block" }}
            onClick={() => history.push(`/plan/${id}/edit`)}
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
            onClick={handleClickOpenDel}
          >
            Delete
          </Button>
        </EditContBar>
      )}
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
          <p>{totComments && totComments} comments</p>
        </Rates>
        <ImgCont>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <img
                src={info && info.image1 ? info.image1 : "/placeholder4.jpg"}
                width="100%"
                height="auto"
                data-aos="fade-down"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <img
                    src={
                      info && info.image2 ? info.image2 : "/placeholder4.jpg"
                    }
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="100"
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <img
                    src={
                      info && info.image3 ? info.image3 : "/placeholder4.jpg"
                    }
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="200"
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} className="imgMov">
                  <img
                    src={
                      info && info.image4 ? info.image4 : "/placeholder4.jpg"
                    }
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="300"
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} className="imgMov">
                  <img
                    src={
                      info && info.image5 ? info.image5 : "/placeholder4.jpg"
                    }
                    width="100%"
                    height="auto"
                    data-aos="fade-down"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-delay="400"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ImgCont>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Contact
              data-aos="fade-right"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="0"
            >
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
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-delay="100"
          >
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
                  readOnly={isOldCom ? true : false}
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
                      onClick={() => commentDelete(id)}
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
                <Collapse in={openNew}>
                  <Alert
                    severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenNew(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Thank you for your comment!
                  </Alert>
                </Collapse>

                <Collapse in={openEdited}>
                  <Alert
                    severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenEdited(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Comment edited!
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
                  onClick={handleClickOpenDel}
                >
                  Delete
                </Button>
              </EditCont>
            )}
            <IconsCont
              data-aos="fade-right"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-delay="200"
            >
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
      <div>
        <Dialog
          open={openDel}
          onClose={handleCloseDel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <>
            <DialogTitle id="alert-dialog-title" style={{ color: s.dark }}>
              {"Confirm delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure that you want to delete this restaurant?<br></br>
                <span style={{ color: s.error }}>
                  All associated plans will be deleted too.
                </span>
              </DialogContentText>
            </DialogContent>
          </>

          <DialogActions>
            <Button onClick={handleCloseDel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(id)}
              color="secondary"
              variant="contained"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer></Footer>
    </>
  );
};
