"use client";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/utils/spinner";

// Reusable ConfirmationDialog component
const AlertsDataTable = () => {
  const getGridRowId = (row) => row["_id"];

  const [rows, setRows] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchData = async () => {
    const response = await fetch("/api/ips");
    const ips = await response.json();
    setRows(ips);
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
      setSnackbarMessage("Error deleting Ip: " + error.message);
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
    { field: "ipName", headerName: "Ip Name", width: 150 },
    { field: "ipTelephone", headerName: "Ip Telephone", width: 150 },
    { field: "ipEmailAddress", headerName: " Ip EmailAddress", width: 150 },
    { field: "ipPostalAddress", headerName: " Ip PostalAddress", width: 150 },
    { field: "ipPhysicalLocation", headerName: " Ip PhysicalLocation", width: 150 },
    { field: "ipContactPerson", headerName: " Ip ContactPerson", width: 150 },
    { field: "ipContactTelephone", headerName: " Ip ContactTelephone", width: 150 },
    { field: "ipContactEmail", headerName: " Ip ContactEmail", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/ips-management/ips/create/${params.row._id}`}>
            <button className="text-[#396b21] text-sm px-4 py-2 rounded-md flex items-center">
              <MdModeEdit className="mr-1" />
              Edit
            </button>
          </Link>
          <button
            className="text-[#396b21] text-sm px-4 py-2 rounded-md flex items-center"
            onClick={() => handleDeleteClick(params.row)}
          >
            <MdDeleteForever className="mr-1" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center pb-3 px-1">
        <h3 className="">List of IPS</h3>
        <Link href="/admin/ips-management/alerts/create">
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
            pageSizeOptions={[5, 10, 25, 100]}

            checkboxSelection
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>

      {/* ShadCN UI AlertDialog */}
      <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <AlertDialogTrigger asChild>
          {/* Trigger can be a hidden element or a button */}
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

export default AlertsDataTable;
