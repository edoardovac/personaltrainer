import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import CustomSnackbar from "./CustomSnackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FilterSearch from "./FilterSearch";
import { fetchTrainings } from "./apiTrainings";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const gridRef = useRef();

  // get trainings from
  useEffect(() => {
    fetchTrainings(setTrainings);
  }, []);

  // to get full customers' names that will be shown in the table
  const customerFirstName = (params) => {
    return params.data.customer.firstname;
  };
  const customerLastName = (params) => {
    return params.data.customer.lastname;
  };

  // to delete training with confirmation and update table
  const deleteTraining = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (!response.ok) {
          throw new Error("Error in deletion: " + response.statusText);
        } else {
          setOpen(true);
          return fetchTrainings(setTrainings);
        }
      });
    }
  };

  // csv export
  const onBtnExport = useCallback(() => {
    const params = {
      columnKeys: ["date", "duration", "activity", "lastname", "firstname"],
      fileName: "traininglist.csv",
    };
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  // filtering
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  // ag-grid columns
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
              deleteTraining(
                `${import.meta.env.VITE_URL}/api/trainings/${row.data.id}`
              )
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
          suppressCellFocus={true}
        />
      </div>
      <CustomSnackbar
        open={open}
        onClose={() => setOpen(false)}
        message="Training deleted successfully"
      />
      <div
        id="flex-needed"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <FilterSearch onFilterTextBoxChanged={onFilterTextBoxChanged} />
        <Button onClick={onBtnExport} variant="contained" size="small">
          <FileDownloadRoundedIcon />
          Export
        </Button>
      </div>
    </>
  );
}

export default Traininglist;
