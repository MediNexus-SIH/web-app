import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from './ui/button';
import { BellIcon } from 'lucide-react';
const NotificationPopup = () => {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-medium">
            3
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Card className="shadow-none border-0">
          <CardHeader className="border-b">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
              <div className="grid gap-1">
                <p className="text-sm font-medium">
                  Your order #123 is pending approval.
                </p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-orange-500" />
              <div className="grid gap-1">
                <p className="text-sm font-medium">
                  Low stock alert for Amoxicillin.
                </p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-green-500" />
              <div className="grid gap-1">
                <p className="text-sm font-medium">
                  Order #456 has been fulfilled.
                </p>
                <p className="text-sm text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};


export default NotificationPopup
