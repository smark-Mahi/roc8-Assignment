import type { Metadata } from "next";
import { Palanquin } from "next/font/google";
import "../styles/main.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const palanquin = Palanquin({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Roc8 Assignment",
  description: "made by sumeria begum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={palanquin.className}>
        <AuthProvider>
          <MantineProvider>{children}</MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
