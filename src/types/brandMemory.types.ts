export interface ColorSystem {
  primary: string[];
  secondary: string[];
  accent: string[];
  neutral: string[];
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

export interface TypographySystem {
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  weights: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface VisualPattern {
  id: string;
  name: string;
  type: 'pattern' | 'texture' | 'gradient';
  value: string;
  usage: string[];
}

export interface BrandAsset {
  id: string;
  name: string;
  type: 'logo' | 'icon' | 'image' | 'illustration';
  url: string;
  variants: {
    [key: string]: string;
  };
  metadata: {
    dimensions?: {
      width: number;
      height: number;
    };
    format: string;
    size: number;
    tags: string[];
  };
}

export interface AIBrandInsight {
  id: string;
  type: 'trend' | 'opportunity' | 'risk' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  source: string;
  data: Record<string, any>;
  createdAt: Date;
  expiresAt?: Date;
}

export interface BrandEvent {
  id: string;
  timestamp: Date;
  type: 'creation' | 'update' | 'decision' | 'campaign' | 'interaction';
  description: string;
  data: Record<string, any>;
  importance: number; // AI-calculated significance
  connections: string[]; // IDs of related events
}

export interface BrandMemory {
  id: string;
  brandId: string;
  history: BrandEvent[];
  values: {
    key: string;
    value: string;
    confidence: number;
    source: 'ai-derived' | 'user-defined' | 'hybrid';
  }[];
  visualIdentity: {
    colorPalette: ColorSystem;
    typography: TypographySystem;
    patterns: VisualPattern[];
    assets: BrandAsset[];
  };
  insights: AIBrandInsight[];
  lastUpdated: Date;
} 