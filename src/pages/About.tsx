import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

import { useContentMode } from "@/contexts/ContentModeContext";

const About = () => {
  const { content } = useContent();
  const { mode } = useContentMode();

  if (!content) return null;

  const { about } = content;
  const activeContent = mode === 'short'
    ? (about.content_short || about.content)
    : (about.content_long || about.content);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us | RAOU Travel"
        description="A boutique DMC company built on clarity, structure, and intentional planning."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={about.hero.image}
            alt={about.hero.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if about-hero.png is missing
              e.currentTarget.src = content.destinations[0]?.image || "";
            }}
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative z-10 px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">{about.hero.title}</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto luxury-leading">
            {mode === 'short' ? (about.hero.subtitle_short || about.hero.subtitle) : (about.hero.subtitle_long || about.hero.subtitle)}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="space-y-12">
            {activeContent.map((paragraph, index) => (
              <p key={index} className="text-2xl md:text-3xl font-serif luxury-leading text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
