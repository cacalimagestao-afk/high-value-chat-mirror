import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "5551992149336";

const ContactForm = () => {
  const [celular, setCelular] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const empresa = String(data.get("empresa") ?? "").trim();

    const mensagem = [
      "Olá, Gilberto! Vim pelo site do Conversas de Alto Valor e gostaria de receber mais informações.",
      "",
      `*Nome completo:* ${nome}`,
      `*Celular:* ${celular}`,
      `*E-mail:* ${email}`,
      `*Empresa:* ${empresa}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer",
    );

    window.location.assign("/obrigada");
  };

  const inputClassName =
    "mt-2 h-12 w-full rounded-lg border border-border bg-background/55 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/65 focus:border-gold focus:ring-2 focus:ring-gold/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gold/30 bg-card/65 p-6 text-left shadow-navy sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground">
          Nome completo
          <input
            className={inputClassName}
            type="text"
            name="nome"
            autoComplete="name"
            placeholder="Seu nome e sobrenome"
            required
          />
        </label>

        <label className="text-sm font-medium text-foreground">
          Celular
          <input
            className={inputClassName}
            type="tel"
            name="celular"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(51) 99999-9999"
            value={celular}
            onChange={(event) => setCelular(formatPhone(event.target.value))}
            minLength={14}
            required
          />
        </label>

        <label className="text-sm font-medium text-foreground">
          E-mail
          <input
            className={inputClassName}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            required
          />
        </label>

        <label className="text-sm font-medium text-foreground">
          Empresa
          <input
            className={inputClassName}
            type="text"
            name="empresa"
            autoComplete="organization"
            placeholder="Nome da sua empresa"
            required
          />
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full bg-gold font-semibold text-navy-dark shadow-gold hover:bg-gold-light"
      >
        Enviar pelo WhatsApp
        <Send className="ml-2 h-4 w-4" />
      </Button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Ao enviar, seus dados serão usados exclusivamente para dar continuidade ao seu atendimento.
        O WhatsApp abrirá com a mensagem pronta para você confirmar.
      </p>
    </form>
  );
};

export default ContactForm;
