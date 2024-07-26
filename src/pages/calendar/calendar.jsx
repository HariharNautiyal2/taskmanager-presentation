import React, { useState, useEffect, useContext } from "react";
import { useTasks } from "../../hooks/use-tasks";
import "./calendar.scss";
import Sidebar from "../../component/sidebar/sidebar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContext } from "../../context/AuthContext";

const localizer = momentLocalizer(moment);

export default function BigCalendarView() {

  
  const { tasks, isLoadingTasks } = useTasks();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("Tasks in BigCalendarView:", tasks); // Debug log

    if (tasks) {
      const taskEvents = tasks.map((task) => ({
        title: task.name,
        start: new Date(task.startingDate),
        end: new Date(task.deadline),
        allDay: true,
      }));
      setEvents(taskEvents);
    }
  }, [tasks]);

  return (
    <div className="lex flex-row h-screen w-full">
      <Sidebar />
      <div className="flex-grow h-full flex flex-col p-5 space-y-1">
      {isLoadingTasks ? (
          <div>Loading...</div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={['month']}
            style={{ height: 500 }}
          />
        )}
      </div>
    </div>
  );
}
