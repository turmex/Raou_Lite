// Image upload utility with resize and validation

export interface ImageRequirements {
    name: string;
    width: number;
    height: number;
    maxSizeKB: number;
    formats: string[];
}

export const IMAGE_REQUIREMENTS: Record<string, ImageRequirements> = {
    'hero-background.jpg': {
        name: 'Hero Background',
        width: 1920,
        height: 1080,
        maxSizeKB: 500,
        formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
    'logo.png': {
        name: 'Logo',
        width: 200,
        height: 200,
        maxSizeKB: 100,
        formats: ['png', 'svg'],
    },
    'bespoke-travel.jpg': {
        name: 'Bespoke Travel',
        width: 1200,
        height: 800,
        maxSizeKB: 300,
        formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
    'family-holidays.jpg': {
        name: 'Family Holidays',
        width: 1200,
        height: 800,
        maxSizeKB: 300,
        formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
    'honeymoons.jpg': {
        name: 'Honeymoons',
        width: 1200,
        height: 800,
        maxSizeKB: 300,
        formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
    'safari-holidays.jpg': {
        name: 'Safari Holidays',
        width: 1200,
        height: 800,
        maxSizeKB: 300,
        formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
    'remote-destinations.jpg': {
        name: 'Remote Destinations',
        width: 1200,
        height: 800,
        maxSizeKB: 300,
        formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
    'unusual-holidays.jpg': {
        name: 'Unusual Holidays',
        width: 1200,
        height: 800,
        maxSizeKB: 300,
        formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
};

export const resizeImage = (
    file: File,
    targetWidth: number,
    targetHeight: number,
    quality: number = 0.9
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                // Calculate scaling to cover the entire canvas while maintaining aspect ratio
                const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;

                // Center the image
                const x = (targetWidth - scaledWidth) / 2;
                const y = (targetHeight - scaledHeight) / 2;

                ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to create blob'));
                        }
                    },
                    file.type === 'image/png' ? 'image/png' : 'image/jpeg',
                    quality
                );
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target?.result as string;
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
};

export const validateImageFormat = (file: File, allowedFormats: string[]): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension ? allowedFormats.includes(extension) : false;
};

export const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};
