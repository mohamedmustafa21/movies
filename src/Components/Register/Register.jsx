import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";

export default function Register(props) {



  
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  let [errorLisrt, setErrorList] = useState([]);

  let [error, setError] = useState("");

  let [loading, setLoading] = useState(false);


  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function formSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let validationResponse = validateRegisterForm();

    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);

      setLoading(false);
    } else {
      let { data } = await axios.post(
        `https://route-egypt-api.herokuapp.com/signup`,
        user
      );

      if (data.message === "success") {
        props.history.push("/login");
        setLoading(false);
      
      
      } else {
        setLoading(false);
        setError(data.message);
      }
    }
  }

  function validateRegisterForm() {
    let schema = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{2,8}$')),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div>
      <div className="w-75 mx-auto py-4 ">
        <h1>Register Now <i class="fs-3 fas fa-user-plus "></i></h1>
        <form onSubmit={formSubmit}>
          {error && <div className="alert alert-danger"> {error} </div>}
          {errorLisrt.map((error, index) =>
            index === 4 ? (
              <div className="alert alert-danger"> password invalid </div>
              
            )
            
            : (
              <div className="alert alert-danger"> {error.message}</div>
            )
          )}

          <div className="my-2">
            <label htmlFor="first_name">first Name :</label>
            <input
              onChange={getUser}
              type="text"
              className="form-control"
              name="first_name"
            />
          </div>
          <div className="my-2">
            <label htmlFor="last_name">Last Name :</label>
            <input
              onChange={getUser}
              type="text"
              className="form-control"
              name="last_name"
            />
          </div>
          <div className="my-2">
            <label htmlFor="age">Age :</label>
            <input
              onChange={getUser}
              type="age"
              className="form-control"
              name="age"
            />
          </div>
          <div className="my-2">
            <label htmlFor="email">Email :</label>
            <input
              onChange={getUser}
              type="email"
              className="form-control"
              name="email"
            />
          </div>
          <div className="my-2">
            <label htmlFor="password">Password : </label>
            <input
            
              onChange={getUser}
              type="password"
              className="form-control"
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-info">
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
