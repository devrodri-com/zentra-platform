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
  access: {
    banner: "Architecture preview — no live authentication or customer data",
    common: {
      eyebrow: "Fundación de identidad",
      home: "Inicio de ZENTRA",
      languageLabel: "Idioma de la vista previa de acceso",
      roleVocabulary: "Vocabulario de roles",
    },
    roles: {
      customer: {
        owner: "Propietario",
        admin: "Administrador",
        member: "Miembro",
        viewer: "Solo lectura",
      },
      staff: {
        businessOwner: "Propietario del negocio",
        operationsAdmin: "Administrador de operaciones",
        technicalAdmin: "Administrador técnico",
      },
    },
    login: {
      metadataTitle: "ZENTRA | Vista previa de acceso",
      title: "Acceso a la cuenta",
      body: "Este shell estático define un futuro punto de acceso. No acepta credenciales ni inicia una sesión.",
      emailLabel: "Correo electrónico",
      emailHint:
        "Campo de arquitectura de solo lectura. Nada ingresado aquí se procesa ni se transmite.",
      action: "Inicio de sesión no disponible",
      activationLink: "Ver la fundación de activación",
      homeLink: "Volver al inicio",
    },
    activation: {
      metadataTitle: "ZENTRA | Vista previa de activación",
      title: "Activación segura de cuenta",
      body: "En el futuro se requerirá un enlace seguro para activar el acceso. Este shell no inspecciona enlaces, consultas ni tokens.",
      state: "ACTIVATION_LINK_REQUIRED",
      stateDetail:
        "En esta vista previa de arquitectura no se envían correos de activación ni se procesa ninguna solicitud.",
      loginLink: "Ver la fundación de acceso",
      homeLink: "Volver al inicio",
    },
    portal: {
      metadataTitle: "ZENTRA | Vista previa del portal",
      title: "Fundación del portal de clientes",
      body: "Esta estructura describe futuras áreas de cuenta sin cargar información de cuentas, órdenes o suscripciones.",
      emptyState: "No hay una cuenta real conectada en esta vista previa de arquitectura.",
      sections: [
        "Órdenes",
        "Suscripción activa",
        "Aroma activo",
        "Próximo cobro",
        "Próximo envío",
        "Seguimiento",
        "Direcciones",
        "Soporte",
      ],
    },
    admin: {
      metadataTitle: "ZENTRA | Vista previa de administración",
      title: "Fundación de administración",
      body: "Esta estructura estática nombra futuras áreas operativas. No ofrece paneles, métricas ni controles administrativos.",
      emptyState: "No hay una fuente de datos conectada en esta vista previa de arquitectura.",
      sections: [
        "Órdenes",
        "Clientes",
        "Suscripciones",
        "Inventario",
        "Seguimiento",
        "Solicitudes de aprobación",
        "Productos",
        "Promociones",
      ],
    },
    accessDenied: {
      metadataTitle: "ZENTRA | Acceso no disponible",
      title: "El acceso no está disponible",
      body: "No hay un proveedor de identidad real conectado, por lo que esta vista previa de arquitectura no puede otorgar ni evaluar acceso real.",
      state: "ACCESS_NOT_AVAILABLE",
      homeLink: "Volver al inicio",
      loginLink: "Ver la fundación de acceso",
    },
  },
} as const satisfies Dictionary;

export default es;
