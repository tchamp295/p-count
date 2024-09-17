"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/utils/spinner";

export default function Settings() {
  const [formData, setFormData] = useState({
    appName: "",
    appEmail: "",
    appUrl: "",
    alertExpiry: "",
    smsSenderId: "",
    smsGatewayUrl: "",
    smsApiKey: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch settings from the backend on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data = await response.json();
        console.log("settings",data)
        setFormData(data); // Assuming the response has the correct format
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Settings updated successfully!");
      } else {
        toast.error(result.message || "Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  if (loading) {
    return   <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Set up your application preferences. </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="appName">App Name</Label>
              <Input
                id="appName"
                type="text"
                className="w-full"
                value={formData.appName}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="appEmail">App Email</Label>
              <Input
                id="appEmail"
                type="email"
                className="w-full"
                value={formData.appEmail}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="appUrl">App URL</Label>
              <Input
                id="appUrl"
                type="url"
                className="w-full"
                value={formData.appUrl}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="alertExpiry">
                Alert Expiry Duration (in days)
              </Label>
              <Input
                id="alertExpiry"
                type="number"
                className="w-full"
                value={formData.alertExpiry}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="smsSenderId">SMS Sender ID</Label>
              <Input
                id="smsSenderId"
                type="text"
                className="w-full"
                value={formData.smsSenderId}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="smsGatewayUrl">SMS Gateway URL</Label>
              <Input
                id="smsGatewayUrl"
                type="url"
                className="w-full"
                value={formData.smsGatewayUrl}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="smsApiKey">SMS API Key</Label>
              <Input
                id="smsApiKey"
                type="text"
                className="w-full"
                value={formData.smsApiKey}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Update</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
