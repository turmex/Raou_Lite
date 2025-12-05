import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { toast } from "sonner";

interface AboutEditorProps {
    content: any;
    onSave: (newContent: any) => void;
}

export const AboutEditor = ({ content, onSave }: AboutEditorProps) => {
    const handleSave = (path: string[], value: any) => {
        const newContent = JSON.parse(JSON.stringify(content));
        let current: any = newContent;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        onSave(newContent);
        toast.success("Saved");
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>About Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Hero Section</h3>
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={content.about.hero.title}
                                onChange={(e) => handleSave(["about", "hero", "title"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Input
                                value={content.about.hero.subtitle}
                                onChange={(e) => handleSave(["about", "hero", "subtitle"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Hero Image</Label>
                            <ImageUploader
                                currentImagePath={content.about.hero.image}
                                onUploadComplete={(newPath) => handleSave(["about", "hero", "image"], newPath)}
                                customRequirements={{
                                    name: "About Hero",
                                    width: 1920,
                                    height: 1080,
                                    maxSizeKB: 2000,
                                    formats: ["jpg", "jpeg", "png", "webp"]
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Intro Section</h3>
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={content.about.intro.title}
                                onChange={(e) => handleSave(["about", "intro", "title"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={content.about.intro.description}
                                onChange={(e) => handleSave(["about", "intro", "description"], e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Main Content</h3>
                        <div>
                            <Label>Content (Markdown supported)</Label>
                            <Textarea
                                value={content.about.content}
                                onChange={(e) => handleSave(["about", "content"], e.target.value)}
                                rows={10}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Founder Section</h3>
                        <div>
                            <Label>Founder Name</Label>
                            <Input
                                value={content.about.founder.name}
                                onChange={(e) => handleSave(["about", "founder", "name"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Founder Role</Label>
                            <Input
                                value={content.about.founder.role}
                                onChange={(e) => handleSave(["about", "founder", "role"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Founder Bio</Label>
                            <Textarea
                                value={content.about.founder.bio}
                                onChange={(e) => handleSave(["about", "founder", "bio"], e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div>
                            <Label>Founder Image</Label>
                            <ImageUploader
                                currentImagePath={content.about.founder.image}
                                onUploadComplete={(newPath) => handleSave(["about", "founder", "image"], newPath)}
                                customRequirements={{
                                    name: "Founder Image",
                                    width: 800,
                                    height: 1000,
                                    maxSizeKB: 1000,
                                    formats: ["jpg", "jpeg", "png", "webp"]
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
