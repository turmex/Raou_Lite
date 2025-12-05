import { useState, useEffect } from 'react';
import type { ContentConfig } from '@/types/content.types';

let contentCache: ContentConfig | null = null;

export const useContent = () => {
    const [content, setContent] = useState<ContentConfig | null>(contentCache);
    const [loading, setLoading] = useState(!contentCache);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (contentCache) {
            return;
        }

        const loadContent = async () => {
            try {
                const response = await fetch('/content.json');
                if (!response.ok) {
                    throw new Error('Failed to load content');
                }
                const data = await response.json();
                contentCache = data;
                setContent(data);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
                console.error('Error loading content:', err);
            }
        };

        loadContent();
    }, []);

    return { content, loading, error };
};

// Helper function to reload content (useful for the editor)
export const reloadContent = async (): Promise<ContentConfig | null> => {
    try {
        const response = await fetch('/content.json?t=' + Date.now());
        if (!response.ok) {
            throw new Error('Failed to reload content');
        }
        const data = await response.json();
        contentCache = data;
        return data;
    } catch (err) {
        console.error('Error reloading content:', err);
        return null;
    }
};
