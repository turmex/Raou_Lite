import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Lock, Unlock } from "lucide-react";
import { CountryEditor } from "@/components/admin/CountryEditor";
import { JournalEditor } from "@/components/admin/JournalEditor";
import { ServicesEditor } from "@/components/admin/ServicesEditor";
import { AboutEditor } from "@/components/admin/AboutEditor";
import { GlobalEditor } from "@/components/admin/GlobalEditor";
import { ImageUploader } from "@/components/ImageUploader";
import { useContent, reloadContent } from "@/hooks/useContent";
import type { ContentConfig } from "@/types/content.types";

const ContentEditor = () => {
    const { content: initialContent } = useContent();
    const [content, setContent] = useState<ContentConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const EDITOR_PASSWORD = "raou2024";

    useEffect(() => {
        const auth = localStorage.getItem("editor_authenticated");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (initialContent) {
            setContent(JSON.parse(JSON.stringify(initialContent)));
            setLoading(false);
        }
    }, [initialContent]);

    const handleLogin = () => {
        if (password === EDITOR_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem("editor_authenticated", "true");
            toast({
                title: "Access Granted",
                description: "You can now edit the website content.",
            });
        } else {
            toast({
                title: "Access Denied",
                description: "Incorrect password. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("editor_authenticated");
        toast({
            title: "Logged Out",
            description: "You have been logged out of the editor.",
        });
    };

    const handleSave = async (newContent: any = content) => {
        setSaving(true);
        try {
            const response = await fetch("/api/save-content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newContent),
            });

            if (!response.ok) throw new Error("Failed to save");

            setContent(newContent);
            await reloadContent();

            toast({
                title: "Success",
                description: "Content saved successfully!",
            });
        } catch (error) {
            console.error("Save error:", error);
            toast({
                title: "Error",
                description: "Failed to save content. Is the server running?",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    const updateNestedValue = (path: string[], value: any) => {
        if (!content) return;

        const newContent = JSON.parse(JSON.stringify(content));
        let current: any = newContent;

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }

        current[path[path.length - 1]] = value;
        setContent(newContent);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Content Editor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                placeholder="Enter editor password"
                            />
                        </div>
                        <Button onClick={handleLogin} className="w-full">
                            <Lock className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loading || !content) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif">Content Editor</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleLogout}>
                        <Unlock className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                    <Button onClick={() => handleSave()} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save All Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="global" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="global">Global & Nav</TabsTrigger>
                    <TabsTrigger value="general">Home Page</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="destinations">Destinations</TabsTrigger>
                    <TabsTrigger value="journal">Journal</TabsTrigger>
                </TabsList>

                <TabsContent value="global">
                    <GlobalEditor content={content} onSave={handleSave} />
                </TabsContent>

                <TabsContent value="general">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Home Page Hero</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Title</Label>
                                    <Input
                                        value={content.home.hero.title}
                                        onChange={(e) => updateNestedValue(["home", "hero", "title"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Subtitle</Label>
                                    <Input
                                        value={content.home.hero.subtitle}
                                        onChange={(e) => updateNestedValue(["home", "hero", "subtitle"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Hero Image</Label>
                                    <ImageUploader
                                        currentImagePath={content.home.hero.image}
                                        onUploadComplete={(newPath) => updateNestedValue(["home", "hero", "image"], newPath)}
                                        customRequirements={{
                                            name: "Home Hero",
                                            width: 1920,
                                            height: 1080,
                                            maxSizeKB: 2000,
                                            formats: ["jpg", "jpeg", "png", "webp"]
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Button Labels</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Primary CTA (Home Hero)</Label>
                                    <Input
                                        value={content.home.hero.primaryCta.label}
                                        onChange={(e) => updateNestedValue(["home", "hero", "primaryCta", "label"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Secondary CTA (Home Hero)</Label>
                                    <Input
                                        value={content.home.hero.secondaryCta.label}
                                        onChange={(e) => updateNestedValue(["home", "hero", "secondaryCta", "label"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Philosophy Button</Label>
                                    <Input
                                        value={content.home.buttons?.philosophy || "OUR PHILOSOPHY"}
                                        onChange={(e) => updateNestedValue(["home", "buttons", "philosophy"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>View Destinations Button</Label>
                                    <Input
                                        value={content.home.buttons?.viewDestinations || "VIEW ALL DESTINATIONS"}
                                        onChange={(e) => updateNestedValue(["home", "buttons", "viewDestinations"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Read Journal Button</Label>
                                    <Input
                                        value={content.home.buttons?.readJournal || "READ THE JOURNAL"}
                                        onChange={(e) => updateNestedValue(["home", "buttons", "readJournal"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        value={content.site.companyInfo.email}
                                        onChange={(e) => updateNestedValue(["site", "companyInfo", "email"], e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input
                                        value={content.site.companyInfo.phone}
                                        onChange={(e) => updateNestedValue(["site", "companyInfo", "phone"], e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="about">
                    <AboutEditor content={content} onSave={handleSave} />
                </TabsContent>

                <TabsContent value="services">
                    <ServicesEditor content={content} onSave={handleSave} />
                </TabsContent>

                <TabsContent value="destinations">
                    <CountryEditor content={content} onSave={handleSave} />
                </TabsContent>

                <TabsContent value="journal">
                    <JournalEditor content={content} onSave={handleSave} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ContentEditor;
