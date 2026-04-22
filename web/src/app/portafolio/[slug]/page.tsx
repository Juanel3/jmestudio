import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { PORTFOLIO_PROJECTS, getProjectBySlug } from "@/data/portfolio";
import { HomeHeader } from "@/app/HomeHeader";
import { CardArrowIcon } from "../CardArrowIcon";
import styles from "./page.module.css";
import type { Metadata } from "next";

const ProjectGalleryCarousel = dynamic(
  () => import("./ProjectGalleryCarousel"),
  { ssr: true }
);

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Proyecto no encontrado" };
  }
  return {
    title: `${project.title} · Portafolio`,
    description: project.summary,
  };
}

export default async function PortfolioProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <>
      <HomeHeader variant="portfolio" />

      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="project-heading">
          <div className={styles.heroMedia}>
            <Image
              src={project.image}
              alt=""
              fill
              className={styles.heroImg}
              sizes="100vw"
              priority
            />
            <div className={styles.heroScrim} aria-hidden="true" />
          </div>
          <div className={styles.heroInner}>
            <h1 id="project-heading" className={styles.heroTitle}>
              {project.title}
            </h1>
            <p className={styles.heroSummary}>{project.summary}</p>
          </div>
        </section>

        <article className={styles.article}>
          <div className={styles.articleShell}>
            <div className={styles.storyColumn}>
              <h2 className={styles.storyHeading}>Descripción</h2>
              <div className={styles.body}>
                {project.description.map((paragraph, i) => (
                  <p key={i} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside
              className={styles.metaPanel}
              aria-labelledby="project-details-heading"
            >
              <h2 id="project-details-heading" className={styles.metaPanelTitle}>
                Información
              </h2>
              <ul className={styles.metaList}>
                <li className={styles.metaItem}>
                  <span className={styles.metaLabel}>Nombre del proyecto</span>
                  <span className={styles.metaValue}>{project.projectName}</span>
                </li>
                <li className={styles.metaItem}>
                  <span className={styles.metaLabel}>Tipo</span>
                  <span className={styles.metaValue}>{project.projectType}</span>
                </li>
              </ul>
              {project.siteUrl ? (
                <div className={styles.siteBtnWrap}>
                  {project.siteUrl.startsWith("/") ? (
                    <Link href={project.siteUrl} className={styles.siteBtn}>
                      Ver sitio
                      <CardArrowIcon
                        className={styles.siteBtnArrow}
                        direction="right"
                      />
                    </Link>
                  ) : (
                    <a
                      href={project.siteUrl}
                      className={styles.siteBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver sitio
                      <CardArrowIcon
                        className={styles.siteBtnArrow}
                        direction="right"
                      />
                    </a>
                  )}
                </div>
              ) : null}
            </aside>
          </div>

          {project.gallery.length > 0 ? (
            <section
              className={styles.gallerySection}
              aria-labelledby="gallery-heading"
            >
              <h2 id="gallery-heading" className={styles.galleryHeading}>
                Imágenes
              </h2>
              <ProjectGalleryCarousel items={project.gallery} />
            </section>
          ) : null}
        </article>

        <section className={styles.ctaBand} aria-label="Siguiente paso">
          <p className={styles.ctaBandTitle}>¿Te gustaría algo parecido?</p>
          <div className={styles.ctaBandActions}>
            <Link href="/#contacto" className={styles.ctaPrimary}>
              Contáctanos
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
