import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";

export default function Login(props) {
  console.log(props);

  let [user, setUser] = useState({ email: "", password: "" });
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
        `https://route-egypt-api.herokuapp.com/signin`,
        user
      );

      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        props.getUserInfo();
        props.history.push("/home");
        setLoading(false);
      } else {
        setLoading(false);
        setError(data.message);
      }
    }
  }
  function validateRegisterForm() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[A-Z][a-z]{2,8}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <div>
      <div className="w-75 mx-auto py-4 ">
        <h1>Login Now <i class="fas fa-sign-in-alt"></i></h1>
        <form onSubmit={formSubmit}>
          {error && <div className="alert alert-danger"> {error} </div>}
          {errorLisrt.map((error, index) =>
            index === -1 ? (
              <div className="alert alert-danger"> password invalid </div>
            ) : (
              <div className="alert alert-danger"> {error.message}</div>
            )
          )}

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
            <label htmlFor="password">Password :</label>
            <input
              onChange={getUser}
              type="password"
              className="form-control"
              name="password"
            />
          </div>

          <button type="submit " className="btn btn-info " >
            
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login "}
            <i class="fas fa-check-circle"></i>
            


          </button>
        </form>
      </div>
    </div>
  );
}
