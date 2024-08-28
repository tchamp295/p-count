"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast"; // Import React Hot Toast

const AddSfp = () => {
  // State variables for each input field
  const [ipName, setIpName] = useState("");
  const [sfpName, setSfpName] = useState("");
  const [sfpEmail, setSfpEmail] = useState("");
  const [sfpTelephone, setSfpTelephone] = useState("");
  const [gender, setGender] = useState(""); // State for gender
  const [region, setRegion] = useState(""); // State for region
  const [regions, setRegions] = useState([]); // State to hold regions

  useEffect(() => {
    // Fetch regions from the API endpoint
    const fetchRegions = async () => {
      try {
        const response = await fetch("/api/regions");
        if (!response.ok) {
          throw new Error("Failed to fetch regions");
        }
        const data = await response.json();
        console.log(data);

        setRegions(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchRegions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const sfpData = {
      ipName,
      sfpName,
      sfpEmail,
      sfpTelephone,
      gender,
      region,
    };

    try {
      // Send data to the API endpoint
      const response = await fetch("/api/sfps/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sfpData),
      });

      if (!response.ok) {
        throw new Error("Failed to add SFP");
      }

      // Reset form fields after successful submission
      setIpName("");
      setSfpName("");
      setSfpEmail("");
      setSfpTelephone("");
      setGender("");
      setRegion("");

      toast.success("SFP added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Create New SFP
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

            {/* SFP Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="sfp-name" className="text-sm">
                SFP Name
              </Label>
              <Input
                id="sfp-name"
                type="text"
                placeholder="e.g. Kisumu"
                value={sfpName}
                onChange={(e) => setSfpName(e.target.value)}
              />
            </div>

            {/* SFP Email Address */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="sfp-email" className="text-sm">
                SFP Email Address
              </Label>
              <Input
                id="sfp-email"
                type="email"
                placeholder="e.g. email@example.com"
                value={sfpEmail}
                onChange={(e) => setSfpEmail(e.target.value)}
              />
            </div>

            {/* SFP Telephone */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="sfp-telephone" className="text-sm">
                SFP Telephone
              </Label>
              <Input
                id="sfp-telephone"
                type="tel"
                placeholder="e.g. 098-765-4321"
                value={sfpTelephone}
                onChange={(e) => setSfpTelephone(e.target.value)}
              />
            </div>

            {/* Gender Dropdown */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="gender" className="text-sm">
                Gender
              </Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="rounded-lg border p-2"
              >
                <option value="" className="text-sm text-red-500">Select </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Region Dropdown */}

            <div className="flex flex-col gap-1">
              <Label htmlFor="region" className="text-sm">
                Region
              </Label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-lg border p-2"
              >
                <option value="">Select </option>
                {regions.map((region) => (
                  <option key={region.id} value={region.region_name}>
                    {region.region_name}
                  </option>
                ))}
              </select>
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

export default AddSfp;
