import type { ProcessStage } from "../types";

export const processStages: ProcessStage[] = [
  {
    id: "raw-material",
    index: 0,
    title: "Raw Material",
    description:
      "Every piece begins at the timber yard. We hand-select kiln-dried hardwood, sourced from certified sustainable forests, and let it season until it's stable enough to outlast generations.",
    image: "woodPlanks",
  },
  {
    id: "design",
    index: 1,
    title: "Design",
    description:
      "Our in-house studio drafts every joint and curve before a single cut is made — full working drawings, load calculations, and material take-offs, refined over 27 years of practice.",
    image: "blueprintSketch2",
    stat: { value: 27, label: "Years of Craft" },
  },
  {
    id: "cutting",
    index: 2,
    title: "Cutting",
    description:
      "CNC precision meets hand-finishing. Panels and components are cut to tolerances of under a millimetre, minimising waste and ensuring every batch matches the drawing exactly.",
    image: "sawdustCutting",
  },
  {
    id: "joinery",
    index: 3,
    title: "Joinery",
    description:
      "Mortise, tenon, and dovetail — joined by hand by carpenters who've spent decades at the bench. No shortcuts, no staples where a joint should be.",
    image: "carpenterWorkshop",
  },
  {
    id: "polishing",
    index: 4,
    title: "Polishing",
    description:
      "Multiple coats of hand-rubbed finish, sanded between each pass. The grain is never hidden — only deepened, until the surface feels as good as it looks.",
    image: "craftsmanHands",
  },
  {
    id: "quality-check",
    index: 5,
    title: "Quality Check",
    description:
      "A 42-point inspection for structural load, finish consistency, and hardware tolerance. Nothing ships until it passes every one — 18,000+ pieces and counting have.",
    image: "qualityControl2",
    stat: { value: 18000, suffix: "+", label: "Pieces Crafted" },
  },
  {
    id: "delivery",
    index: 6,
    title: "Delivery",
    description:
      "White-glove packaging and our own logistics fleet carry every order from factory floor to final placement — across 42 cities and counting.",
    image: "deliveryLogistics",
    stat: { value: 42, label: "Cities Delivered" },
  },
];
