import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Snackbar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import FilterSearch from "./FilterSearch";

function Traininglist() {
  const urlNoApi = import.meta.env.VITE_URL;
  const [trainings, setTrainings] = useState([]);
  const [open, SetOpen] = useState(false);
  const gridRef = useRef();

  const customerFirstName = (params) => {
    return params.data.customer.firstname;
  };
  const customerLastName = (params) => {
    return params.data.customer.lastname;
  };

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
  };

  // csv export
  const onBtnExport = useCallback(() => {
    const params = {
      columnKeys: [
        "lastname",
        "firstname",
        "streetaddress",
        "postcode",
        "city",
        "email",
        "phone",
      ],
      fileName: "customerlist.csv",
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  useEffect(() => {
    fetchTrainings();
  }, []);

  // filtering
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  const [columnDefs] = useState([
    {
      headerName: "Actions",
      sortable: false,
      width: 100,
      cellRenderer: (row) => (
        <>
          <Button
            color="error"
            size="small"
            onClick={() =>
              deleteTraining(`${urlNoApi}/api/trainings/${row.data.id}`)
            }
            style={{
              borderRadius: "50%",
              height: "40px",
              width: "40px",
              minWidth: "40px",
            }}
          >
            <DeleteIcon />
          </Button>
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
          ref={gridRef}
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
      <div
        id="flex-needed"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <FilterSearch onFilterTextBoxChanged={onFilterTextBoxChanged} />
        <Button onClick={onBtnExport} variant="contained">
          <SaveAltOutlinedIcon />
        </Button>
      </div>
    </>
  );
}

export default Traininglist;
