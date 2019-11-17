import React from "react";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));
const Spaces = React.lazy(() => import("./views/Spaces/Spaces"));
const Reservations = React.lazy(() =>
  import("./views/Reservations/Reservations")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/spaces", exact: true, name: "Spaces", component: Spaces },
  {
    path: "/reservations",
    exact: true,
    name: "Reservations",
    component: Reservations
  }
];

export default routes;
