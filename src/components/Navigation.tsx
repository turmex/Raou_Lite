import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useContent } from "@/hooks/useContent";
import logo from "@/assets/logo.png";


export const Navigation = () => {
  const { content } = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const destinations = content?.destinations || [];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  if (!content) return null;

  const { navigation } = content;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="RAOU"
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">

                  {navigation.menuItems.map((item: any) => {
                    // Special handling for Signature Destinations dropdown
                    if (item.label === "Signature Destinations") {
                      return (
                        <NavigationMenuItem key={item.label}>
                          <NavigationMenuTrigger className="text-xs font-sans font-medium tracking-widest hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent text-foreground hover:text-accent focus:text-accent active:text-accent data-[state=open]:!text-accent whitespace-nowrap">
                            {item.label.toUpperCase()}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-[800px] p-6 bg-background">
                              <div className="grid grid-cols-3 gap-6">
                                {destinations.map((dest: any) => (
                                  <div key={dest.region}>
                                    <Link
                                      to={`/destinations#${dest.slug}`}
                                      className="block font-semibold mb-1 text-foreground hover:text-accent transition-colors"
                                    >
                                      {dest.region}
                                    </Link>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      {dest.shortDescription}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    }

                    return (
                      <NavigationMenuItem key={item.label}>
                        <Link to={item.path} className="px-4 py-2 text-xs font-sans font-medium tracking-widest transition-colors hover:text-accent text-foreground whitespace-nowrap">
                          {item.label.toUpperCase()}
                        </Link>
                      </NavigationMenuItem>
                    );
                  })}

                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center gap-4">
                <Button asChild variant="default" size="lg" className="ml-4">
                  <Link to={navigation.ctaButton.path}>{navigation.ctaButton.label}</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background pt-20 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col gap-6">
              {navigation.menuItems.map((item: any) => (
                <Link key={item.label} to={item.path} className="text-lg font-medium py-2">
                  {item.label.toUpperCase()}
                </Link>
              ))}
              <div className="py-2">

              </div>
              <Button asChild size="lg" className="mt-4">
                <Link to={navigation.ctaButton.path}>{navigation.ctaButton.label}</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
