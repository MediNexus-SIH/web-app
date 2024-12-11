import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SupportFeedback() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Support and Feedback</h2>
        <p className="text-muted-foreground">
          Get help or provide feedback to improve MediNexus.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Help Center</h3>
          <p>Visit our comprehensive help center for guides and FAQs.</p>
          <Button variant="outline" asChild>
            <a href="/help-center" target="_blank" rel="noopener noreferrer">
              Go to Help Center
            </a>
          </Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Submit Feedback</h3>
          <Label htmlFor="feedback">
            Your feedback helps us improve MediNexus
          </Label>
          <Textarea
            id="feedback"
            placeholder="Type your feedback here..."
            className="min-h-[100px]"
          />
          <Button>Submit Feedback</Button>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Contact Support</h3>
          <p>Need personalized assistance? Our support team is here to help.</p>
          <Button variant="outline" asChild>
            <a href="mailto:support@medinexus.com">Email Support</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/live-chat">Start Live Chat</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
