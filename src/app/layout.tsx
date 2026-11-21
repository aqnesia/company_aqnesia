  import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT. Aqnesia Multi Usaha | Global Workforce",
  description: "Independent partner for enterprise teams, bringing strategy, storytelling, design, and technology together to build smarter, AI-ready digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
