"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { addUser } from "@/lib/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);
  const router = useRouter();

  if (state && state.error) {
    toast.error(state.error);
  } else if (state && state.success) {
    toast.success("User created successfully!");
    router.push("/admin/user-management"); 
  }

  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form action={formAction} className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Create New User
          </legend>

          {/* Grid container to arrange fields in three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* IP Name */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="text-sm">
                Full Name
              </Label>
              <Input type="text" placeholder="e.g. Kevin" name="name" />
            </div>

            {/* IP Telephone */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="telephone" className="text-sm">
                Telephone
              </Label>
              <Input type="tel" placeholder="e.g. 123-456-7890" name="phone" />
            </div>

            {/* IP Email Address */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-sm">
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="e.g. email@example.com"
                name="email"
              />
            </div>

            {/* Admin Role Dropdown */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="isAdmin" className="text-sm">
                Admin Role
              </Label>
              <Select
                id="isAdmin"
                name="isAdmin"
                className="border rounded p-2"
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

            {/* Status Dropdown */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="status" className="text-sm">
                Status
              </Label>
              <Select id="status" name="status" className="border rounded p-2">
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

export default AdminUserForm;
