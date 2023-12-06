import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Home from "./Home";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import TrainingCalendar from "./TrainingCalendar";
import TrainingChart from "./TrainingChart";

function TabApp() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="HOME" />
        <Tab value="two" label="CUSTOMERS" />
        <Tab value="three" label="TRAININGS" />
        <Tab value="four" label="CALENDAR" />
        <Tab value="five" label="CHART" />
      </Tabs>
      {value === "one" && <Home />}
      {value === "two" && <Customerlist />}
      {value === "three" && <Traininglist />}
      {value === "four" && <TrainingCalendar />}
      {value === "five" && <TrainingChart />}
    </>
  );
}

export default TabApp;
