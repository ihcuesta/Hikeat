import styled from "styled-components";

export const DesktopHeader = styled.div`
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`;

export const MobileHeader = styled.div`
  display: block;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const AvatarUser = styled.div`
  cursor: pointer;
`;
