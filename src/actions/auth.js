import axios from "axios";
import { withRouter } from "react-router-dom";

export function checkAuth(done = () => {}) {
  axios
    .post(
      ` https://reservas.rota.salesianas.com/public/usuarios.php/usuarios/logged`,
      { withCredentials: true }
    )
    .then(res => {
      done(res.data);
      console.log("AUTH --->", res.data);
    })
    .catch(err => {
      console.log(err);
      done(true);
    });

  axios
    .get(` https://reservas.rota.salesianas.com/public/usuarios.php/cookie`, {
      withCredentials: true
    })
    .then(res => {
      done(res.data);
      console.log("COOKIE --->", res.data);
    })
    .catch(err => {
      console.log(err);
      done(true);
    });
}

export function login(data, done = () => {}) {
  /*axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.post["Access-Control-Allow-Methods"] = "*";
  axios.defaults.headers.post["Access-Control-Allow-Headers"] = "*";*/
  axios
    .post(` https://reservas.rota.salesianas.com/public/usuarios.php/token`, {
      email: data.email,
      pass: data.password
    })
    .then(res => {
      done(res.data);
      console.log("LOGIN --->", res);
    })
    .catch(err => {
      console.log(err);
    });
}
