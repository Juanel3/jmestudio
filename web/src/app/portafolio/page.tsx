import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import { CardArrowIcon } from "./CardArrowIcon";
import { HomeHeader } from "../HomeHeader";
import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portafolio · JM Estudio",
  description:
    "Proyectos de diseño web, apps y sitios: casos reales con enfoque en UX/UI y resultados.",
};

export default function PortfolioPage() {
  return (
    <>
      <HomeHeader variant="portfolio" />

      <div className={styles.page}>
        <main className={styles.portfolioMain} id="contenido-principal">
          <div className={styles.pfShell}>
            <header className={styles.pageIntro}>
              <h1 className={styles.title}>Portafolio</h1>
              <p className={styles.lead}>
                Una selección de trabajos en web, apps y presencia digital. Entra
                en cada proyecto para ver el contexto y los detalles.
              </p>
            </header>

            <ul
              className={styles.grid}
              aria-label="Lista de proyectos del portafolio"
            >
              {PORTFOLIO_PROJECTS.map((project) => (
                <li key={project.slug} className={styles.item}>
                  <Link
                    href={`/portafolio/${project.slug}`}
                    className={styles.card}
                    aria-label={`Ver proyecto: ${project.title}`}
                  >
                    <div className={styles.media}>
                      <Image
                        src={project.cardImage ?? project.image}
                        alt={project.imageAlt}
                        fill
                        className={styles.img}
                        sizes="(max-width: 860px) 100vw, 33vw"
                      />
                      <div className={styles.overlay} aria-hidden="true" />
                      <div className={styles.blur} aria-hidden="true" />
                      <div className={styles.caption}>
                        <div className={styles.captionText}>
                          <h3 className={styles.cardTitle}>{project.title}</h3>
                          <p className={styles.cardDesc}>{project.summary}</p>
                        </div>
                        <span className={styles.viewBtn} aria-hidden="true">
                          <CardArrowIcon className={styles.viewBtnArrow} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
