// Verified Unsplash photo IDs, grouped by subject. Every ID below was checked
// with a live HTTP request before being added — do not add new IDs without
// verifying them the same way, since an unverified hash can 404 silently.
const ids = {
  livingRoomModern: "1586023492125-27b2c045efd7",
  livingRoom2: "1567538096630-e0c55bd6374c",
  livingRoomSofa: "1540574163026-643ea20ade25",
  livingRoom3: "1493663284031-b7e3aefcae8e",
  livingRoom4: "1533090161767-e6ffed986c88",
  sofaGrey: "1555041469-a586c61ea9bc",
  modernLivingHero: "1616486338812-3dadae4b4ace",
  modernLivingHero2: "1616137422495-1e9e46e2aa77",
  apartmentHero: "1484101403633-562f891dc89a",
  apartmentHero2: "1556911220-bff31c812dba",

  chair1: "1631679706909-1844bbd07221",
  chair2: "1538688525198-9b88f6f53126",
  chair3: "1505843513577-22bb7d21e455",

  diningTable: "1592078615290-033ee584e267",
  diningRoom: "1617806118233-18e1de247200",

  bedroom1: "1595526114035-0d45ed16cfbf",
  bedroom2: "1540518614846-7eded433c457",
  bedroom3: "1522771739844-6a9f6d5f14af",
  bedroom4: "1505691938895-1758d7feb511",

  officeDesk: "1519710164239-da123dc03ef4",
  office2: "1524758631624-e2822e304c36",
  office3: "1497366216548-37526070297c",
  officeLounge: "1587825140708-dfaf72ae4b04",

  hotelLobby: "1504384308090-c894fdcc538d",
  hotel2: "1551882547-ff40c63fe5fa",
  hotelRoom: "1551776235-dde6d482980b",
  boutiqueHotelRoom: "1631049307264-da0ec9d70304",
  hospitalityLounge: "1582582621959-48d27397dc69",

  restaurant1: "1517248135467-4c7edcad34c4",
  restaurant2: "1559339352-11d035aa65de",
  cafe: "1576675466969-38eeae4b41f6",

  retailStore: "1441986300917-64674bd600d8",

  residentialExterior: "1512917774080-9991f1c4c750",
  residentialExterior2: "1600596542815-ffad4c1539a9",
  architectureBuilding: "1565538810643-b5bdb714032a",
  architecture2: "1486406146926-c627a92ad1ab",
  architecture3: "1448630360428-65456885c650",

  woodTexture: "1604014237800-1c9102c219da",
  woodPlanks: "1516455590571-18256e5bb9ff",
  plywood: "1621905251918-48416bd8575a",
  veneer: "1615873968403-89e068629265",
  laminate: "1600132806370-bf17e65e942f",
  metalTexture: "1507003211169-0a1dd7228f2d",
  metalTexture2: "1592194996308-7b43878e84a6",
  metalTexture3: "1504917595217-d4dc5ebe6122",
  glassTexture: "1578500494198-246f612d3b3d",
  glassTexture2: "1557682250-33bd709cbe85",
  marbleStone: "1618221195710-dd6b41faaea6",
  marbleStone2: "1600121848594-d8644e57abab",
  fabricTexture: "1620799140408-edc6dcb6d633",
  leatherTexture: "1558618666-fcd25c85cd64",

  carpenterWorkshop: "1504148455328-c376907d081c",
  sawdustCutting: "1588854337236-6889d631faa8",
  furnitureFactory: "1565193566173-7a0ee3dbe261",
  craftsmanHands: "1517957754642-2870518e16f8",
  blueprintSketch: "1560185893-a55cbc8c57e8",
  blueprintSketch2: "1581094288338-2314dddb7ece",
  qualityControl2: "1556228453-efd6c1ff04f6",
  qualityControl3: "1581093588401-fbb62a02f120",
  packagingBoxes: "1586528116311-ad8dd3c8310d",
  deliveryLogistics: "1526367790999-0150786686a2",
  factoryMachine: "1565608438257-fac3c27beb36",
  productionLine: "1565610222536-ef125c59da2e",
} as const;

export type ImageKey = keyof typeof ids;

export function img(key: ImageKey, width = 1600, quality = 80) {
  return `https://images.unsplash.com/photo-${ids[key]}?auto=format&fit=crop&w=${width}&q=${quality}`;
}
