"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast"; // Import React Hot Toast
import { useRouter } from "next/navigation";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const AddRegion = () => {
  const [regionName, setRegionName] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the API with the region name
    try {
      const res = await fetch("/api/regions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regionName }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message); // Show success toast
        setRegionName("");
        router.push("/admin/regions");
      } else {
        toast.error(data.message || "An error occurred"); // Show error toast
      }
    } catch (error) {
      toast.error("Failed to add region. Please try again."); // Show error toast on catch
    }
  };

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6  shadow-md" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium italic ">
                        Add Region
          </legend>

          <div className="grid gap-3">
            <Label htmlFor="region-name" className="text-sm">
              Region Name
            </Label>
            <Input
              id="region-name"
              type="text"
              placeholder="e.g Kisumu"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Button
              type="submit"
              className="mt-4 bg-blue-400 hover:bg-purple-500"
            >
              Create
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddRegion;
