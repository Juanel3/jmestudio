export type GalleryImage = {
  src: string;
  alt: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  /** Nombre mostrado en la ficha (puede incluir subtítulo). */
  projectName: string;
  /** Tipo o categoría del trabajo. */
  projectType: string;
  /** URL del sitio en vivo: `https://…` (externo) o ruta `/…` (interna). Si no hay, no se muestra el botón. */
  siteUrl?: string;
  gallery: GalleryImage[];
  description: string[];
  image: string;
  imageAlt: string;
  /** Si existe, se usa en tarjetas del portafolio en lugar de `image` (p. ej. miniatura distinta del hero). */
  cardImage?: string;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: "clarity",
    title: "Clarity",
    summary:
      "App móvil para organizar mejor tu dinero y tomar el control de tus finanzas personales.",
    projectName: "Clarity",
    projectType: "App móvil · finanzas personales",
    gallery: [
      { src: "/clarit-foto.png", alt: "Capturas de la app Clarity" },
    ],
    description: [
      "Clarity es una app móvil orientada a las finanzas personales: ayuda a ver el panorama de ingresos y gastos, priorizar decisiones y sentir más control sobre el dinero día a día.",
      "Se trabajó la arquitectura de información, flujos cortos y pantallas clave para que registrar y consultar datos sea rápido, con un sistema visual coherente y fácil de extender.",
      "El resultado es una experiencia clara en cada paso: onboarding sencillo, lectura cómoda y acciones principales siempre a mano para organizar mejor tus finanzas.",
    ],
    image: "/app.png",
    imageAlt: "Proyecto Clarity",
    cardImage: "/app.png",
  },
  {
    slug: "jm-estudio",
    title: "JM Estudio",
    summary:
      "Página web moderna y funcional que muestre los servicios de una agencia.",
    projectName: "JM Estudio",
    projectType: "Sitio web · agencia de diseño web",
    siteUrl: "https://jm-estudio.vercel.app",
    gallery: [
      { src: "/estudio-foto.png", alt: "JM Estudio — captura 1" },
      { src: "/estudio-foto2.png", alt: "JM Estudio — captura 2" },
    ],
    description: [
      "Sitio web pensado para una agencia: comunicar servicios, propuesta de valor y confianza desde el primer scroll, con una presentación moderna y fácil de recorrer.",
      "Se definieron secciones claras para servicios, proceso de trabajo y contacto, con llamadas a la acción visibles y jerarquía de contenidos que guía al visitante.",
      "El enfoque fue funcionalidad y legibilidad: buen rendimiento, diseño responsive y una experiencia coherente en escritorio y móvil.",
    ],
    image: "/jmestudio.png",
    imageAlt: "Proyecto JM Estudio",
    cardImage: "/jmestudio.png",
  },
  {
    slug: "imprenta-alatorre",
    title: "Imprenta Alatorre",
    summary:
      "Rediseño web para mostrar los servicios que ofrece la empresa.",
    projectName: "Imprenta Alatorre — web",
    projectType: "Rediseño de sitio web corporativo",
    gallery: [
      { src: "/imprentaproyecto.png", alt: "Propuesta de inicio Imprenta Alatorre" },
      { src: "/proyectoimprent.png", alt: "Servicios en el sitio" },
    ],
    description: [
      "Rediseño del sitio web con el objetivo de presentar con claridad los servicios de la empresa: qué ofrecen, para quién y cómo solicitar información o cotización.",
      "Se organizó la información por líneas de servicio, tiempos y canales de contacto para que el visitante encuentre rápido lo que busca.",
      "El resultado es una presencia online alineada al negocio local: mensaje directo y rutas cortas para convertir visitas en consultas.",
    ],
    image: "/imprentaproyecto.png",
    imageAlt: "Imprenta Alatorre",
    cardImage: "/imprentai.png",
  },
];

export function getProjectBySlug(slug: string) {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}
