import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ContentMode = "short" | "long";

interface ContentModeContextType {
    mode: ContentMode;
    setMode: (mode: ContentMode) => void;
    toggleMode: () => void;
}

const ContentModeContext = createContext<ContentModeContextType | undefined>(undefined);

export const ContentModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ContentMode>("short");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            // Tablet and smaller (<= 1024px) -> short
            // Desktop (> 1024px) -> long
            setMode(width <= 1024 ? "short" : "long");
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // toggleMode is no longer needed but kept empty to satisfy interface if used elsewhere temporarily
    const toggleMode = () => { };

    return (
        <ContentModeContext.Provider value={{ mode, setMode, toggleMode }}>
            {children}
        </ContentModeContext.Provider>
    );
};

export const useContentMode = () => {
    const context = useContext(ContentModeContext);
    if (context === undefined) {
        throw new Error("useContentMode must be used within a ContentModeProvider");
    }
    return context;
};
