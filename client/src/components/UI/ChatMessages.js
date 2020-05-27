import React from "react";
import {
  ContainerContact,
  ContainerUser,
  ContactMsg,
  QuoteContact,
  UserMsg,
  QuoteUser
} from "../styled/ChatStyled";

export const ContactMessage = ({ textMessage }) => {
  return (
    <ContainerContact>
      <ContactMsg>
        {textMessage}
        <QuoteContact src="quotes.svg"></QuoteContact>
      </ContactMsg>
    </ContainerContact>
  );
};

export const UserMessage = ({ textMessage }) => {
  return (
    <ContainerUser>
      <UserMsg>
        {textMessage}
        <QuoteUser src="quote-user.svg"></QuoteUser>
      </UserMsg>
    </ContainerUser>
  );
};
