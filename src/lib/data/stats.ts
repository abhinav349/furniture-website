export interface TrustStat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const trustStats: TrustStat[] = [
  { id: "years", value: 20, suffix: "+", label: "Years Manufacturing" },
  { id: "products", value: 50000, suffix: "+", label: "Products Delivered" },
  { id: "clients", value: 500, suffix: "+", label: "Business Clients" },
  { id: "factory", value: 150000, suffix: " sq ft", label: "Factory Footprint" },
  { id: "capacity", value: 2500, suffix: "+ / mo", label: "Production Capacity" },
];

export interface FactoryCapability {
  id: string;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
}

export const factoryCapabilities: FactoryCapability[] = [
  {
    id: "capacity",
    title: "Factory Capacity",
    value: 150000,
    suffix: " sq ft",
    description: "Under one roof across three manufacturing halls.",
  },
  {
    id: "machines",
    title: "Machines",
    value: 120,
    suffix: "+",
    description: "CNC routers, edge banders, and precision presses.",
  },
  {
    id: "lines",
    title: "Production Lines",
    value: 6,
    description: "Dedicated lines for seating, casegoods, dining, and metal.",
  },
  {
    id: "qc",
    title: "Quality Control",
    value: 42,
    suffix: "-Point",
    description: "Inspection checklist on structural, finish & hardware.",
  },
  {
    id: "sourcing",
    title: "Material Sourcing",
    value: 9,
    suffix: " States",
    description: "Certified domestic timber plus vetted imports.",
  },
  {
    id: "logistics",
    title: "Logistics",
    value: 42,
    suffix: " Cities",
    description: "Delivered by our own white-glove fleet, pan-India.",
  },
];

export interface FlowStage {
  id: string;
  label: string;
}

export const factoryFlow: FlowStage[] = [
  { id: "intake", label: "Material Intake" },
  { id: "machining", label: "Machining" },
  { id: "assembly", label: "Assembly" },
  { id: "finishing", label: "Finishing" },
  { id: "qc", label: "Quality Check" },
  { id: "packaging", label: "Packaging" },
  { id: "dispatch", label: "Dispatch" },
];
