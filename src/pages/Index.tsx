import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Calendar,
  Video,
  Users,
  TrendingUp,
  Briefcase,
  DollarSign,
  Check,
  Instagram,
  Youtube,
  ArrowRight,
  Tv,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

import b1 from "@/assets/bastidores/bastidores-1.jpg";
import b2 from "@/assets/bastidores/bastidores-2.jpg";
import b3 from "@/assets/bastidores/bastidores-3.jpg";
import b4 from "@/assets/bastidores/bastidores-4.jpg";
import b5 from "@/assets/bastidores/bastidores-5.jpg";
import b6 from "@/assets/bastidores/bastidores-6.jpg";
import b7 from "@/assets/bastidores/bastidores-7.jpg";

import logoOralsin from "@/assets/parceiros/oralsin.png";
import logoConfix from "@/assets/parceiros/confix.jpg";
import logoArena from "@/assets/parceiros/arena.png";
import logoPurpose from "@/assets/parceiros/purpose.png";
import logoDermogral from "@/assets/parceiros/dermogral.png";

const bastidores = [b1, b2, b3, b4, b5, b6, b7];

const dnaPilares = [
  { icon: Sparkles, title: "Inspirar", text: "Trajetórias reais, corajosas e transformadoras." },
  { icon: TrendingUp, title: "Educar", text: "Técnica, mentalidade e prática." },
  { icon: Users, title: "Criar Impacto", text: "Pessoas, marcas, ideias e setores." },
  { icon: Quote, title: "Provocar Clareza", text: "Perguntas que mudam a percepção." },
  { icon: Briefcase, title: "Valorizar Propósito", text: "Porque propósito sustenta qualquer movimento." },
];

const formato = [
  { label: "Periodicidade", value: "Semanal" },
  { label: "Duração", value: "Até 30 minutos" },
  { label: "Formato", value: "Sala de Entrevistas" },
  { label: "Distribuição", value: "TV + redes sociais + YouTube" },
];

const estrutura = [
  {
    bloco: "01",
    title: "Boas-vindas + Tema + Histórias",
    desc: "Saudação calorosa da apresentadora. Cacá Lima dá o tom e cria conexão humana.",
    items: ["Apresentação do tema do episódio", "Estabelecimento do contexto da conversa", "Primeira impressão do episódio"],
  },
  {
    bloco: "02",
    title: "Vozes que Transformam + Desafio Revelador",
    desc: "A história real do convidado, sua essência, propósito profissional e a pergunta que revela tudo.",
    items: ["Introdução do convidado com mini-bio", "Narrativa profunda sobre essência e propósito profissional", "Momento de vulnerabilidade e autenticidade"],
  },
  {
    bloco: "03",
    title: "Construindo Novos Saberes",
    desc: "Aprofundamento técnico e educacional.",
    items: ["Conteúdo técnico acessível ao público", "Cases reais e práticos", "Lições aprendidas na prática do dia a dia"],
  },
  {
    bloco: "04",
    title: "Pergunta final poderosa e provocativa",
    desc: "Encerramento memorável e impactante.",
    items: ["Posicionamento estratégico no encerramento", "Quebrar crenças limitantes do público", "Provocar insights imediatos"],
  },
];

const temas = [
  { tag: "Episódio #13 · Gramado summit", title: "Ideias de movimentam mercados", url: "https://youtu.be/z3DLzQ-t9sY" },
  { tag: "Episódio #12 · Michelle Teixeira", title: "A fé consegue restaurar uma vida?", url: "https://youtu.be/WeCFInc6SC8" },
  { tag: "Episódio #11 · Cacá Lima", title: "Existe uma parte minha que voce nao vê", url: "https://youtu.be/7EVEG-gS-h4" },
  { tag: "Episódio #10 · Carolina Teixeira", title: "Ela encontrou sentido nos vinhos", url: "https://youtu.be/pMncW4HFIrw" },
  { tag: "Episódio #9 · Adriane Ribeiro Martins", title: "Ela não enxerga como você", url: "https://youtu.be/GIk6Ss59j6Q" },
  { tag: "Episódio #8 · cristopher lança e bruno boris", title: "Inovaçao, inteligencia e resiliencia", url: "https://youtu.be/cth9BY92HLI" },
];

