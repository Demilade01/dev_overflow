import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700',],
    variable: '--font-spaceGrotesk',
 });

const inter = Inter({
    subsets: ["latin"],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
 });

export const metadata: Metadata = {
  title: "Dev Overflow",
  description: "A place for developers to ask questions and find answers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'primary-gradient',
          footerActionText: 'primary-text-gradient hover:text-primary-500',
        }
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
