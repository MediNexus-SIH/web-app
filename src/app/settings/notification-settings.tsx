"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [frequency, setFrequency] = useState("instant");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
        <p className="text-muted-foreground">
          Manage how you receive notifications and alerts.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Email Notifications</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
            <Label htmlFor="email-notifications">
              Receive email notifications
            </Label>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">SMS Alerts</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="sms-alerts"
              checked={smsAlerts}
              onCheckedChange={setSmsAlerts}
            />
            <Label htmlFor="sms-alerts">
              Receive SMS alerts for emergencies
            </Label>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Push Notifications</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
            <Label htmlFor="push-notifications">
              Receive push notifications
            </Label>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Notification Frequency</h3>
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="instant" id="instant" />
              <Label htmlFor="instant">Instant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily Digest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly Summary</Label>
            </div>
          </RadioGroup>
        </div>
        <Button>Save Notification Preferences</Button>
      </div>
    </div>
  );
}
