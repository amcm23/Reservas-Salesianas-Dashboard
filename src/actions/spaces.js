import axios from "axios";

export function fetchSpaces(done = () => {}) {
  axios
    .get(`https://reservas.rota.salesianas.com/public/espacios.php/espacios`)
    .then(res => {
      done(res.data);
      console.log("ESPACIOS: ", res.data);
    });
}

export function editSpaces(data, id, done = () => {}) {
  axios({
    method: "put",
    url: `https://reservas.rota.salesianas.com/public/espacios.php/espacios/modificar/${id}`,
    data: data
  }).then(res => {
    console.log(res);
    console.log(res.data);
    done();
  });
}

export function createSpace(data, done = () => {}) {
  axios({
    method: "post",
    url: "https://reservas.rota.salesianas.com/public/espacios.php/espacios",
    data: data
  }).then(res => {
    console.log(res);
    console.log(res.data);
    done();
  });
}

export function deleteSpaces(id, done = () => {}) {
  axios
    .delete(
      `https://reservas.rota.salesianas.com/public/espacios.php/espacios/delete/${id}`
    )
    .then(result => {
      fetchSpaces();
      done();
    });
}
