import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Video, ArrowLeft, Mail, MessageCircle, Check, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { setSeo, setJsonLd, removeJsonLd } from "@/lib/seo";
import logoCardeal from "@/assets/parceiros/cardeal.png";
import fotoRicardoRizzo from "@/assets/convidados/ricardo-rizzo-campos.jpg";
import logoDWill from "@/assets/parceiros/dwill.jpg";
import logoLambs from "@/assets/parceiros/lambs-original.jpg";

// Links de acesso
const LINK_CHAVE_PIX = "abaa2e60-4bd6-475b-9c90-f974eb52ecc4";
const LINK_GRUPO_WHATSAPP = "https://chat.whatsapp.com/F9tnzIHdbn4HI3pwwoFtuF?s=cl&p=a&ilr=1";

// Lotes de inscrição — o valor e o link mudam automaticamente conforme a data de hoje.
// Quando um lote vira, ele fica marcado como "encerrado" e o próximo assume.
const LOTES = [
  {
    nome: "Lote 1",
    ate: "até 04/08",
    inicio: new Date(2000, 0, 1), // sem limite pra baixo
    fim: new Date(2026, 7, 4, 23, 59, 59), // 04/08/2026
    valorTotal: "R$ 60,00",
    link2x: "https://pay.infinitepay.io/cacalimaoficial/Ri0y-aGdaNoL8Lp-60,00",
    valorAvista: "R$ 45,00",
    linkAvista: "https://pay.infinitepay.io/cacalimaoficial/Ri0x-GPSjgYqBVn-45,00",
  },
  {
    nome: "Lote 2",
    ate: "05 a 10/08",
    inicio: new Date(2026, 7, 5),
    fim: new Date(2026, 7, 10, 23, 59, 59),
    valorTotal: "R$ 90,00",
    link2x: "https://pay.infinitepay.io/cacalimaoficial/Ri0y-BlRfD57Zd4-90,00",
    valorAvista: "R$ 67,50",
    linkAvista: "https://pay.infinitepay.io/cacalimaoficial/Ri0x-FKi3Oac53H-67,50",
  },
  {
    nome: "Lote 3",
    ate: "11 a 22/08",
    inicio: new Date(2026, 7, 11),
    fim: new Date(2100, 0, 1), // sem limite pra cima (cobre até o dia do evento)
    valorTotal: "R$ 120,00",
    link2x: "https://pay.infinitepay.io/cacalimaoficial/Ri0y-9eBPAVnbwm-120,00",
    valorAvista: "R$ 90,00",
    linkAvista: "https://pay.infinitepay.io/cacalimaoficial/Ri0x-fgBhBHb7wK-90,00",
  },
];

const getLoteAtual = () => {
  const hoje = new Date();
  return LOTES.find((l) => hoje >= l.inicio && hoje <= l.fim) ?? LOTES[LOTES.length - 1];
};

const WHATSAPP_GILBERTO = "https://wa.me/5551992149336";

const MAILTO = "mailto:caca@cacalimaoficial.com.br?subject=Patroc%C3%ADnio%20-%20Uma%20Noite%20de%20Conversas%20de%20Alto%20Valor";

const heroInfo = [
  { icon: Calendar, label: "Data", value: "26 · Ago · 2026", sub: "18h30 às 20h30" },
  { icon: MapPin, label: "Local", value: "Estúdio C — RSPlay TV", sub: "Rua da Conceição, 195/6º andar - Centro Histórico - Porto Alegre/RS" },
  { icon: Video, label: "Formato", value: "Gravação ao vivo", sub: "+ pitch induzido" },
];

const relance = [
  { title: "Data", value: "26 de agosto", legenda: "Quarta-feira, 2 horas" },
  { title: "Horário", value: "18h30 às 20h30", legenda: "Chegada sugerida às 18h" },
  { title: "Local", value: "Estúdio C", legenda: "RSPlay TV" },
  { title: "Entrevistado", value: "Ricardo Rizzo Campos", legenda: "Marketing, PNL e trajetória empresarial" },
  { title: "Público", value: "Grupo seleto", legenda: "Curadoria — não plateia" },
  { title: "Diferencial", value: "Pitch induzido", legenda: "Negócios provocados ao vivo" },
];

const roteiro = [
  { hora: "18h30", titulo: "Abertura", desc: "Boas-vindas + coffee de chegada by Confeitaria Lamb's" },
  { hora: "18h40", titulo: "Bloco 1 — Gravação", desc: "Origem e travessia: como uma ideia vira instituição" },
  { hora: "19h05", titulo: "Pitch induzido", desc: "30s a 90s conforme a cota, mediado pela apresentadora" },
  { hora: "19h40", titulo: "Bloco 2 — Gravação", desc: "Gestão, longevidade e legado" },
  { hora: "20h05", titulo: "Momento Gastronômico", desc: "Experiência D'Will Grill Burguer, foto oficial e conexões" },
  { hora: "20h30", titulo: "Encerramento", desc: "Agradecimentos e despedida" },
];

