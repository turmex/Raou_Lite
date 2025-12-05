import { useContent } from "@/hooks/useContent";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FadeIn } from "@/components/FadeIn";

import { useContentMode } from "@/contexts/ContentModeContext";

const Destinations = () => {
  const { content } = useContent();
  const { mode } = useContentMode();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location, content]);

  if (!content) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Signature Destinations | RAOU Travel"
        description="Editorial, inspiration‑driven introduction to regions."
      />
      <Navigation />

      <div className="pt-32 pb-24 container mx-auto px-4">
        <header className="text-center mb-24 max-w-3xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Signature Destinations</h1>
            <p className="text-xl text-muted-foreground luxury-leading">
              Editorial, inspiration‑driven introduction to regions.
            </p>
          </FadeIn>
        </header>

        <div className="space-y-32">
          {content.destinations.map((dest, index) => (
            <FadeIn key={dest.slug} delay={index * 100}>
              <section
                id={dest.slug}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] image-zoom-container rounded-lg">
                    <img
                      src={dest.image}
                      alt={dest.region}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-serif">{dest.region}</h2>
                  <div className="text-lg text-muted-foreground luxury-leading min-h-[100px]">
                    {mode === 'short' ? (
                      <span className="italic text-accent block text-xl">{dest.shortDescription}</span>
                    ) : (
                      <span className="block">{dest.longDescription}</span>
                    )}
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold luxury-tracking mb-2">Countries</h4>
                    <div className="flex flex-wrap gap-2">
                      {dest.countries.map(country => (
                        <span key={country} className="px-3 py-1 bg-secondary rounded-full text-sm">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </FadeIn>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Destinations;
