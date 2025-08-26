import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Heart } from "lucide-react";
import teamImage from "@/assets/team-celebration.jpg";

const translations = {
  es: {
    title: "Nuestro Equipo",
    subtitle: "Conoce la pasión que nos mueve",
    description: "Somos más que un equipo, somos una familia unida por la pasión del balonmano. Con años de experiencia y dedicación, hemos construido un legado de excelencia deportiva y valores humanos.",
    values: {
      excellence: {
        title: "Excelencia",
        description: "Buscamos la perfección en cada entrenamiento y partido."
      },
      teamwork: {
        title: "Trabajo en Equipo",
        description: "Unidos somos más fuertes, juntos alcanzamos nuestras metas."
      },
      passion: {
        title: "Pasión",
        description: "El amor por el balonmano nos impulsa a dar lo mejor."
      }
    }
  },
  ca: {
    title: "El Nostre Equip",
    subtitle: "Coneix la passió que ens mou",
    description: "Som més que un equip, som una família unida per la passió de l'handbol. Amb anys d'experiència i dedicació, hem construït un llegat d'excel·lència esportiva i valors humans.",
    values: {
      excellence: {
        title: "Excel·lència",
        description: "Busquem la perfecció en cada entrenament i partit."
      },
      teamwork: {
        title: "Treball en Equip",
        description: "Units som més forts, junts assolim les nostres metes."
      },
      passion: {
        title: "Passió",
        description: "L'amor per l'handbol ens impulsa a donar el millor."
      }
    }
  },
  en: {
    title: "Our Team",
    subtitle: "Discover the passion that drives us",
    description: "We are more than a team, we are a family united by the passion for handball. With years of experience and dedication, we have built a legacy of sporting excellence and human values.",
    values: {
      excellence: {
        title: "Excellence",
        description: "We seek perfection in every training and match."
      },
      teamwork: {
        title: "Teamwork",
        description: "United we are stronger, together we achieve our goals."
      },
      passion: {
        title: "Passion",
        description: "Love for handball drives us to give our best."
      }
    }
  }
};

export const TeamSection = () => {
  const t = translations.es; // Default to Spanish

  const values = [
    {
      icon: Shield,
      title: t.values.excellence.title,
      description: t.values.excellence.description
    },
    {
      icon: Target,
      title: t.values.teamwork.title,
      description: t.values.teamwork.description
    },
    {
      icon: Heart,
      title: t.values.passion.title,
      description: t.values.passion.description
    }
  ];

  return (
    <section id="team" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Team Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={teamImage}
                alt="Team celebration"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 hero-gradient rounded-full opacity-20"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 accent-gradient rounded-full opacity-30"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.description}
            </p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <Card key={index} className="card-gradient border-0 shadow-elegant transition-smooth hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="hero-gradient p-3 rounded-lg">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};