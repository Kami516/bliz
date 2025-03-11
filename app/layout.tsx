import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import Navbar from "@/app/_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

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
    <html lang="en">
      <body>
        <ConvexClientProvider>
            <div className="min-h-screen flex">
              <Sidebar />
              <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                  {children}
                </main>
              </div>
            </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}