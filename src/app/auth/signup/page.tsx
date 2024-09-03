"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  Hospital,
  Users,
  UserCog,
  Check,
  X,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { title } from "process";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Component() {
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 4) {
      otpRefs.current[0]?.focus();
    }
  }, [step]);
  const [formData, setFormData] = useState({
    hospitalName: "",
    addressLine1: "",
    addressLine2: "",
    region: "",
    pincode: "",
    state: "",
    phoneNumber: "",
    departments: [] as Department[],
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });

  type Department = {
    name: string;
    hodName: string;
    hodEmail: string;
  };
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [newDepartment, setNewDepartment] = useState<Department>({
    name: "",
    hodName: "",
    hodEmail: "",
  });
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewDepartmentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const addDepartment = () => {
    if (newDepartment.name && newDepartment.hodName && newDepartment.hodEmail) {
      setFormData((prev) => ({
        ...prev,
        departments: [...prev.departments, newDepartment],
      }));
      setNewDepartment({ name: "", hodName: "", hodEmail: "" });
    } else {
      toast({
        title: "Incomplete Department Information",
        description: "Please fill in all department fields.",
        variant: "destructive",
      });
    }
  };

  const removeDepartment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.filter((_, i) => i !== index),
    }));
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
      if (formData.departments.length === 0) {
        toast({
          title: "No Departments Added",
          description: "Please add at least one department.",
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
    console.log("handled next", step);
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
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (otp === "123456") {
      console.log("Entered if");
      setStep((prev) => prev + 1);
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
        console.log("Form submitted:", formData);
        setIsLoading(false);
      }, 1000);
      console.log("step is ", step);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const steps = [
    { title: "Hospital", icon: Hospital },
    { title: "Department", icon: Users },
    { title: "Account", icon: UserCog },
    { title: "Verification", icon: ShieldCheck },
  ];
  function StepProgress({ step }: { step: number }) {
    return (
      <div className="mb-8">
        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />

          {/* Colored Progress Line */}
          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2"
            style={{
              width: `${
                ((Math.min(step, steps.length) - 1) / (steps.length - 1)) * 100
              }%`,
            }}
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((Math.min(step, steps.length) - 1) / (steps.length - 1)) * 100
              }%`,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Steps */}
          <div className="relative z-10 flex items-center justify-between">
            {steps.map((s, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center relative"
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 ${
                    index < step-1
                      ? "bg-green-500"
                      : index === step-1 && step-1 <= steps.length
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                  initial={false}
                  animate={{
                    scale: index === step-1 && step-1 <= steps.length ? 1.2 : 1,
                    transition: { duration: 0.3 },
                  }}
                >
                  {index < step-1 ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <s.icon className="h-6 w-6" />
                  )}
                </motion.div>
                <span
                  className={`text-sm ${
                    index < step-1 || (index === step-1 && step-1 <= steps.length)
                      ? "text-gray-700 font-medium"
                      : "text-gray-400"
                  }`}
                >
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  function getCardFooterClassName(step: number): string {
    return `flex justify-between items-center ${
      step > 1 ? "bg-muted/40 border-t pt-5" : ""
    }`;
  }
  return (
    <>
      <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className=" border-b">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Hospital className="h-6 w-6" />
              Hospital Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <StepProgress step = {step}/>

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
                          <Users className="h-5 w-5 text-gray-500" />
                          <h3 className="text-xl font-semibold text-white">
                            Department Details
                          </h3>
                        </div>
                        {formData.departments.map((dept, index) => (
                          <div
                            key={index}
                            className="p-4 bg-muted/40 rounded-lg relative"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => removeDepartment(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <p>
                              <strong>Department:</strong> {dept.name}
                            </p>
                            <p>
                              <strong>HOD Name:</strong> {dept.hodName}
                            </p>
                            <p>
                              <strong>HOD Email:</strong> {dept.hodEmail}
                            </p>
                          </div>
                        ))}
                        <div className="space-y-2">
                          <Label htmlFor="departmentName">
                            Department Name
                          </Label>
                          <Select
                            name="state"
                            onValueChange={(value) =>
                              handleSelectChange(value, "department")
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <DepartmentOptions />
                          </Select>
                          <Input
                            id="departmentName"
                            name="name"
                            value={newDepartment.name}
                            onChange={handleNewDepartmentChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hodName">
                            Head of Department Name
                          </Label>
                          <Input
                            id="hodName"
                            name="hodName"
                            value={newDepartment.hodName}
                            onChange={handleNewDepartmentChange}
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
                            value={newDepartment.hodEmail}
                            onChange={handleNewDepartmentChange}
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={addDepartment}
                          className="w-full"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Department
                        </Button>
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

                    {step === 4 && (
                      <div className="flex flex-col items-center space-y-2">
                        <Label htmlFor="otp" className="text-center">
                          Enter OTP
                        </Label>
                        <div className="flex justify-center space-x-2">
                          {otpValues.map((value, index) => (
                            <Input
                              key={index}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              className="w-12 h-12 text-center text-lg"
                              value={value}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              ref={(el) => {
                                otpRefs.current[index] = el;
                              }}
                              required
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {step === 5 && <RenderConfirmation />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </form>
          </CardContent>
          {step < 5 && (
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
              {step < 4 ? (
                <Button onClick={handleNext} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Next"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
}

const RenderConfirmation = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="rounded-full bg-green-500 p-2 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
      >
        <Check className="h-10 w-10 text-white" />
      </motion.div>
      <motion.h2
        className="text-2xl font-bold text-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Login Successful
      </motion.h2>
      <motion.p
        className="text-center text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Redirecting to dashboard...
      </motion.p>
    </motion.div>
  );
};
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


