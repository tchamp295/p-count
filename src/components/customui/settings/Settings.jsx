"use client";

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
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Set up your application preferences. </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="app-name">App Name</Label>
            <Input
              id="app-name"
              type="text"
              className="w-full"
              defaultValue="Gamer Gear Pro Controller"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="app-email">App Email</Label>
            <Input
              id="app-email"
              type="email"
              className="w-full"
              defaultValue="example@example.com"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="app-url">App URL</Label>
            <Input
              id="app-url"
              type="url"
              className="w-full"
              defaultValue="https://example.com"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="alert-expiry">
              Alert Expiry Duration (in minutes)
            </Label>
            <Input
              id="alert-expiry"
              type="number"
              className="w-full"
              defaultValue="30" // Changed defaultValue to a number, for expiry duration
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sms-senderid">SMS Sender ID</Label>
            <Input
              id="sms-senderid"
              type="text" // Changed to text if ID can be alphanumeric
              className="w-full"
              defaultValue="SenderID"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sms-gateway-url">SMS Gateway URL</Label>
            <Input
              id="sms-gateway-url"
              type="url"
              className="w-full"
              defaultValue="https://sms-gateway.example.com"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="sms-api-key">SMS API Key</Label>
            <Input
              id="sms-api-key"
              type="text" // Changed to text for API key, as it may include letters
              className="w-full"
              defaultValue="your-api-key"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Update</Button>
      </CardFooter>
    </Card>
  );
}
