"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // For the loading spinner icon

const AddSfp = () => {
  // State variables for form inputs
  const [sfpName, setSfpName] = useState("");
  const [sfpEmail, setSfpEmail] = useState("");
  const [sfpTelephone, setSfpTelephone] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [ip, setIp] = useState(""); // IP dropdown state
  const [loading, setLoading] = useState(false); // State for loading

  // State to hold fetched regions and IPs
  const [regions, setRegions] = useState([]);
  const [ips, setIps] = useState([]);

  const router = useRouter();

  // Fetch Regions
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("/api/regions");
        if (!response.ok) throw new Error("Failed to fetch regions");
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRegions();
  }, []);

  // Fetch IPs
  useEffect(() => {
    const fetchIps = async () => {
      try {
        const response = await fetch("/api/ips");
        if (!response.ok) throw new Error("Failed to fetch IPs");
        const data = await response.json();
        setIps(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchIps();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    const sfpData = {
      sfpName,
      sfpEmail,
      sfpTelephone,
      gender,
      region,
      ip, // Send selected IP
    };

    try {
      const response = await fetch("/api/sfps/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sfpData),
      });

      if (!response.ok) throw new Error("Failed to add SFP");

      // Reset form fields
      setSfpName("");
      setSfpEmail("");
      setSfpTelephone("");
      setGender("");
      setRegion("");
      setIp("");

      toast.success("SFP added successfully!");
      router.push("/admin/ips-management/sfps");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="relative hidden flex-col shadow-md rounded bg-white p-4 items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6 p-2" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium text-customColor">Create New SFP</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
            {/* SFP Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="sfp-name" className="text-sm">Name</Label>
              <Input
                id="sfp-name"
                type="text"
                placeholder="e.g. Kisumu"
                value={sfpName}
                onChange={(e) => setSfpName(e.target.value)}
              />
            </div>

            {/* SFP Email */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="sfp-email" className="text-sm">Email Address</Label>
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
              <Label htmlFor="sfp-telephone" className="text-sm">Telephone</Label>
              <Input
                id="sfp-telephone"
                type="tel"
                placeholder="e.g. 098-765-4321"
                value={sfpTelephone}
                onChange={(e) => setSfpTelephone(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="gender" className="text-sm">Gender</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="rounded-lg border p-2"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* IP Dropdown */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="ip" className="text-sm">IP</Label>
              <select
                id="ip"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="rounded-lg border p-2"
              >
                <option value="">Select</option>
                {ips.map((ip) => (
                  <option key={ip._id} value={ip._id}>{ip.ipName}</option>
                ))}
              </select>
            </div>

            {/* Region Dropdown */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="region" className="text-sm">Region</Label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rounded-lg border p-2"
              >
                <option value="">Select</option>
                {regions.map((region) => (
                  <option key={region._id} value={region._id}>{region.regionName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start pl-2 mt-10 pb-4">
          <Button
              type="submit"
              className=" text-white  bg-customColor hover:bg-customColor hover:shadow-lg px-4 py-2 text-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddSfp;
