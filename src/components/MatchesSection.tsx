import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const translations = {
  es: {
    title: "Próximos Partidos",
    subtitle: "No te pierdas nuestros encuentros",
    viewAll: "Ver Todos los Partidos",
    home: "Local",
    away: "Visitante",
    vs: "vs"
  },
  ca: {
    title: "Propers Partits",
    subtitle: "No et perdis els nostres encontres",
    viewAll: "Veure Tots els Partits",
    home: "Local",
    away: "Visitant",
    vs: "vs"
  },
  en: {
    title: "Upcoming Matches",
    subtitle: "Don't miss our games",
    viewAll: "View All Matches",
    home: "Home",
    away: "Away",
    vs: "vs"
  }
};

export const MatchesSection = () => {
  const t = translations.es; // Default to Spanish

  const matches = [
    {
      id: 1,
      opponent: "Valencia Handball",
      date: "2024-03-15",
      time: "18:00",
      venue: "Pabellón Municipal",
      isHome: true,
      competition: "Liga Nacional"
    },
    {
      id: 2,
      opponent: "Barcelona Team",
      date: "2024-03-22",
      time: "20:30",
      venue: "Palau Blaugrana",
      isHome: false,
      competition: "Copa del Rey"
    },
    {
      id: 3,
      opponent: "Madrid Handball",
      date: "2024-03-29",
      time: "19:15",
      venue: "Pabellón Municipal",
      isHome: true,
      competition: "Liga Nacional"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {matches.map((match) => (
            <Card key={match.id} className="card-gradient border-0 shadow-elegant transition-smooth hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge 
                    variant={match.isHome ? "default" : "secondary"}
                    className={match.isHome ? "bg-primary" : "bg-secondary"}
                  >
                    {match.isHome ? t.home : t.away}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {match.competition}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Match */}
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2">
                    HandTeam {t.vs} {match.opponent}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{match.date}</span>
                </div>

                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{match.time}</span>
                </div>

                {/* Venue */}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{match.venue}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            <Calendar className="mr-2 h-5 w-5" />
            {t.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};