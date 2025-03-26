import { BrandData } from "../components/brand/BrandProvider";
import { workhorseBrand } from "./workhorseBrand";

// Test brand data
export const testBrands: BrandData[] = [
  workhorseBrand,
  {
    id: "brand-1",
    name: "Museum Modern",
    client: "Metropolitan Museum",
    slug: "museum-modern",
    description: "A modern, sophisticated brand for a premier art museum",
    colors: [
      { name: "Primary Blue", value: "#1A365D", isPrimary: true },
      { name: "Gold", value: "#C99A2E", isAccent: true },
      { name: "Light Gray", value: "#F7FAFC", isLight: true },
      { name: "Dark Gray", value: "#2D3748" },
      { name: "White", value: "#FFFFFF", isLight: true }
    ],
    typography: {
      fontFamily: "'Playfair Display', 'Georgia', serif",
      headingFont: "'Playfair Display', serif",
      bodyFont: "'Inter', sans-serif",
      baseFontSize: "16px",
      lineHeight: "1.5",
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700
      }
    },
    assets: [
      {
        id: "logo-1",
        key: "primary-logo",
        type: "logo",
        url: "https://placehold.co/400x200/1A365D/FFFFFF?text=Museum+Modern",
        altText: "Museum Modern Logo"
      },
      {
        id: "pattern-1",
        key: "background-pattern",
        type: "pattern",
        url: "https://placehold.co/600x600/F7FAFC/1A365D?text=Pattern"
      },
      {
        id: "hero-1",
        key: "hero-image",
        type: "image",
        url: "https://placehold.co/1200x600/2D3748/FFFFFF?text=Museum+Hero"
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
      characteristics: ["Authoritative", "Educational", "Inspiring", "Thoughtful"],
      exampleCopy: [
        "Explore the intersection of history and innovation in our latest exhibition.",
        "Join us for an immersive journey through centuries of artistic expression."
      ]
    },
    terminology: {
      project: "Exhibition",
      campaign: "Exhibition Campaign",
      content_calendar: "Exhibition Calendar"
    }
  },
  {
    id: "brand-2",
    name: "Wellness Core",
    client: "Wellness Center",
    slug: "wellness-core",
    description: "A calming, nurturing brand for a wellness and health center",
    colors: [
      { name: "Sage Green", value: "#74C69D", isPrimary: true },
      { name: "Lavender", value: "#B794F4", isAccent: true },
      { name: "Cream", value: "#FFF8E6", isLight: true },
      { name: "Deep Purple", value: "#553C9A", isSecondary: true },
      { name: "White", value: "#FFFFFF", isLight: true }
    ],
    typography: {
      fontFamily: "'Montserrat', 'Helvetica', sans-serif",
      headingFont: "'Montserrat', sans-serif",
      bodyFont: "'Open Sans', sans-serif",
      baseFontSize: "16px",
      lineHeight: "1.6",
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
        id: "logo-2",
        key: "primary-logo",
        type: "logo",
        url: "https://placehold.co/400x200/74C69D/FFFFFF?text=Wellness+Core",
        altText: "Wellness Core Logo"
      },
      {
        id: "icon-1",
        key: "wellness-icon",
        type: "icon",
        url: "https://placehold.co/200x200/553C9A/FFFFFF?text=Icon"
      },
      {
        id: "hero-2",
        key: "hero-image",
        type: "image",
        url: "https://placehold.co/1200x600/FFF8E6/74C69D?text=Wellness+Hero"
      }
    ],
    spacing: {
      baseline: 4,
      scale: [0, 4, 8, 16, 24, 32, 40, 56, 80, 112]
    },
    radii: {
      small: "4px",
      medium: "8px",
      large: "16px",
      full: "9999px"
    },
    voice: {
      tone: "friendly",
      characteristics: ["Nurturing", "Supportive", "Empowering", "Calm"],
      exampleCopy: [
        "Begin your journey to balanced well-being with our holistic approach.",
        "Discover the tools and techniques for a more centered life."
      ]
    },
    terminology: {
      project: "Program",
      campaign: "Wellness Campaign",
      content_calendar: "Program Calendar"
    }
  },
  {
    id: "brand-3",
    name: "TechForward",
    client: "TechForward Inc.",
    slug: "tech-forward",
    description: "A bold, innovative brand for a technology company",
    colors: [
      { name: "Electric Blue", value: "#0070F3", isPrimary: true },
      { name: "Vibrant Red", value: "#FF4D4F", isAccent: true },
      { name: "Light Gray", value: "#F5F5F5", isLight: true },
      { name: "Dark Gray", value: "#111111", isSecondary: true },
      { name: "White", value: "#FFFFFF", isLight: true }
    ],
    typography: {
      fontFamily: "'SF Pro Display', 'Arial', sans-serif",
      headingFont: "'SF Pro Display', sans-serif",
      bodyFont: "'SF Pro Text', sans-serif",
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
        id: "logo-3",
        key: "primary-logo",
        type: "logo",
        url: "https://placehold.co/400x200/0070F3/FFFFFF?text=TechForward",
        altText: "TechForward Logo"
      },
      {
        id: "icon-3",
        key: "tech-icon",
        type: "icon",
        url: "https://placehold.co/200x200/FF4D4F/FFFFFF?text=TF"
      },
      {
        id: "hero-3",
        key: "hero-image",
        type: "image",
        url: "https://placehold.co/1200x600/111111/0070F3?text=Tech+Hero"
      }
    ],
    spacing: {
      baseline: 4,
      scale: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128]
    },
    voice: {
      tone: "technical",
      characteristics: ["Confident", "Precise", "Forward-thinking", "Innovative"],
      exampleCopy: [
        "Leveraging cutting-edge technology to redefine what's possible.",
        "Build smarter solutions with our advanced integration platform."
      ]
    },
    terminology: {
      project: "Product",
      campaign: "Launch",
      content_calendar: "Release Schedule"
    }
  }
];

