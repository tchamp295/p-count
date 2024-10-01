"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const AdminEditUserForm = ({ userId }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    isAdmin: "",
    status: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        const data = await res.json();
        if (res.ok && data.user) {
          setUserData(data.user);
          setFormData({
            name: data.user.name,
            phone: data.user.phone,
            email: data.user.email,
            isAdmin: data.user.isAdmin.toString(),
            status: data.user.status,
          });
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        toast.error("Failed to fetch user data: " + error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("User updated successfully!");
        router.push("/admin/user-management");
      } else {
        toast.error(data.message || "Failed to update user");
      }
    } catch (error) {
      toast.error("Error updating user: " + error.message);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-start gap-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Edit User</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <fieldset className="p-6 border border-gray-200 rounded-lg shadow-sm">
          <legend className="text-base font-medium text-gray-700">User Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="text-gray-600">
                Full Name
              </Label>
              <Input
                type="text"
                placeholder="e.g. Kevin"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="phone" className="text-gray-600">
                Telephone
              </Label>
              <Input
                type="tel"
                placeholder="e.g. 123-456-7890"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-gray-600">
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="e.g. email@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
            </div>

            {/* Admin Role Select */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="isAdmin" className="text-gray-600">
                Admin Role
              </Label>
              <Select
                id="isAdmin"
                value={formData.isAdmin}
                onValueChange={(value) => handleSelectChange("isAdmin", value)}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">User</SelectItem>
                  <SelectItem value="true">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="status" className="text-gray-600">
                Status
              </Label>
              <Select
                id="status"
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-start mt-6">
            <Button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all"
            >
              Update User
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AdminEditUserForm;
