import React from "react";
import styled from "styled-components";
import { s } from "../styled/globalStyles";
import frameAdmin from "../../images/frame-admin2.png";

export const HeaderAdmin = styled.div`
  background-color: ${s.primary};
  min-height: 300px;
  max-width: 1100px;
  border-radius: 5px;
  padding-bottom: 30px;

  @media (min-width: 960px) {
    margin: 100px auto 50px;
  }
`;

export const Pic = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-top: 40px;

  @media (min-width: 960px) {
    display: block;
    background-image: url(${frameAdmin});
    background-position: left top;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    width: 100%;

    padding-left: 25px;
    padding-top: 25px;
    box-sizing: border-box;
  }

  @media (min-width: 910px) {
    background-size: contain;
  }
`;

export const Name = styled.h2`
  font-weight: 400;
  font-size: 35px;
  color: #fff;
`;

export const Role = styled.div`
  width: 100px;
  margin: auto;
  display: block;

  && h3 {
    font-size: 20px;
    color: #fff;
    font-weight: 300;
    margin-left: 10px;
  }
  @media (min-width: 600px) {
    margin: -40px 0px 0px 0px;
    justify-content: flex-start;
  }
`;

export const RoleWrap = styled.div`
  display: flex;
  flex-direction: row wrap;
  align-items: center;
  margin-top: -30px;
  width: 100px;
  justify-content: space-between;
`;

export const Fav = styled.div`
  display: flex;
  flex-direction: row wrap;
  align-items: center;
  justify-content: center;

  && p {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }
`;

export const ContFav = styled.div`
  max-width: 200px;
  margin: auto;
`;

export const Level = styled.div`
  border-radius: 20px;
  background-color: ${s.secondary};
  text-align: center;
  padding: 7px 0px;
  color: #fff;
  margin-top: 5px;
`;

export const ContTit = styled.div`
  text-align: center;

  @media (min-width: 600px) {
    text-align: left;
  }
`;

export const WrapperResp = styled.div`
  padding-right: 5%;
  padding-left: 5%;

  @media (min-width: 960px) {
    padding: 0;
  }
`;

export const TextAlign = styled.div`
  text-align: center;
  margin-top: 20px;

  @media (min-width: 600px) {
    text-align: left;
  }
`;

export const TitBookings = styled.h2`
  text-align: center;
  margin: 70px 0px 40px;
`;

export const NumHikers = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding: 5px 20px;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  background-color: #eee;

  && p {
    margin-left: 5px;
  }
`;

export const EditBookingCont = styled.div`
  width: 430px;

  border-radius: 5px;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  z-index: 950;
`;

export const GrayCont = styled.div`
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;

  && p {
    font-weight: 600;
  }
`;

export const DialogCont = styled.div`
  width: 700px;
  height: 600px;
  border-radius: 5px;
  background-color: ${s.primary};
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -350px;
  margin-left: -350px;
  z-index: 950;
  overflow: scroll;
`;

export const ContClose = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
`;

export const Descr = styled.p`
  color: #fff;
  min-height: 70px;
  text-align: center;

  @media (min-width: 600px) {
    text-align: left;
  }
`;

export const BgAdmin = styled.div`
  width: 100%;

  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#1e5799+0,ffffff+0,eeeeee+100 */
  background: #1e5799; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #1e5799 0%,
    #ffffff 0%,
    #eeeeee 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #1e5799 0%,
    #ffffff 0%,
    #eeeeee 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #1e5799 0%,
    #ffffff 0%,
    #eeeeee 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#eeeeee',GradientType=0 ); /* IE6-9 */
`;
