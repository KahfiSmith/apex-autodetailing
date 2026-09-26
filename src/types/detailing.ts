export interface QuickService {
  id: string;
  title: string;
  desc: string;
  badge: string;
  iconName: string;
  startingPrice: string;
}

export interface DetailingPackage {
  id: string;
  name: string;
  category: "coating" | "ppf" | "correction" | "interior";
  badge: string;
  shortDesc: string;
  warranty: string;
  duration: string;
  layerCount?: string;
  benefits: string[];
  startingPrice: string;
  image: string;
  macroImage?: string;
  telemetry?: {
    label: string;
    value: string;
    unit: string;
  };
}

export interface VehicleSizeTier {
  size: "S" | "M" | "L" | "XL";
  name: string;
  examples: string;
  ceramicPrice: string;
  ppfPrice: string;
  correctionPrice: string;
  durationDays: string;
}

export interface TransformationCase {
  id: string;
  vehicleName: string;
  packageType: string;
  treatmentSummary: string;
  duration: string;
  image: string;
  highlight: string;
}

export interface StudioStandard {
  number: string;
  title: string;
  desc: string;
  badge: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  carModel: string;
  packageName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StudioConfig {
  name: string;
  tagline: string;
  shortDescription: string;
  contact: {
    phone: string;
    formattedPhone: string;
    whatsapp: string;
    whatsappFormatted: string;
    email: string;
    address: string;
    city: string;
    fullAddress: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
  };
  operatingHours: {
    days: string;
    hours: string;
  }[];
  quickServices: QuickService[];
  packages: DetailingPackage[];
  sizeTiers: VehicleSizeTier[];
  cases: TransformationCase[];
  standards: StudioStandard[];
  reviews: CustomerReview[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
  };
}
