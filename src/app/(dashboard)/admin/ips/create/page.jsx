"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddIp = () => {
  const [ipName, setIpName] = useState("");
  const [ipTelephone, setIpTelephone] = useState("");
  const [ipEmailAddress, setIpEmailAddress] = useState("");
  const [ipPostalAddress, setIpPostalAddress] = useState("");
  const [ipPhysicalLocation, setIpPhysicalLocation] = useState("");
  const [ipContactPerson, setIpContactPerson] = useState("");
  const [ipContactTelephone, setIpContactTelephone] = useState("");
  const [ipContactEmail, setIpContactEmail] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(""); // State for selected region
  const router = useRouter();

  useEffect(() => {
    // Fetch regions when the component mounts
    const fetchRegions = async () => {
      try {
        const response = await fetch("/api/regions"); // Adjust endpoint as needed
        const data = await response.json();
        if (response.ok) {
          setRegions(data); // Directly set data if it's an array
        } else {
          toast.error("Failed to load regions.");
        }
      } catch (error) {
        toast.error("Error fetching regions.");
      }
    };

    fetchRegions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const ipData = {
      ipName,
      ipTelephone,
      ipEmailAddress,
      ipPostalAddress,
      ipPhysicalLocation,
      ipContactPerson,
      ipContactTelephone,
      ipContactEmail,
      regionId: selectedRegion, // Include the selected region ID
    };

    try {
      // Send data to the API endpoint
      const response = await fetch("/api/ips/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ipData),
      });

      if (!response.ok) {
        throw new Error("Failed to add IP");
      }

      // Reset form fields after successful submission
      setIpName("");
      setIpTelephone("");
      setIpEmailAddress("");
      setIpPostalAddress("");
      setIpPhysicalLocation("");
      setIpContactPerson("");
      setIpContactTelephone("");
      setIpContactEmail("");
      setSelectedRegion(""); // Reset selected region

      toast.success("IP added successfully!");
      router.push("/admin/ips-management/ips");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative shadow-md p-4 bg-white hidden rounded flex-col items-start gap-8 md:flex">
      <form className="grid w-full p-2 items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium text-customColor">
            Create New IP
          </legend>

          {/* Grid container to arrange fields in three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 p-2 gap-4">
            {/* IP Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-name" className="text-sm">
                IP Name
              </Label>
              <Input
                id="ip-name"
                type="text"
                placeholder=""
                value={ipName}
                onChange={(e) => setIpName(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"

              />
            </div>

            {/* IP Telephone */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-telephone" className="text-sm">
                IP Telephone
              </Label>
              <Input
                id="ip-telephone"
                type="tel"
                placeholder=""
                value={ipTelephone}
                onChange={(e) => setIpTelephone(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"

              />
            </div>

            {/* IP Email Address */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-email" className="text-sm">
                IP Email Address
              </Label>
              <Input
                id="ip-email"
                type="email"
                placeholder=" "
                value={ipEmailAddress}
                onChange={(e) => setIpEmailAddress(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"
              />
            </div>

            {/* Postal Address */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-postal-address" className="text-sm">
                IP Postal Address
              </Label>
              <Input
                id="ip-postal-address"
                type="text"
                placeholder=" "
                value={ipPostalAddress}
                onChange={(e) => setIpPostalAddress(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"
              />
            </div>

            {/* Physical Location */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-physical-location" className="text-sm">
                IP Physical Location
              </Label>
              <Input
                id="ip-physical-location"
                type="text"
                placeholder=" "
                value={ipPhysicalLocation}
                onChange={(e) => setIpPhysicalLocation(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"
              />
            </div>

            {/* IP Contact Person */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-contact-person" className="text-sm">
                IP Contact Person
              </Label>
              <Input
                id="ip-contact-person"
                type="text"
                placeholder=" "
                value={ipContactPerson}
                onChange={(e) => setIpContactPerson(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"
              />
            </div>

            {/* IP Contact Telephone */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-contact-telephone" className="text-sm">
                IP Contact Telephone
              </Label>
              <Input
                id="ip-contact-telephone"
                type="tel"
                placeholder=" "
                value={ipContactTelephone}
                onChange={(e) => setIpContactTelephone(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"
              />
            </div>

            {/* IP Contact Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-contact-email" className="text-sm">
                IP Contact Email
              </Label>
              <Input
                id="ip-contact-email"
                type="email"
                placeholder=""
                value={ipContactEmail}
                onChange={(e) => setIpContactEmail(e.target.value)}
                className="ring-0  focus-visible:ring-0 outline-none"
              />
            </div>

            {/* Region Selection */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="region-select" className="text-sm">
                Region
              </Label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border p-2 rounded ring-0  focus-visible:ring-0 outline-none"
              >
                <option value="">Select a Region</option>
                {regions.map((region) => (
                  <option key={region._id} value={region._id}>
                    {region.regionName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start pl-2">
            <Button
              type="submit"
              className=" text-white  bg-customColor hover:bg-customColor hover:shadow-lg px-4 py-2 text-sm"
              >
              Create
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddIp;
