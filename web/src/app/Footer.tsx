import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} ${styles.footerInner}`}>
        <div className={styles.footerCol}>
          <Link
            href="/"
            className={styles.footerBrand}
            aria-label="JM Estudio, ir al inicio"
          >
            <span className={styles.footerLogoWrap}>
              <Image
                src="/negociolog.svg"
                alt=""
                width={108}
                height={61}
                className={styles.footerLogo}
                unoptimized
                aria-hidden
              />
            </span>
          </Link>
        </div>
        <div className={styles.footerCol}>
          <h3 className={styles.footerHeading}>Enlaces</h3>
          <nav className={styles.footerLinks} aria-label="Pie de página">
            <Link href="/#inicio">Inicio</Link>
            <Link href="/#nosotros">Sobre nosotros</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link href="/portafolio">Portafolio</Link>
            <Link href="/#contacto">Contacto</Link>
          </nav>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>
          © {year} JM Estudio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
