"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "react-hot-toast";

const AlertsForm = () => {


  return (
    <div className="relative flex flex-col items-start gap-8">
      <Toaster />
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Create New Alert</legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-3">
              <Label htmlFor="ip-name" className="text-sm">
                IP Name
              </Label>
              <Select name="ipName" >
                <SelectTrigger>
                  <SelectValue placeholder="Select IP Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IP1">IP1</SelectItem>
                  <SelectItem value="IP2">IP2</SelectItem>
                  <SelectItem value="IP3">IP3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="region" className="text-sm">
                Region
              </Label>
              <Select name="region">
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Region1">Region 1</SelectItem>
                  <SelectItem value="Region2">Region 2</SelectItem>
                  <SelectItem value="Region3">Region 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="alert-description" className="text-sm">
                Alert Description
              </Label>
              <Textarea
                id="alert-description"
                name="alertDescription"
                placeholder="Enter alert description"
                value={formData.alertDescription}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="alert-category" className="text-sm">
                Alert Category
              </Label>
              <Select name="alertCategory" >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Category1">Category 1</SelectItem>
                  <SelectItem value="Category2">Category 2</SelectItem>
                  <SelectItem value="Category3">Category 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3 ">
              <Label className="text-sm">Notifications</Label>
              <div className="flex items-center gap-4">
                <Checkbox
                  id="is-sms"
                  name="isSms"
               
                />
                <Label htmlFor="is-sms">Is SMS</Label>

                <Checkbox
                  id="is-http-push"
                  name="isHttpPush"
                  
                />
                <Label htmlFor="is-http-push">Is HTTP Push</Label>

                <Checkbox
                  id="is-email"
                  name="isEmail"
             
                />
                <Label htmlFor="is-email">Is Email</Label>
              </div>
            </div>

            <div className="col-span-3">
              <Button type="submit" className="mt-4 bg-purple-400 hover:bg-purple-500">
                Create
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AlertsForm;
