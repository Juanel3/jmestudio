import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./ContactForm";
import { HomeHeader } from "./HomeHeader";
import { CardArrowIcon } from "./portafolio/CardArrowIcon";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeHeader />

      <main className={styles.main}>
        <section id="inicio" className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src="/inicio.jpg"
            alt=""
            fill
            priority
            className={styles.heroBg}
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Impulsamos tu negocio al <br />
            siguiente nivel.
          </h1>
          <p className={styles.subtitle}>
            Diseñamos páginas web, apps y sistemas con diseño UX/UI profesional.
          </p>

          <div className={styles.actions}>
            <a className={styles.primaryBtn} href="#contacto">
              Contáctanos
            </a>
            <a className={styles.ghostBtn} href="#portafolio">
              Ver proyectos
            </a>
          </div>
        </div>
        </section>

        <section
          id="nosotros"
          className={`${styles.section} ${styles.sectionLight} ${styles.sectionNosotros}`}
        >
          <div className={styles.sectionInner}>
            <h2 className={styles.nosTitle}>Sobre nosotros</h2>

            <div className={styles.nosGrid}>
              <div className={styles.nosText}>
                <p>
                  Somos una agencia de diseño web que ayuda a emprendedores y
                  empresas a tener una presencia profesional en internet.
                  Creamos páginas web modernas, rápidas y enfocadas en generar
                  confianza y atraer clientes.
                </p>
                <p>
                  Trabajamos cada proyecto de forma personalizada, entendiendo
                  las necesidades de cada negocio para crear una página web que
                  realmente ayude a cumplir sus objetivos.
                </p>
              </div>

              <div className={styles.nosMedia}>
                <div className={styles.nosMediaShadow} aria-hidden="true" />
                <div className={styles.nosMediaFrame}>
                  <Image
                    src="/seccion.jpg"
                    alt="Equipo trabajando"
                    width={720}
                    height={480}
                    className={styles.nosImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          className={`${styles.section} ${styles.sectionBlue}`}
        >
          <div className={styles.sectionInner}>
            <h2 className={styles.servicesTitle}>Servicios</h2>

            <p className={styles.servicesNote}>
              Diseño web, apps y sistemas, y rediseño de sitios: UX/UI claro,
              imagen profesional y resultados para tu negocio.
            </p>

            <div className={styles.servicesGrid}>
              <article className={styles.serviceCard}>
                <div className={styles.serviceIcon} aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V15.5C20 16.33 19.33 17 18.5 17H5.5C4.67 17 4 16.33 4 15.5V5.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 20H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 17V20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className={styles.serviceH3}>Diseño web</h3>
                <p className={styles.serviceP}>
                  Diseñamos páginas web modernas, atractivas y fáciles de usar,
                  enfocadas en ofrecer una excelente experiencia al usuario y en
                  transmitir profesionalismo para tu negocio.
                </p>
              </article>

              <article className={styles.serviceCard}>
                <div className={styles.serviceIcon} aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="7"
                      y="3.5"
                      width="10"
                      height="17"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M11 18.5H13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className={styles.serviceH3}>Diseño de apps y sistemas</h3>
                <p className={styles.serviceP}>
                  Diseñamos interfaces y prototipos para aplicaciones móviles y
                  sistemas, enfocándonos en la experiencia del usuario, la
                  estructura del producto y el diseño visual profesional.
                </p>
              </article>

              <article className={styles.serviceCard}>
                <div className={styles.serviceIcon} aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19l-7 2 2-7L16.5 6.5a2.12 2.12 0 113 3L12 19Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 13l6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className={styles.serviceH3}>Rediseño de páginas web</h3>
                <p className={styles.serviceP}>
                  Si tu página web ya existe pero se ve antigua o no genera
                  resultados, rediseñamos tu sitio para mejorar su imagen,
                  experiencia de usuario y rendimiento.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="portafolio"
          className={styles.sectionPortfolio}
          aria-labelledby="portafolio-title"
        >
          <div className={styles.sectionInner}>
            <h2 id="portafolio-title" className={styles.portfolioTitle}>
              Portafolio
            </h2>
            <p className={styles.portfolioSubtitle}>
              Nuestro trabajo habla por nosotros.
            </p>

            <div className={styles.portfolioGrid}>
              {PORTFOLIO_PROJECTS.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portafolio/${project.slug}`}
                  className={styles.portfolioCard}
                  aria-label={`Ver proyecto: ${project.title}`}
                >
                  <div className={styles.portfolioMedia}>
                    <Image
                      src={project.cardImage ?? project.image}
                      alt={project.imageAlt}
                      fill
                      className={styles.portfolioImg}
                      sizes="(max-width: 860px) 100vw, 33vw"
                    />
                    <div className={styles.portfolioOverlay} aria-hidden="true" />
                    <div className={styles.portfolioBlur} aria-hidden="true" />
                    <div className={styles.portfolioCaption}>
                      <div className={styles.portfolioCaptionText}>
                        <h3 className={styles.portfolioH3}>{project.title}</h3>
                        <p className={styles.portfolioDesc}>{project.summary}</p>
                      </div>
                      <span
                        className={styles.portfolioViewBtn}
                        aria-hidden="true"
                      >
                        <CardArrowIcon className={styles.portfolioViewBtnArrow} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.portfolioCtaWrap}>
              <Link href="/portafolio" className={styles.portfolioCta}>
                Ver portafolio completo
              </Link>
            </div>
          </div>
        </section>

        <section id="contacto" className={styles.sectionContact} aria-labelledby="contacto-heading">
          <div className={styles.sectionInner}>
            <div className={styles.contactHeader}>
              <h2 id="contacto-heading" className={styles.contactTitle}>
                Contacto
              </h2>
              <p className={styles.contactLead}>
                ¿Listo para dar el siguiente paso? Envíanos un mensaje y te contestamos con propuestas
                acordes a lo que buscas.
              </p>
            </div>
            <div className={styles.contactGrid}>
              <div className={styles.contactImageCol}>
                <div className={styles.contactImageFrame}>
                  <Image
                    src="/contactano.jpg"
                    alt="Contáctanos"
                    width={560}
                    height={420}
                    className={styles.contactImg}
                    sizes="(max-width: 860px) 100vw, 42vw"
                  />
                </div>
              </div>
              <div className={styles.contactCol}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
