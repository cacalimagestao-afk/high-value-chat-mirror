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

// Substituir pelos links reais quando disponíveis
const LINK_PAGAMENTO = "#";
const LINK_GRUPO_WHATSAPP = "#";

const WHATSAPP_GILBERTO = "https://wa.me/5551992149336";

const MAILTO = "mailto:caca@cacalimaoficial.com.br?subject=Patroc%C3%ADnio%20-%20Uma%20Noite%20de%20Conversas%20de%20Alto%20Valor";

const heroInfo = [
  { icon: Calendar, label: "Data", value: "26 · Ago · 2026 · 18h30 às 20h30" },
  { icon: MapPin, label: "Local", value: "Estúdio C — TV RSPlay · Canal 524 Claro" },
  { icon: Video, label: "Formato", value: "Gravação ao vivo + pitch induzido" },
];

const relance = [
  { title: "Data", value: "26 de agosto", legenda: "Quarta-feira, 2 horas" },
  { title: "Horário", value: "18h30 às 20h30", legenda: "Chegada sugerida às 18h" },
  { title: "Local", value: "Estúdio C", legenda: "TV RSPlay" },
  { title: "Entrevistado", value: "Empresário de destaque no RS", legenda: "Nome anunciado em breve" },
  { title: "Público", value: "30 empresários", legenda: "Curadoria — não plateia" },
  { title: "Diferencial", value: "Pitch induzido", legenda: "Negócios provocados ao vivo" },
];

const roteiro = [
  { hora: "18h30", titulo: "Abertura", desc: "Boas-vindas de Cacá Lima e a regra do jogo do networking" },
  { hora: "18h40", titulo: "Bloco 1 — Gravação", desc: "Entrevista com o convidado: origem e travessia de uma trajetória de décadas" },
  { hora: "19h05", titulo: "Pitch induzido — rodada 1", desc: "4 empresários, 90 segundos cada, provocados pelo host" },
  { hora: "19h20", titulo: "Bloco 2 — Gravação", desc: "Gestão, longevidade e legado" },
  { hora: "19h50", titulo: "Pitch induzido — rodada 2", desc: "Nova rodada de negócios ao vivo" },
  { hora: "20h10", titulo: "Encerramento & networking", desc: "Foto oficial, conexões e captação de imagens" },
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
  ["Naming da edição", "apresenta [Marca]", "—", "—"],
  ["Logo nos cortes / episódio", "Abertura + selo em todos os cortes", "Rodapé dos cortes", "Card de agradecimento"],
  ["Menção verbal do host", "Abertura + fechamento", "Única", "Coletiva"],
  ["Presença na sala", "2 cadeiras + pitch institucional", "1 cadeira", "1 cadeira"],
  ["Ativação física no estúdio", "Banner + foto oficial", "1 story de bastidores", "—"],
  ["Redes @conversasdealtovalor", "3 posts marcados", "1 story", "Card coletivo"],
  ["Relatório pós-evento", "Completo, com métricas", "Resumido", "—"],
  ["Investimento", "R$ 5.000", "R$ 3.000", "R$ 1.000"],
];

