import React from "react";
import styled from "styled-components";
import loading from "./loading.gif";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  img {
    width: 50px;
  }
`;

export const Loading = () => (
  <LoadingWrapper>
    <img src={loading} />
  </LoadingWrapper>
);
