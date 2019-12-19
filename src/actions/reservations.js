import axios from "axios";

export function fetchReservations(done = () => {}) {
  axios
    .get(`https://reservas.rota.salesianas.com/public/reservas.php/reservas`)
    .then(res => {
      done(res.data);
      console.log("reservas: ", res.data);
    });
}

export function fetchReservationsFromSpace(id, done = () => {}) {
  axios
    .get(
      `https://reservas.rota.salesianas.com/public/espacios.php/reservas/${id}`
    )
    .then(res => {
      done(res.data);
      console.log("reservas: ", res.data);
    });
}

export function editReservation(data, id, done = () => {}) {
  axios({
    method: "put",
    url: `https://reservas.rota.salesianas.com/public/reservas.php/reservas/modificar/${id}`,
    data: data
  }).then(res => {
    console.log(res);
    console.log(res.data);
    done();
  });
}

export function createReservation(data, done = () => {}) {
  axios({
    method: "post",
    url: "https://reservas.rota.salesianas.com/public/reservas.php/reservas",
    data: data
  }).then(res => {
    console.log(res);
    console.log(res.data);
    done();
  });
}

export function deleteReservation(id, done = () => {}) {
  axios
    .delete(
      `https://reservas.rota.salesianas.com/public/reservas.php/reservas/delete/${id}`
    )
    .then(result => {
      fetchReservations();
      done();
    });
}
