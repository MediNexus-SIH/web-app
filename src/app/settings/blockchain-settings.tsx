"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export default function BlockchainSettings() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Blockchain Settings</h2>
        <p className="text-muted-foreground">
          Manage your blockchain keys and view recent transactions.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Key Management</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="public-key">Public Key</Label>
              <Input
                id="public-key"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Enter your public key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="private-key">Private Key</Label>
              <Input
                id="private-key"
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter your private key"
              />
            </div>
          </div>
          <Button className="mt-2">Update Keys</Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Audit Trail</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>0x1234...5678</TableCell>
                <TableCell>Medicine Movement</TableCell>
                <TableCell>2023-05-15 14:30:00</TableCell>
                <TableCell>Confirmed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0x9876...5432</TableCell>
                <TableCell>Inventory Update</TableCell>
                <TableCell>2023-05-14 09:15:00</TableCell>
                <TableCell>Pending</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Data Verification</h3>
          <Button>Verify Blockchain Data Integrity</Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Permission Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="view-data" />
              <Label htmlFor="view-data">
                Allow others to view my blockchain data
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edit-data" />
              <Label htmlFor="edit-data">
                Allow authorized parties to edit my blockchain data
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
