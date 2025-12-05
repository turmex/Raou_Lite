import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";
import { Loader2 } from "lucide-react";

const Contact = () => {
  const { content } = useContent();
  const { toast } = useToast();
  const [inquiryType, setInquiryType] = useState<"dmc" | "private" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Common
    name: "",
    email: "",
    phone: "",
    destination: "",
    dates: "",
    message: "",
    // DMC
    companyName: "",
    role: "",
    eventType: "",
    groupSize: "",
    // Private
    travelers: "",
    travelStyle: "",
    interests: "",
    // Shared key, different label
    budget: ""
  });

  if (!content) return null;

  const { contact } = content;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: inquiryType,
          ...formData,
          submittedAt: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast({
        title: "Request Sent",
        description: contact.form.successMessage,
      });

      // Reset form
      setFormData({
        name: "", email: "", phone: "", message: "", destination: "", dates: "",
        companyName: "", role: "", eventType: "", groupSize: "",
        travelers: "", travelStyle: "", interests: "", budget: ""
      });
      setInquiryType(null);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact | RAOU Travel"
        description="Start your travel request with RAOU."
      />
      <Navigation />

      <div className="pt-32 pb-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif mb-6">{contact.hero.title}</h1>
            <p className="text-xl text-muted-foreground">{contact.hero.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div className="bg-secondary/30 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{contact.emails.dmc.label}</h3>
              <a href={`mailto:${contact.emails.dmc.email}`} className="text-2xl text-accent hover:underline block mb-2">
                {contact.emails.dmc.email}
              </a>
              <p className="text-sm text-muted-foreground">Response time: {contact.emails.dmc.response}</p>
            </div>

            <div className="bg-secondary/30 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{contact.emails.travelers.label}</h3>
              <a href={`mailto:${contact.emails.travelers.email}`} className="text-2xl text-accent hover:underline block mb-2">
                {contact.emails.travelers.email}
              </a>
              <p className="text-sm text-muted-foreground">Response time: {contact.emails.travelers.response}</p>
            </div>
          </div>

          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-serif mb-8 text-center">{contact.form.title}</h2>

              {/* Inquiry Type Selection */}
              <div className="mb-12">
                <Label className="text-lg mb-4 block text-center">I am a...</Label>
                <RadioGroup
                  value={inquiryType || ""}
                  onValueChange={(v) => setInquiryType(v as "dmc" | "private")}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <div className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-all ${inquiryType === 'dmc' ? 'border-accent bg-accent/5' : 'hover:bg-secondary/50'}`}>
                    <RadioGroupItem value="dmc" id="dmc" />
                    <Label htmlFor="dmc" className="cursor-pointer text-lg">{contact.form.types.dmc}</Label>
                  </div>
                  <div className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-all ${inquiryType === 'private' ? 'border-accent bg-accent/5' : 'hover:bg-secondary/50'}`}>
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="cursor-pointer text-lg">{contact.form.types.private}</Label>
                  </div>
                </RadioGroup>
              </div>

              {inquiryType && (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                  {/* Common Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{contact.form.commonFields.name}</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{contact.form.commonFields.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">{contact.form.commonFields.destination}</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => updateField("destination", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dates">{contact.form.commonFields.dates}</Label>
                      <Input
                        id="dates"
                        value={formData.dates}
                        onChange={(e) => updateField("dates", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* DMC Specific Fields */}
                  {inquiryType === "dmc" && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">{contact.form.dmcFields.companyName}</Label>
                          <Input
                            id="companyName"
                            required
                            value={formData.companyName}
                            onChange={(e) => updateField("companyName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">{contact.form.dmcFields.role}</Label>
                          <Input
                            id="role"
                            value={formData.role}
                            onChange={(e) => updateField("role", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label>{contact.form.dmcFields.eventType.label}</Label>
                          <Select value={formData.eventType} onValueChange={(v) => updateField("eventType", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {contact.form.dmcFields.eventType.options.map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groupSize">{contact.form.dmcFields.groupSize}</Label>
                          <Input
                            id="groupSize"
                            value={formData.groupSize}
                            onChange={(e) => updateField("groupSize", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">{contact.form.dmcFields.budget}</Label>
                          <Input
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => updateField("budget", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Private Specific Fields */}
                  {inquiryType === "private" && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="travelers">{contact.form.privateFields.travelers}</Label>
                          <Input
                            id="travelers"
                            type="number"
                            value={formData.travelers}
                            onChange={(e) => updateField("travelers", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>{contact.form.privateFields.travelStyle.label}</Label>
                          <Select value={formData.travelStyle} onValueChange={(v) => updateField("travelStyle", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Style" />
                            </SelectTrigger>
                            <SelectContent>
                              {contact.form.privateFields.travelStyle.options.map(opt => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">{contact.form.privateFields.budget}</Label>
                          <Input
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => updateField("budget", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interests">{contact.form.privateFields.interests}</Label>
                        <Input
                          id="interests"
                          placeholder="e.g. History, Food, Nature..."
                          value={formData.interests}
                          onChange={(e) => updateField("interests", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Common Message & Submit */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">{contact.form.commonFields.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{contact.form.messageField}</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg h-12" disabled={submitting}>
                    {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : contact.form.submitButton}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
