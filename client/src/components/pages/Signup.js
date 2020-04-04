import React, { useContext } from "react";
import { signup } from "../../service/authService";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";

export default function Signup({ history }) {
  const { register, handleSubmit, errors } = useForm();
  const { setUser } = useContext(AuthContext);
  const onSubmit = async data => {
    const response = await signup(data);
    console.log(response);
    if (response.username) {
      setUser(response.username);
      history.push("/"); //redirect to home after signup & login
    } else {
      console.log(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        ref={register({ required: true, maxLength: 15 })}
      />
      <input
        type="text"
        placeholder="Password"
        type="password"
        name="password"
        ref={register({ required: true, maxLength: 12 })}
      />

      <input
        name="role"
        type="radio"
        value="Hiker"
        ref={register({ required: true })}
      />
      <input
        name="role"
        type="radio"
        value="Restaurant Owner"
        ref={register({ required: true })}
      />
      <textarea
        name="description"
        ref={register({ required: true, maxLength: 100 })}
      />

      <input type="submit" />
    </form>
  );
}