const setores = [
  "Startups", "Consultorias", "Clínicas", "Contabilidade", "Jurídico",
  "Investimentos", "Tecnologia", "Educação", "Eventos", "Veículos",
];

const cotas = [
  {
    nivel: "Vinheta",
    title: "Vinheta Institucional",
    price: "R$ 1.890",
    priceLabel: "/ por mês",
    priceSub: "R$ 650 por episódio",
    badge: "Investimento acessível",
    desc: "Vinheta de até 15 segundos com presença discreta mas efetiva em todos os episódios.",
    items: [
      "Vinheta institucional de até 15 segundos no final de cada episódio",
      "Exibição no início ou final do programa",
      "Presença em todos os episódios",
      "Visibilidade de marca consistente",
      "Lembrança de marca (recall)",
    ],
    ideal: "Empresas que buscam presença de marca regular com investimento controlado. Ideal para construção de awareness de longo prazo.",
  },
  {
    nivel: "Cota Education",
    title: "Minuto Educação",
    price: "R$ 1.890",
    priceLabel: "/ por mês",
    priceSub: "R$ 650 por episódio",
    badge: "Cota Education disponível",
    desc: "Bloco de 60 segundos com VT profissional executado por Head Trainer especializado.",
    items: [
      "VT de alta produção executado por Head Trainer",
      "Exibição em bloco nobre de 1 minuto com vinheta própria",
      "Associação ao pilar de educação empreendedora",
      "Conteúdo educativo aplicado à prática real",
      "Posicionamento técnico e científico sólido",
      "Autoridade reconhecida no segmento",
    ],
    ideal: "Empresas B2B e B2C que buscam educar o mercado sobre seus produtos/serviços, demonstrar expertise técnica e construir autoridade em seus segmentos.",
  },
  {
    nivel: "Cota Premium",
    title: "Construindo Saberes | Você Sabia",
    price: "R$ 3.180",
    priceLabel: "/ por mês",
    priceSub: "R$ 990 por episódio",
    badge: "Cota Premium disponível",
    desc: "Bloco exclusivo de até 3 minutos por edição com VT desenvolvido pela própria empresa patrocinadora, transformando conhecimento em posicionamento de marca.",
    items: [
      "Bloco exclusivo de até 3 minutos por edição",
      "VT desenvolvido e apresentado pela própria empresa patrocinadora",
      "Conteúdo baseado em curiosidades, informação e educação de mercado",
      "Inserção estratégica dentro do quadro Construindo Saberes",
      "Produção gravada em estúdio com edição premium e trilha dedicada",
      "Roteiro alinhado junto à equipe do programa",
      "Fortalecimento de autoridade e posicionamento institucional",
      "Conteúdo evergreen para reutilização em redes sociais, campanhas e materiais comerciais",
    ],
    ideal: "Marcas que desejam transformar conhecimento em autoridade, fortalecendo posicionamento institucional através de conteúdo inteligente e relevante.",
    destaque: true,
  },
  {
    nivel: "Branded Content",
    title: "Episódio Exclusivo",
    price: "R$ 2.380",
    priceLabel: "/ por episódio",
    priceSub: "",
    badge: "Máximo retorno sobre investimento",
    desc: "Um episódio completo pensado para posicionar sua marca de forma estratégica, humanizada e memorável. Mais do que publicidade, sua empresa se torna protagonista de uma narrativa construída com propósito, autoridade e conexão real com o público.",
    items: [
      "Episódio completo dedicado à sua marca",
      "Representante da empresa como convidado principal",
      "Storytelling estratégico e humanizado",
      "Direcionamento editorial alinhado ao posicionamento da marca",
      "Versão estendida para cortes e campanhas digitais",
      "Destaque institucional e crédito oficial no encerramento",
      "Conteúdo evergreen para uso contínuo da marca",
    ],
    ideal: "Marcas que desejam o máximo de exposição com narrativa profunda, posicionamento estratégico e formato imersivo.",
  },
];

