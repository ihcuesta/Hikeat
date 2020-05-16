import styled from "styled-components";
import { s } from "../styled/globalStyles";
import { quotes } from "../../images/quotes.png";

export const ChatCont = styled.div`
  max-width: 1350px;
  margin: 75px auto;
  -webkit-box-shadow: 0 0 5px 1px #b0b0b0;
  box-shadow: 0 0 5px 1px #b0b0b0;
  height: calc(100vh - 100px);
  border-radius: 5px;
  background-color: #fff;
`;

export const InfoContact = styled.div`
  height: 100%;
  background-color: ${s.dark};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const Contacts = styled.div`
  padding: 3%;
  box-sizing: border-box;
  border-right: 1px solid #eee;
  height: 100%;
`;

export const Contact = styled.div`
  width: 100%;
  padding: 10px 5px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

export const TextsContact = styled.div`
  margin-top: -12px;
  margin-left: 15px;
`;

export const NameContact = styled.p`
  font-size: 16px;
`;

export const LastMsgContact = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin-top: -12px;
  font-weight: 400;
`;

export const ChatMessages = styled.div`
  padding: 15px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
`;

export const Messages = styled.div`
  position: relative;
  height: calc(100% - 70px);
  overflow-y: hidden;
`;

export const WrapperChatMsg = styled.div`
  position: absolute;
  bottom: 0px;
`;

export const ContactMsgCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

export const ContactMsg = styled.div`
  padding: 15px;
  width: 70%;
  background-color: #eee;
  margin-left: 25px;
  position: relative;
  border-radius: 0px 5px 5px 5px;
  margin-bottom: 20px;
`;

export const QuoteContact = styled.img`
  position: absolute;
  top: 0px;
  left: -20px;
`;

export const UserMsgCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const UserMsg = styled.div`
  padding: 15px;
  width: 70%;
  justify-content: flex-end;
  background-color: ${s.primary};
  margin-right: 25px;
  position: relative;
  border-radius: 5px 0px 5px 5px;
  margin-bottom: 20px;
  color: #fff;
`;

export const QuoteUser = styled.img`
  position: absolute;
  top: 0px;
  right: -20px;
`;

export const SectionType = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: 70px;
  background-color: #eee;
  padding: 15px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

export const TypeInput = styled.input`
  width: calc(100% - 80px);
  border-radius: 5px 0px 0px 5px;
  border-top: 1px solid #d7d7d7;
  border-left: 1px solid #d7d7d7;
  border-bottom: 1px solid #d7d7d7;
  font-size: 16px;
  color: ${s.dark};
  padding-left: 10px;
`;

export const Send = styled.button`
  width: 80px;
  border-radius: 0px 5px 5px 0px;
  background-color: ${s.primary};
  color: #fff;
  border: 1px solid ${s.primary};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #009fa6;
  }
`;
