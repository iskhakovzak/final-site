import type { Metadata } from "next";
import { Inter, Syne, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Sarvinoz Usmanova / International Model",
  description: "Sarvinoz Usmanova - International Model Portfolio. Professional model based in Tashkent specializing in editorial and high-fashion projects. View portfolio, measurements, and contact information.",
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sarvinoz Usmanova',
  image: 'https://ik.imagekit.io/sarvinozusmanova/New%20Folder/IMG_4975.JPG?updatedAt=1752757683245',
  '@id': 'https://sarvinozusmanova.com/',
  url: 'https://sarvinozusmanova.com/',
  telephone: '+998901234567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Amir Temur Avenue',
    addressLocality: 'Tashkent',
    postalCode: '100000',
    addressCountry: 'UZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.2995,
    longitude: 69.2401,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  sameAs: [
    'https://www.instagram.com/sarvisha.usmanova/',
    'https://t.me/srv_usmn',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${syne.variable} ${playfairDisplay.variable} ${montserrat.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
