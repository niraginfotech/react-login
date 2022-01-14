import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {
  const [signupInputData, setSignupInputData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setSignupInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const result = await axios.post(
      "http://localhost:5000/api/v1/users/signup",
      signupInputData
    );
    if (result.status === 201) {
      localStorage.setItem('userId', result.data._id);
      props.history.push('/tasks');
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className="login-form">
      <h2>Sign Up</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput3" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput3"
          required
          name="first_name"
          value={signupInputData.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput4" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput4"
          required
          name="last_name"
          value={signupInputData.last_name}
          onChange={handleChange}
        />
      </div>
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
          value={signupInputData.email}
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
          value={signupInputData.password}
          onChange={handleChange}
        />
      </div>
      <Link className="sign-up-link" to="/sign-in">
        Sign In
      </Link>
      <br />
      <br />
      <button onClick={handleSubmit} type="button" className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default withRouter(Signup);
