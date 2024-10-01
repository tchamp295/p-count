'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/utils/cloudinary";
import useImageUpload from "@/utils/useImageUpload";
import { Label } from '@/components/ui/label';
import { useFormState } from "react-dom";
import { UpdateProfile } from "@/lib/action";
import Image from 'next/image';

const UserSettingsPage = () => {
  const { data: session, status } = useSession();
  const [state, formAction] = useFormState(UpdateProfile, undefined);

  const { imageFile, imageURL, handleUpload, removeImage } = useImageUpload();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    img: '',
    password: ''
  });

  // useEffect to update the user data once session is loaded
  useEffect(() => {
    if (session?.user) {
      const { name, email, phone, img } = session.user;
      setUserData({
        name: name || '',
        email: email || '',
        phone: phone || '',
        img: img || '',
        password: ''
      });
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>User not authenticated.</p>;
  }

  // Default state fallback
  const { pending = false, error = null, success = null } = state || {};

  return (
    <div className="relative flex flex-col items-start gap-8">
      <form className="grid w-full items-start gap-6" action={formAction}>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            User Profile Settings
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Name Field */}
            <div className="grid gap-3">
              <Label htmlFor="name" className="text-sm">Name</Label>
              <Input
                id="name"
                type="text"
                value={userData.name}
                placeholder="Enter your name"
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field */}
            <div className="grid gap-3">
              <Label htmlFor="phone" className="text-sm">Phone</Label>
              <Input
                id="phone"
                type="text"
                value={userData.phone}
                placeholder="Enter your phone number"
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              />
            </div>

            {/* Image Field */}
            <div className="grid gap-3">
              <Label htmlFor="img" className="text-sm">Profile Image</Label>

              {/* Display uploaded image or session image */}
              {imageFile || userData.img ? (
                <div className="relative">
                  <Image
                    src={imageFile || userData.img}
                    alt="Profile Image"
                    width={150}
                    height={150}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <p>No profile image uploaded.</p>
              )}

              <ImageUpload onUpload={handleUpload} />
            </div>

            {/* Password Field */}
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={userData.password}
                placeholder="Enter new password"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-3">
              <Button type="submit" disabled={pending}>Update Profile</Button>
              {pending && <p>Updating...</p>}
              {error && <p>Error: {error.message}</p>}
              {success && <p>Profile updated successfully!</p>}
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default UserSettingsPage;
