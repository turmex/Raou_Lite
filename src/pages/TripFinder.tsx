import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const TripFinder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destinations: [] as string[],
    travelers: "couple",
    dates: "",
    duration: "7-10",
    budget: [50000],
    interests: [] as string[],
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Trip Request Submitted!",
      description: "We'll be in touch within 24 hours to start planning your perfect journey.",
    });
    navigate("/");
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif mb-4">Trip Finder</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us about your dream journey and we'll craft a perfect itinerary
            </p>
          </div>
        </section>

        {/* Progress */}
        <div className="bg-background py-6 border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {s}
                  </div>
                  {s < 4 && <div className={`w-16 h-1 mx-2 transition-colors ${
                    step > s ? "bg-accent" : "bg-muted"
                  }`} />}
                </div>
              ))}
            </div>
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Step {step} of 4: {
                step === 1 ? "Your Details" :
                step === 2 ? "Travel Preferences" :
                step === 3 ? "Trip Details" :
                "Additional Information"
              }
            </div>
          </div>
        </div>

        {/* Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-luxury">
                <CardContent className="p-8">
                  {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          placeholder="John Doe"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          placeholder="john@example.com"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 000-0000"
                          className="mt-2"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8 animate-fade-in">
                      <div>
                        <Label className="text-lg mb-4 block">Who's traveling?</Label>
                        <RadioGroup
                          value={formData.travelers}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, travelers: value }))}
                        >
                          {["solo", "couple", "family", "group"].map((option) => (
                            <div key={option} className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value={option} id={option} />
                              <Label htmlFor={option} className="capitalize cursor-pointer">{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="dates" className="text-lg mb-4 block">Preferred Travel Dates</Label>
                        <Input
                          id="dates"
                          type="text"
                          value={formData.dates}
                          onChange={(e) => setFormData(prev => ({ ...prev, dates: e.target.value }))}
                          placeholder="e.g., June 2025 or Flexible"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-lg mb-4 block">Trip Duration</Label>
                        <RadioGroup
                          value={formData.duration}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                        >
                          {["3-5", "7-10", "10-14", "14+"].map((option) => (
                            <div key={option} className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value={option} id={`duration-${option}`} />
                              <Label htmlFor={`duration-${option}`} className="cursor-pointer">{option} days</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8 animate-fade-in">
                      <div>
                        <Label className="text-lg mb-4 block">Budget Range (per person)</Label>
                        <div className="pt-4">
                          <Slider
                            value={formData.budget}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                            min={5000}
                            max={100000}
                            step={5000}
                            className="w-full"
                          />
                          <div className="mt-2 text-center text-lg font-semibold text-accent">
                            ${formData.budget[0].toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-lg mb-4 block">Travel Interests</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            "Wildlife & Safari",
                            "Adventure Sports",
                            "Cultural Immersion",
                            "Beach & Relaxation",
                            "Fine Dining",
                            "Photography",
                            "Historical Sites",
                            "Wellness & Spa"
                          ].map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={formData.interests.includes(interest)}
                                onCheckedChange={(checked) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    interests: checked
                                      ? [...prev.interests, interest]
                                      : prev.interests.filter(i => i !== interest)
                                  }));
                                }}
                              />
                              <Label htmlFor={interest} className="cursor-pointer text-sm">
                                {interest}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <Label htmlFor="notes" className="text-lg mb-4 block">
                          Tell us more about your dream trip
                        </Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          rows={8}
                          placeholder="Share any special requests, must-see destinations, accommodation preferences, or anything else that would help us create your perfect journey..."
                          className="mt-2"
                        />
                      </div>

                      <div className="bg-muted p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">What happens next?</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>✓ We'll review your preferences within 24 hours</li>
                          <li>✓ A dedicated travel consultant will contact you</li>
                          <li>✓ We'll create a personalized itinerary just for you</li>
                          <li>✓ Refine and finalize your perfect journey together</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={prevStep} className="flex-1">
                        Previous
                      </Button>
                    )}
                    {step < 4 ? (
                      <Button type="button" onClick={nextStep} className="flex-1">
                        Next Step
                      </Button>
                    ) : (
                      <Button type="submit" className="flex-1">
                        Submit Request
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TripFinder;
