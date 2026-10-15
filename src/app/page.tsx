import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Applications } from "@/components/home/Applications";
import { ServiceSection } from "@/components/home/ServiceSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCta } from "@/components/home/ContactCta";
import { site } from "@/data/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mecidiye Mah. Bestekar Sevki Bey Sokak No:36/2",
      addressLocality: "Besiktas",
      addressRegion: "Istanbul",
      postalCode: "34335",
      addressCountry: "TR",
    },
    url: site.domain,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Intro />
      <ProductShowcase />
      <Applications />
      <ServiceSection />
      <AboutTeaser />
      <ContactCta />
    </>
  );
}
