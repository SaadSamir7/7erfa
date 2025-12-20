import "@/styles/globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Manrope, Bruno_Ace_SC, Cairo, Roboto } from "next/font/google";

export const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800"],
    display: "swap",
    variable: "--font-manrope",
});

export const brunoAceSC = Bruno_Ace_SC({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
    variable: "--font-bruno-ace-sc",
});

export const cairo = Cairo({
    subsets: ["arabic", "latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
    display: "swap",
    variable: "--font-cairo",
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    style: ["normal", "italic"],
    display: "swap",
});

export const metadata: Metadata = {
    title: { default: "7erfa Platform", template: "%s | 7erfa Platform" },
    description:
        "A modern React application built with Vite that connects customers with skilled service workers. The frontend provides intuitive interfaces for both customers seeking services and workers managing their business.",
    keywords: [
        "7erfa",
        "service platform",
        "customer service",
        "worker management",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`scroll-smooth ${brunoAceSC.variable} ${cairo.variable} ${manrope.variable}`}>
            <body
                className={`${roboto.className} antialiased`}
                suppressHydrationWarning>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
