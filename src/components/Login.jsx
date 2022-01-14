import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [loginInputData, setLoginInputData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setLoginInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const result = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      loginInputData
    );
    if (result.status === 200) {
      localStorage.setItem('userId', result.data._id);
      props.history.push('/tasks');
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className="login-form">
      <h2>Sign In</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="exampleFormControlInput1"
          required
          value={loginInputData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="exampleFormControlInput2"
          required
          value={loginInputData.password}
          onChange={handleChange}
        />
      </div>
      <Link className="sign-up-link" to="/sign-up">
        Sign Up
      </Link>
      <br />
      <br />
      <button onClick={handleSubmit} type="button" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default withRouter(Login);
