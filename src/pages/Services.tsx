import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const Services = () => {
    const { content } = useContent();

    if (!content) return null;

    const { services } = content;

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Services | RAOU Travel"
                description="Boutique DMC solutions and curated private journeys."
            />
            <Navigation />

            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={services.hero.image}
                        alt={services.hero.title}
                        className="w-full h-full object-cover"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="container relative z-10 px-4 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6">{services.hero.title}</h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto luxury-leading">
                        {services.hero.subtitle}
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-serif mb-8">{services.intro.title}</h2>
                    <p className="text-xl leading-relaxed text-muted-foreground luxury-leading">
                        {services.intro.description}
                    </p>
                </div>
            </section>

            {/* Boutique DMC Solutions */}
            <section className="py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-serif mb-6">{services.dmc.title}</h2>
                            <p className="text-lg text-muted-foreground mb-8 luxury-leading">
                                {services.dmc.description}
                            </p>
                            <Button asChild size="lg">
                                <a href={`mailto:${services.cta.dmc}`}>Contact for DMC Projects</a>
                            </Button>
                        </div>
                        <div className="bg-background p-8 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold mb-6">Our Portfolio Includes:</h3>
                            <ul className="space-y-3">
                                {services.dmc.portfolio.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-3 text-accent">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curated Travel */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <span className="text-accent uppercase luxury-tracking text-sm font-medium mb-4 block">
                        {services.curated.subtitle}
                    </span>
                    <h2 className="text-4xl font-serif mb-8">{services.curated.title}</h2>
                    <p className="text-xl text-muted-foreground luxury-leading mb-12">
                        {services.curated.description}
                    </p>
                    <Button asChild size="lg" variant="outline">
                        <a href={`mailto:${services.cta.curated}`}>Inquire for Curated Travel</a>
                    </Button>
                </div>
            </section>

            {/* How We Work */}
            <section className="py-24 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4">
                    <h2 className="text-sm font-medium luxury-tracking text-accent mb-16 text-center">How We Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {services.process.steps.map((step) => (
                            <div key={step.step} className="group text-center md:text-left hover:-translate-y-2 transition-transform duration-500 cursor-default">
                                <div className="text-4xl font-serif text-primary-foreground/30 mb-4 group-hover:text-accent transition-colors duration-300">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-serif mb-3 group-hover:text-white transition-colors duration-300">
                                    {step.name}
                                </h3>
                                <p className="text-sm text-primary-foreground/70 leading-relaxed group-hover:text-primary-foreground transition-colors duration-300">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Work With */}
            <section className="py-24 bg-background text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-serif mb-6">Who We Work With</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {services.whoWeWorkWith}
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;
