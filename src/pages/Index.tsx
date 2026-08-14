import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { setSeo } from "@/lib/seo";
import capaCacaLima from "@/assets/capas/ep11-cacalima.png";
import capaAlexandreSilva from "@/assets/capas/ep01-alexandresilva.png";
import capaJoscianaBezerra from "@/assets/capas/ep03-joscianabezerra.png";
import capaIvanDePaiva from "@/assets/capas/ep04-ivandepaiva.png";
import capaLucasVital from "@/assets/capas/ep05-lucasvital.png";
import capaGramadoSummit from "@/assets/capas/ep13-gramadosummit.png";
import fotoApresentadora from "@/assets/apresentadora/foto-caca.jpg";
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
  Phone,
  MapPin,
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

import logoRsplay from "@/assets/parceiros/rsplay-tv.png";
import logoOralsin from "@/assets/parceiros/oralsin.png";
import logoArena from "@/assets/parceiros/arena.png";
import logoDermogral from "@/assets/parceiros/dermogral.png";
import logoMedKaya from "@/assets/parceiros/medkaya.png";

const bastidores = [b1, b2, b3, b4, b5, b6, b7];

const dnaPilares = [
  { icon: Sparkles, title: "Inspirar", text: "Trajetórias reais, corajosas e transformadoras." },
  { icon: TrendingUp, title: "Educar", text: "Técnica, mentalidade e prática." },
  { icon: Users, title: "Criar Impacto", text: "Pessoas, marcas, ideias e setores." },
  { icon: Quote, title: "Provocar Clareza", text: "Perguntas que mudam a percepção." },
  { icon: Briefcase, title: "Valorizar Propósito", text: "Porque propósito sustenta qualquer movimento." },
];

const formato = [
  { label: "Periodicidade", value: "Estreias nas sextas-feiras, 20h30" },
  { label: "Duração", value: "Até 30 minutos" },
  { label: "Formato", value: "Sala de Entrevistas" },
  { label: "Distribuição", value: "TV + redes sociais + YouTube" },
];

const estrutura = [
  {
    bloco: "01",
    title: "Abertura + Vinheta do Apoiador Principal",
    desc: "Saudação calorosa da apresentadora, que já situa o tema da conversa, seguida da vinheta comercial do apoiador principal do episódio.",
    items: ["Boas-vindas e contextualização do tema do dia", "Vinheta comercial do apoiador principal", "Chamada para o convidado"],
  },
  {
    bloco: "02",
    title: "Apresentação do Convidado + Pergunta de Essência",
    desc: "Mini-bio do convidado e a primeira pergunta, sempre voltada a quem essa pessoa é além do cargo — seus valores e sua essência.",
    items: ["Introdução do convidado com trajetória resumida", "Pergunta de abertura sobre essência e valores", "Primeiro momento de vulnerabilidade e autenticidade"],
  },
  {
    bloco: "03",
    title: "Trajetória, Conquistas e Valores",
    desc: "O núcleo da entrevista: perguntas variadas sobre o caminho percorrido pelo convidado, suas conquistas e o que carrega como valor.",
    items: ["Perguntas sobre a trajetória profissional e pessoal", "Momentos de virada e superação", "Conquistas que marcaram o percurso"],
  },
  {
    bloco: "04",
    title: "Quadro Você Sabia",
    desc: "Curiosidades rápidas de utilidade prática para o público, apresentadas pelos parceiros do programa.",
    items: ["Curiosidades de utilidade prática para o público", "Conteúdo assinado pelos parceiros do episódio", "Transição para o momento mais íntimo da conversa"],
  },
  {
    bloco: "05",
    title: "O Objeto que Conta uma História",
    desc: "Chamada para um objeto pessoal que o convidado traz consigo, usado como ponte para uma conversa mais íntima.",
    items: ["Apresentação do objeto escolhido pelo convidado", "O significado por trás da escolha", "Conexão do objeto com a essência já revelada"],
  },
  {
    bloco: "06",
    title: "Quadro Construindo Saberes",
    desc: "Aprofundamento educacional, logo antes da pergunta final.",
    items: ["Conteúdo de aprofundamento assinado pelos parceiros", "Aprendizado aplicável ao dia a dia do público", "Transição para o fechamento da conversa"],
  },
  {
    bloco: "07",
    title: "Pergunta Final + Encerramento",
    desc: "A pergunta que revela propósito, projetos futuros e conexões do convidado, seguida do encerramento caloroso da apresentadora.",
    items: ["Pergunta sobre propósito e projetos futuros", "Conexões e legado do convidado", "Encerramento e convite para os próximos episódios"],
  },
];

