import React from "react";
import { doSignup, useUserSetter } from "../../service/authService";
import { useForm } from "react-hook-form";
import { Form } from "../styled/Form";

export const Signup = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const setUser = useUserSetter();
  const onSubmit = async data => {
    const response = await doSignup(data);
    console.log(response);
    if (response.username) {
      setUser(response.username);
      history.push("/"); //redirect to home after signup & login
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
        ref={register({
          required: {
            value: true,
            message: "Username required"
          }
        })}
      />
      {errors.username ? <span>{errors.username.message}</span> : ""}
      <br />
      <input
        type="text"
        placeholder="Password"
        type="password"
        name="password"
        ref={register({
          required: {
            value: true,
            message: "Password required"
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              "The password shoud include minimum eight characters, at least one letter and one number"
          }
        })}
      />
      {errors.password ? <span>{errors.password.message}</span> : ""}
      <br />
      <input
        name="role"
        type="radio"
        value="Hiker"
        ref={register({
          required: {
            value: true,
            message: "Role required"
          }
        })}
      />
      <label htmlFor="huey">Hiker</label>
      <br />
      <input
        name="role"
        type="radio"
        value="Restaurant Owner"
        ref={register({
          required: {
            value: true,
            message: "Role required"
          }
        })}
      />
      <label htmlFor="huey">Restaurant Owner</label>
      <br />
      {errors.role ? <span>{errors.role.message}</span> : ""}
      <textarea
        name="description"
        ref={register({
          required: {
            value: true,
            message: "Description required"
          },
          maxLength: 100
        })}
      />
      <br />
      {errors.description ? <span>{errors.description.message}</span> : ""}
      <input type="submit" />
    </Form>
  );
};
