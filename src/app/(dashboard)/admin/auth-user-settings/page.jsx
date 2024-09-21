"use client"; // Ensure this is at the top for Next.js' App Router

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";

const UserSettingsPage = () => {
  const { data: session, status } = useSession({ required: true }); // Ensure the session is required
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");
 

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setPhone(session.user.phone || "");
      setImg(session.user.img || "");
    }
  }, [session, status]);


  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        // Optionally, refresh session or reload user data
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please log in to access your settings.</div>;
  }

  return (
    <div className="relative flex flex-col items-start gap-8">
      <form onSubmit={handleUpdateProfile} className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">User Settings</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name Field */}
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-sm">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled 
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field */}
            <div className="grid gap-3">
              <Label htmlFor="phone" className="text-sm">Phone</Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Image Field */}
            <div className="grid gap-3">
              <Label htmlFor="img" className="text-sm">Profile Image URL</Label>
              <Input
                id="img"
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>

           

           

            {/* Submit Button */}
            <div className="col-span-3">
              <Button type="submit">
                Update Profile
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};


export default UserSettingsPage;
