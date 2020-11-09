import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../components/input";
import Select from "../components/select";
export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errorsCopy = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errorsCopy[input.name] = errorMessage;
    else delete errorsCopy[input.name];

    const dataCopy = { ...this.state.data };
    dataCopy[input.name] = input.value;
    this.setState({ data: dataCopy, errors: errorsCopy });
  };

  handleSelect = ({ currentTarget: input }) => {
    const errorsCopy = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errorsCopy[input.name] = errorMessage;
    else delete errorsCopy[input.name];

    const dataCopy = { ...this.state.data };
    dataCopy[input.name] = input.value;
  };
  renderButton = (label) => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        options={options}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}
