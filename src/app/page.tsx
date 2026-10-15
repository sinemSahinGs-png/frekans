import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Applications } from "@/components/home/Applications";
import { ServiceSection } from "@/components/home/ServiceSection";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactCta } from "@/components/home/ContactCta";
import { getCms } from "@/lib/cms/store";
import { site } from "@/data/site";

export default async function HomePage() {
  const cms = await getCms();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: cms.contact.legalName,
    email: cms.contact.email,
    telephone: cms.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: cms.contact.address.replace(/\n/g, ", "),
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
