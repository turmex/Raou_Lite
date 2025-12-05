import { Link } from "react-router-dom";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
    title?: string;
    message?: string;
}

const PlaceholderPage = ({
    title = "Page Under Construction",
    message = "This page is currently being developed. Please check back soon!"
}: PlaceholderPageProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-2xl mx-auto">
                    <Construction className="h-24 w-24 mx-auto mb-8 text-accent animate-pulse" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                        {title}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        {message}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link to="/">Return Home</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link to="/about">Learn About Us</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceholderPage;
