import React, { useContext } from "react";
import { login } from "../../service/authService";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";

export default function Login({ history }) {
  const { register, handleSubmit, errors } = useForm();
  const { setUser } = useContext(AuthContext);
  const onSubmit = async data => {
    const response = await login(data);
    if (response.user) {
      setUser(response.user);
      history.push("/"); //redirect to home after login
    } else {
      console.log(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        name="Username"
        ref={register({ required: true, maxLength: 15 })}
      />
      <input
        type="text"
        placeholder="Password"
        name="Password"
        type="password"
        ref={register({ required: true, maxLength: 12 })}
      />

      <input type="submit" />
    </form>
  );
}