// Cards de cotas — derivados de tabelaCotas para preservar o conteúdo
const cotas = [
  {
    nome: "Master",
    disponibilidade: "Exclusiva · 1 marca",
    investimento: "R$ 5.000",
    status: "esgotada" as const,
    statusLabel: "Esgotado",
    scarcity: "Cota exclusiva já reservada",
    beneficios: tabelaCotas.slice(0, -1).map((row) => `${row[0]}: ${row[1]}`),
  },
  {
    nome: "Parceira",
    disponibilidade: "Até 2 marcas",
    investimento: "R$ 3.000",
    status: "quase" as const,
    statusLabel: "Últimas vagas",
    scarcity: "Restam poucas cotas — quase esgotando",
    destaque: true,
    beneficios: tabelaCotas.slice(0, -1).map((row) => `${row[0]}: ${row[2]}`),
  },
  {
    nome: "Apoio",
    disponibilidade: "Até 3 marcas",
    investimento: "R$ 1.000",
    status: "disponivel" as const,
    statusLabel: "Disponível",
    scarcity: "Vagas abertas",
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

type Inscricao = {
  id: string;
  nome: string;
  pagamento_confirmado: boolean;
};

const PatrocinioEvento = () => {
  useEffect(() => {
    document.title = "Uma Noite de Conversas de Alto Valor — Edição Especial · 26 de agosto";
    const desc = "Edição especial do Conversas de Alto Valor: gravação ao vivo com um empresário de destaque no Rio Grande do Sul, diante de 30 empresários selecionados. 26 de agosto, Estúdio C — TV RSPlay.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  // Estado do formulário de inscrição
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    empresa: "",
    ramo_atuacao: "",
    cidade_atuacao: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [inscricao, setInscricao] = useState<Inscricao | null>(null);

  const setField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = k === "cpf" ? maskCPF(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.empresa.trim() || !form.ramo_atuacao.trim() || !form.cidade_atuacao.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    if (!isValidCPFFormat(form.cpf)) {
      toast({ title: "CPF inválido", description: "Use o formato 000.000.000-00", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("inscricoes_evento")
      .insert({
        nome: form.nome.trim(),
        cpf: form.cpf,
        empresa: form.empresa.trim(),
        ramo_atuacao: form.ramo_atuacao.trim(),
        cidade_atuacao: form.cidade_atuacao.trim(),
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
            Edição Especial · 26 de Agosto
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl leading-tight mb-8">
            A mesa onde história, estratégia e negócio{" "}
            <em className="italic" style={{ color: "#B99657" }}>
              se encontram
            </em>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-85 mb-12 max-w-3xl mx-auto">
            Gravação ao vivo do Conversas de Alto Valor com um empresário de destaque no Rio Grande do Sul, diante de 30 empresários selecionados — com rodadas de pitch de negócios provocadas ao vivo.
          </p>

          <div className="h-px w-24 mx-auto mb-12" style={{ background: "linear-gradient(90deg, transparent, #B99657, transparent)" }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {heroInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="w-6 h-6 mx-auto mb-3" style={{ color: "#B99657" }} />
                <div className="text-[0.7rem] tracking-[0.25em] uppercase opacity-60 mb-2">{label}</div>
                <div className="font-display text-lg">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-sm opacity-70">Apresentação: Cacá Lima</div>
        </div>
      </section>

      {/* O QUE É ESTA NOITE */}
      <section className="py-24" style={{ backgroundColor: "#070E16" }}>
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
            O Evento
          </div>
          <h2 className="font-display text-3xl md:text-5xl mb-10">
            Não é audiência de volume. É audiência de contexto.
          </h2>
          <div className="space-y-6 text-lg leading-relaxed opacity-90 max-w-3xl mx-auto">
            <p>Existe um tipo de encontro que não se compra por impressão: o que coloca uma sala de decisores diante de uma das trajetórias mais sólidas do empreendedorismo gaúcho.</p>
            <p>Ao longo de duas horas, a conversa com o entrevistado é gravada ao vivo — origem, travessia e gestão — e intercalada com rodadas de pitch de negócios induzido: empresários com 90 segundos para se apresentar à sala e ao entrevistado.</p>
            <p>O resultado é um episódio completo, uma biblioteca de cortes para as redes e uma noite de conexões reais. O que se conta uma vez vira lembrança. O que se registra vira referência.</p>
          </div>
        </div>
      </section>

      {/* A NOITE EM UM RELANCE */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              A Noite em um Relance
            </div>
            <h2 className="font-display text-3xl md:text-5xl">Duas horas, desenhadas para render conversa.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relance.map(({ title, value, legenda }) => (
              <Card
                key={title}
                className="border text-center transition-all hover:-translate-y-1"
                style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
              >
                <CardContent className="p-6">
                  <div className="text-[0.7rem] tracking-[0.25em] uppercase mb-3" style={{ color: "#B99657" }}>
                    {title}
                  </div>
                  <div className="font-display text-xl mb-2">{value}</div>
                  <div className="text-sm opacity-70">{legenda}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROTEIRO DA NOITE */}
      <section className="py-24" style={{ backgroundColor: "#070E16" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              Como as duas horas se desenham
            </div>
            <h2 className="font-display text-3xl md:text-5xl">Roteiro da noite.</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-0 top-2 bottom-2 w-px" style={{ backgroundColor: "rgba(185,150,87,0.25)" }} />
            <div className="space-y-10 pl-8">
              {roteiro.map(({ hora, titulo, desc }) => (
                <div key={hora} className="relative">
                  <div
                    className="absolute -left-[9px] top-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#B99657" }}
                  />
                  <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    <div className="font-display text-lg md:w-20" style={{ color: "#B99657" }}>
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
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="border transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
            >
              <CardContent className="p-8">
                <h3 className="font-display text-2xl mb-4">Dois blocos de entrevista</h3>
                <p className="opacity-80 leading-relaxed">
                  Origem e travessia no primeiro; gestão, longevidade e legado no segundo. Conteúdo que vira episódio e biblioteca de cortes.
                </p>
              </CardContent>
            </Card>
            <Card
              className="border transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#0F1B2A", borderColor: "rgba(185,150,87,0.2)" }}
            >
              <CardContent className="p-8">
                <h3 className="font-display text-2xl mb-4">Duas rodadas de pitch</h3>
                <p className="opacity-80 leading-relaxed">
                  Oito vagas ao todo, 90 segundos cada, provocadas pela apresentadora. Negócio acontecendo na frente da câmera.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ONDE A CONVERSA CHEGA */}
      <section className="py-24" style={{ backgroundColor: "#070E16" }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              Onde a conversa chega
            </div>
            <h2 className="font-display text-3xl md:text-5xl mb-8">Uma noite de gravação. Meses de circulação.</h2>
            <p className="text-lg leading-relaxed opacity-90">
              O episódio é exibido pela rede RSPlay — ecossistema multiplataforma com público predominante das classes A e B: decisores, empresários e investidores.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-10">
            {numeros.map(({ valor, legenda }) => (
              <div key={legenda} className="text-center">
                <div className="font-display text-4xl md:text-5xl mb-2" style={{ color: "#B99657" }}>
                  {valor}
                </div>
                <div className="text-sm opacity-70 leading-snug">{legenda}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs opacity-50 max-w-3xl mx-auto">
            Fonte: mídia kit RSPlay 2026 — métricas da rede em que o programa é exibido.
          </p>
        </div>
      </section>

      {/* INSCRIÇÃO / ADESÃO */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#B99657" }}>
              Adesão ao evento
            </div>
            <h2 className="font-display text-3xl md:text-5xl mb-4">Garanta sua cadeira na sala.</h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              São apenas 30 empresários selecionados. Preencha seus dados para reservar sua participação — a vaga é confirmada após o pagamento.
            </p>
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
                    Para confirmar sua vaga, prossiga com o pagamento. O acesso ao grupo oficial do evento é liberado após a confirmação.
                  </p>
                </div>

                <a href={LINK_PAGAMENTO} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button size="lg" style={{ backgroundColor: "#B99657", color: "#0A131E" }}>
                    Fazer pagamento
                  </Button>
                </a>

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

      {/* PATROCÍNIO E APOIO */}
      <section className="py-24" style={{ backgroundColor: "#070E16" }}>
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

                  <div className="text-center mb-6">
                    <div
                      className={`font-display text-3xl ${isEsgotada ? "line-through opacity-50" : ""}`}
                      style={{ color: "#B99657" }}
                    >
                      {cota.investimento}
                    </div>
                    <div className="text-xs opacity-60 mt-1">{cota.scarcity}</div>
                  </div>

                  <ul className="space-y-2.5 mb-8 min-h-[280px]">
                    {cota.beneficios.map((b, i) => {
                      const [k, v] = b.split(/: (.+)/);
                      const isNegative = v?.trim() === "—";
                      return (
                        <li key={i} className={`flex items-start gap-2 text-sm ${isNegative ? "opacity-40" : ""}`}>
                          <Check
                            className="w-3.5 h-3.5 mt-1 flex-shrink-0"
                            style={{ color: isNegative ? "rgba(255,255,255,0.3)" : "#B99657" }}
                          />
                          <span>
                            <span className="opacity-75">{k}: </span>
                            <span className={isNegative ? "" : "font-medium"}>{v}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>

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
                      <span className="opacity-70">(Exclusiva · 1)</span>
                    </TableHead>
                    <TableHead style={{ color: "#B99657" }}>
                      Parceira
                      <br />
                      <span className="opacity-70">(Até 2)</span>
                    </TableHead>
                    <TableHead style={{ color: "#B99657" }}>
                      Apoio
                      <br />
                      <span className="opacity-70">(Até 3)</span>
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
            Edição Especial de 26/08/2026 · Estúdio C — TV RSPlay · Condições de patrocínio válidas por 10 dias a partir do envio.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatrocinioEvento;
