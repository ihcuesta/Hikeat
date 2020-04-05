import React from "react";
import { doLogin, useUserSetter } from "../../service/authService";
import { useForm } from "react-hook-form";
import { Form } from "../styled/Form";

export const Login = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const setUser = useUserSetter();
  const onSubmit = async data => {
    const response = await doLogin(data);
    if (response.user) {
      setUser(response.user);
      history.push("/"); //redirect to home after login
    } else {
      console.log(errors);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        ref={register({ required: true, maxLength: 15 })}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        type="password"
        ref={register({ required: true, maxLength: 12 })}
      />

      <input type="submit" />
    </Form>
  );
};
