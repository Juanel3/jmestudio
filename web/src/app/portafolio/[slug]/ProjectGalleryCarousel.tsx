"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CardArrowIcon } from "../CardArrowIcon";
import type { GalleryImage } from "@/data/portfolio";
import styles from "./page.module.css";

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

export type ProjectGalleryCarouselProps = { items: GalleryImage[] };

export default function ProjectGalleryCarousel({
  items,
}: ProjectGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const last = items.length - 1;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const lightboxTitleId = useId();
  const lightboxScrollRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(last, i + 1));
  }, [last]);

  const openLightboxFromSlide = useCallback((slideIndex: number) => {
    setIndex(slideIndex);
    setZoom(1);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoom(1);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100));
  }, []);

  const zoomReset = useCallback(() => setZoom(1), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (items.length <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setZoom(1);
        setIndex((i) => Math.max(0, i - 1));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setZoom(1);
        setIndex((i) => Math.min(last, i + 1));
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen, closeLightbox, items.length, last]);

  useEffect(() => {
    if (!lightboxOpen) return;
    lightboxScrollRef.current?.scrollTo(0, 0);
  }, [lightboxOpen, index]);

  const onCarouselKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext, lightboxOpen]
  );

  if (items.length === 0) return null;

  const current = items[index];

  const lightbox =
    lightboxOpen &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        className={styles.lightbox}
        role="dialog"
        aria-modal="true"
        aria-labelledby={lightboxTitleId}
      >
        <button
          type="button"
          className={styles.lightboxBackdrop}
          onClick={closeLightbox}
          aria-label="Cerrar vista ampliada"
        />
        <div className={styles.lightboxPanel}>
          <p id={lightboxTitleId} className={styles.lightboxSrOnly}>
            Imagen ampliada: {current.alt}
          </p>
          <div className={styles.lightboxMain}>
            {items.length > 1 ? (
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(1);
                  goPrev();
                }}
                disabled={index === 0}
                aria-label="Foto anterior"
              >
                <CardArrowIcon className={styles.lightboxNavIcon} direction="left" />
              </button>
            ) : null}
            <div ref={lightboxScrollRef} className={styles.lightboxScroll}>
              {/* eslint-disable-next-line @next/next/no-img-element -- zoom con scroll: imagen nativa en modal */}
              <img
                key={index}
                src={current.src}
                alt={current.alt}
                className={styles.lightboxImg}
                draggable={false}
                style={{ width: `${zoom * 100}%`, maxWidth: "none" }}
              />
            </div>
            {items.length > 1 ? (
              <button
                type="button"
                className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(1);
                  goNext();
                }}
                disabled={index === last}
                aria-label="Foto siguiente"
              >
                <CardArrowIcon className={styles.lightboxNavIcon} />
              </button>
            ) : null}
          </div>
          <div className={styles.lightboxChrome}>
            {items.length > 1 ? (
              <p className={styles.lightboxCounter} aria-live="polite">
                {index + 1} / {items.length}
              </p>
            ) : (
              <span className={styles.lightboxCounterSpacer} />
            )}
            <div className={styles.lightboxZoomTools} aria-label="Control de zoom">
              <button
                type="button"
                className={styles.lightboxIconBtn}
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                aria-label="Alejar"
              >
                −
              </button>
              <span className={styles.lightboxZoomPct} aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                className={styles.lightboxIconBtn}
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX}
                aria-label="Acercar"
              >
                +
              </button>
              <button
                type="button"
                className={styles.lightboxResetBtn}
                onClick={zoomReset}
              >
                Restablecer
              </button>
            </div>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={closeLightbox}
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <div
      className={styles.carousel}
      tabIndex={0}
      onKeyDown={onCarouselKeyDown}
    >
      <div
        className={styles.carouselViewport}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Galería de imágenes del proyecto"
      >
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={`${item.src}-${i}`} className={styles.carouselSlide}>
              <button
                type="button"
                className={styles.carouselSlideOpen}
                onClick={() => openLightboxFromSlide(i)}
                aria-label={`Ver imagen ampliada: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className={styles.carouselImg}
                  sizes="(max-width: 640px) 100vw, min(1080px, 92vw)"
                  priority={i === 0}
                  aria-hidden
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      {lightbox}

      {items.length > 1 ? (
        <div className={styles.carouselToolbar}>
          <button
            type="button"
            className={styles.carouselBtn}
            onClick={goPrev}
            disabled={index === 0}
            aria-label="Imagen anterior"
          >
            <CardArrowIcon
              className={styles.carouselBtnIcon}
              direction="left"
            />
          </button>

          <div className={styles.carouselDots} role="tablist" aria-label="Seleccionar imagen">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Imagen ${i + 1} de ${items.length}`}
                className={i === index ? styles.carouselDotActive : styles.carouselDot}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.carouselBtn}
            onClick={goNext}
            disabled={index === last}
            aria-label="Imagen siguiente"
          >
            <CardArrowIcon className={styles.carouselBtnIcon} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
