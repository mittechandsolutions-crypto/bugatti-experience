export interface CarModel {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: string;
  category: 'Hyper Sports' | 'Coachbuilt' | 'Track Only' | 'One-Off' | 'Roadster';
  year: number;
  engine: string;
  horsepower: number;
  topSpeed: number; // in km/h
  acceleration: number; // 0-100 km/h in seconds
  transmission: string;
  weight: string;
  aerodynamics: string;
  description: string;
  heroImage: string;
  gallery: string[];
  features: {
    title: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  colors: {
    name: string;
    hex: string;
    secondaryHex?: string;
  }[];
}

export interface ConfiguratorState {
  modelId: string;
  exteriorColor: string;
  exteriorFinish: 'gloss' | 'matte' | 'carbon';
  wheelDesign: string;
  rimColor: string;
  caliperColor: string;
  interiorTheme: string;
  activeAero: boolean;
  headlightsOn: boolean;
  turntableSpin: boolean;
  accentStripe: boolean;
}
