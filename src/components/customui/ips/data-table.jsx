"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/utils/spinner";
import { Tooltip } from "@mui/material";
import { Trash2, UserPen } from "lucide-react";

const IpDataTable = () => {
  const getGridRowId = (row) => row["_id"];

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
    const response = await fetch("/api/ips");
    const ips = await response.json();
    setRows(ips);
    setLoading(false);
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
      const response = await fetch(`/api/ips?id=${selectedRow._id}`, {
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
      setSnackbarMessage("Error deleting IP: " + error.message);
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
    { field: "ipName", headerName: "IP Name", width: 150 },
    { field: "ipTelephone", headerName: "IP Telephone", width: 150 },
    {
      field: "ipPhysicalLocation",
      headerName: "IP Physical Location",
      width: 150,
    },
    { field: "ipContactPerson", headerName: "IP Contact Person", width: 150 },
    {
      field: "ipContactTelephone",
      headerName: "IP Contact Telephone",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center mt-2 gap-2">
          <Tooltip title="Edit User" arrow>
            <Link href={`/admin/ips-management/ips/create/${params.row._id}`}>
              <button className="flex items-center space-x-2 text-sm font-semibold px-4 py-2 border hover:shadow-lg transition-all duration-300 ease-in-out">
                <UserPen className="text-teal-400" size={18} />
              </button>
            </Link>
          </Tooltip>
          <Tooltip title="Delete  User" arrow>
            <button
              className="flex items-center space-x-2 text-sm font-semibold px-4 py-2 border hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => handleDeleteClick(params.row)}
            >
              <Trash2 className="text-red-600" size={18} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center pb-4">
        <h3 className="text-lg font-medium text-gray-800">List of IPS</h3>
        <Link href="/admin/ips/create">
          <button className="flex items-center px-2 py-2 border border-teal-500 text-teal-500 hover:bg-green-50 hover:border-teal-600 hover:text-teal-600 rounded-md text-sm font-medium shadow-sm transition ease-in-out duration-300">
            <IoMdAdd className="mr-2" style={{ fontWeight: "bold" }} /> Create
            New
          </button>
        </Link>
      </div>
      {successMessage && <div className="text-green-600">{successMessage}</div>}
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
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
      <div className="h-96">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowId={getGridRowId}
          pageSizeOptions={[5, 10, 25, 100]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          className="bg-gray-50"
        />
      </div>

      {/* ShadCN UI AlertDialog */}
      <AlertDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
      >
        <AlertDialogTrigger asChild>
          <button className="hidden"></button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <p>Are you sure you want to delete this IP?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <AlertDialogCancel
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={handleConfirmationCancel}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleConfirmationConfirm}
            >
              Confirm
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default IpDataTable;
