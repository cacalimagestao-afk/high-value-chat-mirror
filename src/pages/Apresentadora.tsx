import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setSeo } from "@/lib/seo";

// PLACEHOLDER: troque este arquivo por src/assets/apresentadora/caca-lima.jpg
// e atualize o import abaixo para usar a foto real.
const FOTO_APRESENTADORA_PLACEHOLDER =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1d7049bc-4428-48f6-80f0-720a02cb0094";

const LINK_MATERIA =
  "https://tvsplay.com.br/2026/08/10/caca-lima-e-o-sucesso-de-conversas-de-alto-valor-na-rsplay-tv/";

const Apresentadora = () => {
  useEffect(() => {
    setSeo({
      title: "Apresentadora — Cacá Lima | Conversas de Alto Valor",
      description:
        "Conheça Cacá Lima, apresentadora do Conversas de Alto Valor na RSPlay TV. Especialista em gestão de riscos e eventos, ela transforma histórias reais em conteúdo que inspira.",
      path: "/apresentadora",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV simplificada */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="font-display text-lg md:text-xl tracking-wide" aria-label="Conversas de Alto Valor — Voltar ao início">
            Conversas <span className="text-gold italic">de Alto Valor</span>
          </Link>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-gold">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao site
            </Link>
          </Button>
        </div>
      </header>

      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-[380px_1fr] gap-10 md:gap-16 items-start">
            {/* FOTO */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-navy border border-border/60 mx-auto md:mx-0 w-full max-w-sm">
              <img
                src={FOTO_APRESENTADORA_PLACEHOLDER}
                alt="Cacá Lima, apresentadora do Conversas de Alto Valor"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* TEXTO */}
            <div>
              <span className="uppercase tracking-[0.2em] text-xs text-gold font-semibold">
                Apresentadora
              </span>
              <h1 className="font-display text-3xl md:text-5xl mt-3 mb-6 text-navy-dark md:text-foreground">
                Cacá Lima
              </h1>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Cacá Lima é a apresentadora do <strong className="text-foreground">Conversas de Alto Valor</strong>,
                  programa de entrevistas da RSPlay TV no ar desde outubro de 2025. Especialista em
                  gestão de riscos e segurança em eventos, cerimonialista, mentora e ex-diretora da
                  Associação Brasileira de Eventos, ela construiu uma trajetória marcada por
                  planejamento, cuidado com pessoas e superação de grandes desafios pessoais.
                </p>
                <p>
                  À frente das câmeras, Cacá conduz entrevistas que vão além dos títulos e conquistas
                  dos convidados, buscando entender decisões, valores e legados. Essa forma de olhar
                  para as histórias — com profundidade, sensibilidade e verdade — deu ao programa uma
                  identidade própria dentro da programação da RSPlay TV.
                </p>
              </div>

              <div className="mt-8">
                <Button asChild className="bg-gold text-navy-dark hover:bg-gold-light font-semibold">
                  <a href={LINK_MATERIA} target="_blank" rel="noopener noreferrer">
                    Saiba mais
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Apresentadora;
