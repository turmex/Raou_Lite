import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContent } from "@/hooks/useContent";

export const Footer = () => {
  const { content } = useContent();

  if (!content) return null;

  const { footer, site } = content;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-serif mb-4">{footer.brandName}</h3>
            <p className="text-sm text-primary-foreground/80 mb-6 max-w-md">
              {footer.description}
            </p>
            <div className="flex gap-4">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href={site.social.twitter} target="_blank" rel="noopener noreferrer"
                className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Dynamic Sections */}
          {footer.sections ? (
            footer.sections.map((section: any) => (
              <div key={section.title}>
                <h4 className="font-sans font-semibold mb-4 text-xs uppercase tracking-widest">{section.title}</h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link: any) => (
                    <li key={link.path}>
                      <Link to={link.path} className="hover:text-accent transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div>
              <h4 className="font-sans font-semibold mb-4 text-xs uppercase tracking-widest">Menu</h4>
              <ul className="space-y-2 text-sm">
                {content.navigation.menuItems.map((link: any) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Newsletter */}
        {footer.newsletter && (
          <div className="border-t border-primary-foreground/20 pt-12 pb-8">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-xl font-serif mb-2">{footer.newsletter.title}</h4>
              <p className="text-sm text-primary-foreground/80 mb-6">
                {footer.newsletter.description}
              </p>
              <form className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={footer.newsletter.placeholder}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button type="submit" variant="secondary">{footer.newsletter.buttonLabel}</Button>
              </form>
            </div>
          </div>
        )}

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
