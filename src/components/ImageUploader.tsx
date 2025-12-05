import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    IMAGE_REQUIREMENTS,
    resizeImage,
    validateImageFormat,
    type ImageRequirements,
} from "@/lib/imageUtils";

interface ImageUploaderProps {
    imageName?: string; // Key for IMAGE_REQUIREMENTS (optional if requirements provided)
    currentImagePath: string;
    onUploadComplete?: (newPath: string) => void;
    customRequirements?: ImageRequirements; // Allow passing requirements directly
}

export const ImageUploader = ({ imageName, currentImagePath, onUploadComplete, customRequirements }: ImageUploaderProps) => {
    const [processing, setProcessing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const { toast } = useToast();

    // Use custom requirements if provided, otherwise look up by name
    const requirements = customRequirements || (imageName ? IMAGE_REQUIREMENTS[imageName] : null);

    if (!requirements) {
        return <div className="text-red-500">Error: No image requirements found.</div>;
    }

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setProcessing(true);

        try {
            // Validate format
            if (!validateImageFormat(file, requirements.formats)) {
                toast({
                    title: "Invalid Format",
                    description: `Please upload one of: ${requirements.formats.join(", ")}`,
                    variant: "destructive",
                });
                setProcessing(false);
                return;
            }

            // Resize image
            const resizedBlob = await resizeImage(
                file,
                requirements.width,
                requirements.height,
                0.9
            );

            // Check size
            const sizeKB = resizedBlob.size / 1024;
            if (sizeKB > requirements.maxSizeKB) {
                toast({
                    title: "Image Too Large",
                    description: `Image is ${sizeKB.toFixed(0)}KB, max is ${requirements.maxSizeKB}KB. Try a lower quality image.`,
                    variant: "destructive",
                });
                setProcessing(false);
                return;
            }

            // Create preview
            const previewUrl = URL.createObjectURL(resizedBlob);
            setPreview(previewUrl);

            // Upload to server
            const formData = new FormData();
            // Use a timestamped filename to avoid caching issues and collisions
            const filename = `${requirements.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.${file.name.split('.').pop()}`;

            formData.append('image', resizedBlob, filename);
            formData.append('filename', filename);

            const response = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Upload failed');
            }

            const result = await response.json();
            const newPath = result.path;

            toast({
                title: "Image Uploaded Successfully! 🎉",
                description: "The image has been updated.",
            });

            if (onUploadComplete) {
                onUploadComplete(newPath);
            } else {
                // Legacy behavior: reload page if no callback
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }

        } catch (error) {
            toast({
                title: "Upload Failed",
                description: error instanceof Error ? error.message : "Failed to upload image. Make sure the upload server is running.",
                variant: "destructive",
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <Label className="text-base font-semibold">{requirements.name}</Label>
                            <p className="text-sm text-muted-foreground mt-1 truncate max-w-[200px]">
                                Current: {currentImagePath}
                            </p>
                        </div>
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-1">
                        <p className="text-xs font-semibold text-blue-900">Requirements:</p>
                        <ul className="text-xs text-blue-800 space-y-0.5">
                            <li>• Size: {requirements.width}x{requirements.height}px</li>
                            <li>• Max file size: {requirements.maxSizeKB}KB</li>
                            <li>• Formats: {requirements.formats.join(", ")}</li>
                        </ul>
                    </div>

                    {/* Current Image Preview */}
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                            src={currentImagePath}
                            alt={requirements.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>

                    {/* New Image Preview */}
                    {preview && (
                        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-green-500">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                New
                            </div>
                        </div>
                    )}

                    {/* Upload Button */}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => document.getElementById(`upload-${requirements.name.replace(/\s+/g, '')}`)?.click()}
                            disabled={processing}
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            {processing ? "Processing..." : "Upload New Image"}
                        </Button>
                        <input
                            id={`upload-${requirements.name.replace(/\s+/g, '')}`}
                            type="file"
                            accept={requirements.formats.map(f => `.${f}`).join(",")}
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
