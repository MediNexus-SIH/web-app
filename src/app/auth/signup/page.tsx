"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Hospital,
  Users,
  UserCog,
  Check,
  X,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GeneralizedInput from "@/components/GeneralizedInput";
import { departmentOptions, indiaStatesAndUTs, securityOptions } from "@/lib/dropdownOptions";
import { SelectDropdown } from "@/components/SelectDropdown";
import useCreateHospital from "@/hooks/useCreateHospital";
// import { FormData } from "@/lib/zodSchema/formSchema";
// // Types
type Department = {
  department: string;
  hod_name: string;
  hod_email: string;
};

type FormData = {
  hospitalName: string;
  address_line_1: string;
  address_line_2: string;
  region: string;
  pincode: string;
  state: string;
  contact_number: string;
  departments: Department[];
  admin_name: string;
  admin_email: string;
  password: string;
  confirmPassword: string;
  security_question: string;
  security_answer: string;
};

export default function HospitalRegistrationForm() {
  const { createHospital, isFormLoading, formError } = useCreateHospital();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    hospitalName: "",
    address_line_1: "",
    address_line_2: "",
    region: "",
    pincode: "",
    state: "",
    contact_number: "",
    departments: [],
    admin_name: "",
    admin_email: "",
    password: "",
    confirmPassword: "",
    security_question: "",
    security_answer: "",
  });

  const [newDepartment, setNewDepartment] = useState<Department>({
    department: "",
    hod_name: "",
    hod_email: "",
  });

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();
  const showToast = useCallback(
    (
      title: string,
      description: string,
      variant: "default" | "destructive" = "default"
    ) => {
      toast({
        title,
        description,
        variant,
        duration: 3000,
        className: `${
          variant === "destructive" ? "bg-red-500" : "bg-green-500"
        } text-white`,
      });
    },
    [toast]
  );

  useEffect(() => {
    if (step === 4) {
      otpRefs.current[0]?.focus();
    }
  }, [step]);

  // Helper functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (label: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: label }));
  };

  const handleNewDepartmentChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    setNewDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addDepartment = () => {
    console.log(newDepartment);
    if (
      newDepartment.department &&
      newDepartment.hod_name &&
      newDepartment.hod_email
    ) {
      setFormData((prev) => ({
        ...prev,
        departments: [...prev.departments, newDepartment],
      }));
      setNewDepartment({ department: "", hod_name: "", hod_email: "" });
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

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (otp === "123456") {
      try {
        const data = await createHospital(formData);
        setStep((prev) => prev + 1);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch {
        toast({
          title: "Signup Unsuccessful",
          description: "Please fill in the correct fields or Try again later",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please fill in the Correct OTP.",
        variant: "destructive",
      });
    }
  };

  const renderHospitalInfo = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Hospital className="h-5 w-5 text-gray-500" />
          <h3 className="text-xl font-semibold">Hospital Information</h3>
        </div>
        <GeneralizedInput
          label="Hospital Name"
          id="hospitalName"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleInputChange}
          required
        />
        <GeneralizedInput
          id="address_line_1"
          name="address_line_1"
          value={formData.address_line_1}
          label="Address Line 1"
          onChange={handleInputChange}
          required
        />{" "}
        <GeneralizedInput
          id="address_line_2"
          name="address_line_2"
          value={formData.address_line_2}
          label="Address Line 2"
          onChange={handleInputChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <GeneralizedInput
            id="region"
            name="region"
            value={formData.region}
            label="Region"
            required
            onChange={handleInputChange}
          />
          <GeneralizedInput
            id="pincode"
            name="pincode"
            value={formData.pincode}
            label="Pincode"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <SelectDropdown
              name="state"
              options={indiaStatesAndUTs}
              onValueChange={(value: any) => handleSelectChange(value, "state")}
              placeholder="Select a state or union territory"
            />
          </div>

          <GeneralizedInput
            label="Phone Number"
            id="contact_number"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    );
  };

  const renderDepartmentDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-gray-500" />
        <h3 className="text-xl font-semibold">Department Details</h3>
      </div>
      {formData.departments.map((dept, index) => (
        <div key={index} className="p-4 bg-muted/40 rounded-lg relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => removeDepartment(index)}
          >
            <X className="h-4 w-4" />
          </Button>
          <p>
            <strong>Department:</strong> {dept.department}
          </p>
          <p>
            <strong>HOD Name:</strong> {dept.hod_name}
          </p>
          <p>
            <strong>HOD Email:</strong> {dept.hod_email}
          </p>
        </div>
      ))}
      <div className="space-y-2">
        <Label htmlFor="department">Department Name</Label>
        <SelectDropdown
          name="department"
          options={departmentOptions}
          onValueChange={(value) =>
            handleNewDepartmentChange({ name: "department", value })
          }
          placeholder="Select department"
        />
      </div>

      <GeneralizedInput
        label="Head of Department Name"
        id="hod_name"
        name="hod_name"
        value={newDepartment.hod_name}
        onChange={handleNewDepartmentChange}
      />

      <GeneralizedInput
        label="Head of Department Email"
        id="hod_email"
        name="hod_email"
        type="email"
        value={newDepartment.hod_email}
        onChange={handleNewDepartmentChange}
      />
      <Button variant={"default"} onClick={addDepartment} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Department
      </Button>
    </div>
  );

  const renderAdminRegistration = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <UserCog className="h-5 w-5 text-gray-500" />
        <h3 className="text-xl font-semibold">Admin Registration</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <GeneralizedInput
            label="Admin Name"
            id="admin_name"
            name="admin_name"
            value={formData.admin_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <GeneralizedInput
            label="Admin Email"
            id="admin_email"
            name="admin_email"
            type="email"
            value={formData.admin_email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <GeneralizedInput
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <GeneralizedInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departmentName">Security Question</Label>
          <SelectDropdown
            name="security_question"
            placeholder="Select your Security Question"
            value={formData.security_question}
            options={securityOptions}
            onValueChange={(label) =>
              handleSelectChange(label, "security_question")
            }
          />
        </div>

        <GeneralizedInput
          label="Security Answer"
          id="security_answer"
          name="security_answer"
          value={formData.security_answer}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex flex-col justify-center space-x-2 space-y-6 ">
        <div className="flex  justify-between items-center">
          <div className="text-xl ml-2 font-semibold flex">Enter OTP</div>
          <div className="text-sm ">&quot;123456&quot; for the time being</div>
        </div>

        <div className="flex justify-center space-x-2">
          {otpValues.map((value, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center text-lg"
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              ref={(el) => {
                otpRefs.current[index] = el;
              }}
              required
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
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
        Registration Successful
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

  const steps = [
    { title: "Hospital", icon: Hospital },
    { title: "Department", icon: Users },
    { title: "Account", icon: UserCog },
    { title: "Verification", icon: ShieldCheck },
  ];

  //Is rerendering unnecessarily
  interface StepProgressProps {
    currentStep: number;
  }

  const StepProgress: React.FC<StepProgressProps> = React.memo(
    ({ currentStep }) => {
      const prevStepRef = useRef(currentStep);
      const controls = useAnimation();

      useEffect(() => {
        const animate = async () => {
          if (currentStep !== prevStepRef.current) {
            await controls.start({
              width: `${
                ((Math.min(currentStep, steps.length) - 1) /
                  (steps.length - 1)) *
                100
              }%`,
              transition: { duration: 0.5 },
            });
            prevStepRef.current = currentStep;
          }
        };
        animate();
      }, [currentStep, controls]);

      return (
        <div className="mb-8">
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2"
              initial={{
                width: `${
                  ((Math.min(prevStepRef.current, steps.length) - 1) /
                    (steps.length - 1)) *
                  100
                }%`,
              }}
              animate={controls}
            />
            <div className="relative z-10 flex items-center justify-between">
              {steps.map((s, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center relative"
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 ${
                      index < currentStep - 1
                        ? "bg-green-500"
                        : index === currentStep - 1 &&
                          currentStep - 1 <= steps.length
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                    initial={false}
                    animate={{
                      scale:
                        index === currentStep - 1 &&
                        currentStep - 1 <= steps.length
                          ? 1.2
                          : 1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {index < currentStep - 1 ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <s.icon className="h-6 w-6" />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  );

  StepProgress.displayName = "StepProgress";



  const validateStep = () => {
    console.log(formData);
    if (step === 1) {
      console.log("Entered the validate stepp")
      if (
        !formData.hospitalName ||
        !formData.address_line_1 ||
        !formData.region ||
        !formData.pincode ||
        !formData.state ||
        !formData.contact_number
      ) {
        showToast(
          "Incomplete Information",
          "Please fill in all required fields.",
          "destructive"
        );
        return false;
      }
    } else if (step === 2) {
      if (formData.departments.length === 0) {
        showToast(
          "No Departments Added",
          "Please add at least one department.",
          "destructive"
        );
        return false;
      }
    } else if (step === 3) {
      if (
        !formData.admin_name ||
        !formData.admin_email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        showToast(
          "Incomplete Information",
          "Please fill in all required fields.",
          "destructive"
        );
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        showToast(
          "Password Mismatch",
          "Passwords do not match. Please try again.",
          "destructive"
        );
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
        console.log(step);
        setIsLoading(false);
        showToast("Step Completed", "Moving to the next step.", "default");
      }, 500);
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [step, router]);

  const getCardFooterClassName = (currentStep: number): string => {
    return `flex justify-between items-center ${
      currentStep > 1 ? "bg-muted/40 border-t pt-5" : ""
    }`;
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <Toaster />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="border-b flex flex-col space-y-2 justify-center items-center">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Hospital className="h-6 w-6" />
            Hospital Registration
          </CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link className="hover:underline" href={"/auth/signin"}>
              Signin
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {step < 5 ? <StepProgress currentStep={step} /> : null}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.toString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && renderHospitalInfo()}
                  {step === 2 && renderDepartmentDetails()}
                  {step === 3 && renderAdminRegistration()}
                  {step === 4 && renderOtpVerification()}
                  {step === 5 && renderConfirmation()}
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
              <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

