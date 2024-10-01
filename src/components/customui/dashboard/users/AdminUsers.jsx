"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { PlusCircle } from "lucide-react"; // Importing Lucide icon
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { LoadingSpinner } from "@/utils/spinner";

// Reusable ConfirmationDialog component
const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="text-sm mb-6">
          Are you sure you want to delete this User?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition ease-in-out"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition ease-in-out"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const [rows, setRows] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchData = async () => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setRows(users);
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
      const response = await fetch(`/api/users?id=${selectedRow._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setSnackbarSeverity("success");
        setSnackbarMessage(data.message);
        fetchData();
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
    setSnackbarMessage("");
    setSnackbarSeverity("success");
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: "name", headerName: "Full name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: 150,
      renderCell: (params) => <span>{params.value ? "Yes" : "No"}</span>,
    },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/${params.row._id}`}>
            <button className="text-primary flex items-center space-x-1 text-sm font-semibold px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition ease-in-out">
              <MdModeEdit className="mr-1" />
              Edit
            </button>
          </Link>
          <button
            className="text-red-600 flex items-center space-x-1 text-sm font-semibold px-3 py-2 bg-red-50 rounded-md hover:bg-red-100 transition ease-in-out"
            onClick={() => handleDeleteClick(params.row)}
          >
            <MdDeleteForever className="mr-1" />
            Delete
          </button>
        </div>
      )
    }
    
  ];

  return (
    <div className="w-full px-6 py-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">System Users</h3>
        <Link href="/admin/users/create">
          <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg shadow-sm hover:bg-gray-800 transition ease-in-out">
            <PlusCircle className="mr-2" />
            Create New
          </button>
        </Link>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {rows.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
          className="shadow-sm"
        />
      ) : (
        <LoadingSpinner />
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onCancel={handleConfirmationCancel}
        onConfirm={handleConfirmationConfirm}
      />
    </div>
  );
};

export default AdminUsers;
