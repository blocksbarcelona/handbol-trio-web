import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Users, Trophy, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  es: {
    title: "Nueva Temporada 2025-2026",
    subtitle: "¡Únete a nuestra familia del handbol!",
    description: "Estamos buscando nuevas jugadoras para formar parte de nuestro equipo. No importa tu nivel de experiencia, ¡el handbol te está esperando!",
    tryFree: "Ven a probar sin compromiso",
    tryDescription: "Puedes venir a entrenar con nosotras sin ningún compromiso. Conoce el deporte, el equipo y decide si quieres formar parte de esta gran familia.",
    contact: "Contacta con Laia",
    contactDescription: "Para más información y para organizar tu primera sesión de entrenamiento:",
    teamNeeds: "¡El equipo te necesita!",
    teamDescription: "Cada nueva jugadora aporta energía, talento y pasión al equipo. Ven y descubre todo lo que el handbol puede ofrecerte.",
    joinNow: "Contactar Ahora",
    benefits: {
      title: "¿Qué te ofrecemos?",
      training: "Entrenamientos profesionales",
      team: "Ambiente familiar y de equipo",
      competition: "Competiciones oficiales",
      fun: "Diversión garantizada"
    }
  },
  ca: {
    title: "Nova Temporada 2025-2026",
    subtitle: "Uneix-te a la nostra família de l'handbol!",
    description: "Estem buscant noves jugadores per formar part del nostre equip. No importa el teu nivell d'experiència, l'handbol t'està esperant!",
    tryFree: "Vine a provar sense compromís",
    tryDescription: "Pots venir a entrenar amb nosaltres sense cap compromís. Coneix l'esport, l'equip i decideix si vols formar part d'aquesta gran família.",
    contact: "Contacta amb la Laia",
    contactDescription: "Per a més informació i per organitzar la teva primera sessió d'entrenament:",
    teamNeeds: "L'equip et necessita!",
    teamDescription: "Cada nova jugadora aporta energia, talent i passió a l'equip. Vine i descobreix tot el que l'handbol et pot oferir.",
    joinNow: "Contactar Ara",
    benefits: {
      title: "Què t'oferim?",
      training: "Entrenaments professionals",
      team: "Ambient familiar i d'equip",
      competition: "Competicions oficials",
      fun: "Diversió garantida"
    }
  },
  en: {
    title: "New Season 2025-2026",
    subtitle: "Join our handball family!",
    description: "We are looking for new players to be part of our team. No matter your experience level, handball is waiting for you!",
    tryFree: "Come try without commitment",
    tryDescription: "You can come train with us without any commitment. Get to know the sport, the team and decide if you want to be part of this great family.",
    contact: "Contact Laia",
    contactDescription: "For more information and to organize your first training session:",
    teamNeeds: "The team needs you!",
    teamDescription: "Every new player brings energy, talent and passion to the team. Come and discover everything handball can offer you.",
    joinNow: "Contact Now",
    benefits: {
      title: "What do we offer?",
      training: "Professional training",
      team: "Family and team environment",
      competition: "Official competitions", 
      fun: "Guaranteed fun"
    }
  }
};

export const NewSeasonSection = () => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang];

  const handleContact = () => {
    window.open('mailto:chmontbui06@gmail.com?subject=Nueva Temporada 2025-2026 - Información', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/633556228', '_blank');
  };

  return (
    <section id="nueva-temporada" className="py-20 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Information */}
          <div className="space-y-8">
            {/* Try Free Card */}
            <Card className="card-gradient border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Heart className="mr-3 h-6 w-6 text-primary" />
                  {t.tryFree}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.tryDescription}
                </p>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card className="card-gradient border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Trophy className="mr-3 h-6 w-6 text-primary" />
                  {t.benefits.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{t.benefits.training}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{t.benefits.team}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{t.benefits.competition}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{t.benefits.fun}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact */}
          <div className="space-y-8">
            {/* Contact Card */}
            <Card className="card-gradient border-0 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Users className="mr-3 h-6 w-6 text-primary" />
                  {t.contact}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  {t.contactDescription}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>633 556 228</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>chmontbui06@gmail.com</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    onClick={handleWhatsApp}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleContact}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Team Needs You Card */}
            <Card className="card-gradient border-0 shadow-elegant bg-gradient-to-br from-primary/5 to-secondary/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gradient">
                    {t.teamNeeds}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t.teamDescription}
                  </p>
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={handleWhatsApp}
                    className="w-full"
                  >
                    {t.joinNow}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};