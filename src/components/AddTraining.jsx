import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import "dayjs/locale/de";

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const customerHref = props.customer;

  const [training, setTraining] = useState({
    date: null,
    activity: "",
    duration: "",
    customer: customerHref,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const addTraining = () => {
    saveTraining(training);
    handleClose();
  };

  const saveTraining = (training) => {
    fetch(`${apiUrl}/trainings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(training),
    })
      .then(() => {
        // to change snackbar message since both customers and trainings can be added from the same page
        props.setSnackbarMessage("Training added successfully");
        props.setSnackbarOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleDateChange = (date) => {
    setTraining({ ...training, date });
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        style={{ marginLeft: 10 }}
        onClick={handleClickOpen}
      >
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <DateTimePicker
              margin="dense"
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              name="date"
              value={training.date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={(e) => handleInputChange(e)}
            label="Activity"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={(e) => handleInputChange(e)}
            label="Duration"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTraining;
