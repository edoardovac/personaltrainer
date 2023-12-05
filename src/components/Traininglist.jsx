import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  const customerFirstName = (params) => {
    return params.data.customer.firstname;
  };

  const customerLastName = (params) => {
    return params.data.customer.lastname;
  };

  const gettrainingsUrl = import.meta.env.VITE_URL;

  const fetchTrainings = () => {
    fetch(`${gettrainingsUrl}/gettrainings`)
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

  const [columnDefs] = useState([
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
    </>
  );
}

export default Traininglist;
