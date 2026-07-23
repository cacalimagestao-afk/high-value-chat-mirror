import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Video, Check, Star, Users, Award, Sparkles, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MAILTO = "mailto:caca@cacalimaoficial.com.br?subject=Patroc%C3%ADnio%20-%20Uma%20Noite%20de%20Conversas%20de%20Alto%20Valor";

const motivos = [
  { icon: Award, title: "Associação de prestígio", desc: "Sua marca conectada a um ambiente editorial de alto nível, ao lado de lideranças e decisores." },
  { icon: Users, title: "Acesso a decisores", desc: "Networking curado com empresários, executivos e marcas de peso de Porto Alegre." },
  { icon: Video, title: "Conteúdo profissional", desc: "Produção audiovisual em estúdio de TV, com materiais editados entregues para uso da marca." },
  { icon: Sparkles, title: "Exposição multiplataforma", desc: "Presença em TVRS Play (Canal 524 Claro), YouTube e redes sociais do programa e da apresentadora." },
];

const cotas = [
  {
    nome: "Cota Apoio",
    valor: "R$ 1.000",
    destaque: false,
    itens: [
      "Logo em posts de agradecimento",
      "Nome em lista de apoiadores",
      "1 convite para o evento",
    ],
  },
  {
    nome: "Cota Ouro",
    valor: "R$ 5.000",
    destaque: true,
    itens: [
      "Marca patrocinadora oficial (naming)",
      "Logo em destaque nos posts e telão",
      "Menção de abertura e encerramento pelo apresentador",
      "Espaço de ativação no evento",
      "2 min de fala ou vídeo institucional (até 30s) no telão",
      "Vinheta de até 20s da empresa exibida em 4 programas do Conversas de Alto Valor após o evento",
      "Materiais editados do evento",
      "4 convites para o evento",
    ],
  },
  {
    nome: "Cota Prata",
    valor: "R$ 3.000",
    destaque: false,
    itens: [
      "Logo nos posts e telão",
      "Menção verbal durante o evento",
      "Espaço para banner / roll-up",
      "Presença do logo da empresa em 4 programas do Conversas de Alto Valor após o evento",
      "Materiais editados do evento",
      "2 convites para o evento",
    ],
  },
];

