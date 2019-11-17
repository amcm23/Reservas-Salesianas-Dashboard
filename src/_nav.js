export default {
  items: [
    {
      name: "Inicio",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      title: true,
      name: "Gestiones",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Usuarios",
      url: "/users",
      icon: "icon-people"
    },
    {
      name: "Espacios",
      url: "/spaces",
      icon: "icon-pencil"
    },
    {
      name: "Reservas",
      url: "/reservations",
      icon: "icon-pencil"
    }
  ]
};
