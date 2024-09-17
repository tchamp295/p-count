"use client";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdVisibility } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Plus ,Loader2 } from "lucide-react";

// Reusable ConfirmationDialog component
const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
          <p className="text-sm mb-6">Are you sure you want to delete this SFPS?</p>
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
    return row["id"];
  };

  const [rows, setRows] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");



  const [loading, setLoading] = useState(false);

  const handleCreateNewClick = () => {
    setLoading(true);

    // Simulate an async operation like form submission or data fetching
    setTimeout(() => {
      // After the operation is done, set loading to false
      setLoading(false);

      // Normally you'd handle a redirect or additional logic here
      // Example: router.push("/some-path")
    }, 2000);
  };
  const fetchData = async () => {
    try {
      const res = await fetch("/api/sfps");
      const data = await res.json();
      console.log("Fetched Data:", data);
  
      // Transform data to match the expected structure
      const transformedRows = data.map((sfp) => ({
        id: sfp._id,
        ipName: sfp.ip ? sfp.ip.ipName : "No IP Name",
        sfpName: sfp.sfpName,
        sfpEmail: sfp.sfpEmail,
        sfpTelephone: sfp.sfpTelephone,
        gender: sfp.gender,
        regionName: sfp.region ? sfp.region.regionName : "No Region Name",
      }));
  
      setRows(transformedRows);
    } catch (error) {
      console.error("Failed to fetch SFPs:", error);
    }
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
      const response = await fetch(`/api/sfps?id=${selectedRow._id}`, {
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
    { field: "ipName", headerName: "IP Name", width: 150 },
    { field: "sfpName", headerName: "SFP Name", width: 200 },
    { field: "sfpEmail", headerName: "SFP Email", width: 200 },
    { field: "sfpTelephone", headerName: "SFP Telephone", width: 200 },
    { field: "gender", headerName: "Gender", width: 200 },
    { field: "regionName", headerName: "Region Name", width: 200 },
  
    {
      field: "actions",
      headerName: "Actions",
      width: 240, // Adjust width as needed
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          {/* View Button */}
          <Tooltip title="View" arrow>
            <Link href={`/admin/regions/${params.row._id}`} passHref>
              <button
                className="text-[#1a202c] p-2 rounded-md flex items-center border border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                aria-label={`View ${params.row._id}`}
              >
                <MdVisibility className="text-blue-600" />
              </button>
            </Link>
          </Tooltip>
    
          {/* Edit Button */}
          <Tooltip title="Edit" arrow>
            <Link href={`/admin/regions/${params.row._id}/edit`} passHref>
              <button
                className="text-[#1a202c] p-2 rounded-md flex items-center border border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
                aria-label={`Edit ${params.row._id}`}
              >
                <MdModeEdit className="text-green-600" />
              </button>
            </Link>
          </Tooltip>
    
          {/* Delete Button */}
          <Tooltip title="Delete" arrow>
            <button
              className="text-[#1a202c] p-2 rounded-md flex items-center border border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none"
              onClick={() => handleDeleteClick(params.row)}
              aria-label={`Delete ${params.row._id}`}
            >
              <MdDeleteForever className="text-red-600" />
            </button>
          </Tooltip>
        </div>
      ),
    }
      
  ];

  return (
    <div className="w-full px-4">
      
      <div className="flex justify-between items-center pb-3 px-1">
        <h3 className="">Sfps List</h3>
        <Link href="/admin/ips-management/sfps/create">
          <Button onClick={handleCreateNewClick} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {loading ? "Creating..." : "Create New"}
          </Button>
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
