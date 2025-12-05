import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

import { FadeIn } from "@/components/FadeIn";

const Journal = () => {
    const { content } = useContent();

    if (!content) return null;

    const { journal } = content;

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={`${journal.title} | Raou Travel`}
                description={journal.subtitle}
            />
            <Navigation />

            <section className="pt-32 pb-16 px-4 container mx-auto text-center">
                <FadeIn>
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">{journal.title}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto luxury-leading">{journal.subtitle}</p>
                </FadeIn>
            </section>

            <section className="pb-24 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {journal.posts.map((post: any, index: number) => (
                        <FadeIn key={post.slug} delay={index * 100} className="h-full">
                            <Link to={`/journal/${post.slug}`} className="group h-full block">
                                <Card className="overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 h-full">
                                    <div className="relative h-64 image-zoom-container">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="text-sm text-accent mb-2 luxury-tracking">
                                            {post.date} • {post.author}
                                        </div>
                                        <h3 className="text-2xl font-serif mb-3 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </FadeIn>
                    ))}
                </div>

                {journal.posts.length === 0 && (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                        <p className="text-muted-foreground">No stories yet. Check back soon!</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Journal;
