import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import Navbar from "@/app/_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import { RainbowKitProviderWrapper } from "@/components/RainbowKitProvider";
import { JetBrains_Mono } from "next/font/google";

// Konfiguracja czcionki JetBrains Mono
const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blizzard",
  description: "Blizzard v1 Launched",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.className}>
      <body>
        <ConvexClientProvider>
          <RainbowKitProviderWrapper>
            <div className="min-h-screen flex bg-black">
              <Sidebar />
              <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1 ">
                  {children}
                </main>
              </div>
            </div>
          </RainbowKitProviderWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}