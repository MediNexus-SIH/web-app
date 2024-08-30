"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Hospital, Users, UserCog, Check } from "lucide-react";
import { title } from "process";

export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hospitalName: "",
    addressLine1: "",
    addressLine2: "",
    region: "",
    pincode: "",
    state: "",
    phoneNumber: "",
    department: "",
    hodName: "",
    hodEmail: "",
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.hospitalName ||
        !formData.addressLine1 ||
        !formData.region ||
        !formData.pincode ||
        !formData.state ||
        !formData.phoneNumber
      ) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return false;
      }
    } else if (step === 2) {
      if (!formData.department || !formData.hodName || !formData.hodEmail) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return false;
      }
    } else if (step === 3) {
      if (
        !formData.adminName ||
        !formData.adminEmail ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setIsLoading(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsLoading(true);
      setTimeout(() => {
        console.log("Form submitted:", formData);
        toast({
          title: "Registration Successful",
          description: "Your hospital has been registered successfully.",
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  const steps = [
    { title: "Hospital", icon: Hospital },
    { title: "Department", icon: Users },
    { title: "Account", icon: UserCog },
  ];

function getCardFooterClassName(step:number): string {
  return `flex justify-between items-center ${
    step > 1 ? "bg-muted/40 border-t pt-5" : ""
  }`;
}
  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className=" border-b">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Hospital className="h-6 w-6" />
            Hospital Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-8">
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200  -translate-y-1/2" />
              <div className="relative z-10 flex items-center justify-between">
                {steps.map((s, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center"
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full ${
                        index + 1 < step
                          ? "bg-green-500"
                          : index + 1 === step
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      } flex items-center justify-center text-white mb-2`}
                      initial={false}
                      animate={{
                        scale: index + 1 === step ? 1.2 : 1,
                        transition: { duration: 0.3 },
                      }}
                    >
                      {index + 1 < step ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <s.icon className="h-6 w-6" />
                      )}
                    </motion.div>
                    <span
                      className={`text-sm ${
                        index + 1 <= step
                          ? "text-gray-700 font-medium"
                          : "text-gray-400"
                      }`}
                    ></span>
                  </div>
                ))}
              </div>
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Hospital className="h-5 w-5 text-white" />
                        <h3 className="text-xl font-semibold text-white">
                          Hospital Information
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hospitalName">Hospital Name</Label>
                        <Input
                          id="hospitalName"
                          name="hospitalName"
                          value={formData.hospitalName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addressLine1">Address Line 1</Label>
                        <Input
                          id="addressLine1"
                          name="addressLine1"
                          value={formData.addressLine1}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                        <Input
                          id="addressLine2"
                          name="addressLine2"
                          value={formData.addressLine2}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="region">Region</Label>
                          <Input
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Select
                            name="state"
                            onValueChange={(value) =>
                              handleSelectChange(value, "state")
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <StateOptions />
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-white" />
                        <h3 className="text-xl font-semibold text-white">
                          Department Details
                        </h3>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          name="department"
                          onValueChange={(value) =>
                            handleSelectChange(value, "department")
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <DepartmentOptions />
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hodName">Head of Department Name</Label>
                        <Input
                          id="hodName"
                          name="hodName"
                          value={formData.hodName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hodEmail">
                          Head of Department Email
                        </Label>
                        <Input
                          id="hodEmail"
                          name="hodEmail"
                          type="email"
                          value={formData.hodEmail}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <UserCog className="h-5 w-5 text-gray-500" />
                        <h3 className="text-xl font-semibold text-gray-100">
                          Admin Registration
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="adminName">Admin Name</Label>
                          <Input
                            id="adminName"
                            name="adminName"
                            value={formData.adminName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adminEmail">Admin Email</Label>
                          <Input
                            id="adminEmail"
                            name="adminEmail"
                            type="email"
                            value={formData.adminEmail}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </form>
        </CardContent>
        <CardFooter className={getCardFooterClassName(step)}>
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isLoading}
              className="justify-start"
            >
              Back
            </Button>
          )}
          <div className="flex-grow"></div>
          {step < 3 ? (
            <Button onClick={handleNext} disabled={isLoading}>
              {isLoading ? "Processing..." : "Next"}
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}



const DepartmentOptions = () => {
  return (
    <SelectContent>
      <SelectItem value="emergency">Emergency</SelectItem>
      <SelectItem value="surgery">Surgery</SelectItem>
      <SelectItem value="pediatrics">Pediatrics</SelectItem>
      <SelectItem value="cardiology">Cardiology</SelectItem>
      <SelectItem value="neurology">Neurology</SelectItem>
      <SelectItem value="oncology">Oncology</SelectItem>
      <SelectItem value="radiology">Radiology</SelectItem>
      <SelectItem value="orthopedics">Orthopedics</SelectItem>
      <SelectItem value="dermatology">Dermatology</SelectItem>
      <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
      <SelectItem value="psychiatry">Psychiatry</SelectItem>
      <SelectItem value="obstetricsAndGynecology">
        Obstetrics and Gynecology
      </SelectItem>
      <SelectItem value="nephrology">Nephrology</SelectItem>
      <SelectItem value="pulmonology">Pulmonology</SelectItem>
      <SelectItem value="endocrinology">Endocrinology</SelectItem>
      <SelectItem value="ent">ENT</SelectItem>
      <SelectItem value="ophthalmology">Opthalmology</SelectItem>
      <SelectItem value="pathology">Pathology</SelectItem>
      <SelectItem value="anesthesiology">Anesthesiology</SelectItem>
    </SelectContent>
  );
};

const StateOptions = () => {
  return (
    <SelectContent>
      <SelectItem value="andhra">Andhra Pradesh</SelectItem>
      <SelectItem value="arunachal">Arunachal Pradesh</SelectItem>
      <SelectItem value="assam">Assam</SelectItem>
      <SelectItem value="bihar">Bihar</SelectItem>
      <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
      <SelectItem value="goa">Goa</SelectItem>
      <SelectItem value="gujrat">Gujarat</SelectItem>
      <SelectItem value="haryana">Haryana</SelectItem>
      <SelectItem value="hp">Himachal Pradesh</SelectItem>
      <SelectItem value="jharkhand">Jharkhand</SelectItem>
      <SelectItem value="karnataka">Karnataka</SelectItem>
      <SelectItem value="mp">Madhya Pradesh</SelectItem>
      <SelectItem value="maharashtra">Maharashtra</SelectItem>
      <SelectItem value="manipur">Manipur</SelectItem>
      <SelectItem value="meghalaya">Meghalaya</SelectItem>
      <SelectItem value="mizoram">Mizoram</SelectItem>
      <SelectItem value="nagaland">Nagaland</SelectItem>
      <SelectItem value="odisha">Odisha</SelectItem>
      <SelectItem value="punjab">Punjab</SelectItem>
      <SelectItem value="rajasthan">Rajasthan</SelectItem>
      <SelectItem value="sikkim">Sikkim</SelectItem>
      <SelectItem value="tn">Tamil Nadu</SelectItem>
      <SelectItem value="telangana">Telangana</SelectItem>
      <SelectItem value="up">Uttar Pradesh</SelectItem>
      <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
      <SelectItem value="wb">West Bengal</SelectItem>
      <SelectItem value="andamanNicobar">
        Andaman and Nicobar Islands
      </SelectItem>
      <SelectItem value="lakshadweep">Lakshadweep</SelectItem>
      <SelectItem value="NCT">
        Delhi (National Capital Territory of Delhi)
      </SelectItem>
      <SelectItem value="ladakh">Ladakh</SelectItem>
      <SelectItem value="j&k">Jammu and Kashmir</SelectItem>
    </SelectContent>
  );
};
