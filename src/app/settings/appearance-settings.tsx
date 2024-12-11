"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState("en");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Appearance and Accessibility
        </h2>
        <p className="text-muted-foreground">
          Customize the look and feel of your MediNexus experience.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Theme Options</h3>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high-contrast" id="high-contrast" />
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Font Size</h3>
          <div className="flex items-center space-x-4">
            <Slider
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              min={12}
              max={24}
              step={1}
              className="w-[200px]"
            />
            <span>{fontSize}px</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Language</h3>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Save Appearance Settings</Button>
      </div>
    </div>
  );
}
