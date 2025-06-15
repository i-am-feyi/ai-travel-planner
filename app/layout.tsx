import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import ClerkProviderWrapper from "@/providers/clerk-provider";
import GlobalProvidersWrapper from "@/providers";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Travel Planner",
  description: "AI Travel Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
      <html lang="en">
        <link rel="icon" href="/logo/icon-green.svg" sizes="any" />
        <body className={`${bricolageGrotesque.className} antialiased`}>
          <GlobalProvidersWrapper>
            {children}
            {/* <AppFooter /> */}
          </GlobalProvidersWrapper>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
