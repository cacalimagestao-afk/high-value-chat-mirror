import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const TITLE = "Página não encontrada (404) — Conversas de Alto Valor";
const DESCRIPTION =
  "A página que você procura não existe ou foi movida. Volte para a home do Conversas de Alto Valor e explore os episódios.";

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const prevTitle = document.title;
    document.title = TITLE;
    setMeta("name", "description", DESCRIPTION);
    setMeta("property", "og:title", TITLE);
    setMeta("property", "og:description", DESCRIPTION);
    setMeta("name", "twitter:title", TITLE);
    setMeta("name", "twitter:description", DESCRIPTION);
    setMeta("name", "robots", "noindex, follow");

    return () => {
      document.title = prevTitle;
      const robots = document.head.querySelector('meta[name="robots"]');
      robots?.remove();
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Página não encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar para a home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
