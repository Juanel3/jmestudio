"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./page.module.css";

const NAV_LINKS = [
  { hash: "#inicio", label: "Inicio" },
  { hash: "#nosotros", label: "Sobre nosotros" },
  { hash: "#servicios", label: "Servicios" },
  { hash: "#portafolio", label: "Portafolio" },
  { hash: "#contacto", label: "Contacto" },
] as const;

type HomeHeaderProps = {
  /** En otras rutas, enlaza a `/#sección` en la página principal. */
  variant?: "home" | "portfolio";
};

export function HomeHeader({ variant = "home" }: HomeHeaderProps) {
  const homePrefix = variant === "portfolio" ? "/" : "";
  const logoHref = variant === "portfolio" ? "/" : "#inicio";
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onViewport = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onViewport);
    return () => mq.removeEventListener("change", onViewport);
  }, []);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => firstLinkRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open, closeMenu]);

  return (
    <header className={styles.topBar}>
      <div className={styles.mobileBarWrap}>
        <div className={styles.mobileBar}>
          <a
            href={logoHref}
            className={styles.mobileBarLogo}
            onClick={closeMenu}
            aria-label="JM Estudio, inicio"
          >
            <Image
              src="/negociolog.svg"
              alt=""
              width={320}
              height={181}
              className={styles.mobileBarLogoImg}
              priority
              aria-hidden
            />
          </a>
          <button
            type="button"
            className={styles.mobileMenuBtn}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`${styles.mobileMenuIcon}${open ? ` ${styles.mobileMenuIconOpen}` : ""}`}
            >
              <span className={styles.mobileMenuLine} />
              <span className={styles.mobileMenuLine} />
              <span className={styles.mobileMenuLine} />
            </span>
          </button>
        </div>

        {open ? (
          <nav
            id={menuId}
            className={styles.mobileMenuPanel}
            aria-label="Navegación principal"
          >
            <ul className={styles.mobileMenuList}>
              {NAV_LINKS.map(({ hash, label }, i) => (
                <li key={hash}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`${homePrefix}${hash}`}
                    className={styles.mobileMenuLink}
                    onClick={closeMenu}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <nav className={styles.nav} aria-label="Navegación principal">
        <a
          href={logoHref}
          className={styles.navLogo}
          aria-label="JM Estudio, inicio"
        >
          <Image
            src="/negociolog.svg"
            alt=""
            width={200}
            height={114}
            className={styles.navLogoImg}
            priority
            aria-hidden
          />
        </a>
        <div className={styles.links}>
          {NAV_LINKS.map(({ hash, label }) => (
            <a key={hash} className={styles.link} href={`${homePrefix}${hash}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