const numeros = [
  { valor: "14 mi", legenda: "Alcance multiplataforma da rede RSPlay" },
  { valor: "85%", legenda: "Público das classes A e B" },
  { valor: "72", legenda: "Programas exclusivos na grade 24h" },
  { valor: "2 mi", legenda: "TV por assinatura · Canal 524 Claro" },
  { valor: "1,2 mi+", legenda: "Visualizações no YouTube" },
  { valor: "2,4 mi", legenda: "Alcance no Instagram" },
  { valor: "76%", legenda: "Da audiência no Rio Grande do Sul" },
];

const tabelaCotas = [
  ["Exclusividade de segmento", "✦ Exclusiva", "—", "—"],
  ["Logo nos cortes / episódio", "Abertura + selo em todos os cortes", "Rodapé dos cortes", "Card de agradecimento"],
  ["Menção verbal da apresentadora", "Abertura + fechamento", "Única", "Coletiva"],
  ["Pitch de negócios ao vivo", "90 segundos", "60 segundos", "45 segundos"],
  ["Presença na sala", "2 cadeiras", "1 cadeira", "1 cadeira"],
  ["Ativação física no estúdio", "Banner, foto oficial + 2 stories de bastidores", "1 story de bastidores", "—"],
  ["Redes @conversasdealtovalor", "3 posts marcados", "1 story", "Card coletivo"],
  ["Investimento", "R$ 5.000", "R$ 3.000", "R$ 1.000"],
];

// Cards de cotas — derivados de tabelaCotas para preservar o conteúdo
// Patrocinadores já confirmados — basta adicionar um novo objeto aqui
// conforme fechar cada cota (nome, logo importado, e a cota correspondente).
const patrocinadores = [
  { nome: "Cardeal — Ecossistema Contábil Estratégico", logo: logoCardeal, cota: "Master" },
  { nome: "D'Will Especial Grill Burguer", logo: logoDWill, cota: "Apoio", padding: 4 },
  { nome: "Confeitaria Lamb's — Desde 1988", logo: logoLambs, cota: "Apoio" },
];

const cotas = [
  {
    nome: "Master",
    disponibilidade: "Exclusiva por segmento",
    investimento: "R$ 5.000",
    status: "disponivel" as const,
    statusLabel: "3 vagas disponíveis",
    scarcity: "3 vagas disponíveis",
    beneficios: tabelaCotas.slice(0, -1).map((row) => `${row[0]}: ${row[1]}`),
  },
  {
    nome: "Parceira",
    disponibilidade: "Até 2 marcas",
    investimento: "R$ 3.000",
    status: "disponivel" as const,
    statusLabel: "Disponível",
    scarcity: "Vagas abertas",
    destaque: true,
    beneficios: tabelaCotas.slice(0, -1).map((row) => `${row[0]}: ${row[2]}`),
  },
  {
    nome: "Apoio",
    disponibilidade: "Até 3 marcas",
    investimento: "R$ 1.000",
    status: "quase" as const,
    statusLabel: "Últimas vagas",
    scarcity: "Restam poucas cotas — quase esgotando",
    beneficios: tabelaCotas.slice(0, -1).map((row) => `${row[0]}: ${row[3]}`),
  },
];

// Máscara e validação de CPF
const maskCPF = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

const isValidCPFFormat = (v: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v);

const maskCNPJ = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");

const isValidCNPJFormat = (v: string) => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(v);

type Inscricao = {
  id: string;
  nome: string;
  pagamento_confirmado: boolean;
};

