export type CmsIntroItem = { n: string; t: string; d: string };

export type CmsProduct = {
  slug: string;
  number: string;
  title: string;
  category: string;
  categorySlug: string;
  short: string;
  overview: string;
  applications: string;
  featuredCategory: string;
  featuredDescription: string;
  image: string;
  imageAlt: string;
};

export type CmsApplication = { slug: string; title: string; text: string };

export type CmsContent = {
  contact: {
    legalName: string;
    email: string;
    phone: string;
    address: string;
    mapsQuery: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    tags: string;
    videoUrl: string;
  };
  intro: CmsIntroItem[];
  products: CmsProduct[];
  applicationsHeading: string;
  applications: CmsApplication[];
  services: {
    title: string;
    body: string;
    items: string;
  };
  about: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    body: string;
    extra: string;
    image: string;
  };
  contactCta: {
    title: string;
  };
  footerNote: string;
};
