import { useState, useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/FadeIn";

import { useContentMode } from "@/contexts/ContentModeContext";

const Home = () => {
  const { content } = useContent();
  const { mode } = useContentMode();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!content) return null;

  const { home } = content;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Raou Travel | Clear Plans. Meaningful Travel."
        description="Boutique DMC solutions, curated travel, and experiences shaped with meaning."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: `url('${home.hero.image}')`,
            transform: `translateY(${offset * 0.5}px) scale(1.05)`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <FadeIn delay={200}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-center mb-6 tracking-wider">
              {home.hero.title}
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="font-sans text-lg md:text-xl tracking-[0.2em] uppercase text-white/90 mb-12 text-center max-w-2xl mx-auto font-light">
              {mode === 'short' ? (home.hero.subtitle_short || home.hero.subtitle) : (home.hero.subtitle_long || home.hero.subtitle)}
            </p>
          </FadeIn>
          <FadeIn delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={home.hero.primaryCta.path}
                className="group relative px-8 py-4 border border-white/30 hover:border-white/80 transition-all duration-500 bg-white/5 hover:bg-white/10 backdrop-blur-sm inline-block"
              >
                <span className="font-sans text-sm tracking-[0.2em] text-white group-hover:text-white transition-colors">
                  {home.hero.primaryCta.label}
                </span>
              </Link>
              <Link
                to={home.hero.secondaryCta.path}
                className="group relative px-8 py-4 border border-white/30 hover:border-white/80 transition-all duration-500 bg-transparent hover:bg-white/5 backdrop-blur-sm inline-block"
              >
                <span className="font-sans text-sm tracking-[0.2em] text-white group-hover:text-white transition-colors">
                  {home.hero.secondaryCta.label}
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-4xl md:text-5xl text-foreground/90 leading-tight">
                {home.intro.title}
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed text-lg font-light tracking-wide whitespace-pre-line">
                {mode === 'short' ? (home.intro.description_short || home.intro.description) : (home.intro.description_long || home.intro.description)}
              </p>
              <Link to="/about" className="inline-block group">
                <span className="font-sans text-sm tracking-[0.15em] text-foreground border-b border-foreground/30 pb-1 group-hover:border-foreground transition-all duration-300">
                  {home.buttons?.philosophy || "OUR PHILOSOPHY"}
                </span>
              </Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden group">
              <img
                src={home.intro.image || content.destinations[0].image}
                alt="Luxury Travel Experience"
                className="object-cover w-full h-full transition-transform duration-1500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = content.destinations[0].image;
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-brand-warm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4 block">Our Process</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground/90">How We Work</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {home.howWeWork.steps.map((step: any, index: number) => {
              return (
                <FadeIn key={step.name} delay={index * 100}>
                  <div className="text-center group">
                    <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center mx-auto mb-6 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
                      <span className="font-serif text-xl text-foreground/60 group-hover:text-accent transition-colors">0{index + 1}</span>
                    </div>
                    <h3 className="font-serif text-xl text-foreground/90 mb-2">{step.name}</h3>
                    <div className="h-24 flex items-start justify-center pt-2">
                      <p className="text-sm text-muted-foreground font-light px-2 transition-opacity duration-500">
                        {mode === 'short' ? (step.description_short || step.description) : (step.description_long || step.description)}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4 block">Curated Journeys</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground/90">Signature Destinations</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.destinations.slice(0, 3).map((dest: any, index: number) => (
              <FadeIn key={dest.slug} delay={index * 100}>
                <Link to="/destinations" className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 image-zoom-container">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                    <img
                      src={dest.image}
                      alt={dest.region}
                      className="object-cover w-full h-full transform transition-transform duration-1500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-8 left-8 z-20">
                      <span className="font-sans text-xs tracking-[0.2em] text-white/80 uppercase mb-2 block">Explore</span>
                      <h3 className="font-serif text-3xl text-white">{dest.region}</h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-16">
            <FadeIn>
              <Link
                to="/destinations"
                className="inline-block px-8 py-4 border border-foreground/20 hover:border-foreground/60 transition-all duration-300"
              >
                <span className="font-sans text-sm tracking-[0.2em] text-foreground">
                  {home.buttons?.viewDestinations || "VIEW ALL DESTINATIONS"}
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-brand-warm">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <span className="font-sans text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4 block">The Journal</span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground/90 mb-6">Stories from the Road</h2>
              <p className="font-sans text-muted-foreground font-light">Immersive stories and travel inspiration for the modern voyager.</p>
            </div>
            <Link to="/journal" className="hidden md:block group">
              <span className="font-sans text-sm tracking-[0.15em] text-foreground border-b border-foreground/30 pb-1 group-hover:border-foreground transition-all duration-300">
                {home.buttons?.readJournal || "READ THE JOURNAL"}
              </span>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {content.journal.posts.slice(0, 2).map((post: any, index: number) => (
            <FadeIn key={post.slug} delay={index * 100}>
              <Link to="/journal" className="group block">
                <div className="aspect-[16/9] overflow-hidden mb-6 image-zoom-container">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transform transition-transform duration-1500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs font-sans tracking-widest text-muted-foreground uppercase">
                    <span>{post.date}</span>
                    <span className="w-px h-3 bg-border" />
                    <span>{post.author}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-foreground/90 group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="font-sans text-muted-foreground font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 md:hidden text-center">
          <Link to="/journal" className="inline-block group">
            <span className="font-sans text-sm tracking-[0.15em] text-foreground border-b border-foreground/30 pb-1 group-hover:border-foreground transition-all duration-300">
              {home.buttons?.readJournal || "READ THE JOURNAL"}
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
