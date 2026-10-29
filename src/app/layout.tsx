import "./globals.css";

import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default async function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased">
        <ThemeProvider attribute="class">
          {auth}
          {children}
        </ThemeProvider>

        <Toaster richColors closeButton={true} />
      </body>
    </html>
  );
}
