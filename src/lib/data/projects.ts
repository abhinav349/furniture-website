import type { Project, ProjectCategoryId } from "../types";

export const projectCategories: ProjectCategoryId[] = [
  "Residential",
  "Hotel",
  "Restaurant",
  "Office",
  "Retail",
  "Architecture",
];

export const projects: Project[] = [
  {
    id: "kasliwal-residence",
    title: "The Kasliwal Residence",
    category: "Residential",
    location: "Jaipur",
    year: 2024,
    image: "livingRoomModern",
    scope: "Full interior furnishing",
    pieces: 64,
    description:
      "A six-bedroom family home furnished end to end — living, dining, and bedroom suites in a single cohesive material palette of teak and limestone.",
  },
  {
    id: "worli-sea-face",
    title: "Worli Sea-Face Apartment",
    category: "Residential",
    location: "Mumbai",
    year: 2023,
    image: "apartmentHero",
    scope: "Custom joinery & furniture",
    pieces: 38,
    description:
      "Floor-to-ceiling custom wardrobes and a built-in media wall, paired with freestanding pieces from our Living Room collection.",
  },
  {
    id: "boutique-hotel-goa",
    title: "48-Key Boutique Hotel",
    category: "Hotel",
    location: "Goa",
    year: 2024,
    image: "boutiqueHotelRoom",
    scope: "Guest room & lobby furniture",
    pieces: 312,
    description:
      "Contract-grade casegoods and seating across 48 guest rooms plus the lobby and lounge, delivered and installed in six weeks.",
  },
  {
    id: "cedar-business-hotel",
    title: "The Cedar Business Hotel",
    category: "Hotel",
    location: "Bengaluru",
    year: 2022,
    image: "hotelLobby",
    scope: "Lobby & banquet furniture",
    pieces: 186,
    description:
      "A double-height lobby and three banquet halls furnished with fire-rated, contract-certified seating and tables.",
  },
  {
    id: "smoke-and-char",
    title: "Smoke & Char",
    category: "Restaurant",
    location: "Pune",
    year: 2024,
    image: "restaurant1",
    scope: "Dining & bar furniture",
    pieces: 54,
    description:
      "120-cover restaurant fit-out with custom banquette seating, solid-wood dining tables, and a bespoke bar front.",
  },
  {
    id: "bombay-canteen-annex",
    title: "Bombay Canteen Annex",
    category: "Restaurant",
    location: "Mumbai",
    year: 2023,
    image: "cafe",
    scope: "Cafe seating & fixtures",
    pieces: 41,
    description:
      "A warm, high-turnover cafe interior built around durable laminate tables and powder-coated steel seating.",
  },
  {
    id: "northgate-tech-park",
    title: "Northgate Tech Park Campus",
    category: "Office",
    location: "Hyderabad",
    year: 2023,
    image: "office2",
    scope: "Workstations & meeting rooms",
    pieces: 540,
    description:
      "Desking, storage, and meeting-room furniture for a 1,200-seat campus, delivered in four phased rollouts.",
  },
  {
    id: "meridian-coworking",
    title: "Meridian Coworking",
    category: "Office",
    location: "Delhi NCR",
    year: 2024,
    image: "officeLounge",
    scope: "Lounge & private offices",
    pieces: 128,
    description:
      "A coworking flagship blending lounge-style common areas with private offices, unified under one material story.",
  },
  {
    id: "linen-house-flagship",
    title: "Linen House Flagship",
    category: "Retail",
    location: "Chennai",
    year: 2022,
    image: "retailStore",
    scope: "Retail fixtures & display",
    pieces: 76,
    description:
      "Custom display plinths, shelving, and seating for a 4,000 sq ft flagship store, built to handle daily reconfiguration.",
  },
  {
    id: "ridgeline-residences",
    title: "Ridgeline Residences",
    category: "Architecture",
    location: "Pune",
    year: 2024,
    image: "architectureBuilding",
    scope: "Amenity & show-flat furniture",
    pieces: 94,
    description:
      "Furniture package for the clubhouse, amenity deck, and three show flats of a 220-unit residential development.",
  },
];
