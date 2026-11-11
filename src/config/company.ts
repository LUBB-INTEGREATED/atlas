import { ATLAS_IMAGES } from '@/src/assets/images';

export interface CertificateItem {
  code: string;
  name: string;
  description: string;
  obtained: boolean;
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface TeamMember {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  image: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export interface ClientLogoItem {
  name: string;
  svgPath?: string;
}

export const company = {
  name: 'Atlas Holland B.V.',
  shortName: 'Atlas Holland',
  tagline: 'Verkeer in goede banen.',
  foundingYear: 2016,
  phoneDisplay: '085 – 208 47 10',
  phoneHref: 'tel:+31852084710',
  emergencyPhoneDisplay: '085 – 208 47 19',
  emergencyPhoneHref: 'tel:+31852084719',
  email: 'planning@atlasholland.nl',
  emailHref: 'mailto:planning@atlasholland.nl',
  jobsEmail: 'werkenbij@atlasholland.nl',
  jobsEmailHref: 'mailto:werkenbij@atlasholland.nl',
  address: {
    street: 'Archimedesweg 24',
    postalCode: '3542 AC',
    city: 'Utrecht',
    country: 'Nederland',
    routeUrl: 'https://maps.google.com/?q=Archimedesweg+24+3542+AC+Utrecht',
  },
  kvk: '68492015',
  btw: 'NL857469102B01',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/atlas-holland-bv',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/atlasholland',
    },
  ],
  stats: [
    {
      value: 145,
      suffix: '+',
      label: 'Inzetbare verkeersregelaars',
      sublabel: 'Landelijk gecertificeerd & uitgerust',
    },
    {
      value: 24,
      suffix: '/7',
      label: 'Planning & spoedlijn bereikbaar',
      sublabel: 'Direct contact met een vaste coördinator',
    },
    {
      value: 24,
      prefix: '< ',
      suffix: ' uur',
      label: 'Voorstel of inzetbevestiging',
      sublabel: 'Heldere afspraken vooraf',
    },
    {
      value: 680,
      suffix: '+',
      label: 'Projecten per jaar begeleid',
      sublabel: 'Infra, bouw, gemeenten en evenementen',
    },
  ] as StatItem[],
  certificates: [
    {
      code: 'VCA**',
      name: 'VGM Checklist Aannemers',
      description: 'Geborgde veiligheid, gezondheid en milieu op iedere werklocatie.',
      obtained: true,
    },
    {
      code: 'ISO 9001',
      name: 'Kwaliteitsmanagement',
      description: 'Gestructureerde projectvoorbereiding, planning en evaluatie.',
      obtained: true,
    },
    {
      code: 'BRL 9101',
      name: 'Tijdelijke verkeersmaatregelen',
      description: 'Vakbekwame plaatsing en instandhouding volgens CROW 96a/96b.',
      obtained: true,
    },
    {
      code: 'NEN 4400-1',
      name: 'SNA Keurmerk Arbeid',
      description: 'Betrouwbare inleen en correcte administratieve borging.',
      obtained: true,
    },
    {
      code: 'PSO Trede 2',
      name: 'Prestatieladder Socialer Ondernemen',
      description: 'Investeren in opleiding en duurzame instroom van vakmensen.',
      obtained: false,
    },
  ] as CertificateItem[],
  // Shipped empty as required: "The logo row and testimonials section hide when their lists are empty (ship them empty)."
  clientLogos: [] as ClientLogoItem[],
  testimonials: [] as TestimonialItem[],
  team: [
    {
      name: 'Maurits van der Berg',
      role: 'Operationeel Directeur',
      email: 'm.vanderberg@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.operationsSiteAccess,
    },
    {
      name: 'Sanne Verhoeven',
      role: 'Hoofd Verkeersplannen & BLVC',
      email: 's.verhoeven@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.heroTrafficController,
    },
    {
      name: 'Karim El Amrani',
      role: 'Coördinator 24/7 Planning & Calamiteiten',
      email: 'k.elamrani@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.heroCalmRoadworks,
    },
    {
      name: 'Eva Lindeman',
      role: 'Begeleiding & Opleidingen',
      email: 'e.lindeman@atlasholland.nl',
      linkedin: 'https://www.linkedin.com',
      // TODO: replace with real Atlas photo
      image: ATLAS_IMAGES.eventsTrafficFlow,
    },
  ] as TeamMember[],
};

export function getObtainedCertificates(): CertificateItem[] {
  return company.certificates.filter((cert) => cert.obtained);
}
