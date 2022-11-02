/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./Grid.css";
import useGridStore from "../../utils/store";

const Grid = () => {
  const gridRef = useRef(); // for accessing Grid's API
  const { rowData, search } = useGridStore(); // zustand store

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "userId", headerName: "User ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    { field: "status", headerName: "Status" },
    { field: "createdOn", headerName: "Created On" },
  ]);

  // DefaultColDef sets props common to all columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    gridRef?.current?.api?.setQuickFilter(search);
  }, [search]);

  return (
    <div className="ag-container" style={{ width: "100vw", height: "80vh" }}>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default Grid;
