import { BrandMemory } from "../types/brandMemory.types";
import { BrandData } from "../components/brand/BrandProvider";

export const workhorseBrandMemory: BrandMemory = {
  id: "workhorse-brand",
  brandId: "workhorse",
  history: [
    {
      id: "event-1",
      timestamp: new Date("2014-01-01"),
      type: "creation",
      description: "Workhorse founded as a distributed agency network of expert artists, designers, writers, and creative specialists",
      data: {},
      importance: 10,
      connections: []
    },
    {
      id: "event-2",
      timestamp: new Date("2024-03-20"),
      type: "update",
      description: "Development of AI-Native Strategy and Brand Intelligence System",
      data: {},
      importance: 9,
      connections: ["event-1"]
    }
  ],
  values: [
    {
      key: "Compelling",
      value: "A compelling brand enshrines its beliefs and dreams in a story that influences and inspires.",
      confidence: 1.0,
      source: "user-defined"
    },
    {
      key: "Meaningful",
      value: "A meaningful brand distills the ethereal and mystical down to the real and material.",
      confidence: 1.0,
      source: "user-defined"
    },
    {
      key: "Beautiful",
      value: "A beautiful brand is a complete, whole, and universal truth.",
      confidence: 1.0,
      source: "user-defined"
    },
    {
      key: "Expert-Led",
      value: "Elevating expert creativity where AI serves as an amplifier for human expertise, not a replacement",
      confidence: 1.0,
      source: "user-defined"
    },
    {
      key: "Intelligent",
      value: "Thoughtful, insightful, and analytical approach to brand development",
      confidence: 1.0,
      source: "user-defined"
    }
  ],
  visualIdentity: {
    colorPalette: {
      primary: ["#1A2B5F"], // Deep Navy
      secondary: ["#708090"], // Slate Gray
      accent: ["#FF6B6B", "#4ECDC4"], // Vibrant Coral, Soft Teal
      neutral: ["#FFFFFF", "#F7F7F7"], // Pure White, Light Gray
      semantic: {
        success: "#4ECDC4", // Soft Teal
        warning: "#FFC65A", // Amber
        error: "#FF6B6B", // Vibrant Coral
        info: "#708090" // Slate Gray
      }
    },
    typography: {
      fonts: {
        primary: "Inter",
        secondary: "Playfair Display",
        accent: "Inter"
      },
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      },
      weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    },
    patterns: [
      {
        id: "pattern-1",
        name: "Dot Grid",
        type: "pattern",
        value: "repeating-dot-pattern",
        usage: ["backgrounds", "secondary elements"]
      }
    ],
    assets: [
      {
        id: "logo-1",
        name: "Workhorse Primary Logo",
        type: "logo",
        url: "https://placehold.co/400x200/1A2B5F/FFFFFF?text=Workhorse",
        variants: {
          dark: "https://placehold.co/400x200/FFFFFF/1A2B5F?text=Workhorse",
          minimal: "https://placehold.co/200x100/1A2B5F/FFFFFF?text=W"
        },
        metadata: {
          dimensions: {
            width: 400,
            height: 200
          },
          format: "svg",
          size: 24,
          tags: ["logo", "primary", "brand"]
        }
      }
    ]
  },
  insights: [
    {
      id: "insight-1",
      type: "opportunity",
      title: "Expert-AI Collaborative Positioning",
      description: "Workhorse's position at the intersection of human expertise and AI capabilities provides a unique market differentiation that should be emphasized in all brand communications.",
      confidence: 0.95,
      source: "strategic-analysis",
      data: {},
      createdAt: new Date("2024-03-20")
    },
    {
      id: "insight-2",
      type: "recommendation",
      title: "Visual Identity Evolution",
      description: "The brand should maintain its sophisticated color palette while evolving visual elements to reflect the balance of human creativity and AI capabilities.",
      confidence: 0.85,
      source: "design-review",
      data: {},
      createdAt: new Date("2024-03-20")
    }
  ],
  lastUpdated: new Date("2024-03-20")
};

// Export a simplified version for the brand provider
export const workhorseBrand: BrandData = {
  id: "workhorse-brand",
  name: "Workhorse",
  client: "Workhorse Agency",
  slug: "workhorse",
  description: "Intelligent Brand Management for the AI Era",
  colors: [
    { name: "Deep Navy", value: "#1A2B5F", isPrimary: true },
    { name: "Vibrant Coral", value: "#FF6B6B", isAccent: true },
    { name: "Soft Teal", value: "#4ECDC4", isAccent: true },
    { name: "Slate Gray", value: "#708090", isSecondary: true },
    { name: "Pure White", value: "#FFFFFF", isLight: true },
    { name: "Light Gray", value: "#F7F7F7", isLight: true }
  ],
  typography: {
    fontFamily: "'Inter', 'Helvetica', sans-serif",
    headingFont: "'Inter', sans-serif",
    bodyFont: "'Inter', sans-serif",
    baseFontSize: "16px",
    lineHeight: "1.5",
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    }
  },
  assets: [
    {
      id: "logo-1",
      key: "primary-logo",
      type: "logo",
      url: "https://placehold.co/400x200/1A2B5F/FFFFFF?text=Workhorse",
      altText: "Workhorse Logo"
    },
    {
      id: "pattern-1",
      key: "background-pattern",
      type: "pattern",
      url: "https://placehold.co/600x600/F7F7F7/1A2B5F?text=Pattern",
      altText: "Workhorse Background Pattern"
    }
  ],
  spacing: {
    baseline: 4,
    scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128]
  },
  radii: {
    small: "2px",
    medium: "4px",
    large: "8px",
    full: "9999px"
  },
  voice: {
    tone: "formal",
    characteristics: ["Expert", "Empowering", "Conversational", "Forward-thinking", "Precise"],
    exampleCopy: [
      "Expert-Led AI - where world-class creative specialists harness advanced AI systems to achieve previously impossible outcomes.",
      "We create living brand systems that serve as a single source of truth, aligning interdisciplinary teams."
    ]
  },
  terminology: {
    project: "Brand Experience",
    campaign: "Brand Activation",
    content_calendar: "Brand Timeline"
  }
}; 