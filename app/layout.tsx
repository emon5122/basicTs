import "./globals.css";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import Provider from "./provider";
import { Metadata } from "next";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Advanced Blog",
    description: "Hobby Project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={nunito.className}>
                    <Provider>{children}</Provider>
                </body>
            </html>
        </ClerkProvider>
    );
}
