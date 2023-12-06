import { Snackbar } from "@mui/material";

const CustomSnackbar = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    />
  );
};

export default CustomSnackbar;
