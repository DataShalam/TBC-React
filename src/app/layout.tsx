import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import React from "react";

export const metadata = {
  title: "TBCx assignment",
  description: "A project assignment for TBCx",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className=" h-full">
        <div className="flex flex-col min-h-full">
          <UserProvider>
            <ThemeProvider defaultTheme="system" enableSystem attribute="class">
              {children}
            </ThemeProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
