import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Dashboard(props) {
  const loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  return (
    <div className="animated fadeIn">
      <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
    </div>
  );
}

export default Dashboard;
