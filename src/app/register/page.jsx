"use client";

import Image from "next/image";
import Link from "next/link";
import { register } from "@/lib/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react"; // For the loading spinner icon

export default function Register() {
  const [state, formAction] = useFormState(register, undefined);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true); // Start the loading spinner
    // No need for event.target.submit() because the form action will handle submission automatically.
  };

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success("Registration successful!");
      router.push("/login");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.success, state?.error, router]);

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen">
      {/* Background Image for Large Screens */}
      <div className="hidden lg:block lg:w-1/2 lg:relative">
        <Image
          src="/worrior.png"
          alt="Background Image"
          fill
          className="absolute inset-0 object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
        {/* Overlay for image */}
      </div>

      {/* Main Content Section */}
      <div className="flex-1 flex items-center justify-center lg:w-1/2 p-4 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Image
              src="/worrior.png"
              alt="Mobile Logo"
              width={80}
              height={80}
              priority={true}
              className="w-20 h-20"
            />
          </div>

          {/* Register Form Section */}
          <div className=" space-y-6">
            <div className="text-center space-y-6 ">
              <h1 className="text-4xl font-extrabold text-gray-900">Sign Up</h1>
              <p className="text-sm text-gray-600">
                Enter the details below to register your account
              </p>
            </div>
            <form
              action={formAction}
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <div className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-500 underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
