import React, { useState, useEffect } from "react";
import { useUser } from "../../service/authService";
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
import { ContactMessage, UserMessage } from "../UI/ChatMessages";
import { FooterAlt } from "../UI/Footer";
import { FormBg } from "../styled/Forms";
import { s, searchContact } from "../styled/globalStyles";
import SearchIcon from "@material-ui/icons/Search";
import { Form } from "../styled/Forms";
import io from "socket.io-client";
let socket = io("http://localhost:4000");

export const Chat = () => {
  const session = useUser();
  const [msg, setMsg] = useState({});
  const [allmsg, setAllmsg] = useState([]);

  const { message } = msg;

  const createMessage = e => {
    setMsg({ user: session.user.id, message: e.target.value });
  };

  useEffect(() => {
    socket.on("chat message", msg => {
      console.log("mensaje del socket: ", msg);
      setAllmsg([...allmsg, msg]);
      console.log(allmsg);
    });
  }, [allmsg]);

  // Chat message
  const handleSubmit = msg => {
    socket.emit("chat message", msg);
    setMsg({ user: session.user.id, message: "" });
  };

  // --------

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
                    <NameContact>Pedro</NameContact>
                    <LastMsgContact>Have a good weekend...</LastMsgContact>
                  </TextsContact>
                </Contact>
              </Contacts>
            </Grid>
            <Grid item xs={12} md={9} lg={7}>
              <ChatMessages>
                <Messages>
                  <WrapperChatMsg>
                    {allmsg.map(ms => {
                      if (ms.user === session.user.id) {
                        return <UserMessage textMessage={ms.message} />;
                      } else {
                        return <ContactMessage textMessage={ms.message} />;
                      }
                    })}
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
                      name="message"
                      value={message}
                      onChange={createMessage}
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
