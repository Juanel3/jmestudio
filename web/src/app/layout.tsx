import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Footer } from "./Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "JM Estudio",
  description: "Diseño y desarrollo web, apps y sistemas.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
