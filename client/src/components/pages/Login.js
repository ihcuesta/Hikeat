import React from "react";
import { doLogin, useUserSetter } from "../../service/authService";
import { useForm } from "react-hook-form";
import { Form, FormBg, FormCont, FormTitle } from "../styled/Forms";
import { TextField, Button } from "@material-ui/core";
import { s, txtField } from "../styled/globalStyles";
import { FooterAlt } from "../UI/Footer";

export const Login = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const setUser = useUserSetter();
  const onSubmit = async data => {
    console.log(data);
    const response = await doLogin(data);
    if (response) {
      setUser(response);
      history.push("/"); //redirect to home after login
    } else {
      console.log(errors);
    }
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
              InputProps={txtField}
            />

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
              InputProps={txtField}
            />

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
      </FormBg>
      <FooterAlt></FooterAlt>
    </>
  );
};
