import { useEffect } from "react";
import { ArrowLeft, Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { setSeo } from "@/lib/seo";

const Obrigada = () => {
  useEffect(() => {
    setSeo({
      title: "Obrigada pelo contato | Conversas de Alto Valor",
      description:
        "Recebemos seu contato. Conheça os canais oficiais do Conversas de Alto Valor.",
      canonical: "https://conversasdealtovalor.com.br/obrigada",
    });
  }, []);

  const contatos = [
    {
      icon: Instagram,
      label: "Instagram",
      value: "@conversasdealtovalor",
      href: "https://www.instagram.com/conversasdealtovalor",
      external: true,
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "comercial@conversasdealtovalor.com.br",
      href: "mailto:comercial@conversasdealtovalor.com.br",
    },
    {
      icon: MessageCircle,
      label: "Diretor Comercial",
      value: "(51) 99214-9336",
      href: "https://wa.me/5551992149336",
      external: true,
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden gradient-hero px-5 py-10 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 18%, hsl(var(--gold) / 0.2), transparent 28%), radial-gradient(circle at 8% 90%, hsl(var(--navy-light) / 0.45), transparent 35%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center">
        <div className="mb-8 text-center font-display text-lg sm:text-xl">
          Conversas <span className="italic text-gold">de Alto Valor</span>
        </div>

        <section className="rounded-2xl border border-gold/30 bg-card/75 p-7 text-center shadow-gold backdrop-blur-sm sm:p-12">
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <span className="font-display text-3xl text-gold" aria-hidden="true">✓</span>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Mensagem recebida
          </p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Obrigada pelo contato!
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Em breve, nossa equipe entrará em contato com você. Enquanto isso,
            acompanhe o programa e fale conosco pelos canais oficiais.
          </p>

          <div className="gold-divider my-9" />

          <div className="grid gap-3 text-left">
            {contatos.map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border border-border/70 bg-background/35 p-4 transition-smooth hover:border-gold/60 hover:bg-gold/5 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-smooth group-hover:bg-gold group-hover:text-navy-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="mt-1 block break-words font-medium group-hover:text-gold">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <Link
          to="/"
          className="mx-auto mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Conversas de Alto Valor · Histórias, propósitos e valores que inspiram pessoas e negócios.
        </p>
      </div>
    </main>
  );
};

export default Obrigada;
