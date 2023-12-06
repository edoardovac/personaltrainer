import { useState, useEffect, useCallback, useRef } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FilterSearch from "./FilterSearch";
import { fetchCustomers } from "./apiCustomers";
import CustomSnackbar from "./CustomSnackbar";
import TableRender from "./TableRender";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const gridRef = useRef();

  // fetch customers from database
  useEffect(() => {
    fetchCustomers(setCustomers);
  }, []);

  const saveCustomer = (customer) => {
    fetch(`${import.meta.env.VITE_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then(() => fetchCustomers(setCustomers))
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (!response.ok) {
          throw new Error("Error in deletion: " + response.statusText);
        } else {
          setSnackbarMessage("Customer deleted successfully");
          setOpen(true);
          return fetchCustomers(setCustomers);
        }
      });
    }
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then(() => fetchCustomers(setCustomers))
      .catch((err) => console.error(err));
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
      width: 255,
      cellRenderer: (row) => (
        <div>
          <EditCustomer updateCustomer={updateCustomer} customer={row.data} />
          <Button
            color="error"
            size="small"
            onClick={() => deleteCustomer(row.data.links[0].href)}
            style={{
              borderRadius: "50%",
              height: "40px",
              width: "40px",
              minWidth: "40px",
            }}
          >
            <DeleteIcon />
          </Button>
          <AddTraining
            customer={row.data.links[0].href}
            // to change snackbar message when adding a training
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setOpen}
          />
        </div>
      ),
    },
    {
      field: "lastname",
      headerName: "Last Name",
      sortable: true,
      filter: true,
      width: 125,
    },
    {
      field: "firstname",
      headerName: "First Name",
      sortable: true,
      filter: true,
      width: 125,
    },
    {
      field: "streetaddress",
      headerName: "Address",
      sortable: true,
      filter: true,
      width: 175,
    },
    { field: "postcode", sortable: true, filter: true, width: 150 },
    { field: "city", sortable: true, filter: true, width: 100 },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true, width: 150 },
  ]);

  return (
    <>
      <TableRender rowData={customers} columnDefs={columnDefs} />
      <div
        id="flex-needed"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <AddCustomer saveCustomer={saveCustomer} />
        <FilterSearch onFilterTextBoxChanged={onFilterTextBoxChanged} />
        <Button onClick={onBtnExport} variant="contained" size="small">
          <FileDownloadRoundedIcon />
        </Button>
      </div>
      <CustomSnackbar
        open={open}
        onClose={() => setOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
}

export default Customerlist;
