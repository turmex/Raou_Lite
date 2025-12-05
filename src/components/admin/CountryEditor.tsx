import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Plus, Trash2 } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { toast } from "sonner";

interface CountryEditorProps {
    content: any;
    onSave: (newContent: any) => void;
}

export const CountryEditor = ({ content, onSave }: CountryEditorProps) => {
    const [selectedRegionSlug, setSelectedRegionSlug] = useState<string>("");
    const [regionData, setRegionData] = useState<any>(null);

    const destinations = content.destinations || [];

    useEffect(() => {
        if (selectedRegionSlug) {
            const region = destinations.find((d: any) => d.slug === selectedRegionSlug);
            if (region) {
                setRegionData({ ...region });
            }
        }
    }, [selectedRegionSlug, content]);

    const handleSave = () => {
        if (!selectedRegionSlug || !regionData) return;

        const newContent = { ...content };
        const index = newContent.destinations.findIndex((d: any) => d.slug === selectedRegionSlug);

        if (index !== -1) {
            newContent.destinations[index] = regionData;
            onSave(newContent);
            toast.success("Region details saved!");
        }
    };

    const handleAdd = () => {
        const newSlug = `new-destination-${Date.now()}`;
        const newDestination = {
            slug: newSlug,
            region: "New Destination",
            shortDescription: "Short description here...",
            longDescription: "Long description here...",
            image: "/assets/hero-background.jpg",
            countries: ["Country 1", "Country 2"]
        };

        const newContent = { ...content };
        if (!newContent.destinations) newContent.destinations = [];
        newContent.destinations.push(newDestination);

        onSave(newContent);
        setSelectedRegionSlug(newSlug);
        toast.success("New destination added!");
    };

    const handleDelete = () => {
        if (!selectedRegionSlug) return;

        if (confirm("Are you sure you want to delete this destination?")) {
            const newContent = { ...content };
            newContent.destinations = newContent.destinations.filter((d: any) => d.slug !== selectedRegionSlug);

            onSave(newContent);
            setSelectedRegionSlug("");
            setRegionData(null);
            toast.success("Destination deleted!");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4 items-end">
                <div className="flex-1">
                    <Label>Select Region to Edit</Label>
                    <Select value={selectedRegionSlug} onValueChange={setSelectedRegionSlug}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent>
                            {destinations.map((d: any) => (
                                <SelectItem key={d.slug} value={d.slug}>{d.region}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="w-4 h-4 mr-2" /> Add New
                </Button>
            </div>

            {regionData && (
                <Card>
                    <CardHeader>
                        <CardTitle>Editing {regionData.region}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Region Name</Label>
                            <Input
                                value={regionData.region}
                                onChange={(e) => setRegionData({ ...regionData, region: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Short Description (Preview)</Label>
                            <Textarea
                                value={regionData.shortDescription}
                                onChange={(e) => setRegionData({ ...regionData, shortDescription: e.target.value })}
                                rows={2}
                            />
                        </div>
                        <div>
                            <Label>Long Description (Detailed)</Label>
                            <Textarea
                                value={regionData.longDescription}
                                onChange={(e) => setRegionData({ ...regionData, longDescription: e.target.value })}
                                rows={6}
                            />
                        </div>
                        <div>
                            <Label>Destination Image</Label>
                            <ImageUploader
                                currentImagePath={regionData.image}
                                onUploadComplete={(newPath) => setRegionData({ ...regionData, image: newPath })}
                                customRequirements={{
                                    name: `Destination: ${regionData.region}`,
                                    width: 1200,
                                    height: 800,
                                    maxSizeKB: 1500,
                                    formats: ["jpg", "jpeg", "png", "webp"]
                                }}
                            />
                        </div>
                        <div>
                            <Label>Countries (Comma separated)</Label>
                            <Input
                                value={regionData.countries.join(", ")}
                                onChange={(e) => setRegionData({ ...regionData, countries: e.target.value.split(",").map((s: string) => s.trim()) })}
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleSave} className="flex-1">
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete Destination
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
