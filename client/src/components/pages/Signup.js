import React from "react";
import { doSignup, useUserSetter } from "../../service/authService";
import { useForm } from "react-hook-form";
import { Form, FormBg, FormCont, FormTitle, RadioCont } from "../styled/Forms";
import {
  TextField,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { s, txtField } from "../styled/globalStyles";

export const Signup = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const setUser = useUserSetter();
  const onSubmit = async data => {
    const response = await doSignup(data);
    console.log(response.username);
    if (response) {
      setUser(response);
      history.push("/"); //redirect to home after signup & login
    } else {
      console.log(errors);
    }
  };

  return (
    <FormBg>
      <FormTitle>Sign up</FormTitle>
      <FormCont>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            placeholder="Like Hikwoman o SuperHiker 😜"
            id="username"
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            size="medium"
            fullWidth="true"
            inputRef={register({
              required: {
                value: true,
                message: "Username required"
              }
            })}
            InputProps={txtField}
          />
          {errors.username ? <span>{errors.username.message}</span> : ""}

          <TextField
            required
            placeholder="8 characters, at least 1 letter and 1 number"
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            size="medium"
            fullWidth="true"
            inputRef={register({
              required: {
                value: true,
                message: "Password required"
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "The password should include minimum eight characters, at least one letter and one number"
              }
            })}
            InputProps={txtField}
          />
          {errors.password ? <span>{errors.password.message}</span> : ""}

          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup required aria-label="role" name="role">
            <RadioCont>
              <FormControlLabel
                required
                style={{ color: s.dark, marginRight: 30 }}
                value="Hiker"
                control={<Radio color="primary" />}
                label="Hiker"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Role required"
                  }
                })}
              />
              <FormControlLabel
                required
                style={{ color: s.dark }}
                value="Restaurant Owner"
                control={<Radio color="primary" />}
                label="Restaurant"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Role required"
                  }
                })}
              />
            </RadioCont>
          </RadioGroup>
          {errors.role ? <span>{errors.role.message}</span> : ""}

          <TextField
            required
            id="description"
            name="description"
            label="Description"
            multiline
            rows="4"
            fullWidth="true"
            placeholder="Write about you and your love to hiking! 😎"
            variant="outlined"
            inputRef={register({
              required: {
                value: true,
                message: "Description required"
              },
              maxLength: 100
            })}
            InputProps={txtField}
          />
          {errors.description ? <span>{errors.description.message}</span> : ""}

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
          >
            SIGN UP
          </Button>
        </Form>
      </FormCont>
    </FormBg>
  );
};
