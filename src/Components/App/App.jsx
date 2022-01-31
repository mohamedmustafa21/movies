import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Home from "../Home/Home";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Tvshows from "../Tvshows/Tvshows";
import Gallery from "../Gallery/Gallery";
import { useEffect, useState } from "react/cjs/react.development";
import jwtDecode from "jwt-decode";
import ProdectedRoute from "../ProdectedRoute/ProdectedRoute.jsx";

export default function App() {
  let history = useHistory();
  let [loginUser, setLoginUser] = useState(null);
  

  function getUserInfo() {
    let encodedToken = localStorage.getItem("userToken");
    let userData = jwtDecode(encodedToken);

    console.log(userData);
    setLoginUser(userData);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setLoginUser(null);
    history.push("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserInfo();
    }
  }, []);

  return (
    <div className="App">
      <Navbar loginUser={loginUser} logOut={logOut} />

      <div className="container">
        <Switch>
          <ProdectedRoute path="/movies" component={Movies} />
          <ProdectedRoute path="/Tvshows" component={Tvshows} />
          <ProdectedRoute path="/gallery" component={Gallery} />
          <ProdectedRoute path="/home" component={Home} loginUser={loginUser} />
          <Route path="/register" render={(props) => <Register {...props} />} /> 
          <Route
            path="/login"
            render={(props) => <Login {...props} getUserInfo={getUserInfo} />}
          />
          <Redirect from="/" exact to="/home" />
        </Switch>
      </div>
    </div>
  );
}
