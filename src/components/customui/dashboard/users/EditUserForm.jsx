"use client"
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
              isAdmin: data.user.isAdmin.toString(), // Convert boolean to string
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
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <form onSubmit={handleSubmit} className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Edit User</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-sm">
                  Full Name
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. Kevin"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="phone" className="text-sm">
                  Telephone
                </Label>
                <Input
                  type="tel"
                  placeholder="e.g. 123-456-7890"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-sm">
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="e.g. email@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
  
              {/* Admin Role Select */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="isAdmin" className="text-sm">
                  Admin Role
                </Label>
                <Select
                  id="isAdmin"
                  value={formData.isAdmin}
                  onValueChange={(value) => handleSelectChange("isAdmin", value)}
                >
                  <SelectTrigger>
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
                <Label htmlFor="status" className="text-sm">
                  Status
                </Label>
                <Select
                  id="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-start">
              <Button
                type="submit"
                className="text-sm px-4 py-2 bg-purple-400 hover:bg-purple-500"
              >
                Update
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  };
  
  export default AdminEditUserForm;
  