// Test project data
export interface Project {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "not-started";
  progress: number;
  startDate: string;
  endDate: string;
  client: string;
  description: string;
  team?: TeamMember[];
  tasks?: Task[];
  updates?: Update[];
  // Analytics metrics
  viewCount?: number;
  engagement?: number;
  conversionRate?: number;
  roi?: number; // Return on investment (percentage)
  budget?: number;
  spent?: number;
  lastUpdated?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: "completed" | "in-progress" | "not-started";
  dueDate: string;
}

export interface Update {
  id: string;
  date: string;
  author: string;
  content: string;
}

export const testTeamMembers: TeamMember[] = [
  { id: "user-1", name: "Sarah Johnson", role: "Project Manager", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: "user-2", name: "David Chen", role: "Lead Designer", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "user-3", name: "Emma Parker", role: "Content Strategist", avatar: "https://randomuser.me/api/portraits/women/66.jpg" },
  { id: "user-4", name: "Michael Rodriguez", role: "Developer", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
  { id: "user-5", name: "Olivia Kim", role: "UX Researcher", avatar: "https://randomuser.me/api/portraits/women/29.jpg" },
  { id: "user-6", name: "James Wilson", role: "Marketing Specialist", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
  { id: "user-7", name: "Sophia Garcia", role: "Product Manager", avatar: "https://randomuser.me/api/portraits/women/54.jpg" },
  { id: "user-8", name: "Ethan Brown", role: "Frontend Developer", avatar: "https://randomuser.me/api/portraits/men/36.jpg" }
];

export const testProjects: Project[] = [
  {
    id: "project-1",
    name: "Brand Refresh Campaign",
    status: "in-progress",
    progress: 65,
    startDate: "2023-06-15",
    endDate: "2023-09-30",
    client: "Metropolitan Museum",
    description: "A comprehensive brand refresh for the Metropolitan Museum, including new visual identity, messaging, and digital presence.",
    team: [
      {
        id: "user-1",
        name: "Alice Chen",
        role: "Project Manager",
        avatar: "https://placehold.co/100x100/1A365D/FFFFFF?text=AC"
      },
      {
        id: "user-2",
        name: "Miguel Rodriguez",
        role: "Brand Designer",
        avatar: "https://placehold.co/100x100/1A365D/FFFFFF?text=MR"
      },
      {
        id: "user-3",
        name: "Sarah Johnson",
        role: "Content Strategist",
        avatar: "https://placehold.co/100x100/1A365D/FFFFFF?text=SJ"
      }
    ],
    tasks: [
      {
        id: "task-1",
        title: "Brand Audit",
        description: "Conduct a comprehensive audit of existing brand assets and touchpoints",
        assignee: "user-1",
        status: "completed",
        dueDate: "2023-06-30"
      },
      {
        id: "task-2",
        title: "Brand Strategy Development",
        description: "Develop new brand positioning and messaging framework",
        assignee: "user-3",
        status: "completed",
        dueDate: "2023-07-15"
      },
      {
        id: "task-3",
        title: "Visual Identity Design",
        description: "Create new logo, color palette, and visual identity system",
        assignee: "user-2",
        status: "in-progress",
        dueDate: "2023-08-15"
      },
      {
        id: "task-4",
        title: "Website Redesign",
        description: "Apply new brand to website and digital channels",
        assignee: "user-2",
        status: "not-started",
        dueDate: "2023-09-15"
      }
    ],
    updates: [
      {
        id: "update-1",
        date: "2023-07-10",
        author: "user-1",
        content: "Brand audit completed. Key findings shared with client and received positive feedback."
      },
      {
        id: "update-2",
        date: "2023-07-25",
        author: "user-3",
        content: "Brand strategy document approved by client. Moving to visual identity phase."
      }
    ],
    viewCount: 2845,
    engagement: 72,
    conversionRate: 4.5,
    roi: 185,
    budget: 75000,
    spent: 45000,
    lastUpdated: "2023-08-02"
  },
  {
    id: "project-2",
    name: "Website Redesign",
    status: "in-progress",
    progress: 40,
    startDate: "2023-05-01",
    endDate: "2023-10-31",
    client: "Wellness Center",
    description: "A complete overhaul of the Wellness Center website with improved user experience, booking functionality, and mobile optimization.",
    team: [
      {
        id: "user-4",
        name: "David Park",
        role: "Project Manager",
        avatar: "https://placehold.co/100x100/74C69D/FFFFFF?text=DP"
      },
      {
        id: "user-5",
        name: "Emma Wilson",
        role: "UX Designer",
        avatar: "https://placehold.co/100x100/74C69D/FFFFFF?text=EW"
      },
      {
        id: "user-6",
        name: "Raj Patel",
        role: "Frontend Developer",
        avatar: "https://placehold.co/100x100/74C69D/FFFFFF?text=RP"
      },
      {
        id: "user-7",
        name: "Olivia Martinez",
        role: "Content Writer",
        avatar: "https://placehold.co/100x100/74C69D/FFFFFF?text=OM"
      }
    ],
    tasks: [
      {
        id: "task-5",
        title: "User Research",
        description: "Conduct user interviews and create personas",
        assignee: "user-5",
        status: "completed",
        dueDate: "2023-05-20"
      },
      {
        id: "task-6",
        title: "Information Architecture",
        description: "Develop new site map and navigation structure",
        assignee: "user-5",
        status: "completed",
        dueDate: "2023-06-15"
      },
      {
        id: "task-7",
        title: "Wireframing and Prototyping",
        description: "Create wireframes and interactive prototypes",
        assignee: "user-5",
        status: "in-progress",
        dueDate: "2023-07-30"
      },
      {
        id: "task-8",
        title: "Content Creation",
        description: "Write and edit website content",
        assignee: "user-7",
        status: "in-progress",
        dueDate: "2023-08-15"
      },
      {
        id: "task-9",
        title: "Frontend Development",
        description: "Build responsive website frontend",
        assignee: "user-6",
        status: "not-started",
        dueDate: "2023-09-30"
      }
    ],
    updates: [
      {
        id: "update-3",
        date: "2023-06-01",
        author: "user-5",
        content: "User research completed. Key insights: clients want easier class booking and more detailed instructor bios."
      },
      {
        id: "update-4",
        date: "2023-07-01",
        author: "user-4",
        content: "Site map and information architecture approved. Moving to wireframing phase."
      }
    ],
    viewCount: 1358,
    engagement: 85,
    conversionRate: 6.2,
    roi: 220,
    budget: 120000,
    spent: 48000,
    lastUpdated: "2023-07-25"
  },
  {
    id: "project-3",
    name: "Cloud Migration",
    status: "not-started",
    progress: 0,
    startDate: "2023-09-01",
    endDate: "2023-12-31",
    client: "TechForward Inc.",
    description: "Migration of TechForward's infrastructure to cloud-based solutions, including data migration, security implementation, and staff training.",
    team: [
      {
        id: "user-8",
        name: "Thomas Weber",
        role: "Project Manager",
        avatar: "https://placehold.co/100x100/0072CE/FFFFFF?text=TW"
      },
      {
        id: "user-9",
        name: "Linda Kim",
        role: "Cloud Architect",
        avatar: "https://placehold.co/100x100/0072CE/FFFFFF?text=LK"
      }
    ],
    tasks: [
      {
        id: "task-10",
        title: "Infrastructure Assessment",
        description: "Evaluate current infrastructure and plan migration",
        assignee: "user-9",
        status: "not-started",
        dueDate: "2023-09-15"
      },
      {
        id: "task-11",
        title: "Cloud Environment Setup",
        description: "Configure cloud services and security",
        assignee: "user-9",
        status: "not-started",
        dueDate: "2023-10-15"
      },
      {
        id: "task-12",
        title: "Data Migration Plan",
        description: "Develop strategy for data migration with minimal disruption",
        assignee: "user-8",
        status: "not-started",
        dueDate: "2023-10-31"
      }
    ],
    viewCount: 624,
    engagement: 45,
    conversionRate: 0,
    roi: 0,
    budget: 200000,
    spent: 0,
    lastUpdated: "2023-08-10"
  },
  {
    id: "project-4",
    name: "Social Media Campaign",
    status: "completed",
    progress: 100,
    startDate: "2023-02-01",
    endDate: "2023-05-15",
    client: "Wellness Center",
    description: "A targeted social media campaign to promote new wellness programs and increase membership sign-ups.",
    team: [
      {
        id: "user-4",
        name: "David Park",
        role: "Project Manager",
        avatar: "https://placehold.co/100x100/74C69D/FFFFFF?text=DP"
      },
      {
        id: "user-10",
        name: "Nina Patel",
        role: "Social Media Specialist",
        avatar: "https://placehold.co/100x100/74C69D/FFFFFF?text=NP"
      },
      {
        id: "user-11",
        name: "James Wilson",
        role: "Content Creator",
        avatar: "https://placehold.co/100x100/74C69D/FFFFFF?text=JW"
      }
    ],
    tasks: [
      {
        id: "task-13",
        title: "Campaign Strategy",
        description: "Develop campaign goals, targeting, and messaging",
        assignee: "user-4",
        status: "completed",
        dueDate: "2023-02-15"
      },
      {
        id: "task-14",
        title: "Content Calendar Creation",
        description: "Plan content schedule across platforms",
        assignee: "user-10",
        status: "completed",
        dueDate: "2023-02-28"
      },
      {
        id: "task-15",
        title: "Content Creation",
        description: "Produce photos, videos, and copy for campaign",
        assignee: "user-11",
        status: "completed",
        dueDate: "2023-03-30"
      },
      {
        id: "task-16",
        title: "Campaign Launch and Monitoring",
        description: "Execute campaign and track performance",
        assignee: "user-10",
        status: "completed",
        dueDate: "2023-05-01"
      }
    ],
    updates: [
      {
        id: "update-5",
        date: "2023-03-01",
        author: "user-10",
        content: "Campaign launched on Instagram, Facebook, and Twitter. Initial engagement rates are above industry average."
      },
      {
        id: "update-6",
        date: "2023-04-15",
        author: "user-4",
        content: "Mid-campaign report shows 35% increase in website traffic and 28 new membership sign-ups directly attributed to the campaign."
      },
      {
        id: "update-7",
        date: "2023-05-20",
        author: "user-4",
        content: "Campaign completed with excellent results: 120 new memberships, 45% increase in class bookings. Client extremely satisfied."
      }
    ],
    viewCount: 9875,
    engagement: 92,
    conversionRate: 8.7,
    roi: 320,
    budget: 45000,
    spent: 45000,
    lastUpdated: "2023-05-20"
  },
  {
    id: "project-5",
    name: "Annual Exhibition Planning",
    status: "in-progress",
    progress: 25,
    startDate: "2023-07-01",
    endDate: "2024-02-28",
    client: "Metropolitan Museum",
    description: "Planning and coordination for the museum's annual exhibition, including curation, marketing, and event management.",
    team: [
      {
        id: "user-1",
        name: "Alice Chen",
        role: "Project Manager",
        avatar: "https://placehold.co/100x100/1A365D/FFFFFF?text=AC"
      },
      {
        id: "user-12",
        name: "Robert Johnson",
        role: "Curator",
        avatar: "https://placehold.co/100x100/1A365D/FFFFFF?text=RJ"
      },
      {
        id: "user-13",
        name: "Sophia Williams",
        role: "Event Coordinator",
        avatar: "https://placehold.co/100x100/1A365D/FFFFFF?text=SW"
      }
    ],
    tasks: [
      {
        id: "task-17",
        title: "Exhibition Theme Development",
        description: "Finalize exhibition theme and conceptual framework",
        assignee: "user-12",
        status: "completed",
        dueDate: "2023-07-31"
      },
      {
        id: "task-18",
        title: "Artist Selection and Outreach",
        description: "Identify and contact featured artists",
        assignee: "user-12",
        status: "in-progress",
        dueDate: "2023-09-15"
      },
      {
        id: "task-19",
        title: "Marketing Plan Development",
        description: "Create comprehensive marketing strategy for exhibition",
        assignee: "user-1",
        status: "not-started",
        dueDate: "2023-10-31"
      },
      {
        id: "task-20",
        title: "Event Planning",
        description: "Plan opening night and special events",
        assignee: "user-13",
        status: "not-started",
        dueDate: "2023-12-15"
      }
    ],
    updates: [
      {
        id: "update-8",
        date: "2023-08-05",
        author: "user-12",
        content: "Exhibition theme 'Intersections of Identity' approved by board. Beginning artist selection process."
      }
    ],
    viewCount: 1245,
    engagement: 68,
    conversionRate: 2.8,
    roi: 110,
    budget: 250000,
    spent: 62500,
    lastUpdated: "2023-08-05"
  }
];

// Mock function to get a project by ID
export const getProjectById = (id: string): Project | undefined => {
  return testProjects.find(project => project.id === id);
};

// Mock function to get projects by client
export const getProjectsByClient = (clientName: string): Project[] => {
  return testProjects.filter(project => project.client === clientName);
};

// Mock function to get a brand by slug
export const getBrandBySlug = (slug: string): BrandData | undefined => {
  return testBrands.find(brand => brand.slug === slug);
};

// Mock function to get a brand by client name
export const getBrandByClient = (clientName: string): BrandData | undefined => {
  return testBrands.find(brand => brand.client === clientName);
}; 