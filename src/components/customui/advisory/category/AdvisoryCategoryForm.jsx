"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdvisoryCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [desc, setDesc] = useState(""); // Initialize desc state
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the API with the category name and description
    try {
      const res = await fetch('/api/advisoryCategory/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        toast.error(data.message || 'An error occurred'); // Show error toast
      }
    } catch (error) {
      toast.error('Failed to add Advisory Category. Please try again.'); // Show error toast on catch
    }
  };

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Add Advisory Category</legend>

          <div className="grid gap-3">
            <Label htmlFor="category-name" className="text-sm">
              Category Name
            </Label>
            <Input
              id="category-name"
              type="text"
              placeholder="e.g Cybersecurity"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="desc" className="text-sm">
              Category Description
            </Label>
            <Input
              id="desc"
              type="text"
              placeholder="Description for the category"
              value={desc}
              onChange={(e) => setDesc(e.target.value)} // Handle desc input change
            />
          </div>

          <div className="col-span-3">
            <Button
              type="submit"
              className="mt-4 bg-purple-400 hover:bg-purple-500"
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
