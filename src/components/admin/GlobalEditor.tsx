import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface GlobalEditorProps {
    content: any;
    onSave: (newContent: any) => void;
}

export const GlobalEditor = ({ content, onSave }: GlobalEditorProps) => {
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

    const updateMenuItem = (index: number, field: string, value: string) => {
        const newItems = [...content.navigation.menuItems];
        newItems[index] = { ...newItems[index], [field]: value };
        handleSave(["navigation", "menuItems"], newItems);
    };

    const addMenuItem = () => {
        const newItems = [...content.navigation.menuItems, { label: "New Link", path: "/" }];
        handleSave(["navigation", "menuItems"], newItems);
    };

    const removeMenuItem = (index: number) => {
        const newItems = content.navigation.menuItems.filter((_: any, i: number) => i !== index);
        handleSave(["navigation", "menuItems"], newItems);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Site Identity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Site Name</Label>
                        <Input
                            value={content.site.name}
                            onChange={(e) => handleSave(["site", "name"], e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Tagline</Label>
                        <Input
                            value={content.site.tagline}
                            onChange={(e) => handleSave(["site", "tagline"], e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={content.site.description}
                            onChange={(e) => handleSave(["site", "description"], e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Navigation Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        {content.navigation.menuItems.map((item: any, index: number) => (
                            <div key={index} className="flex gap-4 items-center">
                                <div className="flex-1">
                                    <Label className="text-xs">Label</Label>
                                    <Input
                                        value={item.label}
                                        onChange={(e) => updateMenuItem(index, "label", e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label className="text-xs">Path</Label>
                                    <Input
                                        value={item.path}
                                        onChange={(e) => updateMenuItem(index, "path", e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-5 text-destructive"
                                    onClick={() => removeMenuItem(index)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={addMenuItem} variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Add Menu Item
                        </Button>
                    </div>

                    <div className="pt-6 border-t">
                        <h4 className="font-semibold mb-4">CTA Button</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Label</Label>
                                <Input
                                    value={content.navigation.ctaButton.label}
                                    onChange={(e) => handleSave(["navigation", "ctaButton", "label"], e.target.value)}
                                />
                            </div>
                            <div>
                                <Label>Path</Label>
                                <Input
                                    value={content.navigation.ctaButton.path}
                                    onChange={(e) => handleSave(["navigation", "ctaButton", "path"], e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Footer Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Brand Name</Label>
                        <Input
                            value={content.footer.brandName}
                            onChange={(e) => handleSave(["footer", "brandName"], e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={content.footer.description}
                            onChange={(e) => handleSave(["footer", "description"], e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Copyright Text</Label>
                        <Input
                            value={content.footer.copyright}
                            onChange={(e) => handleSave(["footer", "copyright"], e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Instagram</Label>
                        <Input
                            value={content.site.social.instagram}
                            onChange={(e) => handleSave(["site", "social", "instagram"], e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Facebook</Label>
                        <Input
                            value={content.site.social.facebook}
                            onChange={(e) => handleSave(["site", "social", "facebook"], e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Twitter / X</Label>
                        <Input
                            value={content.site.social.twitter}
                            onChange={(e) => handleSave(["site", "social", "twitter"], e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
