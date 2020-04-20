import React from "react";
import styled from "styled-components";
import formBg from "../../images/form-bg.jpg";
import { s } from "../styled/globalStyles";

export const FormBg = styled.div`
  width: 100%;
  background-image: url(${formBg});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

export const FormTitle = styled.h1`
  color: ${s.primary};
  font-size: 36px;
  text-align: center;
  margin-top: 100px;
`;

export const FormCont = styled.div`
  max-width: 750px;
  padding: 5%;
  box-sizing: border-box;
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

export const Submit = styled.input`
  width: 100%;
  height: 60px;
  background-color: ${s.secondary};
  color: #fff;
  font-size: 1.1428571428571428rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0px solid white;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
`;

export const Form = styled.form`
  margin-top: 0px;
`;

export const RadioCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
