import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));
const Spaces = React.lazy(() => import("./views/Spaces/Spaces"));
const Reservations = React.lazy(() =>
  import("./views/Reservations/Reservations")
);
const History = React.lazy(() => import("./views/History/History"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Inicio" },
  { path: "/dashboard", name: "Calendario", component: Dashboard },
  { path: "/users", exact: true, name: "Usuarios", component: Users },
  {
    path: "/users/:id",
    exact: true,
    name: "Detalles Usuario",
    component: User
  },
  { path: "/spaces", exact: true, name: "Espacios", component: Spaces },
  {
    path: "/reservations",
    exact: true,
    name: "Reservas",
    component: Reservations
  },
  {
    path: "/history",
    exact: true,
    name: "Historial",
    component: History
  }
];

export default routes;
