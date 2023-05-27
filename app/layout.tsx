import "./globals.css";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import Provider from "./provider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
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
