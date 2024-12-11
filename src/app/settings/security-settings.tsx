"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SecuritySettings() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [dataEncryption, setDataEncryption] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
        <p className="text-muted-foreground">
          Manage your account security and privacy.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Change Password</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <Button className="mt-2">Update Password</Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="2fa"
              checked={twoFAEnabled}
              onCheckedChange={setTwoFAEnabled}
            />
            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Data Encryption</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="encryption"
              checked={dataEncryption}
              onCheckedChange={setDataEncryption}
            />
            <Label htmlFor="encryption">Enable Data Encryption</Label>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Windows PC</TableCell>
                <TableCell>New York, USA</TableCell>
                <TableCell>2 minutes ago</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm">
                    Logout
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>iPhone 12</TableCell>
                <TableCell>London, UK</TableCell>
                <TableCell>2 days ago</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm">
                    Logout
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
