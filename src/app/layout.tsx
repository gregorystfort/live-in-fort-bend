import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Live In Fort Bend | Your Guide to Fort Bend County, TX",
    template: "%s | Live In Fort Bend",
  },
  description:
    "Your definitive guide to living in Fort Bend County, Texas. Discover neighborhoods, schools, restaurants, events, real estate insights, and everything that makes Fort Bend home.",
  keywords: [
    "Fort Bend County",
    "Sugar Land",
    "Missouri City",
    "Richmond",
    "Katy",
    "Rosenberg",
    "Fulshear",
    "Texas",
    "real estate",
    "living guide",
    "neighborhoods",
    "schools",
    "restaurants",
  ],
  openGraph: {
    title: "Live In Fort Bend",
    description: "Your guide to living in Fort Bend County, Texas",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
