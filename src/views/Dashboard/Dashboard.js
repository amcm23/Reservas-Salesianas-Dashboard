import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container, Card, CardText, CardBody } from "reactstrap";
import moment from "moment";
import { fetchHoursBySpaceId } from "../../actions/hours";
import { fetchSpaces } from "../../actions/spaces";
import AddReservationModal from "../Reservations/AddReservationModal";
import Swal from "sweetalert2";

// moment.locale('es')
moment.locale("es", {
  week: {
    dow: 1,
    doy: 1
  }
});

function Dashboard(props) {
  useEffect(() => {
    fetchSpaces(res => {
      setSpaces(res);
      fetchHoursBySpaceId(res[0].ID, res => {
        setHours(res);
      });
    });
  }, []);

  const [spaces, setSpaces] = useState([{}]);
  const [selectedSpace, setSelectedSpace] = useState(false);
  const [hours, setHours] = useState([]);
  const spaceHours = [];
  const [addModal, setAddModal] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    work_week: "Semana Lab",
    day: "Día",
    agenda: "Agenda",
    date: "fecha",
    time: "hora",
    event: "envento",
    showMore: total => `+ total (${total})`
  };

  function handleSelectSpace(id) {
    setSelectedSpace(id);
    fetchHoursBySpaceId(id, res => {
      setHours(res);
    });
  }

  if (Array.isArray(hours)) {
    for (let i = 0; i < hours.length; i++) {
      spaceHours[i] = {
        id: hours[i].ID,
        disponible: hours[i].DISPONIBLE,
        espacio: hours[i].ESPACIO,
        dia: hours[i].DIA,
        hora: hours[i].HORA,
        startTime: hours[i].HORA,
        title: `${moment(hours[i].HORA, "HH:mm:ss").format("HH:mm")}`,
        color: hours[i].DISPONIBLE === "1" ? `#5de3da` : `gray`,
        borderColor: "dark",
        border: "100px",
        daysOfWeek: [hours[i].DIA],
        size: 100,
        allDay: false
      };
    }
  }

  return (
    <Container className="animated fadeIn">
      <AddReservationModal
        modal={addModal}
        hour={selectedHour}
        day={selectedDay}
        space={selectedSpace}
        showAddModalProps={() => setAddModal(false)}
      />
      <Card>
        <CardBody>
          <CardText>
            <p>Seleccione el espacio a mostrar en el calendario.</p>
            <p>
              <select onChange={e => handleSelectSpace(e.target.value)}>
                {spaces !== "No existen espacios en la BBDD." &&
                  spaces.map(space => {
                    return <option value={space.ID}>{space.NOMBRE}</option>;
                  })}
              </select>
            </p>
          </CardText>
        </CardBody>
      </Card>
      <FullCalendar
        displayEventTime={true}
        displayEventEnd={true}
        //allDayDefault={workshopEvents}
        locale="es"
        timeZone="GMT+1"
        firstDay={1}
        defaultView="dayGridWeek"
        messages={messages}
        allDayDefault={false}
        popup
        //localizer={localizer}
        allDaySlot={false}
        selectable={true}
        eventTextColor={"white"}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        events={hours !== "No existen espacios en la BBDD." && spaceHours}
        eventClick={function(info) {
          var eventObj = info.event;
          var event = eventObj.extendedProps;
          console.log("OBJECT CLICKED: ", eventObj);
          console.log("extended props --> ", event);
          console.log("day ---> ", moment(eventObj.start).format("DD-MM-YYYY"));
          if (event.disponible === "1") {
            setSelectedHour(event.hora);
            setSelectedDay(eventObj.start);
            setAddModal(true);
          } else {
            Swal.fire("Hora no disponible");
          }
        }}
        header={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek"
        }}
        buttonText={{
          today: "Hoy",
          month: "Mensual",
          week: "Semanal"
        }}
      />
    </Container>
  );
}

export default Dashboard;
