"use client";

import { login } from "@/lib/action";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  const router = useRouter();
  // const { pending } = useFormStatus(); // Using useFormStatus to get loading state

  useEffect(() => {
    if (state?.success) {
      toast.success("Login successful!");
      router.push("/admin"); // Redirect to a protected route after login
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.success, state?.error, router]);

  return (
    <form className="grid gap-4" action={formAction}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          name="email"
        />
      </div>
      <div className="grid gap-2">
      <Label htmlFor="email">Password</Label>

        <Input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