const PatrocinioEvento = () => {
  useEffect(() => {
    document.title = "Patrocínio — Uma Noite de Conversas de Alto Valor";
    const desc = "Proposta de patrocínio do evento Uma Noite de Conversas de Alto Valor · 26 de agosto de 2026 · Estúdio TVRS Play.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A131E", color: "#F5EFE1" }}>
      {/* Nav */}
      <div className="container mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ color: "#B99657" }}>
          <ArrowLeft className="w-4 h-4" /> Voltar ao site
        </Link>
      </div>

      {/* HERO */}
      <section className="container mx-auto px-6 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            className="mb-8 px-4 py-1.5 text-xs tracking-[0.2em] uppercase border"
            style={{ backgroundColor: "transparent", color: "#B99657", borderColor: "#B99657" }}
          >
            Proposta de Patrocínio
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl leading-tight mb-8">
            Sua marca na noite em que Porto Alegre se conecta a{" "}
            <em className="not-italic" style={{ color: "#B99657", fontStyle: "italic" }}>
              Conversas de Alto Valor
            </em>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-85 mb-12 max-w-3xl mx-auto">
            Um evento de networking exclusivo reunindo empresários e marcas de peso, com o programa Conversas de Alto Valor sendo gravado ao vivo durante a noite. Apresentação de Cacá Lima. Transmissão em TV RSPlay (Canal 524 Claro) e YouTube.
          </p>

          <div className="h-px w-24 mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, #B99657, transparent)" }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Calendar, label: "Data", value: "26 · Ago · 2026" },
              { icon: MapPin, label: "Local", value: "Estúdio TVRS Play" },
              { icon: Video, label: "Formato", value: "Networking + Gravação" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: "#B99657" }} />
                <div className="text-[0.7rem] tracking-[0.25em] uppercase opacity-60 mb-2">{label}</div>
                <div className="font-display text-lg">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O EVENTO */}
      <section className="py-24" style={{ backgroundColor: "#070E16" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>O Evento</div>
            <h2 className="font-display text-3xl md:text-5xl mb-8">Uma noite pensada para quem decide.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed opacity-90 text-center max-w-3xl mx-auto">
            <p>Uma noite de networking de alto nível reunindo lideranças e marcas de Porto Alegre, em um ambiente exclusivo de estúdio de TV.</p>
            <p>Durante o evento acontecerá a gravação ao vivo de um episódio do programa Conversas de Alto Valor — criando uma experiência única em que os convidados assistem, participam e circulam entre bastidores e o cenário principal.</p>
            <p>O resultado é uma noite editorial: encontros que valem, networking otimizado e funcional, conteúdo audiovisual de qualidade e sua marca associada a um ambiente de prestígio.</p>
          </div>
        </div>
      </section>

      {/* POR QUE PATROCINAR */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>Por que patrocinar</div>
            <h2 className="font-display text-3xl md:text-5xl">Uma noite. Muitas conexões.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {motivos.map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="border transition-all hover:-translate-y-1"
                style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(185,150,87,0.1)" }}>
                    <Icon className="w-5 h-5" style={{ color: "#B99657" }} />
                  </div>
                  <h3 className="font-display text-xl mb-3">{title}</h3>
                  <p className="text-sm opacity-75 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AS COTAS */}
      <section className="py-24" style={{ backgroundColor: "#070E16" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>As Cotas</div>
            <h2 className="font-display text-3xl md:text-5xl">Escolha a presença da sua marca</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {cotas.map((cota) => (
              <Card
                key={cota.nome}
                className={`relative border flex flex-col ${cota.destaque ? "md:-mt-4 md:mb-4" : ""}`}
                style={{
                  backgroundColor: cota.destaque ? "#12203323" : "#0F1B2A",
                  borderColor: cota.destaque ? "#B99657" : "rgba(185,150,87,0.15)",
                  boxShadow: cota.destaque ? "0 20px 60px -20px rgba(185,150,87,0.35)" : undefined,
                }}
              >
                {cota.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-4 py-1 text-[0.65rem] tracking-[0.25em] uppercase" style={{ backgroundColor: "#B99657", color: "#0A131E" }}>
                      <Star className="w-3 h-3 mr-1.5 fill-current" /> Recomendada
                    </Badge>
                  </div>
                )}
                <CardHeader className="pt-10 pb-4 text-center">
                  <CardTitle className="font-display text-2xl mb-4" style={{ color: "#F5EFE1" }}>{cota.nome}</CardTitle>
                  <div className="font-display text-4xl" style={{ color: "#B99657" }}>{cota.valor}</div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col px-8 pb-8">
                  <div className="h-px w-full my-4" style={{ background: "linear-gradient(90deg, transparent, rgba(185,150,87,0.3), transparent)" }} />
                  <ul className="space-y-3 flex-1">
                    {cota.itens.map((item) => (
                      <li key={item} className="flex gap-3 text-sm opacity-90">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#B99657" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8 w-full"
                    style={{
                      backgroundColor: cota.destaque ? "#B99657" : "transparent",
                      color: cota.destaque ? "#0A131E" : "#B99657",
                      border: `1px solid #B99657`,
                    }}
                  >
                    <a href={MAILTO}>Quero esta cota</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-5xl mb-8">
            Vamos conversar sobre a sua marca nessa noite?
          </h2>
          <p className="text-lg opacity-80 mb-10">
            Envie uma mensagem e nossa equipe retorna com os próximos passos.
          </p>
          <Button asChild size="lg" className="px-10 py-6 text-base" style={{ backgroundColor: "#B99657", color: "#0A131E" }}>
            <a href={MAILTO}>
              <Mail className="w-4 h-4 mr-2" />
              caca@cacalimaoficial.com.br
            </a>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-12" style={{ borderColor: "rgba(185,150,87,0.15)", backgroundColor: "#070E16" }}>
        <div className="container mx-auto px-6 text-center space-y-3">
          <div className="font-display text-lg" style={{ color: "#B99657" }}>
            Equipe Cacá Lima · Conversas de Alto Valor
          </div>
          <div className="text-sm opacity-75">
            <a href={MAILTO} className="hover:opacity-100 transition-opacity">caca@cacalimaoficial.com.br</a>
          </div>
          <div className="text-xs opacity-50 pt-4">
            Proposta de patrocínio válida por 10 dias a partir do envio.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatrocinioEvento;
