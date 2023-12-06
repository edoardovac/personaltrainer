import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";
import _ from "lodash";

function TrainingChart() {
  const urlNoApi = import.meta.env.VITE_URL;
  const [trainings, setTrainings] = useState([]);

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

  // to populate chart with an array of objects
  // one obj per activity and sums the duration of all the trainings of that activity
  const data = _.map(
    _.groupBy(trainings, "activity"),
    (groupByActivity, activity) => ({
      name: activity,
      duration: _.sumBy(groupByActivity, "duration"),
    })
  );

  // name is activity
  // uv is primary y value
  // pv is secondary y value (if two lines are needed at the same time)
  // amt us amount

  // tooltip is overlay
  // legend is legend and ovarlay info
  // bar is the bar chart
  return (
    <>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis dataKey="duration" />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </>
  );
}
export default TrainingChart;
