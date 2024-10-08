"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const AdvisoryForm = () => {
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]); // State for categories
  const router = useRouter();

  useEffect(() => {
    // Fetch categories for the dropdown
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/advisoryCategory");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/advisory/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, categoryId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setDescription("");
        setCategoryId("");
        router.push("/admin/advisory");
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      toast.error("Failed to add Advisory. Please try again.");
    }
  };

  return (
    <div className="relative bg-white p-4 hidden flex-col items-start shadow-md gap-8 md:flex">
      <form className="grid w-full items-start gap-6  px-4 py-4" onSubmit={handleSubmit}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Create Advisory
          </legend>
          <div className="grid grid-cols-1  gap-4 p-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="description" className="text-sm">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md p-2 w-full focus-visible:ring-0"
                rows={4} // Adjust rows as needed
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="category" className="text-sm">
                Category
              </Label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border p-2 rounded-md ring-0 focus-visible:ring-0 outline-none"
              >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
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

export default AdvisoryForm;
