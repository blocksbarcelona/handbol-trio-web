import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  es: {
    title: "Calendario",
    subtitle: "Sigue nuestros equipos en todas las categorías",
    followUs: "Calendario y Partidos"
  },
  ca: {
    title: "Calendari",
    subtitle: "Segueix els nostres equips en totes les categories",
    followUs: "Calendari i Partits"
  },
  en: {
    title: "Calendar",
    subtitle: "Follow our teams in all categories",
    followUs: "Calendar and Matches"
  }
};

export const MatchesSection = () => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang];

  return (
    <section id="calendario" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="flex justify-center max-w-md mx-auto">
          <Card className="card-gradient border-0 shadow-elegant transition-smooth hover:scale-105 w-full">
            <CardContent className="text-center p-8">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={() => window.open("https://resultadosbalonmano.isquad.es/competicion.php", '_blank')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t.followUs}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};