const temas = [
  { tag: "Episódio #11 · Especial de Aniversário", title: "Existe uma parte minha que você não vê.", url: "https://youtu.be/7EVEG-gS-h4", featured: true, capa: capaCacaLima },
  { tag: "Episódio #1 · Temp. 2 · Alexandre Silva", title: "A comunicação consegue transformar pessoas?", url: "https://youtu.be/-HC3acXHu6U", capa: capaAlexandreSilva },
  { tag: "Episódio #3 · Temp. 2 · Josciana Bezerra", title: "Humor, maternidade e verdades que ninguém conta", url: "https://youtu.be/f8SyLIfaTUc", capa: capaJoscianaBezerra },
  { tag: "Episódio #4 · Temp. 2 · Ivan de Paiva", title: "Fé, recomeços e o que nenhuma IA substitui", url: "https://youtu.be/SDT4O5UQ_qE", capa: capaIvanDePaiva },
  { tag: "Episódio #5 · Temp. 2 · Lucas Vital", title: "Entre quilômetros e propósitos", url: "https://youtu.be/J9nUd7p_FvE", capa: capaLucasVital },
  { tag: "Episódio #8 · Temp. 2 · Guilherme e Sueli Cardeal", title: "45 anos de empresa em família", url: "https://youtu.be/sBibh5W7B1M" },
  { tag: "Episódio #13 · Gramado Summit Especial", title: "Ideias que movimentam mercados", url: "https://youtu.be/z3DLzQ-t9sY", capa: capaGramadoSummit },
];

const setores = [
  "Startups", "Consultorias", "Clínicas", "Contabilidade", "Jurídico",
  "Investimentos", "Tecnologia", "Educação", "Eventos", "Veículos",
];

const cotas = [
  {
    nivel: "Cota Master",
    title: "Patrocinador Master",
    desc: "A principal cota de posicionamento do Conversas de Alto Valor. Sua marca torna-se parceira oficial do programa, associando-se a uma plataforma de conteúdo voltada para empresários, especialistas e profissionais que valorizam credibilidade, relacionamento e autoridade. Além da presença institucional, sua empresa participa ativamente da geração de conteúdo através do quadro Você Sabia.",
    items: [
      "Vinheta institucional de até 15s na abertura de todos os episódios",
      "Vinheta institucional de até 15s no encerramento de todos os episódios",
      "Destaque como Patrocinador Master",
      "Logo em materiais institucionais e comerciais do programa",
      "Exibição na RSPlay TV (Canal 524 Claro)",
      "Publicação oficial no YouTube",
      "Divulgação nas redes sociais do Conversas de Alto Valor",
      "Divulgação nas redes sociais da apresentadora Cacá Lima",
      "Participação mensal no quadro Você Sabia com gravação em estúdio",
      "Participação presencial da empresa nas gravações",
      "Vídeo institucional de até 15s ao final do quadro",
      "Entrega dos materiais editados",
      "Licença para utilização institucional dos conteúdos produzidos",
    ],
    ideal: "Diferenciais: exclusividade por segmento de atuação, associação direta à identidade institucional do programa, prioridade na renovação da parceria e presença recorrente durante toda a temporada.",
    destaque: true,
  },
  {
    nivel: "Cota Premium",
    title: "Você Sabia",
    desc: "Transforme conhecimento em autoridade. Sua empresa participa de um dos quadros mais relevantes do programa através de conteúdo educativo, estratégico e alinhado ao seu mercado de atuação, fortalecendo posicionamento, credibilidade e relacionamento com o público.",
    items: [
      "Participação no quadro Você Sabia",
      "Gravação profissional em estúdio",
      "Participação presencial da empresa nas gravações",
      "Produção de conteúdo estratégico",
      "Vídeo institucional de até 15s ao final do quadro",
      "Exibição na RSPlay TV (Canal 524 Claro)",
      "Publicação no YouTube",
      "Divulgação nas redes sociais do programa",
      "Divulgação nas redes sociais da apresentadora Cacá Lima",
      "Entrega dos vídeos editados",
      "Licença para utilização institucional dos conteúdos produzidos",
    ],
    ideal: "Marcas que desejam transformar conhecimento em autoridade através de conteúdo educativo, estratégico e alinhado ao seu mercado de atuação.",
  },
  {
    nivel: "Branded Content",
    title: "Entrevista Especial",
    desc: "Uma oportunidade para apresentar sua trajetória, seus valores, sua empresa e seus diferenciais dentro do Conversas de Alto Valor. A entrevista é construída para revelar a essência da marca e a história por trás do negócio, gerando conexão e credibilidade junto ao público.",
    items: [
      "Participação como entrevistado principal do episódio",
      "Entrevista conduzida por Cacá Lima",
      "Gravação profissional em estúdio",
      "Exibição na RSPlay TV (Canal 524 Claro)",
      "Publicação no YouTube",
      "Divulgação nas redes sociais do programa",
      "Divulgação nas redes sociais da apresentadora Cacá Lima",
      "Entrega integral dos materiais editados",
      "Licença para utilização institucional dos conteúdos produzidos",
    ],
    ideal: "A entrevista acontece dentro da estrutura oficial do programa, mantendo os quadros, patrocinadores e identidade editorial do Conversas de Alto Valor.",
  },
];

