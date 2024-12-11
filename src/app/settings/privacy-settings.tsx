"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PrivacySettings() {
  const [dataRetention, setDataRetention] = useState("1-year");

  return (
    <div className="space-y-6 h-full">
      <div>
        <h2 className="text-2xl font-bold mb-4">Privacy and Data Management</h2>
        <p className="text-muted-foreground">
          Manage your data privacy and retention settings.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Export Data</h3>
          <div className="flex space-x-2">
            <Button variant="outline">Export Profile Data</Button>
            <Button variant="outline">Export Inventory Data</Button>
            <Button variant="outline">Export Transaction History</Button>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Data Retention</h3>
          <div className="flex items-center space-x-2">
            <Label htmlFor="data-retention">Retain data for</Label>
            <Select value={dataRetention} onValueChange={setDataRetention}>
              <SelectTrigger id="data-retention" className="w-[180px]">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6-months">6 months</SelectItem>
                <SelectItem value="1-year">1 year</SelectItem>
                <SelectItem value="2-years">2 years</SelectItem>
                <SelectItem value="indefinitely">Indefinitely</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Account Deletion</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete your account?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
