import { Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Typography variant="h6">Welcome to the website</Typography>
      <br />
      <Typography variant="body1">Select:</Typography>
      <ul>
        <li>
          <Typography variant="body1">Customer to see their details</Typography>
        </li>
        <li>
          <Typography variant="body1">
            Trainings to see a list of them
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Calendar to the trainings logged into a calendar
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Charts to see a chart showing some training stats
          </Typography>
        </li>
      </ul>
    </>
  );
}

export default Home;
