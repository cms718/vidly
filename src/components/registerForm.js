import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";

export default class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    //call server
    console.log("submitted");
  };

  validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value,
    };
    const dynamicSchema = {
      [name]: this.schema[name],
    };
    const { error } = Joi.validate(obj, dynamicSchema);
    return error ? error.details[0].message : null;
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}
