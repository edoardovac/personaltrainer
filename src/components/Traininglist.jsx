import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Snackbar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, SetOpen] = useState(false);

  const customerFirstName = (params) => {
    return params.data.customer.firstname;
  };

  const customerLastName = (params) => {
    return params.data.customer.lastname;
  };

  const urlNoApi = import.meta.env.VITE_URL;

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

  const deleteTraining = (url) => {
    console.log(url);
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (!response.ok) {
          throw new Error("Error in deletion: " + response.statusText);
        } else {
          SetOpen(true);
          fetchTrainings();
        }
      });
    }
  }

  useEffect(() => {
    fetchTrainings();
  }, []);

  // onClick={() => deleteTraining(row.data.links[0].href)}
  // console.log(row.data.id)
  const [columnDefs] = useState([
    {
      headerName: "Actions",
      sortable: false,
      width: 100,
      cellRenderer: (row) => (
        <>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          size="small"
          onClick={() => deleteTraining(`${urlNoApi}/api/trainings/${row.data.id}`)}
        />
        </>
      ),
    },
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (params) => dayjs(params.value).format("YYYY-MM-DD"),
      width: 125,
    },
    {
      field: "date",
      headerName: "Time",
      sortable: true,
      filter: true,
      cellRenderer: (params) => dayjs(params.value).format("HH:mm"),
      width: 100,
    },
    {
      field: "duration",
      sortable: true,
      filter: true,
      width: 125,
    },
    {
      field: "activity",
      sortable: true,
      filter: true,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      valueGetter: customerLastName,
      sortable: true,
      filter: true,
    },
    {
      field: "firstname",
      headerName: "First Name",
      valueGetter: customerFirstName,
      sortable: true,
      filter: true,
    },
  ]);

  return (
    <>
      <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => SetOpen(false)}
        message="Training deleted successfully"
      />
    </>
  );
}

export default Traininglist;
