import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

function TrainingCalendar() {
  const urlNoApi = import.meta.env.VITE_URL;
  // date formatting
  const localizer = dayjsLocalizer(dayjs);

  const [trainings, setTrainings] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchTrainings = () => {
    fetch(`${urlNoApi}/gettrainings`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong: " + response.statusText);

        return response.json();
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    const formattedTraining = trainings.map((training) => ({
      start: new Date(training.date),
      end: dayjs(training.date).add(training.duration, "minutes").toDate(),
      //title: training.activity,
      title: `${training.activity} / ${training.customer.lastname} ${training.customer.firstname}`,
    }));
    setEvents(formattedTraining);
  }, [trainings]);

  return (
    <>
      <p>Calendar</p>
      <Typography variant="body1">
        Welcome to the website
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Typography>
    </>
  );
}

export default TrainingCalendar;
