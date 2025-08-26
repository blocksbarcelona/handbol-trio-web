import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Menu, X } from "lucide-react";
import montbuiLogo from "@/assets/montbui-logo.png";

const translations = {
  es: {
    home: "Inicio",
    team: "Equipo",
    matches: "Partidos",
    gallery: "Galería",
    contact: "Contacto"
  },
  ca: {
    home: "Inici",
    team: "Equip",
    matches: "Partits",
    gallery: "Galeria",
    contact: "Contacte"
  },
  en: {
    home: "Home",
    team: "Team",
    matches: "Matches",
    gallery: "Gallery",
    contact: "Contact"
  }
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang] = useState<keyof typeof translations>('es');
  
  const t = translations[currentLang];

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'team', href: '#team' },
    { key: 'matches', href: '#matches' },
    { key: 'gallery', href: '#gallery' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={montbuiLogo} 
            alt="Club Handbol Montbui" 
            className="h-12 w-12 object-contain"
          />
          <span className="font-bold text-xl text-gradient">Club Handbol Montbuí</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              {t[item.key as keyof typeof t]}
            </a>
          ))}
        </nav>

        {/* Language Selector & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <LanguageSelector />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block text-foreground hover:text-primary transition-smooth font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t[item.key as keyof typeof t]}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};