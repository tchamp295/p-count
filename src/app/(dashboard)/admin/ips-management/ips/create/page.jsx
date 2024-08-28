"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast"; // Import React Hot Toast

const AddIp = () => {
  // State variables for each input field
  const [ipName, setIpName] = useState("");
  const [ipTelephone, setIpTelephone] = useState("");
  const [ipEmailAddress, setIpEmailAddress] = useState("");
  const [ipPostalAddress, setIpPostalAddress] = useState("");
  const [ipPhysicalLocation, setIpPhysicalLocation] = useState("");
  const [ipContactPerson, setIpContactPerson] = useState("");
  const [ipContactTelephone, setIpContactTelephone] = useState("");
  const [ipContactEmail, setIpContactEmail] = useState("");

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

      toast.success("IP added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Create New IP
          </legend>

          {/* Grid container to arrange fields in three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* IP Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-name" className="text-sm">
                IP Name
              </Label>
              <Input
                id="ip-name"
                type="text"
                placeholder="e.g. Kisumu"
                value={ipName}
                onChange={(e) => setIpName(e.target.value)}
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
                placeholder="e.g. 123-456-7890"
                value={ipTelephone}
                onChange={(e) => setIpTelephone(e.target.value)}
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
                placeholder="e.g. email@example.com"
                value={ipEmailAddress}
                onChange={(e) => setIpEmailAddress(e.target.value)}
              />
            </div>

            {/* Postal Address */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip-postal-address" className="text-sm">
                Ip Postal Address
              </Label>
              <Input
                id="ip-postal-address"
                type="text"
                placeholder="e.g. P.O. Box 1234"
                value={ipPostalAddress}
                onChange={(e) => setIpPostalAddress(e.target.value)}
              />
            </div>

            {/* Physical Location */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="physical-location" className="text-sm">
                Ip Physical Location
              </Label>
              <Input
                id="ip-physical-location"
                type="text"
                placeholder="e.g. 123 Main St"
                value={ipPhysicalLocation}
                onChange={(e) => setIpPhysicalLocation(e.target.value)}
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
                placeholder="e.g. John Doe"
                value={ipContactPerson}
                onChange={(e) => setIpContactPerson(e.target.value)}
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
                placeholder="e.g. 098-765-4321"
                value={ipContactTelephone}
                onChange={(e) => setIpContactTelephone(e.target.value)}
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
                placeholder="e.g. contact@example.com"
                value={ipContactEmail}
                onChange={(e) => setIpContactEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <Button
              type="submit"
              className="text-sm px-4 py-2 bg-purple-400 hover:bg-purple-500"
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
