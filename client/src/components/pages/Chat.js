import React, { useState, useEffect } from "react";
import { Grid, OutlinedInput, InputAdornment, Avatar } from "@material-ui/core";
import {
  ChatCont,
  InfoContact,
  Contacts,
  Contact,
  TextsContact,
  LastMsgContact,
  NameContact,
  ChatMessages,
  ContactMsg,
  QuoteContact,
  UserMsg,
  ContactMsgCont,
  UserMsgCont,
  QuoteUser,
  SectionType,
  TypeInput,
  Send,
  Messages,
  WrapperChatMsg
} from "../styled/ChatStyled";
import { FooterAlt } from "../UI/Footer";
import { FormBg } from "../styled/Forms";
import { s, searchContact } from "../styled/globalStyles";
import SearchIcon from "@material-ui/icons/Search";
import { Form } from "../styled/Forms";
import io from "socket.io-client";

export const Chat = () => {
  const [msg, setMsg] = useState("");

  // useEffect(() => {

  //   }, []);

  const handleSubmit = msg => {
    const socket = io(process.env.REACT_APP_URL_BACK);
    socket.emit("chat message", msg);
    setMsg("");
  };

  return (
    <>
      <FormBg>
        <ChatCont>
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={12} md={3} lg={3} style={{ height: "100%" }}>
              <Contacts>
                <OutlinedInput
                  placeholder="Search conversation"
                  style={{
                    height: 40,
                    padding: 10,
                    width: "100%",
                    marginBottom: 20
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
                <Contact>
                  <Avatar
                    style={{
                      width: 50,
                      height: 50
                    }}
                  ></Avatar>
                  <TextsContact>
                    <NameContact>Giorgio</NameContact>
                    <LastMsgContact>Have a good weekend...</LastMsgContact>
                  </TextsContact>
                </Contact>
              </Contacts>
            </Grid>
            <Grid item xs={12} md={9} lg={7}>
              <ChatMessages>
                <Messages>
                  <WrapperChatMsg>
                    <ContactMsgCont>
                      <ContactMsg>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dolore facere quisquam quibusdam est quaerat
                        accusantium ipsum alias?
                        <QuoteContact src="quotes.svg"></QuoteContact>
                      </ContactMsg>
                    </ContactMsgCont>
                    <UserMsgCont>
                      <UserMsg>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dolore facere quisquam quibusdam est quaerat
                        accusantium ipsum alias?
                        <QuoteUser src="quote-user.svg"></QuoteUser>
                      </UserMsg>
                    </UserMsgCont>
                  </WrapperChatMsg>
                </Messages>

                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(msg);
                  }}
                >
                  <SectionType>
                    <TypeInput
                      value={msg}
                      onChange={e => setMsg(e.target.value)}
                    />

                    <Send type="submit" value="SEND" />
                  </SectionType>
                </Form>
              </ChatMessages>
            </Grid>
            <Grid item xs={12} lg={2}>
              <InfoContact></InfoContact>
            </Grid>
          </Grid>
        </ChatCont>
      </FormBg>
      <FooterAlt style={{ marginTop: 0 }}></FooterAlt>
    </>
  );
};
