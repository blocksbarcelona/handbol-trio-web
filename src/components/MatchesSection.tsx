import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  es: {
    title: "Partidos",
    subtitle: "Sigue nuestros equipos en todas las categorías",
    cadete: "Cadete Femenino - Primera Catalana",
    infantil: "Infantil - Segona Catalana",
    viewResults: "Ver Resultados y Clasificación"
  },
  ca: {
    title: "Partits",
    subtitle: "Segueix els nostres equips en totes les categories",
    cadete: "Cadet Femení - Primera Catalana",
    infantil: "Infantil - Segona Catalana",
    viewResults: "Veure Resultats i Classificació"
  },
  en: {
    title: "Matches",
    subtitle: "Follow our teams in all categories",
    cadete: "Cadet Female - Primera Catalana",
    infantil: "Youth - Segona Catalana",
    viewResults: "View Results and Rankings"
  }
};

export const MatchesSection = () => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang];

  const competitions = [
    {
      id: 1,
      name: t.cadete,
      link: "https://resultadosbalonmano.isquad.es/competicion.php?id_superficie=1&seleccion=0&id_categoria=2549&id_competicion=209482&id_temp=2526&id_ambito=0&id_territorial=17",
      category: "Cadete Femenino"
    },
    {
      id: 2,
      name: t.infantil,
      link: "https://resultadosbalonmano.isquad.es/competicion.php?id_superficie=1&seleccion=0&id_categoria=2549&id_competicion=209386&id_temp=2526&id_ambito=0&id_territorial=17",
      category: "Infantil"
    }
  ];

  return (
    <section id="matches" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {competitions.map((competition) => (
            <Card key={competition.id} className="card-gradient border-0 shadow-elegant transition-smooth hover:scale-105">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-center">
                  {competition.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="text-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={() => window.open(competition.link, '_blank')}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t.viewResults}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};