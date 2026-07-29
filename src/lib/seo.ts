/**
 * Utilitário central de SEO/meta tags para uma SPA (Vite + React Router).
 *
 * Por que isso existe: numa SPA, a navegação entre rotas NÃO recarrega a página,
 * então as tags <title>, <meta name="description">, og:*, twitter:* e o link
 * canonical continuam as mesmas do index.html a menos que alguém as atualize
 * manualmente a cada troca de rota. Esta função garante que cada página defina
 * (e "limpe") suas próprias tags ao ser montada.
 *
 * Uso (dentro de um useEffect, com [] como dependência):
 *   useEffect(() => {
 *     setSeo({
 *       title: "Título da página — Marca",
 *       description: "Descrição de até ~155 caracteres.",
 *       path: "/evento26-08",
 *       image: "https://.../imagem-1200x630.jpg",
 *     });
 *   }, []);
 */

const SITE_URL = "https://conversasdealtovalor.com.br";
const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1d7049bc-4428-48f6-80f0-720a02cb0094";

interface SeoOptions {
  title: string;
  description: string;
  /** Caminho relativo, ex: "/" ou "/evento26-08" */
  path: string;
  image?: string;
  /** Tipo Open Graph. "website" para páginas normais, "event" não é um tipo OG válido — use "website". */
  type?: "website" | "article";
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function setSeo({ title, description, path, image = DEFAULT_IMAGE, type = "website" }: SeoOptions) {
  const url = `${SITE_URL}${path}`;

  document.title = title;
  setMetaByName("description", description);
  setCanonical(url);

  setMetaByProperty("og:type", type);
  setMetaByProperty("og:url", url);
  setMetaByProperty("og:title", title);
  setMetaByProperty("og:description", description);
  setMetaByProperty("og:image", image);

  setMetaByName("twitter:title", title);
  setMetaByName("twitter:description", description);
  setMetaByName("twitter:image", image);
}

/**
 * Injeta (ou substitui) um bloco JSON-LD de dados estruturados identificado por um id.
 * Use um id único por página (ex: "ld-event") para que trocar de rota substitua
 * o bloco em vez de acumular vários.
 */
export function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}
