import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Snackbar, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [open, SetOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCustomers = () => {
    fetch(`${apiUrl}/customers`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong: " + response.statusText);

        return response.json();
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const saveCustomer = (customer) => {
    fetch(`${apiUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchCustomers())
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    console.log(url);
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" }).then((response) => {
        if (!response.ok) {
          throw new Error("Error in deletion: " + response.statusText);
        } else {
          SetOpen(true);
          fetchCustomers();
        }
      });
    }
  };

  const [columnDefs] = useState([
    {
      field: "lastname",
      headerName: "Last Name",
      sortable: true,
      filter: true,
    },
    {
      field: "firstname",
      headerName: "First Name",
      sortable: true,
      filter: true,
    },
    {
      field: "streetaddress",
      headerName: "Address",
      sortable: true,
      filter: true,
    },
    { field: "postcode", sortable: true, filter: true, width: 150 },
    { field: "city", sortable: true, filter: true, width: 100 },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      cellRenderer: (params) => (
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          size="small"
          onClick={() => deleteCustomer(params.data.links[0].href)}
        />
      ),
    },
  ]);

  return (
    <>
      <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <AddCustomer saveCustomer={saveCustomer} />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => SetOpen(false)}
        message="Customer deleted successfully"
      />
    </>
  );
}

export default Customerlist;