const PatrocinioEvento = () => {
  const loteAtual = getLoteAtual();

  const formatMetrica = (valor: string) => {
    const match = valor.match(/^([\d.,]+)\s*(.*)$/);
    if (!match) return { num: valor, suf: "" };
    return { num: match[1], suf: match[2] };
  };
  useEffect(() => {
    const title = "Uma Noite de Conversas de Alto Valor — Edição Especial · 26 de agosto";
    const description = "Edição especial do Conversas de Alto Valor: gravação ao vivo com Ricardo Rizzo Campos, diante de um grupo seleto de empresários. 26 de agosto, Estúdio C — RSPlay TV.";

    setSeo({ title, description, path: "/evento26-08" });

    setJsonLd("ld-event", {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Uma Noite de Conversas de Alto Valor — Edição Especial",
      description,
      startDate: "2026-08-26T18:30:00-03:00",
      endDate: "2026-08-26T20:30:00-03:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Estúdio C — RSPlay TV",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rua da Conceição, 195 - 6º andar",
          addressLocality: "Porto Alegre",
          addressRegion: "RS",
          addressCountry: "BR",
        },
      },
      image: ["https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1d7049bc-4428-48f6-80f0-720a02cb0094"],
      organizer: {
        "@type": "Organization",
        name: "Conversas de Alto Valor",
        url: "https://conversasdealtovalor.com.br/",
      },
      offers: {
        "@type": "Offer",
        url: "https://conversasdealtovalor.com.br/evento26-08",
        priceCurrency: "BRL",
        price: "60.00",
        availability: "https://schema.org/InStock",
      },
    });

    return () => removeJsonLd("ld-event");
  }, []);

  // Estado do formulário de inscrição
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    empresa: "",
    cnpj: "",
    ramo_atuacao: "",
    cidade_atuacao: "",
    email: "",
    telefone: "",
    instagram: "",
  });
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inscricao, setInscricao] = useState<Inscricao | null>(null);

  // Código promocional
  const [promocode, setPromocode] = useState("");
  const [promoAplicado, setPromoAplicado] = useState<"NOITE25" | "NOITEFREE" | null>(null);
  const [promoErro, setPromoErro] = useState("");
  const [aplicandoPromo, setAplicandoPromo] = useState(false);

  const setField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = k === "cpf" ? maskCPF(e.target.value) : k === "cnpj" ? maskCNPJ(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const handleAplicarPromocode = async () => {
    const codigo = promocode.trim().toUpperCase();
    setPromoErro("");

    if (codigo !== "NOITE25" && codigo !== "NOITEFREE") {
      setPromoErro("Código inválido");
      return;
    }

    if (codigo === "NOITEFREE" && inscricao) {
      setAplicandoPromo(true);
      const { error } = await supabase
        .from("inscricoes_evento")
        .update({ pagamento_confirmado: true })
        .eq("id", inscricao.id);
      setAplicandoPromo(false);
      if (error) {
        setPromoErro("Não foi possível aplicar o código. Tente novamente.");
        return;
      }
      setInscricao({ ...inscricao, pagamento_confirmado: true });
      toast({ title: "Código aplicado: acesso gratuito" });
    } else {
      toast({ title: `Código aplicado: 25% de desconto — valor ${loteAtual.valorAvista} em 1x` });
    }

    setPromoAplicado(codigo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.nome.trim() ||
      !form.empresa.trim() ||
      !form.ramo_atuacao.trim() ||
      !form.cidade_atuacao.trim() ||
      !form.email.trim() ||
      !form.telefone.trim() ||
      !form.instagram.trim()
    ) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    if (!isValidCPFFormat(form.cpf)) {
      toast({ title: "CPF inválido", description: "Use o formato 000.000.000-00", variant: "destructive" });
      return;
    }
    if (form.cnpj.trim() && !isValidCNPJFormat(form.cnpj)) {
      toast({ title: "CNPJ inválido", description: "Use o formato 00.000.000/0000-00, ou deixe em branco", variant: "destructive" });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      toast({ title: "E-mail inválido", variant: "destructive" });
      return;
    }
    if (!aceiteTermos) {
      toast({ title: "Aceite necessário", description: "É preciso aceitar o Termo de Cessão de Uso de Imagem e Voz e a política de dados para prosseguir.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("inscricoes_evento")
      .insert({
        nome: form.nome.trim(),
        cpf: form.cpf,
        empresa: form.empresa.trim(),
        cnpj: form.cnpj.trim() || null,
        ramo_atuacao: form.ramo_atuacao.trim(),
        cidade_atuacao: form.cidade_atuacao.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        instagram: form.instagram.trim(),
        aceite_termos: true,
        aceite_termos_em: new Date().toISOString(),
      })
      .select("id, nome, pagamento_confirmado")
      .single();
    setSubmitting(false);
    if (error || !data) {
      toast({ title: "Erro ao enviar inscrição", description: error?.message ?? "Tente novamente.", variant: "destructive" });
      return;
    }
    setInscricao(data as Inscricao);
    toast({ title: "Inscrição recebida!", description: "Prossiga com o pagamento para confirmar sua vaga." });
  };

  const handleCopiarPix = async () => {
    try {
      await navigator.clipboard.writeText(LINK_CHAVE_PIX);
      toast({ title: "Chave Pix copiada!" });
    } catch {
      toast({ title: "Não foi possível copiar", description: "Copie manualmente a chave Pix.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A131E", color: "#F5EFE1" }}>
      {/* Nav */}
      <div className="container mx-auto px-6 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity" style={{ color: "#B99657" }}>
          <ArrowLeft className="w-4 h-4" /> Voltar ao site
        </Link>
      </div>

      {/* HERO */}
      <section className="container mx-auto px-6 pt-16 pb-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.04), transparent), linear-gradient(180deg, #0A131E 0%, #0D1826 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            className="mb-8 px-4 py-1.5 text-xs tracking-[0.2em] uppercase border"
            style={{ backgroundColor: "transparent", color: "#B99657", borderColor: "#B99657" }}
          >
            Edição Especial · 26 de Agosto
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-8">
            A mesa onde história, estratégia e negócio{" "}
            <em className="italic" style={{ color: "#B99657" }}>
              se encontram
            </em>
          </h1>
          <p className="text-base md:text-lg leading-6 opacity-85 mb-10 max-w-2xl mx-auto">
            Gravação ao vivo do Conversas de Alto Valor com Ricardo Rizzo Campos, diante de um grupo seleto de empresários — com rodadas de pitch de negócios provocadas ao vivo.
          </p>

          <div className="h-px w-24 mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, #B99657, transparent)" }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {heroInfo.map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="text-center">
                <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: "#B99657" }} />
                <div className="text-[0.7rem] tracking-[0.25em] uppercase opacity-60 mb-2">{label}</div>
                <div className="font-display text-lg md:text-xl" style={{ color: "#F5EFE1" }}>{value}</div>
                <div className="font-display text-sm md:text-base opacity-70 mt-1">{sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-sm opacity-70">Apresentação: Cacá Lima</div>
        </div>
      </section>

      {/* O QUE É ESTA NOITE */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.05), transparent), linear-gradient(180deg, #070E16 0%, #0A131E 100%)" }}>
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
            O Evento
          </div>
          <h2 className="font-display text-3xl md:text-4xl mb-10">
            Não será audiência de volume. <span className="italic" style={{ color: "#B99657" }}>Será audiência de contexto.</span>
          </h2>
          <div className="space-y-3 text-[0.9rem] md:text-base leading-6 opacity-90 max-w-2xl mx-auto">
            <p>Existe um tipo de encontro que não se compra por impressão: o que coloca uma sala de decisores diante de uma das trajetórias mais sólidas do empreendedorismo gaúcho.</p>
            <p>Ao longo de duas horas, a conversa com o entrevistado é gravada ao vivo — origem, travessia e gestão — e dá lugar a um bloco de pitch de negócios induzido: 30 segundos para convidados, 45 para a cota Apoio, 60 para a Parceira e 90 para a Master se apresentarem à sala e ao entrevistado.</p>
            <p>O resultado é um episódio completo, uma biblioteca de cortes para as redes e uma noite de conexões reais. O que se conta uma vez vira lembrança. O que se registra vira referência.</p>
          </div>
        </div>
      </section>

      {/* O CONVIDADO */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.04), transparent), linear-gradient(180deg, #0A131E 0%, #0D1826 100%)" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              O Convidado
            </div>
            <h2 className="font-display text-3xl md:text-4xl">
              Ricardo <span className="italic" style={{ color: "#B99657" }}>Rizzo Campos</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-center">
            <div className="flex justify-center">
              <div
                className="rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: "#B99657", width: "200px", height: "200px" }}
              >
                <img
                  src={fotoRicardoRizzo}
                  alt="Ricardo Rizzo Campos, convidado do Conversas de Alto Valor"
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
            </div>
            <p className="text-[0.9rem] md:text-base leading-6 opacity-90 text-left">
              Formado em Marketing e Administração pela UFRGS e Master Trainer em PNL por instituições dos Estados Unidos e da América do Sul, Ricardo treinou diretamente com nomes como Richard Bandler, Daniel Goleman e Philip Kotler. Ao longo de mais de 25 anos dirigiu a Êxitus Publicidade, agência historicamente ligada à Companhia Zaffari, e hoje comanda quatro empresas — RICA Comunicação & Marketing, RICA Treinamento Empresarial de Excelência, Grandes Ideias Agência Digital e E+Vendas Marketing. Há 15 anos leva suas palestras e workshops a instituições como SEBRAE, ADVB-RS, SENAC e RBS, sendo reconhecido pelos alunos pela empatia, bom humor e ética.
            </p>
          </div>
        </div>
      </section>

      {/* A NOITE EM UM RELANCE */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.05), transparent), linear-gradient(180deg, #070E16 0%, #0A131E 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              A Noite em um Relance
            </div>
            <h2 className="font-display text-3xl md:text-4xl">Duas horas, desenhadas para render conversa.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relance.map(({ title, value, legenda }, i) => (
              <Card
                key={title}
                className="border text-center transition-all hover:-translate-y-1"
                style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
              >
                <CardContent className="p-6">
                  <div className="text-[0.65rem] tracking-[0.3em] uppercase mb-3" style={{ color: "#B99657" }}>
                    {title}
                  </div>
                  <div
                    className="font-display text-xl md:text-2xl mb-2"
                    style={{ color: i % 2 === 0 ? "#B99657" : "#F5EFE1" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs opacity-60 leading-snug">{legenda}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROTEIRO DA NOITE */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.04), transparent), linear-gradient(180deg, #0A131E 0%, #0D1826 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              Como as duas horas se desenham
            </div>
            <h2 className="font-display text-3xl md:text-4xl">Roteiro da noite.</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-0 top-2 bottom-2 w-px" style={{ backgroundColor: "rgba(185,150,87,0.25)" }} />
            <div className="space-y-10 pl-8">
              {roteiro.map(({ hora, titulo, desc }) => (
                <div key={hora} className="relative">
                  <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    <div className="font-display text-xl md:w-20" style={{ color: "#B99657" }}>
                      {hora}
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-1">{titulo}</h3>
                      <p className="text-sm opacity-75">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* O QUE A SALA VIVE */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.05), transparent), linear-gradient(180deg, #070E16 0%, #0A131E 100%)" }}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="border transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
            >
              <CardContent className="p-8">
                <h3 className="font-display text-2xl mb-4">Dois blocos de entrevista</h3>
                <p className="opacity-80 leading-6 text-sm">
                  Origem e travessia no primeiro; gestão, longevidade e legado no segundo. Conteúdo que vira episódio e biblioteca de cortes.
                </p>
              </CardContent>
            </Card>
            <Card
              className="border transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
            >
              <CardContent className="p-8">
                <h3 className="font-display text-2xl mb-4">Um bloco de pitch</h3>
                <p className="opacity-80 leading-6 text-sm">
                  Convidados terão 30 segundos, Apoio 45, Parceira 60 e Master 90 — provocados pela apresentadora para apresentarem e fecharem negócios em frente às câmeras.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ONDE A CONVERSA CHEGA */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.04), transparent), linear-gradient(180deg, #0A131E 0%, #0D1826 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              Onde a conversa chega
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Uma noite de gravação. Meses de circulação.</h2>
            <p className="text-sm md:text-base leading-6 opacity-90">
              O episódio é exibido pela rede RSPlay — ecossistema multiplataforma com público predominante das classes A e B: decisores, empresários e investidores.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 max-w-5xl mx-auto mb-10">
            {numeros.map(({ valor, legenda }) => {
              const { num, suf } = formatMetrica(valor);
              return (
                <div key={legenda} className="text-center">
                  <div className="font-display mb-3" style={{ color: "#B99657" }}>
                    <span className="text-4xl md:text-5xl">{num}</span>
                    {suf && <span className="text-xl md:text-2xl opacity-80">{suf}</span>}
                  </div>
                  <div className="text-[0.7rem] uppercase tracking-[0.15em] opacity-60 leading-snug">{legenda}</div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs opacity-50 max-w-3xl mx-auto">
            Fonte: mídia kit RSPlay 2026 — métricas da rede em que o programa é exibido.
          </p>
        </div>
      </section>

      {/* PATROCÍNIO E APOIO */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.05), transparent), linear-gradient(180deg, #070E16 0%, #0A131E 100%)" }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              Patrocínio & Apoio
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-4">E sua marca ainda pode ser destaque nesta noite.</h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              Três cotas, com contrapartidas escalonadas e exclusividade de segmento — apenas uma marca por categoria.
            </p>
          </div>

          {/* Cards de cotas — hierarquia visual e escassez */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cotas.map((cota) => {
              const isEsgotada = cota.status === "esgotada";
              const isDestaque = cota.destaque;
              return (
                <div
                  key={cota.nome}
                  className={`relative rounded-lg border p-6 md:p-8 transition-all ${
                    isEsgotada ? "opacity-70" : "hover:-translate-y-1"
                  } ${isDestaque ? "md:-translate-y-2 md:scale-[1.02]" : ""}`}
                  style={{
                    backgroundColor: isDestaque ? "#12203324" : "#0F1B2A",
                    borderColor: isDestaque ? "#B99657" : "rgba(185,150,87,0.25)",
                    borderWidth: isDestaque ? 2 : 1,
                    boxShadow: isDestaque ? "0 0 40px rgba(185,150,87,0.15)" : "none",
                  }}
                >
                  {/* Badge de status */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="text-[0.65rem] tracking-[0.25em] uppercase px-3 py-1 rounded-full border whitespace-nowrap"
                      style={{
                        backgroundColor:
                          cota.status === "esgotada"
                            ? "#3a1414"
                            : cota.status === "quase"
                            ? "#B99657"
                            : "#0A131E",
                        color:
                          cota.status === "esgotada"
                            ? "#ff8a8a"
                            : cota.status === "quase"
                            ? "#0A131E"
                            : "#B99657",
                        borderColor:
                          cota.status === "esgotada"
                            ? "#8b3a3a"
                            : cota.status === "quase"
                            ? "#B99657"
                            : "rgba(185,150,87,0.4)",
                      }}
                    >
                      {cota.statusLabel}
                    </span>
                  </div>

                  <div className="text-center mb-6 pt-2">
                    <div className="text-[0.7rem] tracking-[0.25em] uppercase mb-2 opacity-70" style={{ color: "#B99657" }}>
                      Cota
                    </div>
                    <div className="font-display text-3xl mb-1">{cota.nome}</div>
                    <div className="text-xs opacity-60">{cota.disponibilidade}</div>
                  </div>

                  <div className="text-center mb-8">
                    <div
                      className={`font-display text-3xl md:text-4xl ${isEsgotada ? "line-through opacity-50" : ""}`}
                      style={{ color: "#B99657" }}
                    >
                      {cota.investimento}
                    </div>
                    <div className="text-xs opacity-60 mt-1">{cota.scarcity}</div>
                  </div>

                  <Button
                    asChild={!isEsgotada}
                    disabled={isEsgotada}
                    className="w-full"
                    style={
                      isEsgotada
                        ? {
                            backgroundColor: "transparent",
                            color: "rgba(245,239,225,0.4)",
                            border: "1px solid rgba(185,150,87,0.2)",
                            textDecoration: "line-through",
                            cursor: "not-allowed",
                          }
                        : { backgroundColor: "#B99657", color: "#0A131E" }
                    }
                  >
                    {isEsgotada ? <span>Esgotado</span> : <a href={MAILTO}>Reservar esta cota</a>}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Tabela detalhada — mantida como referência completa */}
          <div
            className="rounded-lg border p-6 md:p-8"
            style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
          >
            <div className="text-xs tracking-[0.25em] uppercase mb-6 text-center opacity-70" style={{ color: "#B99657" }}>
              Comparativo de contrapartidas
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: "rgba(185,150,87,0.2)" }}>
                    <TableHead style={{ color: "#B99657" }}>Contrapartida</TableHead>
                    <TableHead style={{ color: "#B99657" }}>
                      Master
                      <br />
                      <span className="opacity-70">(Exclusiva por segmento)</span>
                    </TableHead>
                    <TableHead style={{ color: "#B99657" }}>
                      Parceira
                    </TableHead>
                    <TableHead style={{ color: "#B99657" }}>
                      Apoio
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tabelaCotas.map((row, idx) => (
                    <TableRow key={idx} style={{ borderColor: "rgba(185,150,87,0.1)" }}>
                      {row.map((cell, cidx) => (
                        <TableCell
                          key={cidx}
                          style={{ color: "#F5EFE1" }}
                          className={cidx === 0 ? "font-medium min-w-[180px]" : "min-w-[140px]"}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="text-sm opacity-70 mt-6 text-center">
              Confirmação com pelo menos 10 dias de antecedência garante a aplicação da marca no cenário, nos cortes e no material de convite.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="default"
                style={{ backgroundColor: "#B99657", color: "#0A131E" }}
              >
                <a href={MAILTO}>
                  <Mail className="w-4 h-4 mr-2" />
                  Falar sobre patrocínio
                </a>
              </Button>
              <a
                href={WHATSAPP_GILBERTO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: "#B99657" }}
              >
                <MessageCircle className="w-4 h-4" />
                Gilberto Macieira, Diretor Comercial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PATROCINADORES CONFIRMADOS */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.04), transparent), linear-gradient(180deg, #0A131E 0%, #0D1826 100%)" }}>
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "#B99657" }}>
            Patrocinadores e Apoiadores Confirmados
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-14">
            Marcas que já garantiram <span className="italic" style={{ color: "#B99657" }}>seu lugar</span>.
          </h2>

          {/* Cota Master — destaque maior */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {patrocinadores
              .filter((p) => p.cota === "Master")
              .map((p) => (
                <div key={p.nome} className="text-center">
                  <div
                    className="rounded-xl p-3 flex items-center justify-center"
                    style={{ backgroundColor: "#FFFFFF", width: "320px", height: "100px" }}
                  >
                    <img src={p.logo} alt={`Logo ${p.nome}`} className="w-full h-full object-contain" />
                  </div>
                  <div className="text-[0.65rem] uppercase tracking-wider mt-2 opacity-60">Cota Master</div>
                </div>
              ))}
          </div>

          {/* Demais cotas — Parceira e Apoio, em tamanho menor */}
          {patrocinadores.some((p) => p.cota !== "Master") && (
            <div className="flex flex-wrap justify-center gap-4">
              {patrocinadores
                .filter((p) => p.cota !== "Master")
                .map((p) => (
                  <div key={p.nome} className="text-center">
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: "#FFFFFF",
                        width: "160px",
                        height: "160px",
                        padding: `${p.padding ?? 12}px`,
                      }}
                    >
                      <img src={p.logo} alt={`Logo ${p.nome}`} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="text-[0.6rem] uppercase tracking-wider mt-2 opacity-50">Cota {p.cota}</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* INSCRIÇÃO / ADESÃO */}
      <section className="py-24" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(185,150,87,0.05), transparent), linear-gradient(180deg, #070E16 0%, #0A131E 100%)" }}>
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              Adesão ao evento
            </div>
            <h2 className="font-display text-2xl md:text-3xl mb-4">Garanta sua cadeira na sala.</h2>
            <p className="opacity-90 max-w-xl mx-auto text-sm md:text-base leading-6">
              Esta não é uma noite para todos — é para quem está pronto para fazer a diferença. Um encontro único e exclusivo, com vagas limitadas a um grupo seleto de empresários.
            </p>
            <p className="opacity-70 max-w-xl mx-auto mt-2 text-xs md:text-sm leading-6">
              Conexões reais, num ambiente curado a dedo. Preencha seus dados para reservar sua participação — a vaga é confirmada após o pagamento.
            </p>

            {/* Lotes — visível já antes de preencher o formulário */}
            <div className="max-w-md mx-auto mt-6 space-y-2">
              {LOTES.map((l) => {
                const encerrado = l !== loteAtual && new Date() > l.fim;
                const ativo = l === loteAtual;
                return (
                  <div
                    key={l.nome}
                    className={`flex items-center justify-between text-sm rounded-md border px-4 py-2 ${
                      encerrado ? "opacity-40" : ""
                    }`}
                    style={{
                      borderColor: ativo ? "#B99657" : "rgba(185,150,87,0.2)",
                      backgroundColor: ativo ? "rgba(185,150,87,0.08)" : "transparent",
                    }}
                  >
                    <span className={encerrado ? "line-through" : ""}>
                      {l.nome} · {l.ate}
                      {ativo && (
                        <span className="ml-2 text-[0.65rem] uppercase tracking-wider" style={{ color: "#B99657" }}>
                          vigente
                        </span>
                      )}
                    </span>
                    <span className={`font-display ${encerrado ? "line-through" : ""}`} style={{ color: ativo ? "#B99657" : "inherit" }}>
                      {l.valorTotal}
                    </span>
                  </div>
                );
              })}
              <p className="text-[0.7rem] opacity-50 text-center pt-1">
                Valores à vista com 25% de desconto no lote vigente ({loteAtual.valorAvista}, em 1x).
              </p>
            </div>
          </div>

          <div
            className="rounded-lg border p-6 md:p-10"
            style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.25)" }}
          >
            {!inscricao ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <Label htmlFor="nome" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      Nome completo
                    </Label>
                    <Input
                      id="nome"
                      required
                      value={form.nome}
                      onChange={setField("nome")}
                      maxLength={120}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      CPF
                    </Label>
                    <Input
                      id="cpf"
                      required
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      value={form.cpf}
                      onChange={setField("cpf")}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="empresa" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      Empresa
                    </Label>
                    <Input
                      id="empresa"
                      required
                      value={form.empresa}
                      onChange={setField("empresa")}
                      maxLength={120}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cnpj" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      CNPJ <span className="opacity-50 font-normal">(opcional)</span>
                    </Label>
                    <Input
                      id="cnpj"
                      value={form.cnpj}
                      onChange={setField("cnpj")}
                      placeholder="00.000.000/0000-00"
                      inputMode="numeric"
                      maxLength={18}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ramo" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      Ramo de atuação
                    </Label>
                    <Input
                      id="ramo"
                      required
                      value={form.ramo_atuacao}
                      onChange={setField("ramo_atuacao")}
                      maxLength={120}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cidade" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      Cidade de atuação
                    </Label>
                    <Input
                      id="cidade"
                      required
                      value={form.cidade_atuacao}
                      onChange={setField("cidade_atuacao")}
                      maxLength={120}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={setField("email")}
                      maxLength={160}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      required
                      inputMode="tel"
                      placeholder="+55 51 90000-0000"
                      value={form.telefone}
                      onChange={setField("telefone")}
                      maxLength={30}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram" className="text-sm mb-2 block" style={{ color: "#F5EFE1" }}>
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      required
                      placeholder="@seuinstagram"
                      value={form.instagram}
                      onChange={setField("instagram")}
                      maxLength={60}
                      className="bg-transparent border text-[#F5EFE1]"
                      style={{ borderColor: "rgba(185,150,87,0.3)" }}
                    />
                  </div>
                </div>

                <div
                  className="rounded-md border p-4 flex gap-3 items-start"
                  style={{ borderColor: "rgba(185,150,87,0.25)", backgroundColor: "rgba(185,150,87,0.05)" }}
                >
                  <input
                    type="checkbox"
                    id="aceite-termos"
                    checked={aceiteTermos}
                    onChange={(e) => setAceiteTermos(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#B99657]"
                  />
                  <label htmlFor="aceite-termos" className="text-xs leading-5 opacity-80 cursor-pointer">
                    Ao me inscrever, declaro estar ciente de que este evento envolve gravação e uso comercial de imagem, e autorizo o uso da minha imagem e voz captadas durante "Uma Noite de Conversas de Alto Valor", de forma gratuita e por prazo indeterminado, em quaisquer materiais e canais do Conversas de Alto Valor, comprometendo-me a firmar o Termo de Cessão de Uso de Imagem e Voz em relação a eventuais representantes que eu indicar para a sala ou para o pitch. Declaro ainda estar ciente de que meus dados pessoais serão utilizados exclusivamente para a organização e execução deste evento, conforme a Lei nº 13.709/2018 (LGPD), com adoção de medidas adequadas de segurança e confidencialidade.
                  </label>
                </div>
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto"
                    style={{ backgroundColor: "#B99657", color: "#0A131E" }}
                  >
                    {submitting ? "Enviando..." : "Enviar inscrição"}
                  </Button>
                  <p className="text-xs opacity-60 mt-4">
                    Seus dados são usados exclusivamente para a curadoria do evento.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <CheckCircle2 className="w-12 h-12 mx-auto" style={{ color: "#B99657" }} />
                <div>
                  <h3 className="font-display text-2xl mb-2">
                    Inscrição recebida, {inscricao.nome.split(" ")[0]}.
                  </h3>
                  <p className="opacity-80 max-w-xl mx-auto">
                    {inscricao.pagamento_confirmado
                      ? "Sua participação está confirmada."
                      : "Para confirmar sua vaga, prossiga com o pagamento. O acesso ao grupo oficial do evento é liberado após a confirmação."}
                  </p>
                </div>

                {!inscricao.pagamento_confirmado && (
                  <>
                    {/* 1. Lotes — mostra os 3, riscando os que já encerraram */}
                    <div className="max-w-md mx-auto space-y-2">
                      {LOTES.map((l) => {
                        const encerrado = l !== loteAtual && new Date() > l.fim;
                        const ativo = l === loteAtual;
                        return (
                          <div
                            key={l.nome}
                            className={`flex items-center justify-between text-sm rounded-md border px-4 py-2 ${
                              encerrado ? "opacity-40" : ""
                            }`}
                            style={{
                              borderColor: ativo ? "#B99657" : "rgba(185,150,87,0.2)",
                              backgroundColor: ativo ? "rgba(185,150,87,0.08)" : "transparent",
                            }}
                          >
                            <span className={encerrado ? "line-through" : ""}>
                              {l.nome} · {l.ate}
                            </span>
                            <span className={`font-display ${encerrado ? "line-through" : ""}`} style={{ color: ativo ? "#B99657" : "inherit" }}>
                              {l.valorTotal}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* 2. Valor do lote atual — bem visível */}
                    <div>
                      {promoAplicado === "NOITE25" ? (
                        <div className="flex items-baseline justify-center gap-3">
                          <span className="font-display text-2xl line-through opacity-40">{loteAtual.valorTotal}</span>
                          <span className="font-display text-5xl md:text-6xl" style={{ color: "#B99657" }}>{loteAtual.valorAvista}</span>
                        </div>
                      ) : (
                        <div className="font-display text-5xl md:text-6xl" style={{ color: "#B99657" }}>{loteAtual.valorTotal}</div>
                      )}
                      <div className="text-xs uppercase tracking-wider opacity-60 mt-2">
                        {promoAplicado === "NOITE25"
                          ? "à vista, em 1x"
                          : `à vista (${loteAtual.valorAvista}) ou em 2x`}
                      </div>
                    </div>

                    {/* 3. Código promocional — sempre editável, campo em destaque */}
                    <div className="max-w-sm mx-auto">
                      <div className="text-xs uppercase tracking-wider opacity-60 mb-2">Tem um código promocional?</div>
                      <div className="flex items-center gap-2">
                        <Input
                          value={promocode}
                          onChange={(e) => {
                            setPromocode(e.target.value);
                            if (promoAplicado) {
                              setPromoAplicado(null);
                              setPromoErro("");
                            }
                          }}
                          placeholder="Código promocional"
                          className="border"
                          style={{ backgroundColor: "#F5EFE1", color: "#0A131E", borderColor: "#B99657" }}
                        />
                        <Button
                          type="button"
                          onClick={handleAplicarPromocode}
                          disabled={!promocode.trim() || aplicandoPromo}
                          variant="outline"
                          style={{ borderColor: "#B99657", color: "#B99657", backgroundColor: "transparent" }}
                        >
                          {promoAplicado ? "Trocar" : "Aplicar"}
                        </Button>
                      </div>
                      {promoAplicado && (
                        <div className="text-sm mt-2" style={{ color: "#B99657" }}>
                          Código aplicado: {promoAplicado === "NOITE25" ? "25% de desconto" : "acesso gratuito"}
                        </div>
                      )}
                      {promoErro && (
                        <div className="text-xs mt-2" style={{ color: "#ff8a8a" }}>
                          {promoErro}
                        </div>
                      )}
                    </div>

                    {/* 4. Cartão e Pix — mesma proporção, lado a lado */}
                    <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center max-w-2xl mx-auto">
                      <a
                        href={promoAplicado === "NOITE25" ? loteAtual.linkAvista : loteAtual.link2x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        <div
                          className="h-full flex flex-col items-center justify-center gap-3 rounded-lg border p-6"
                          style={{ borderColor: "rgba(185,150,87,0.3)", backgroundColor: "#0A131E" }}
                        >
                          <div className="text-xs uppercase tracking-wider opacity-60">Cartão de crédito</div>
                          <Button size="lg" className="w-full" style={{ backgroundColor: "#B99657", color: "#0A131E" }}>
                            Fazer pagamento
                          </Button>
                        </div>
                      </a>

                      <div className="text-xs uppercase tracking-wider opacity-50 text-center py-1 sm:py-0">ou</div>

                      <div
                        className="h-full flex flex-col items-center justify-center gap-3 rounded-lg border p-6"
                        style={{ borderColor: "rgba(185,150,87,0.3)", backgroundColor: "#0A131E" }}
                      >
                        <div className="text-xs uppercase tracking-wider opacity-60">Pix</div>
                        <Button
                          type="button"
                          size="lg"
                          onClick={handleCopiarPix}
                          className="w-full"
                          variant="outline"
                          style={{ borderColor: "#B99657", color: "#B99657", backgroundColor: "transparent" }}
                        >
                          Copiar chave Pix
                        </Button>
                        <code className="text-[0.65rem] opacity-50 truncate w-full text-center" style={{ color: "#F5EFE1" }}>
                          {LINK_CHAVE_PIX}
                        </code>
                      </div>
                    </div>
                  </>
                )}

                {inscricao.pagamento_confirmado ? (
                  <div
                    className="rounded-md border p-5 mt-6 text-left"
                    style={{ borderColor: "rgba(185,150,87,0.4)", backgroundColor: "#0A131E" }}
                  >
                    <div className="flex items-center gap-2 mb-2" style={{ color: "#B99657" }}>
                      <Check className="w-4 h-4" />
                      <span className="text-xs tracking-[0.2em] uppercase">Pagamento confirmado</span>
                    </div>
                    <p className="text-sm opacity-85 mb-3">
                      Entre no grupo oficial do evento para receber informações de logística e networking.
                    </p>
                    <a href={LINK_GRUPO_WHATSAPP} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" style={{ borderColor: "#B99657", color: "#B99657", backgroundColor: "transparent" }}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Entrar no grupo do evento
                      </Button>
                    </a>
                    <div className="flex items-start gap-2 mt-4 pt-4 border-t" style={{ borderColor: "rgba(185,150,87,0.2)" }}>
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#B99657" }} />
                      <div className="text-sm opacity-75">
                        <span className="font-medium opacity-100">Estúdio C — RSPlay TV</span>
                        <br />
                        Rua da Conceição, 195/6º andar - Centro Histórico - Porto Alegre/RS
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-md border p-5 mt-6 text-left flex items-start gap-3"
                    style={{ borderColor: "rgba(185,150,87,0.2)", backgroundColor: "#0A131E" }}
                  >
                    <Lock className="w-4 h-4 mt-0.5 opacity-70" style={{ color: "#B99657" }} />
                    <div className="text-sm opacity-75">
                      O link do grupo oficial do evento será liberado automaticamente aqui após a confirmação do pagamento.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
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
            Edição Especial de 26/08/2026 · Estúdio C — RSPlay TV · Condições de patrocínio válidas por 10 dias a partir do envio.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatrocinioEvento;