const cotasComplementares = [
  {
    title: "Presença de Marca no Estúdio",
    desc: "Sua marca integrada de forma elegante e natural ao cenário do programa. Uma oportunidade de fortalecer reconhecimento, gerar lembrança de marca e associar seu produto a um ambiente de credibilidade, relacionamento e posicionamento.",
    items: [
      "Exposição do produto ou marca durante a gravação",
      "Presença visual no cenário do programa",
      "Participação em fotos, vídeos, cortes e materiais derivados",
      "Exibição na RSPlay TV (Canal 524 Claro)",
      "Publicação no YouTube",
      "Divulgação nas redes sociais do programa",
      "Associação à identidade visual do Conversas de Alto Valor",
    ],
    ideal: "Ideal para vinhos e espumantes, cafés especiais, chocolaterias, decoração e paisagismo, tecnologia, livros e editoras, presentes corporativos e produtos premium.",
  },
  {
    title: "Parceiro de Imagem",
    desc: "Sua marca associada diretamente à imagem da apresentadora Cacá Lima durante as gravações do programa, conectando-se à elegância, credibilidade e presença de uma profissional reconhecida no mercado de eventos, comunicação e relacionamento.",
    items: [
      "Utilização de roupas durante as gravações",
      "Utilização de calçados durante as gravações",
      "Utilização de óculos durante as gravações",
      "Utilização de acessórios previamente acordados",
      "Presença nos bastidores e gravações",
      "Marcação da marca nas publicações quando aplicável",
      "Associação à imagem da apresentadora e exposição recorrente na temporada",
    ],
    ideal: "Ideal para óticas, marcas de moda feminina, calçados, bolsas e acessórios, joalherias e lifestyle premium.",
  },
];

const todosIncluem = [
  "Produção audiovisual profissional",
  "Exibição na RSPlay TV (Canal 524 Claro)",
  "Publicação no YouTube",
  "Divulgação nas redes sociais do programa",
  "Divulgação nas redes sociais da apresentadora Cacá Lima",
  "Entrega dos materiais editados para utilização da marca",
  "Associação ao posicionamento institucional do Conversas de Alto Valor",
];

