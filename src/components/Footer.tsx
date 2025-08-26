import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const translations = {
  es: {
    contact: "Contacto",
    followUs: "Síguenos",
    address: "Dirección",
    rights: "Todos los derechos reservados.",
    addressText: "Av. del Deporte, 123\n12345 Ciudad, España",
    joinNewsletter: "Únete a nuestro newsletter para recibir las últimas noticias y actualizaciones del equipo."
  },
  ca: {
    contact: "Contacte",
    followUs: "Segueix-nos",
    address: "Adreça",
    rights: "Tots els drets reservats.",
    addressText: "Av. de l'Esport, 123\n12345 Ciutat, Espanya",
    joinNewsletter: "Uneix-te al nostre newsletter per rebre les últimes notícies i actualitzacions de l'equip."
  },
  en: {
    contact: "Contact",
    followUs: "Follow Us",
    address: "Address",
    rights: "All rights reserved.",
    addressText: "123 Sports Avenue\n12345 City, Spain",
    joinNewsletter: "Join our newsletter to receive the latest team news and updates."
  }
};

export const Footer = () => {
  const t = translations.es; // Default to Spanish

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-12 w-12 hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HT</span>
              </div>
              <span className="font-bold text-2xl">HandTeam</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              {t.joinNewsletter}
            </p>
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
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-background/80">+34 123 456 789</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-background/80">info@handteam.com</span>
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
              © {new Date().getFullYear()} HandTeam. {t.rights}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/60 hover:text-background transition-smooth">
                Política de Privacidad
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-smooth">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};