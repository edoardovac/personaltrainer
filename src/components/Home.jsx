import { Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Typography variant="h6">Welcome to the website</Typography>
      <br />
      <Typography variant="body1">
        Select:
        <ul>
          <li>Customer to see their details</li>
          <li>Trainings to see a list of them</li>
          <li>Calendar to the trainings logged into a calendar</li>
          <li>Charts to see a chart showing some training stats</li>
        </ul>
      </Typography>
    </>
  );
}

export default Home;