const Index = () => {
  const [bastIdx, setBastIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSeo({
      title: "Conversas de Alto Valor — Histórias que revelam propósitos",
      description: "Programa semanal de entrevistas com Cacá Lima. Profundidade, propósito e narrativa humana em conversas transformadoras.",
      path: "/",
    });
  }, []);

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
            <a href="#apresentadora" className="hover:text-gold transition-smooth">Apresentadora</a>
            <a href="#formato" className="hover:text-gold transition-smooth">Formato</a>
            <a href="#cotas" className="hover:text-gold transition-smooth">Cotas</a>
            <a href="#bastidores" className="hover:text-gold transition-smooth">Bastidores</a>
            <a href="#contato" className="hover:text-gold transition-smooth">Contato</a>
            <Link to="/evento26-08" className="text-gold hover:text-gold/80 transition-smooth font-medium">Evento Especial</Link>
          </nav>
          <Button asChild size="sm" className="bg-gold text-navy-dark hover:bg-gold-light font-semibold">
            <a href="https://wa.me/5551992149336" target="_blank" rel="noopener noreferrer">Seja Patrocinador</a>
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
              Conversas de Alto Valor
              <br />
              <span className="text-gradient-gold italic">Profundidade, propósito e narrativa humana</span>.
            </h1>
            <div className="gold-divider w-32 mx-auto mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Onde histórias revelam propósitos. Um programa de até 30 minutos, no formato Sala de Entrevistas,
              que une educação empreendedora e narrativa transformadora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="border-gold/40 text-foreground hover:bg-gold/10 hover:text-gold">
                <a href="#programa">Conheça o Programa</a>
              </Button>
            </div>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Tv className="h-4 w-4 text-gold" /> TV Aberta · Canal 524</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> Estreias nas sextas-feiras, 20h30</div>
              <div className="flex items-center gap-2"><Video className="h-4 w-4 text-gold" /> Até 30 min</div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTO — UMA NOITE */}
      <section className="py-16 md:py-20 bg-[#E8DCC8] border-y border-gold/40">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto relative rounded-2xl overflow-hidden border-2 border-gold/60 bg-[#F2EBDD] p-8 md:p-12 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1 gradient-gold" />
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-1">
                <Badge variant="outline" className="border-navy-dark/40 text-navy-dark mb-4 uppercase tracking-[0.2em] text-xs px-3 py-1 bg-[#F8F3EA]/80">
                  Evento Exclusivo
                </Badge>
                <h2 className="font-display text-3xl md:text-4xl mb-4 text-navy-dark">
                  Uma Noite de <span className="italic text-gold">Conversas de Alto Valor</span>
                </h2>
                <p className="text-navy-dark/85 leading-relaxed mb-6">
                  Networking exclusivo com empresários e marcas de peso, com gravação ao vivo do programa no estúdio RSPlay TV. Uma experiência única de conexão, conteúdo e autoridade.
                </p>
                <div className="flex flex-wrap gap-6 text-lg md:text-xl mb-8">
                  <div className="flex items-center gap-2 text-navy-dark font-semibold">
                    <Calendar className="h-5 w-5 text-gold" /> 26 de agosto de 2026 · 18h30
                  </div>
                  <div className="flex items-center gap-2 text-navy-dark font-semibold">
                    <MapPin className="h-5 w-5 text-gold" /> Estúdio RSPlay TV
                  </div>
                  <div className="flex items-center gap-2 text-navy-dark font-semibold">
                    <Users className="h-5 w-5 text-gold" /> Networking + Gravação em formato auditório
                  </div>
                </div>
                <Button asChild className="bg-navy-dark text-[#F5EFE1] hover:bg-navy-dark/90 font-semibold">
                  <Link to="/evento26-08">
                    Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gold/50 bg-gold/10 flex items-center justify-center shadow-gold">
                  <Sparkles className="h-12 w-12 md:h-16 md:w-16 text-gold" />
                </div>
              </div>
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

      {/* APRESENTADORA */}
      <section id="apresentadora" className="py-24 md:py-32 bg-navy/40 border-y border-border/40">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-[340px_1fr] gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-navy border border-border/60 mx-auto md:mx-0 w-full max-w-sm">
              <img
                src={fotoApresentadora}
                alt="Cacá Lima, apresentadora do Conversas de Alto Valor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent pointer-events-none" />
            </div>

            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Apresentadora</p>
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Cacá Lima
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Especialista em gestão de riscos e segurança em eventos, cerimonialista, mentora e
                  ex-diretora da Associação Brasileira de Eventos, Cacá construiu uma trajetória
                  marcada por planejamento, cuidado com pessoas e superação de grandes desafios
                  pessoais.
                </p>
                <p>
                  À frente das câmeras, ela conduz entrevistas que vão além dos títulos e conquistas
                  dos convidados, buscando entender decisões, valores e legados — dando ao programa
                  uma identidade própria dentro da programação da RSPlay TV.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="outline" className="border-border/60">
                  <a
                    href="https://tvsplay.com.br/2026/08/10/caca-lima-e-o-sucesso-de-conversas-de-alto-valor-na-rsplay-tv/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Saiba mais
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATO */}
      <section id="formato" className="py-24 md:py-32 bg-navy/40 border-y border-border/40">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Formato do Programa</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Uma jornada cuidadosamente <span className="italic text-gold">construída</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Cada episódio segue sete momentos, do primeiro aceno da apresentadora ao aperto de mão final —
              uma sequência pensada para transformar perspectivas e entregar valor rápido e aplicável.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-2 max-w-3xl mx-auto">
              {formato.map((f, i) => (
                <div key={f.label} className="flex items-center">
                  <div className="text-center px-6 py-2">
                    <div className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground mb-2">{f.label}</div>
                    <div className="font-display text-lg text-gold italic">{f.value}</div>
                  </div>
                  {i < formato.length - 1 && (
                    <div className="hidden sm:block w-px h-10" style={{ backgroundColor: "rgba(185,150,87,0.25)" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto divide-y" style={{ borderColor: "rgba(185,150,87,0.15)" }}>
            {estrutura.map((e) => (
              <div
                key={e.bloco}
                className="grid sm:grid-cols-[80px_1fr] gap-2 sm:gap-8 py-6 border-t first:border-t-0"
                style={{ borderColor: "rgba(185,150,87,0.15)" }}
              >
                <div className="font-display text-2xl italic text-gold/70">{e.bloco}</div>
                <div>
                  <h3 className="font-display text-lg mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{e.desc}</p>
                </div>
              </div>
            ))}
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

          <div className="max-w-6xl mx-auto space-y-10">
            {/* Episódio em destaque — card hero */}
            {temas.filter((t) => t.featured).map((t) => {
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
                  <Card className="group bg-card/60 border-gold shadow-gold overflow-hidden relative transition-smooth hover:shadow-lg">
                    <div className="grid md:grid-cols-2">
                      {(t.capa || videoId) && (
                        <div className="relative aspect-video md:aspect-auto overflow-hidden bg-navy-dark">
                          <img
                            src={t.capa ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                            onLoad={(e) => {
                              if (!t.capa) {
                                const img = e.currentTarget;
                                if (img.naturalWidth <= 120) {
                                  img.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                                }
                              }
                            }}
                            alt={`Capa do episódio ${t.title}`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent md:bg-gradient-to-r" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-gold group-hover:scale-110 transition-smooth">
                              <Youtube className="h-6 w-6 text-navy-dark" />
                            </div>
                          </div>
                        </div>
                      )}
                      <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                        <Badge className="w-fit mb-4 bg-gold text-navy-dark border-none text-[10px] uppercase tracking-wider">
                          Destaque
                        </Badge>
                        <Badge variant="outline" className="w-fit border-gold/40 text-gold text-[10px] uppercase tracking-wider mb-4">
                          {t.tag}
                        </Badge>
                        <h3 className="font-display text-2xl md:text-3xl leading-snug mb-2">{t.title}</h3>
                        <p className="text-xs uppercase tracking-wider text-gold/80 group-hover:text-gold transition-smooth">
                          Assistir no YouTube →
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </a>
              );
            })}

            {/* Demais episódios — grade */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {temas.filter((t) => !t.featured).map((t, i) => {
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
                      {(t.capa || videoId) && (
                        <div className="relative aspect-video overflow-hidden bg-navy-dark">
                          <img
                            src={t.capa ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                            onLoad={(e) => {
                              if (!t.capa) {
                                const img = e.currentTarget;
                                if (img.naturalWidth <= 120) {
                                  img.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                                }
                              }
                            }}
                            alt={`Capa do episódio ${t.title}`}
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
        </div>
      </section>

      {/* COTAS */}
      <section id="cotas" className="py-24 md:py-32 bg-navy/40 border-y border-border/40">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-gold mb-4">Cotas de Patrocínio</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              Escolha a melhor forma de <span className="italic text-gold">conectar sua marca</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Mais do que espaço publicitário, oferecemos posicionamento, autoridade e relacionamento através de conteúdo relevante e produção profissional. Todos os conteúdos são gravados em estúdio, exibidos na RSPlay TV (Canal 524 Claro), publicados no YouTube e divulgados nas redes sociais do programa e da apresentadora Cacá Lima.
            </p>
          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                      <a href="https://wa.me/5551992149336" target="_blank" rel="noopener noreferrer">Solicitar Proposta</a>
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

          {/* Todos os patrocínios incluem */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-gold/30 bg-card/50 p-8 md:p-12">
              <h3 className="font-display text-2xl md:text-3xl text-center mb-8">
                Todos os patrocínios <span className="italic text-gold">incluem</span>
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                {todosIncluem.map((it) => (
                  <li key={it} className="flex gap-2">
                    <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
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
            <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-navy border border-border/60">
              {bastidores.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Bastidores do programa - foto ${i + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover object-[center_12%] sm:object-[center_25%] transition-opacity duration-1000 ${
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
                  aria-label={`Ver foto ${i + 1} dos bastidores`}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-smooth ${
                    i === bastIdx ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt={`Miniatura dos bastidores — foto ${i + 1}`} loading="lazy" className="w-full h-full object-cover object-[center_15%]" />
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
                <a href="https://wa.me/5551992149336" target="_blank" rel="noopener noreferrer" title="Fale com a Produção via WhatsApp">
                  Fale com a Produção <Phone className="ml-2 h-4 w-4" />
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
                href="https://rsplay.com.br/"
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
                href="https://www.instagram.com/conversasdealtovalor"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border hover:border-gold rounded-lg p-5 transition-smooth group"
                title="Siga no Instagram — Conversas de Alto Valor"
              >
                <Instagram className="h-5 w-5 text-gold mb-2 mx-auto" />
                <div className="text-muted-foreground">Instagram</div>
                <div className="font-semibold group-hover:text-gold transition-smooth">@conversasdealtovalor</div>
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
              { logo: logoRsplay, name: "RSPLAY TV", title: "Visite o site da RSPLAY TV", url: "https://rsplay.com.br/", scale: "scale-[1.2]", filter: "brightness-0" },
              { logo: logoMedKaya, name: "MedKaya", title: "Visite o site da MedKaya", url: "https://www.medkayafarma.com.br/", scale: "scale-[1.3]" },
              { logo: logoOralsin, name: "OralSin Cachoeirinha", title: "Visite o Instagram da OralSin Cachoeirinha", url: "https://www.instagram.com/oralsincachoeirinha?igsh=MTI3c2J5MDdxYzRlaQ==", scale: "scale-[1.15]" },
              { logo: logoArena, name: "Arena Aquática", title: "Visite o Instagram da Arena Aquática", url: "https://www.instagram.com/arena.aquatica?igsh=MXNrb2l6NXlvbnFrOA==", scale: "scale-[1.6]" },
              { logo: logoDermogral, name: "Dermogral Farmácia de Manipulação", title: "Visite o Instagram da Dermogral Farmácia", url: "https://www.instagram.com/dermogralfarmacia?igsh=MWFtYnQ4NHlyZzk0Yw==", scale: "scale-[1.6]" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(20%-1.2rem)] rounded-xl border border-border/60 bg-white hover:border-gold/60 hover:shadow-lg transition-smooth flex items-center justify-center p-5 sm:p-6 h-28 sm:h-32 overflow-hidden"
                title={p.title}
                aria-label={p.title}
              >
                <img src={p.logo} alt={`Logo ${p.name} — parceiro do Conversas de Alto Valor`} className={`w-full h-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-out ${p.scale}`} style={p.filter ? { filter: p.filter } : {}} />
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            Quer ver sua marca aqui?{" "}
            <a href="https://wa.me/5551992149336" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline underline-offset-4 transition-smooth">
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
