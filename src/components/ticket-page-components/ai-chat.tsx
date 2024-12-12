"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Ticket } from "@/lib/interfaces";

interface AICharProps {
  ticket: Ticket;
}

const AIChat: React.FC<AICharProps> = ({ ticket }) => {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Initialize chat with ticket information
    setMessages([
      {
        role: "ai",
        content: `Hello! I'm here to help with your ticket: "${ticket.title}". What would you like to know?`,
      },
    ]);
  }, [ticket]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");

      // Here you would typically make an API call to your AI service
      // For this example, we'll just simulate a response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: `This is a simulated AI response about the ticket "${ticket.title}". In a real implementation, this would be the response from your AI service, taking into account the ticket details.`,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <Button onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Ticket
      </Button>
      <h1 className="text-3xl font-bold mb-4">
        AI Chat Assistant for Ticket: {ticket.title}
      </h1>
      <ScrollArea className="flex-grow mb-4 border rounded-md p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-muted/40"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </ScrollArea>
      <div className="flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow mr-2"
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIChat;
