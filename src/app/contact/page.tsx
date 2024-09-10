"use client";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiteHeader2 } from "@/components/SiteHeader2";
import GeneralizedInput from "@/components/GeneralizedInput";
import GeneralizedTextArea from "@/components/GeneralizedTextArea";

export default function ContactUs() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name ? "" : "Please fill in this field.",
      email: formData.email ? "" : "Please fill in this field.",
      subject: formData.subject ? "" : "Please fill in this field.",
      message: formData.message ? "" : "Please fill in this field.",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status == 200) {
          toast({
            title: "Message Sent",
            description:
              "Thank you for your message. We will get back to you soon!",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          toast({
            title: "Error",
            description: "There was a problem sending your message.",
            variant: "destructive",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem sending your message.",
          variant: "destructive",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }
    }
  };

  return (
    <div>
      <SiteHeader2 />
      <Toaster />
      <div className="min-h-screen bg-muted/40">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-xl text-center mb-12">
            We&apos;re here to help with your pharmaceutical supply chain needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <GeneralizedInput
                    id="name"
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                  />
                  <GeneralizedInput
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="john@example.com"
                  />
                  <GeneralizedInput
                    id="subject"
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    placeholder="Your subject"
                  />
                  <GeneralizedTextArea
                    id="message"
                    name="message"
                    label="Message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder="Your message here"
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            <ContactDetail />
          </div>
        </div>
      </div>
    </div>
  );
}

const ContactDetail = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Contact Information
        </CardTitle>
        <CardDescription>
          You can also reach us using the following contact details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-5">
          <Mail className="h-5 w-5" />
          <span>arnavsinghal06@gmail.com</span>
        </div>
        <div className="flex items-center space-x-5">
          <Phone className="h-5 w-5" />
          <span>+919868554988</span>
        </div>
        <div className="flex items-center space-x-5">
          <MapPin className="h-5 w-5" />
          <span>
            Delhi Technological University, Bawana Rd, Shahbad Daulatpur
            Village, Rohini, New Delhi, Delhi, 110042
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm">
          Our support team is available Monday to Friday, 9am to 5pm EST.
        </p>
      </CardFooter>
    </Card>
  );
};
