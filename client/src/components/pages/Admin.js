import React from "react";
import { useUser } from "../../service/authService";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Avatar
} from "@material-ui/core";
import {
  HeaderAdmin,
  Pic,
  Name,
  Role,
  Fav,
  ContFav,
  ContTit,
  Level,
  WrapperResp,
  TextAlign
} from "../styled/Admin";
import { ContBody } from "../styled/globalStyles";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import ExploreIcon from "@material-ui/icons/Explore";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

export const Admin = ({ history }) => {
  const session = useUser();

  return (
    <>
      {session && (
        <ContBody>
          <HeaderAdmin>
            <Grid container>
              <Grid item xs={12} sm={12} md={4} style={{ minHeight: 300 }}>
                <Pic>
                  <Avatar
                    style={{
                      width: 250,
                      height: 250
                    }}
                    src={session.user.image}
                  ></Avatar>
                </Pic>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <WrapperResp>
                  <ContTit>
                    <Name>{session.user.username}</Name>

                    {session.user.role === "Hiker" ? (
                      <Role>
                        <FilterHdrIcon
                          style={{ color: "#FFF" }}
                        ></FilterHdrIcon>
                        <h3>Hiker</h3>
                      </Role>
                    ) : (
                      <Role>
                        <RestaurantMenuOutlinedIcon
                          style={{ color: "#FFF" }}
                        ></RestaurantMenuOutlinedIcon>
                        <h3>Restaurant owner</h3>
                      </Role>
                    )}
                  </ContTit>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={6} spacing={10}>
                      <p style={{ color: "#FFF" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laborum unde totam facere labore quaerat necessitatibus
                        placeat. Fuga deserunt doloribus maiores pariatur sunt.
                        Harum totam sint dolor.
                      </p>
                      {session.user.role === "Hiker" ? (
                        <>
                          <TextAlign>
                            <p style={{ color: "#FFF" }}>Favourite hike:</p>
                            <p style={{ marginTop: -15, color: "#FFF" }}>
                              <i>El Pico del Fraile</i>
                            </p>
                          </TextAlign>
                        </>
                      ) : (
                        <>
                          <TextAlign>
                            <p style={{ color: "#FFF" }}>Favourite course:</p>
                            <p style={{ marginTop: -15, color: "#FFF" }}>
                              <i>Espaguettis Carbonara</i>
                            </p>
                          </TextAlign>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} spacing={10}>
                      {session.user.role === "Hiker" ? (
                        <ContFav>
                          <Fav>
                            <ExploreIcon></ExploreIcon>
                            <p>45 kms</p>
                          </Fav>
                          <Fav>
                            <RestaurantIcon></RestaurantIcon>
                            <p>10 plans</p>
                          </Fav>
                        </ContFav>
                      ) : (
                        <ContFav>
                          <Fav>
                            <DirectionsWalkIcon></DirectionsWalkIcon>
                            <p>70 hikers</p>
                          </Fav>
                          <Fav>
                            <RestaurantIcon></RestaurantIcon>
                            <p>25 plans</p>
                          </Fav>
                          <TextAlign>
                            <p style={{ color: "#FFF" }}>LEVEL 1</p>
                          </TextAlign>
                          <Level>Newie</Level>
                        </ContFav>
                      )}
                    </Grid>
                  </Grid>
                </WrapperResp>
              </Grid>
            </Grid>
          </HeaderAdmin>
        </ContBody>
      )}
    </>
  );
};
