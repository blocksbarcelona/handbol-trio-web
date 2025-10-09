import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  es: {
    contact: "Contacto",
    followUs: "Síguenos",
    address: "Dirección",
    rights: "Todos los derechos reservados.",
    addressText: "Av. de l'Esport\n08710 Sant Maure, Barcelona",
    contactPerson: "Contacto: Laia Moyes Caceres",
    privacy: "Política de Privacidad",
    terms: "Términos de Uso"
  },
  ca: {
    contact: "Contacte",
    followUs: "Segueix-nos",
    address: "Adreça",
    rights: "Tots els drets reservats.",
    addressText: "Av. de l'Esport\n08710 Sant Maure, Barcelona",
    contactPerson: "Contacte: Laia Moyes Caceres",
    privacy: "Política de Privacitat",
    terms: "Termes d'Ús"
  },
  en: {
    contact: "Contact",
    followUs: "Follow Us",
    address: "Address",
    rights: "All rights reserved.",
    addressText: "Av. de l'Esport\n08710 Sant Maure, Barcelona",
    contactPerson: "Contact: Laia Moyes Caceres",
    privacy: "Privacy Policy",
    terms: "Terms of Use"
  }
};

export const Footer = () => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/chmontbui/", label: "Instagram" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/lovable-uploads/53f49c1d-ccd0-4c7e-8190-8e749d720f4f.png" 
                alt="Club Handbol Montbui" 
                className="h-12 w-12 object-contain bg-white rounded-lg p-1"
              />
              <span className="font-bold text-2xl">Club Handbol Montbui</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t.contact}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 text-secondary" />
                <div>
                  <p className="font-medium">{t.address}</p>
                  <p className="text-background/80 text-sm whitespace-pre-line">
                    {t.addressText}
                  </p>
                </div>
              </div>
              
              <div className="text-background/80 text-sm mb-2">
                {t.contactPerson}
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-background/80">633 556 228</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-background/80">chmontbui06@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-6">{t.followUs}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-secondary/20 transition-smooth"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Club Handbol Montbui. {t.rights}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/60 hover:text-background transition-smooth">
                {t.privacy}
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-smooth">
                {t.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};