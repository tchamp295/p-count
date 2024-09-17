"use client";

import { login } from "@/lib/action";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react"; // For the loading spinner icon

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  // const { pending } = useFormStatus(); // Using useFormStatus to get loading state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    setLoading(true); // Start the loading spinner
    // No need for event.target.submit() because the form action will handle submission automatically.
  };

  useEffect(() => {
    if (state?.success) {
      toast.success("Login successful!");
      router.push("/admin"); // Redirect to a protected route after login
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.success, state?.error, router]);

  return (
    <form className="grid gap-4" action={formAction} onSubmit={handleSubmit}>
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
