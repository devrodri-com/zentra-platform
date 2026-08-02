import type { Dictionary } from "../types";

export const es = {
  metadata: {
    title: "ZENTRA | Diseño olfativo premium",
    description: "Diseño olfativo premium para espacios comerciales y residenciales.",
    ogLocale: "es_ES",
    ogDescription: "Diseño olfativo premium para espacios comerciales y residenciales.",
  },
  skipLink: "Saltar al contenido principal",
  brandAlt: "ZENTRA",
  menuLabel: "Menú",
  nav: {
    ariaLabel: "Navegación principal",
    mobileAriaLabel: "Navegación móvil",
    experience: "Experiencia",
    solutions: "Soluciones",
    industries: "Industrias",
    contact: "Contacto",
    consultation: "Solicitar asesoramiento",
  },
  hero: {
    eyebrow: "Diseño olfativo",
    tagline: "THE SCENT EXPERIENCE",
    valueProposition: "Diseño olfativo premium para espacios comerciales y residenciales.",
    primaryCta: "Solicitar asesoramiento",
    secondaryCta: "Conocé la experiencia",
  },
  experience: {
    eyebrow: "Experiencia",
    title: "Una experiencia aromática cuidada",
    body: "El aroma forma parte de cómo se recuerda un espacio. ZENTRA combina aromatización profesional, selección cuidada y una experiencia de marca premium.",
  },
  solutions: {
    eyebrow: "Soluciones",
    title: "Dirección olfativa para distintos espacios",
    intro: "Enfoques profesionales, residenciales y personalizados para el aroma.",
    items: [
      {
        title: "Espacios profesionales",
        description:
          "Una dirección olfativa considerada para el carácter y el uso cotidiano de espacios profesionales.",
      },
      {
        title: "Espacios residenciales",
        description:
          "Un enfoque cuidado del aroma para hogares y entornos residenciales compartidos.",
      },
      {
        title: "Proyectos aromáticos personalizados",
        description:
          "Un punto de partida personalizado para proyectos aromáticos desarrollados mediante asesoramiento.",
        cta: "Solicitar asesoramiento",
      },
    ],
  },
  industries: {
    eyebrow: "Industrias",
    title: "Espacios comerciales en foco",
    intro: "El foco principal de ZENTRA es la experiencia aromática B2B en estos entornos.",
    items: ["Hoteles", "Oficinas", "Fitness y bienestar", "Clínicas", "Restaurantes", "Retail"],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Diseñemos la experiencia aromática de tu espacio.",
    body: "Contanos sobre tu proyecto.",
    cta: "Contactar a ZENTRA",
  },
  footer: {
    tagline: "THE SCENT EXPERIENCE",
    contactLabel: "Contactar a ZENTRA",
    languageLabel: "Idioma",
    backToTop: "Volver arriba",
  },
  notFound: {
    eyebrow: "404",
    title: "Página no encontrada",
    body: "La página que buscás no está disponible.",
    cta: "Volver al inicio",
  },
} as const satisfies Dictionary;

export default es;
