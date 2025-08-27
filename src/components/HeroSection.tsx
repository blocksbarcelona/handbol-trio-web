import { Button } from "@/components/ui/button";
import { Calendar, Users, Trophy } from "lucide-react";
import heroImage from "@/assets/handball-hero.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  es: {
    title: "Club Handbol Montbuí",
    subtitle: "Pasión • Equipo • Victoria",
    description: "Únete a nuestro equipo de handbol y vive la emoción del deporte en equipo. Entrenamientos profesionales, competiciones de alto nivel y una gran familia deportiva te esperan.",
    joinTeam: "Únete al Equipo",
    nextMatch: "Calendario",
    stats: {
      players: "Jugadoras",
      years: "Años de Historia",
      victories: "Victorias"
    }
  },
  ca: {
    title: "Club Handbol Montbuí",
    subtitle: "Passió • Equip • Victòria",
    description: "Uneix-te al nostre equip d'handbol i viu l'emoció de l'esport en equip. Entrenaments professionals, competicions d'alt nivell i una gran família esportiva t'esperen.",
    joinTeam: "Uneix-te a l'Equip",
    nextMatch: "Calendari",
    stats: {
      players: "Jugadores",
      years: "Anys d'Història",
      victories: "Victòries"
    }
  },
  en: {
    title: "Montbuí Handball Club",
    subtitle: "Passion • Team • Victory",
    description: "Join our handball team and experience the thrill of team sports. Professional training, high-level competitions, and a great sports family await you.",
    joinTeam: "Join the Team",
    nextMatch: "Calendar",
    stats: {
      players: "Players",
      years: "Years of History",
      victories: "Victories"
    }
  }
};

export const HeroSection = () => {
  const { currentLang } = useLanguage();
  const t = translations[currentLang];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 font-medium opacity-90">
            {t.subtitle}
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-80">
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              variant="hero" 
              size="xl" 
              className="animate-scale-in"
              onClick={() => document.getElementById('nueva-temporada')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="mr-2 h-5 w-5" />
              {t.joinTeam}
            </Button>
            <Button 
              variant="sport" 
              size="xl" 
              className="animate-scale-in"
              onClick={() => document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t.nextMatch}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-80">{t.stats.players}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">19</div>
              <div className="text-sm md:text-base opacity-80">{t.stats.years}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
                <Trophy className="mr-2 h-6 w-6 md:h-8 md:w-8" />
                100+
              </div>
              <div className="text-sm md:text-base opacity-80">{t.stats.victories}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};