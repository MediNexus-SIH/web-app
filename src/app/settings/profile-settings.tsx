"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfileSettings() {
  const [avatar, setAvatar] = useState("/placeholder.svg");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your account details and preferences.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          {/* <Avatar className="w-20 h-20">
            <AvatarImage src={avatar} alt="Profile picture" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar> */}
          <div>
            <Button variant="outline" className="mb-2">
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                Upload new picture
              </Label>
            </Button>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <p className="text-sm text-muted-foreground">
              JPG, GIF or PNG. Max size of 800K
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1 (555) 000-0000" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="hospital-admin">Hospital Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name</Label>
          <Input id="org-name" placeholder="MediNexus Inc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="org-address">Organization Address</Label>
          <Input
            id="org-address"
            placeholder="123 Health St, Medical City, MC 12345"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input id="department" placeholder="Pharmacy" />
        </div>
        <div className="pt-4">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
