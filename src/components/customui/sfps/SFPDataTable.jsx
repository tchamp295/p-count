"use client";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

// Reusable ConfirmationDialog component
const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p className="text-sm mb-6">Are you sure you want to delete this Region?</p>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

const SFPDataTable = () => {
  const getGridRowId = (row) => {
    return row["_id"];
  };

  const [rows, setRows] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchData = async () => {
    fetch("/api/regions").then((res) => {
      res.json().then((regions) => {
        setRows(regions);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setIsConfirmationOpen(true);
    clearMessages();
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationOpen(false);
    setSelectedRow(null);
  };

  const handleConfirmationConfirm = async () => {
    setIsConfirmationOpen(false);

    if (!selectedRow) {
      console.error("No selected row for deletion.");
      return;
    }

    try {
      const response = await fetch(`/api/regions?id=${selectedRow._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage(data.message);
        fetchData(); // Refresh the data after deletion
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message);
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Error deleting user: " + error.message);
      setSnackbarOpen(true);
    }
  };

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setSnackbarMessage("");
    setSnackbarSeverity("success");
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: "regionName", headerName: "Region Name", width: 150 },
    { field: "totalIps", headerName: "Total Ips", width: 200 }, // Updated field name
    { field: "totalSfps", headerName: "Total SFP", width: 200 }, 
  
    {
        field: "actions",
        headerName: "Actions",
        width: 200,
        renderCell: (params) => (
          <div className="flex items-center gap-2">
            <Link href={`/admin/regions/${params.row._id}`}>
            
                <button className="text-[#396b21] text-sm px-4 py-2 rounded-md flex items-center border border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none">
                  <MdModeEdit className="mr-1" />
                  Edit
                </button>
            
            </Link>
            <button
              className="text-[#396b21] text-sm px-4 py-2 rounded-md flex items-center border border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
              onClick={() => handleDeleteClick(params.row)}
            >
              <MdDeleteForever className="mr-1" />
              Delete
            </button>
          </div>
        ),
      }
      
  ];

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center pb-3 px-1">
        <h3 className="">Regions List</h3>
        <Link href="/admin/ips-management/regions/create">
          <button className="border bg-[#e5eadc] text-[#396b21] p-2 text-sm rounded-md flex items-center font-semibold">
            <IoMdAdd className="mr-2" style={{ fontWeight: "bold" }} /> Create New
          </button>
        </Link>
      </div>
      {successMessage && <div className="">{successMessage}</div>}
      {errorMessage && <div className="">{errorMessage}</div>}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{
          position: "absolute",
          top: "18%",
          transform: "translateY(-50%)",
        }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <div className="">
        {rows.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={getGridRowId}
            pageSizeOptions={[5]}
            checkboxSelection
          />
        ) : (
          <p className="">Loading...</p>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onCancel={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
      />
    </div>
  );
};

export default SFPDataTable;
