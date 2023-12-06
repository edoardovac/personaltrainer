import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const TableRender = ({ rowData, columnDefs }) => {
  const gridRef = useRef();

  return (
    <div className="ag-theme-material" style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        suppressCellFocus={true}
      />
    </div>
  );
};

export default TableRender;
