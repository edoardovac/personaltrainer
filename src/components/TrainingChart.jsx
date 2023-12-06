import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";
import _ from "lodash";
import { fetchTrainings } from "./ApiTrainings";

function TrainingChart() {
  const [trainings, setTrainings] = useState([]);

  // get trainings from
  useEffect(() => {
    fetchTrainings(setTrainings);
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

  // tooltip is overlay
  // legend is legend and ovarlay info
  // bar is the bar chart
  return (
    <>
      <div className="body1">
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis dataKey="duration" />
          <Tooltip />
          <Legend />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  );
}
export default TrainingChart;
