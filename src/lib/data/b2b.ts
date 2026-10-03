export interface B2BCapability {
  id: string;
  title: string;
  description: string;
}

export const b2bAudiences = [
  "Hotels",
  "Restaurants",
  "Cafes",
  "Office Spaces",
  "Interior Designers",
  "Architects",
  "Builders",
  "Real Estate Developers",
];

export const b2bCapabilities: B2BCapability[] = [
  {
    id: "bulk",
    title: "Bulk Manufacturing",
    description:
      "Production runs from 50 to 5,000+ units without a dip in consistency or finish quality.",
  },
  {
    id: "custom-dimensions",
    title: "Custom Dimensions",
    description:
      "Every piece can be resized to your floor plan — no forcing a project around catalogue sizes.",
  },
  {
    id: "private-labeling",
    title: "Private Labelling",
    description:
      "White-label production for brands and hospitality groups who sell furniture under their own name.",
  },
  {
    id: "project-pricing",
    title: "Project-Based Pricing",
    description:
      "Transparent, volume-tiered pricing quoted against your full project scope, not per-item retail.",
  },
  {
    id: "cad-support",
    title: "CAD Support",
    description:
      "Working drawings and 3D files for architects and designers, reviewed and revised with our in-house studio.",
  },
  {
    id: "sourcing",
    title: "Material Sourcing",
    description:
      "Direct access to our vetted supply chain across solid wood, veneer, metal, and stone.",
  },
  {
    id: "large-volume",
    title: "Large-Volume Production",
    description:
      "Six dedicated production lines mean large orders run in parallel, not in a queue behind retail.",
  },
  {
    id: "pan-india",
    title: "Pan-India Delivery",
    description:
      "Our own logistics fleet installs across 42 cities, with white-glove placement on every order.",
  },
];
