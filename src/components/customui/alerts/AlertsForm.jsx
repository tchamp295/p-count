"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "react-hot-toast";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  Checkbox as MuiCheckbox,
  ListItemText,
  OutlinedInput,
  TextareaAutosize,
} from "@mui/material";

const AlertsForm = () => {
  const [ipNames, setIpNames] = useState([]); // For fetching IP names from API
  const [regions, setRegions] = useState([]); // For fetching Regions from API
  const [selectedIPs, setSelectedIPs] = useState([]); // For selected IP IDs
  const [selectedRegions, setSelectedRegions] = useState([]); // For selected Region IDs
  const [alertDescription, setAlertDescription] = useState("");
  const [alertCategory, setAlertCategory] = useState("");
  const [isSms, setIsSms] = useState(false);
  const [isHttpPush, setIsHttpPush] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  // Fetch IP names and regions on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch IPs and Regions in parallel
        const [ipsRes, regionsRes] = await Promise.all([
          fetch("/api/ips"),
          fetch("/api/regions"),
        ]);

        // Convert the responses to JSON
        const ipsData = await ipsRes.json();
        const regionsData = await regionsRes.json();

        // Update the state with the fetched data
        setIpNames(ipsData);
        setRegions(regionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate notification methods
    if (!isSms && !isHttpPush && !isEmail) {
      toast.error(
        "Please select at least one notification method (SMS, HTTP, or Email)."
      );
      return;
    }

    // Validate IP or Region selection
    if (selectedIPs.length === 0 && selectedRegions.length === 0) {
      toast.error("Please select at least one IP or Region.");
      return;
    }

    // Validate Alert Category
    if (!alertCategory) {
      toast.error("Please select an alert category.");
      return;
    }

    // Ensure no null IPs or Regions are sent
    const validIPs = selectedIPs.filter((ip) => ip !== null);
    const validRegions = selectedRegions.filter((region) => region !== null);

    // Prepare form data
    const formData = {
      description: alertDescription,
      category: alertCategory,
      notificationMethods: {
        sms: isSms,
        httpPush: isHttpPush,
        email: isEmail,
      },
      ips: validIPs,
      regions: validRegions,
    };

    try {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Alert created successfully!");

        // Reset form fields only if submission is successful
        setAlertDescription("");
        setAlertCategory("");
        setSelectedIPs([]);
        setSelectedRegions([]);
        setIsSms(false);
        setIsHttpPush(false);
        setIsEmail(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to create alert.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the alert.");
      console.error(error);
    }
  };

  const handleIPChange = (event) => {
    const value = event.target.value;
    setSelectedIPs(typeof value === "string" ? value.split(",") : value);
    if (value.length > 0) setSelectedRegions([]); // Clear regions if IP is selected
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    setSelectedRegions(typeof value === "string" ? value.split(",") : value);
    if (value.length > 0) setSelectedIPs([]); // Clear IPs if region is selected
  };

  return (
    <div className="relative shadow-md rounded bg-white p-4 flex flex-col items-start gap-8">
      <form
        onSubmit={handleSubmit}
        className="grid w-full items-start gap-6 p-2"
      >
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium text-customColor">
            Create New Alert
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
            {/* IP Name Dropdown with Checkboxes */}

            <div className="grid gap-3 ">
              <Label htmlFor="ip-name" className="text-sm">
                IP Name
              </Label>
              <FormControl variant="outlined">
                <InputLabel
                  id="ip-name-label"
                  sx={{
                    lineHeight: "normal",
                  }}
                >
                  Select IP Name(s)
                </InputLabel>
                <MuiSelect
                  labelId="ip-name-label"
                  multiple
                  value={selectedIPs}
                  onChange={handleIPChange}
                  input={<OutlinedInput label="Select IP Name(s)" />}
                  renderValue={(selected) => {
                    const selectedIpNames = selected.map((id) => {
                      const ip = ipNames.find((ip) => ip._id === id);
                      return ip ? ip.ipName : id;
                    });
                    return selectedIpNames.join(", ");
                  }}
                  disabled={selectedRegions.length > 0}
                  sx={{
                    padding: "6px 14px",
                    height: "40px",
                    ".MuiOutlinedInput-input": {
                      padding: "6px 0px",
                    },
                  }}
                >
                  {ipNames.map((ip) => (
                    <MenuItem key={ip._id} value={ip._id}>
                      <MuiCheckbox checked={selectedIPs.indexOf(ip._id) > -1} />
                      <ListItemText primary={ip.ipName} />
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </div>

            {/* Region Dropdown with Checkboxes */}
            <div className="grid gap-3 ">
              <Label htmlFor="region" className="text-sm">
                Region
              </Label>
              <FormControl variant="outlined" className="">
                <InputLabel
                  id="region-label"
                  sx={{
                    lineHeight: "normal",
                  }}
                >
                  Select Region(s)
                </InputLabel>
                <MuiSelect
                  labelId="region-label"
                  multiple
                  value={selectedRegions}
                  onChange={handleRegionChange}
                  input={<OutlinedInput label="Select Region(s)" />}
                  renderValue={(selected) => {
                    const selectedRegionNames = selected.map((id) => {
                      const region = regions.find(
                        (region) => region._id === id
                      );
                      return region ? region.regionName : id;
                    });
                    return selectedRegionNames.join(", ");
                  }}
                  disabled={selectedIPs.length > 0}
                  sx={{
                    padding: "6px 14px",
                    height: "40px",
                    ".MuiOutlinedInput-input": {
                      padding: "6px 0px",
                    },
                  }}
                >
                  {regions.map((region) => (
                    <MenuItem key={region._id} value={region._id}>
                      <MuiCheckbox
                        checked={selectedRegions.indexOf(region._id) > -1}
                      />
                      <ListItemText primary={region.regionName} />
                    </MenuItem>
                  ))}
                </MuiSelect>
              </FormControl>
            </div>

            {/* Alert Category */}
            <div className="grid gap-3">
              <Label htmlFor="alert-category" className="text-sm">
                Alert Category
              </Label>
              <Select
                className="outline-none "
                id="alert-category"
                value={alertCategory}
                onValueChange={(value) => setAlertCategory(value)}
                defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Major">Major</SelectItem>
                  <SelectItem value="Advisory">Advisory</SelectItem>
                  <SelectItem value="Info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Alert Description */}
            <div className="grid gap-3">
              <Label htmlFor="alert-description" className="text-sm">
                Alert Description
              </Label>
              <TextareaAutosize
                id="alert-description"
                value={alertDescription}
                onChange={(e) => setAlertDescription(e.target.value)}
                placeholder="Enter alert description"
                minRows={3}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc", // Light gray border
                  backgroundColor: "#f9f9f9", // Light background color for contrast
                  color: "#333", // Darker text color for visibility
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </div>
            {/* Notification Preferences */}
            <div className="">
              <div className="grid gap-3 col-span-1">
                <Label className="text-sm">Notifications</Label>
                <div className="flex items-center gap-4">
                  <Checkbox
                    id="sms"
                    checked={isSms}
                    onCheckedChange={() => setIsSms((prev) => !prev)}
                  />
                  <Label htmlFor="sms">SMS</Label>

                  <Checkbox
                    id="http-push"
                    checked={isHttpPush}
                    onCheckedChange={() => setIsHttpPush((prev) => !prev)}
                  />
                  <Label htmlFor="http-push">HTTP Push</Label>

                  <Checkbox
                    id="email"
                    checked={isEmail}
                    onCheckedChange={() => setIsEmail((prev) => !prev)}
                  />
                  <Label htmlFor="email">Email</Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-3 pl-2 mt-10">
              <Button
                type="submit"
                className=" text-white  bg-customColor hover:bg-customColor hover:shadow-lg px-4 py-2 text-sm"
              >
                Create
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AlertsForm;