const cotasComplementares = [
  {
    title: "Vestir Cacá Lima",
    price: "R$ 950",
    desc: "Sua marca presente na imagem da apresentadora durante as gravações do Conversas de Alto Valor, conectando estilo, posicionamento e percepção de valor de forma elegante e natural.",
    items: [
      "Look completo fornecido pela marca parceira",
      "1 look exclusivo por programa gravado",
      "Exposição nas redes sociais da apresentadora",
      "Associação direta à imagem da Cacá Lima",
      "Valorização do lifestyle e posicionamento da marca",
      "Possibilidade de peças cedidas ou doadas",
      "Presença visual durante gravações e bastidores",
    ],
    ideal: "Marcas de moda feminina, joalherias, acessórios premium e lifestyle.",
  },
  {
    title: "Product Placement | Produto no Programa",
    price: "R$ 650",
    desc: "Sua marca integrada de forma elegante e orgânica ao universo do Conversas de Alto Valor, através da presença visual estratégica de produtos durante as gravações do programa.",
    items: [
      "Produto visível no cenário durante a gravação",
      "Menção natural realizada por Cacá Lima",
      "Associação sutil e sofisticada com o programa",
      "Integração orgânica ao ambiente e à narrativa",
      "Reforço estético e emocional da marca",
      
      "Presença em episódios, bastidores e conteúdos derivados",
    ],
    ideal: "Produtos premium, bebidas, alimentos gourmet, artigos de decoração e lifestyle.",
  },
];

