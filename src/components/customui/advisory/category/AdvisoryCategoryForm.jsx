"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const AdvisoryCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [desc, setDesc] = useState(""); // Initialize desc state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the API with the category name and description
    try {
      const res = await fetch("/api/advisoryCategory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName, desc }), // Include desc in the body
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message); // Show success toast
        setCategoryName("");
        setDesc(""); // Reset desc field
        router.push("/admin/advisoryCategory");
      } else {
        toast.error(data.message || "An error occurred"); // Show error toast
      }
    } catch (error) {
      toast.error("Failed to add Advisory Category. Please try again."); // Show error toast on catch
    }
  };

  return (
    <div className="relative shadow-md bg-white p-4  hidden flex-col items-start gap-8 md:flex">
      <form
        className="grid w-full items-start gap-6 px-4 py-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Add Advisory Category
          </legend>
          <div className="p-2 grid grid-cols-1  gap-6 ">
            <div className="flex flex-col gap-2">
              <Label htmlFor="category-name" className="text-sm">
                Category Name
              </Label>
              <Input
                className="focus-visible:ring-0"
                id="category-name"
                type="text"
                placeholder=""
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desc" className="text-sm">
                Category Description
              </Label>
              <Textarea
                id="desc"
                placeholder=""
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="focus-visible:ring-0 "
                rows={4}
              />
            </div>
          </div>
          <div className="col-span-3 mt-10 px-2">
            <Button
              type="submit"
              className="px-4 py-2 border border-teal-500 bg-teal-50  text-teal-500 font-semibold rounded hover:bg-teal-100 hover:border-teal-600 hover:text-teal-600 transition-all duration-300"
            >
              Create
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AdvisoryCategoryForm;
