import { useParams, Link } from "react-router-dom";
import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";

const JournalDetail = () => {
    const { slug } = useParams();
    const { content } = useContent();

    if (!content) return null;

    const post = content.journal?.posts.find((p: any) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navigation />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-serif mb-4">Article Not Found</h1>
                    <Button asChild variant="outline">
                        <Link to="/journal">Back to Journal</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={`${post.title} | Raou Journal`}
                description={post.excerpt}
                image={post.image}
            />
            <Navigation />

            <article className="pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-accent">
                        <Link to="/journal">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
                        </Link>
                    </Button>

                    <header className="mb-12 text-center">
                        <div className="text-sm text-accent uppercase tracking-wider mb-4">
                            {post.date} • {post.author}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-lg">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </header>

                    <div className="prose prose-lg mx-auto prose-headings:font-serif prose-a:text-accent">
                        {/* Simple markdown-like rendering since we can't install dependencies */}
                        {post.content.split('\n\n').map((paragraph: string, index: number) => (
                            <p key={index} className="mb-4 whitespace-pre-line">
                                {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                            </p>
                        ))}
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default JournalDetail;
