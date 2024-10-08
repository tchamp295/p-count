"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { LoadingSpinner } from "@/utils/spinner";
import { Tooltip } from "@mui/material";
import { Trash2, UserPen } from "lucide-react";

// Reusable ConfirmationDialog component
const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="text-sm mb-6">
          Are you sure you want to delete this Region?
        </p>
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

const RegionsData = () => {
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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    fetch("/api/regions").then((res) => {
      res.json().then((regions) => {
        setRows(regions);
        setLoading(false);

      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
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
    { field: "totalSfps", headerName: "Total SFP", width: 200 }, // Added field for SFP count

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center mt-2 gap-2">
          <Tooltip title="Edit User" arrow>
            <Link href={`/admin/regions/${params.row._id}`}>
              <button className="flex items-center space-x-2 text-sm font-semibold px-4 py-2 border hover:shadow-lg transition-all duration-300 ease-in-out">
                <UserPen className="text-teal-400" size={18} />
              </button>
            </Link>
          </Tooltip>
          <button
            className="flex items-center space-x-2 text-sm font-semibold px-4 py-2 border hover:shadow-lg transition-all duration-300 ease-in-out"
            onClick={() => handleDeleteClick(params.row)}
          >
            <Trash2 className="text-red-600" size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-6 py-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center pb-3 px-1">
        <h3 className="">Regions List</h3>
        <Link href="/admin/regions/create">
          <button className="flex items-center px-2 py-2 border border-teal-500 text-teal-500 hover:bg-green-50 hover:border-teal-600 hover:text-teal-600 rounded-md text-sm font-medium shadow-sm transition ease-in-out duration-300">
            <IoMdAdd className="mr-2" style={{ fontWeight: "bold" }} /> Create
            New
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
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={getGridRowId}
          pageSizeOptions={[5, 10, 25, 100]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
        />
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

export default RegionsData;
