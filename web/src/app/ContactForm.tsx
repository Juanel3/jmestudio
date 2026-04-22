"use client";

import styles from "./page.module.css";

export function ContactForm() {
  return (
    <form
      className={styles.contactForm}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const message = String(data.get("message") ?? "").trim();
        const body = `Nombre: ${name}\nCorreo: ${email}\n\n${message}`;
        const mailto = `mailto:juanmf3@outlook.com?subject=${encodeURIComponent(
          "Contacto desde la web — JM Estudio"
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
      }}
    >
      <label className={styles.contactLabel}>
        Nombre
        <input
          className={styles.contactInput}
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Tu nombre"
        />
      </label>
      <label className={styles.contactLabel}>
        Correo
        <input
          className={styles.contactInput}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="tu@correo.com"
        />
      </label>
      <label className={styles.contactLabel}>
        Mensaje
        <textarea
          className={styles.contactTextarea}
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos sobre tu proyecto…"
        />
      </label>
      <button type="submit" className={styles.contactSubmit}>
        Enviar mensaje
      </button>
    </form>
  );
}
