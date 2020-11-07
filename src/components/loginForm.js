import React, { useState } from "react";
import Input from "./input";
import Joi from "joi-browser";

export default function LoginForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password } = account;

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);
    if (!error) return null;

    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
  };

  const validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value,
    };
    const dynamicSchema = {
      [name]: schema[name],
    };
    const { error } = Joi.validate(obj, dynamicSchema);
    return error ? error.details[0].message : null;
  };
  const handleChange = ({ currentTarget: input }) => {
    const errorsCopy = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsCopy[input.name] = errorMessage;
    else delete errorsCopy[input.name];

    const accountCopy = { ...account };
    accountCopy[input.name] = input.value;
    setAccount(accountCopy);
    setErrors(errorsCopy);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          onChange={handleChange}
          value={username}
          label="Username"
          error={errors.username}
        />
        <Input
          name="password"
          onChange={handleChange}
          value={password}
          label="Password"
          error={errors.password}
        />
        <button type="submit" className="btn btn-primary" disabled={validate()}>
          Login
        </button>
      </form>
    </div>
  );
}
