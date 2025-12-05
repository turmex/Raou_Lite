import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { toast } from "sonner";

interface ServicesEditorProps {
    content: any;
    onSave: (newContent: any) => void;
}

export const ServicesEditor = ({ content, onSave }: ServicesEditorProps) => {
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

    const updatePortfolio = (index: number, value: string) => {
        const newPortfolio = [...content.services.dmc.portfolio];
        newPortfolio[index] = value;
        handleSave(["services", "dmc", "portfolio"], newPortfolio);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Services Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Hero Section</h3>
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={content.services.hero.title}
                                onChange={(e) => handleSave(["services", "hero", "title"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Input
                                value={content.services.hero.subtitle}
                                onChange={(e) => handleSave(["services", "hero", "subtitle"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Hero Image</Label>
                            <ImageUploader
                                currentImagePath={content.services.hero.image}
                                onUploadComplete={(newPath) => handleSave(["services", "hero", "image"], newPath)}
                                customRequirements={{
                                    name: "Services Hero",
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
                                value={content.services.intro.title}
                                onChange={(e) => handleSave(["services", "intro", "title"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={content.services.intro.description}
                                onChange={(e) => handleSave(["services", "intro", "description"], e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Boutique DMC Solutions</h3>
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={content.services.dmc.title}
                                onChange={(e) => handleSave(["services", "dmc", "title"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={content.services.dmc.description}
                                onChange={(e) => handleSave(["services", "dmc", "description"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Portfolio Items</Label>
                            <div className="space-y-2 mt-2">
                                {content.services.dmc.portfolio.map((item: string, index: number) => (
                                    <Input
                                        key={index}
                                        value={item}
                                        onChange={(e) => updatePortfolio(index, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Curated Travel</h3>
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={content.services.curated.title}
                                onChange={(e) => handleSave(["services", "curated", "title"], e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={content.services.curated.description}
                                onChange={(e) => handleSave(["services", "curated", "description"], e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
