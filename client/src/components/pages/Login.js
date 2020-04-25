import React, { useState } from "react";
import { doLogin, useUserSetter } from "../../service/authService";
import { useForm } from "react-hook-form";
import { Form, FormBg, FormCont, FormTitle } from "../styled/Forms";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { s, txtField } from "../styled/globalStyles";
import { FooterAlt } from "../UI/Footer";
import { Error, Gap } from "../styled/globalStyles";

export const Login = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const setUser = useUserSetter();
  const onSubmit = async data => {
    console.log(data);
    setValidated(true);
    const response = await doLogin(data);

    if (response.message === "Logged in successfully") {
      console.log("entra en success");
      setUser(response);
      history.push("/"); //redirect to home after login
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FormBg>
        <FormTitle>Log in</FormTitle>
        <FormCont>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              required
              id="username"
              type="text"
              name="username"
              label="Username"
              variant="outlined"
              size="medium"
              fullWidth="true"
              inputRef={register({ required: true })}
            />
            <Gap></Gap>
            <Gap></Gap>

            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              size="medium"
              fullWidth="true"
              inputRef={register({ required: true })}
            />

            <Gap></Gap>
            {/* {validated ? (
              
              <Error>Username or password are incorrect.</Error>
            ) : (
              ""
            )} */}
            <Gap></Gap>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
            >
              LOG IN
            </Button>
          </Form>
        </FormCont>
        <FooterAlt></FooterAlt>
      </FormBg>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <DialogTitle id="alert-dialog-title" style={{ color: s.dark }}>
            {"Error"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Username or password are incorrects.
            </DialogContentText>
          </DialogContent>
        </>

        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