const Index = () => {
  const [bastIdx, setBastIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setBastIdx((i) => (i + 1) % bastidores.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#top" className="font-display text-lg md:text-xl tracking-wide" aria-label="Conversas de Alto Valor — Voltar ao topo">
            Conversas <span className="text-gold italic">de Alto Valor</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#programa" className="hover:text-gold transition-smooth">O Programa</a>
            <a href="#formato" className="hover:text-gold transition-smooth">Formato</a>
            <a href="#cotas" className="hover:text-gold transition-smooth">Cotas</a>
            <a href="#bastidores" className="hover:text-gold transition-smooth">Bastidores</a>
            <a href="#contato" className="hover:text-gold transition-smooth">Contato</a>
          </nav>
          <Button asChild size="sm" className="bg-gold text-navy-dark hover:bg-gold-light font-semibold">
            <a href="#contato">Solicitar Proposta</a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-24 pb-32 overflow-hidden gradient-hero">
        {/* Vinheta de fundo */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            width="1920"
            height="1080"
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/vinheta.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="container mx-auto relative z-10 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="border-gold/40 text-gold mb-8 uppercase tracking-[0.2em] text-xs px-4 py-1.5">
              Programa Semanal · Apresentado por Cacá Lima
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8">
              Conversas de Alto Valor —{" "}
              <span className="text-gradient-gold italic">Profundidade, propósito e narrativa humana</span>.
            </h1>
            <div className="gold-divider w-32 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Onde histórias revelam propósitos. Um programa de até 30 minutos, no formato Sala de Entrevistas,
              que une educação empreendedora e narrativa transformadora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-navy-dark hover:bg-gold-light font-semibold shadow-gold">
                <a href="#contato">Solicitar Proposta <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold/40 text-foreground hover:bg-gold/10 hover:text-gold">
                <a href="#programa">Conheça o Programa</a>
              </Button>
            </div>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Tv className="h-4 w-4 text-gold" /> TV Aberta · Canal 524</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> Semanal</div>
              <div className="flex items-center gap-2"><Video className="h-4 w-4 text-gold" /> Até 30 min</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMA / DNA */}
      <section id="programa" className="py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Nosso DNA</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              O programa nasce com um <span className="italic text-gold">DNA sólido</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Conversas de Alto Valor é um programa semanal de até 30 minutos, no formato Sala de Entrevistas,
              que une profundidade, propósito, educação empreendedora e narrativa humana.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {dnaPilares.map((p) => (
              <Card key={p.title} className="bg-card/60 border-border/60 hover:border-gold/60 transition-smooth group">
                <CardContent className="pt-8 pb-6 px-5 text-center">
                  <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                    <p.icon className="h-5 w-5 text-navy-dark" />
                  </div>
                  <h3 className="font-display text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATO */}
      <section id="formato" className="py-24 md:py-32 bg-navy/40 border-y border-border/40">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Formato do Programa</p>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                Uma jornada cuidadosamente <span className="italic text-gold">construída</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Cada episódio é desenhado para transformar perspectivas. Da abertura ao encerramento,
                tudo é pensado para entregar valor rápido e aplicável.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {formato.map((f) => (
                  <div key={f.label} className="border border-border rounded-lg p-4 bg-card/40">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{f.label}</div>
                    <div className="font-display text-lg text-gold">{f.value}</div>
                  </div>
                ))}
              </div>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {[
                  "Câmeras: 2 ou 3 · Áudio: lapelas profissionais",
                  "Edição: cortes premium + trilha suave",
                  "VTs internos e externos de alta qualidade",
                  "1 entrevistado por episódio com trajetória inspiradora",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {estrutura.map((e) => (
                <Card key={e.bloco} className="bg-card/60 border-border/60 hover:border-gold/60 transition-smooth">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="font-display text-3xl text-gold/60">{e.bloco}</div>
                      <div className="flex-1">
                        <CardTitle className="font-display text-xl mb-1">{e.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">{e.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pl-[3.5rem]">
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      {e.items.map((it) => (
                        <li key={it} className="flex gap-2"><span className="text-gold">·</span> {it}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEMAS */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Exemplos de Temas</p>
            <h2 className="font-display text-4xl md:text-5xl">
              Conversas que <span className="italic text-gold">transformam perspectivas</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {temas.map((t, i) => {
              const match = t.url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
              const videoId = match?.[1];
              return (
                <a
                  key={t.title}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  title={`Assistir ${t.tag} — ${t.title} no YouTube`}
                >
                  <Card className="group bg-card/60 border-border/60 hover:border-gold/60 transition-smooth overflow-hidden relative h-full">
                    {videoId && (
                      <div className="relative aspect-video overflow-hidden bg-navy-dark">
                        <img
                          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                          alt={`Thumbnail do episódio ${t.title}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/10 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center shadow-gold group-hover:scale-110 transition-smooth">
                            <Youtube className="h-5 w-5 text-navy-dark" />
                          </div>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="font-display text-5xl text-gold/20 absolute top-4 right-4">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <Badge variant="outline" className="border-gold/40 text-gold text-[10px] uppercase tracking-wider mb-4">
                        {t.tag}
                      </Badge>
                      <h3 className="font-display text-xl leading-snug">{t.title}</h3>
                      <p className="mt-4 text-xs uppercase tracking-wider text-gold/80 group-hover:text-gold transition-smooth">
                        Assistir no YouTube →
                      </p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* COTAS */}
      <section id="cotas" className="py-24 md:py-32 bg-navy/40 border-y border-border/40">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Tabela de Cotas</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Escolha a melhor forma de <span className="italic text-gold">conectar sua marca</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Investimento mensal · Produção profissional inclusa · Distribuição multiplataforma.
            </p>
          </div>

          {/* Tabela de Investimentos */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="overflow-x-auto rounded-lg border border-border/60">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60 bg-navy/60">
                    <TableHead className="text-foreground font-semibold">Formato</TableHead>
                    <TableHead className="text-foreground font-semibold text-center">Por Episódio</TableHead>
                    <TableHead className="text-foreground font-semibold text-center">Investimento Mensal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { formato: "Cota Education — Minuto Educação", episodio: "R$ 650", mensal: "R$ 1.890" },
                    { formato: "Cota Premium — Construindo Saberes | Você Sabia", episodio: "R$ 990", mensal: "R$ 3.180" },
                    { formato: "Branded Content — Episódio Exclusivo", episodio: "R$ 2.380", mensal: "—" },
                    { formato: "Produto do Programa", episodio: "R$ 650", mensal: "R$ 1.890" },
                    { formato: "Vinheta de até 15s", episodio: "R$ 650", mensal: "R$ 1.890" },
                    { formato: "Vestir Cacá Lima", episodio: "—", mensal: "R$ 950" },
                  ].map((row) => (
                    <TableRow key={row.formato} className="border-border/40 hover:bg-navy/30">
                      <TableCell className="font-medium text-foreground">{row.formato}</TableCell>
                      <TableCell className="text-center text-gold font-semibold">{row.episodio}</TableCell>
                      <TableCell className="text-center text-gold font-semibold">{row.mensal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              * Valores mensais baseados em 4 episódios por mês
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {cotas.map((c) => (
              <Card
                key={c.title}
                className={`relative flex flex-col bg-card/70 border-border/60 hover:border-gold transition-smooth ${
                  c.destaque ? "border-gold shadow-gold scale-[1.02]" : ""
                }`}
              >
                {c.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Destaque
                  </div>
                )}
                <CardHeader>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">{c.nivel}</p>
                  <CardTitle className="font-display text-2xl">{c.title}</CardTitle>
                  <div className="mt-4">
                    <div className="font-display text-4xl text-gold">{c.price}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.priceLabel}</div>
                    {c.priceSub && (
                      <div className="text-[11px] text-muted-foreground mt-1">{c.priceSub}</div>
                    )}
                  </div>
                  <CardDescription className="pt-3 text-sm">{c.desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    {c.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-border/60">
                    <p className="text-[11px] uppercase tracking-wider text-gold/80 mb-2">Ideal Para</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-5">{c.ideal}</p>
                    <Button asChild className="w-full bg-gold text-navy-dark hover:bg-gold-light font-semibold">
                      <a href="#contato">Solicitar Proposta</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cotas complementares */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h3 className="font-display text-2xl md:text-3xl text-center mb-8">
              Cotas <span className="italic text-gold">Complementares</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {cotasComplementares.map((c) => (
                <Card key={c.title} className="bg-card/60 border-border/60">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="font-display text-xl mb-1">{c.title}</CardTitle>
                        <CardDescription>{c.desc}</CardDescription>
                      </div>
                      <div className="font-display text-2xl text-gold whitespace-nowrap">{c.price}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      {c.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" /> <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground italic border-l-2 border-gold/60 pl-3">{c.ideal}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Setores */}
          <div className="mt-20 max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Setores Indicados</p>
            <h3 className="font-display text-3xl md:text-4xl mb-8">
              Para quem o programa <span className="italic text-gold">faz sentido</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {setores.map((s) => (
                <Badge key={s} variant="outline" className="border-gold/40 text-foreground text-sm px-4 py-2 hover:bg-gold/10 hover:border-gold transition-smooth">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BASTIDORES */}
      <section id="bastidores" className="py-24 md:py-32">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Bastidores</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Um olhar exclusivo <span className="italic text-gold">por trás das câmeras</span>
            </h2>
            <p className="text-muted-foreground">Role para descobrir o universo Conversas de Alto Valor.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-navy border border-border/60">
              {bastidores.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Bastidores do programa - foto ${i + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    i === bastIdx ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div className="text-sm text-foreground/80">
                  <p className="font-display text-2xl text-gold">Cacá Lima</p>
                  <p>Apresentadora & criadora do programa</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBastIdx((i) => (i - 1 + bastidores.length) % bastidores.length)}
                    className="w-10 h-10 rounded-full bg-background/60 backdrop-blur border border-border hover:bg-gold hover:text-navy-dark transition-smooth flex items-center justify-center"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setBastIdx((i) => (i + 1) % bastidores.length)}
                    className="w-10 h-10 rounded-full bg-background/60 backdrop-blur border border-border hover:bg-gold hover:text-navy-dark transition-smooth flex items-center justify-center"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div ref={trackRef} className="mt-4 grid grid-cols-7 gap-2">
              {bastidores.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setBastIdx(i)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-smooth ${
                    i === bastIdx ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt={`Miniatura dos bastidores — foto ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO / CTA */}
      <section id="contato" className="py-24 md:py-32 bg-navy/40 border-t border-border/40">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Proposta Comercial</p>
            <h2 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
              Pronto para fazer parte de uma{" "}
              <span className="italic text-gradient-gold">conversa transformadora?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Conversas de Alto Valor está pronto para inspirar, educar e conectar. Fale com nosso time
              e receba uma proposta personalizada para sua marca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold text-navy-dark hover:bg-gold-light font-semibold shadow-gold">
                <a href="https://taggo.one/cacalima" target="_blank" rel="noopener noreferrer" title="Conectar com Cacá Lima via Taggo">
                  Conectar com Cacá Lima <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gold/40 hover:bg-gold/10 hover:text-gold">
                <a href="https://youtube.com/@conversasdealtovalor" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-4 w-4" /> Assistir no YouTube
                </a>
              </Button>
            </div>

            <div className="mt-16 grid sm:grid-cols-3 gap-4 text-sm">
              <a
                href="https://youtube.com/@conversasdealtovalor"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border hover:border-gold rounded-lg p-5 transition-smooth group"
                title="Canal do YouTube — Conversas de Alto Valor"
              >
                <Youtube className="h-5 w-5 text-gold mb-2 mx-auto" />
                <div className="text-muted-foreground">YouTube</div>
                <div className="font-semibold group-hover:text-gold transition-smooth">@conversasdealtovalor</div>
              </a>
              <a
                href="https://tvsplay.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border hover:border-gold rounded-lg p-5 transition-smooth group"
                title="Assista na RS Play TV"
              >
                <Tv className="h-5 w-5 text-gold mb-2 mx-auto" />
                <div className="text-muted-foreground">TV</div>
                <div className="font-semibold group-hover:text-gold transition-smooth">RS Play TV →</div>
              </a>
              <a
                href="https://taggo.one/cacalima"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border hover:border-gold rounded-lg p-5 transition-smooth group"
                title="Instagram de Cacá Lima via Taggo"
              >
                <Instagram className="h-5 w-5 text-gold mb-2 mx-auto" />
                <div className="text-muted-foreground">Conecte-se</div>
                <div className="font-semibold group-hover:text-gold transition-smooth">taggo.one/cacalima</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PARCEIROS & PATROCINADORES */}
      <section className="py-20 md:py-28 border-t border-border/40">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Quem acredita conosco</p>
            <h2 className="font-display text-3xl md:text-4xl">
              Parceiros & <span className="italic text-gold">Patrocinadores</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { logo: logoOralsin, name: "Oral Sin Implantes Cachoeirinha", title: "Visite o Instagram da Oral Sin Cachoeirinha", url: "https://www.instagram.com/oralsincachoeirinha?igsh=MTI3c2J5MDdxYzRlaQ==", scale: "" },
              { logo: logoConfix, name: "Confix Gestão Empresarial", title: "Visite o Instagram da Confix Gestão Empresarial", url: "https://www.instagram.com/confix.gestaoempresarial?igsh=MTQ5ZGR1YXdhYmlxcg==", scale: "" },
              { logo: logoArena, name: "Arena Aquática", title: "Visite o Instagram da Arena Aquática", url: "https://www.instagram.com/arena.aquatica?igsh=MXNrb2l6NXlvbnFrOA==", scale: "scale-[1.6]" },
              { logo: logoPurpose, name: "Purpose Mídia", title: "Visite o Instagram da Purpose Mídia", url: "https://www.instagram.com/purposemidia", scale: "scale-[2]" },
              { logo: logoDermogral, name: "Dermogral Farmácia de Manipulação", title: "Visite o Instagram da Dermogral Farmácia", url: "https://www.instagram.com/dermogralfarmacia?igsh=MWFtYnQ4NHlyZzk0Yw==", scale: "scale-[1.6]" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(20%-1.2rem)] rounded-xl border border-border/60 bg-card/40 hover:border-gold/60 hover:bg-card/80 transition-smooth flex items-center justify-center p-5 sm:p-6 h-28 sm:h-32 overflow-hidden"
                title={p.title}
              >
                <img src={p.logo} alt={`Logo ${p.name} — parceiro do Conversas de Alto Valor`} className={`w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-out ${p.scale}`} />
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            Quer ver sua marca aqui?{" "}
            <a href="#contato" className="text-gold hover:text-gold-light underline underline-offset-4 transition-smooth">
              Fale conosco
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-border/40">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-base">
            Conversas <span className="text-gold italic">de Alto Valor</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © 2024 Conversas de Alto Valor. Onde histórias revelam propósitos.
          </p>
          <div className="text-xs text-muted-foreground">Apresentado por Cacá Lima</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
