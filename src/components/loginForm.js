import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
export default LoginForm;
