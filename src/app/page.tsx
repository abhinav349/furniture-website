import { Hero } from "@/components/sections/Hero";
import { FactoryStory } from "@/components/sections/FactoryStory";
import { Showroom } from "@/components/sections/Showroom";
import { ConfiguratorSection } from "@/components/sections/ConfiguratorSection";
import { B2B } from "@/components/sections/B2B";
import { FactoryTransparency } from "@/components/sections/FactoryTransparency";
import { Projects } from "@/components/sections/Projects";
import { Materials } from "@/components/sections/Materials";
import { SmartQuote } from "@/components/sections/SmartQuote";
import { TrustStats } from "@/components/sections/TrustStats";

export default function Home() {
  return (
    <>
      <Hero />
      <FactoryStory />
      <Showroom limit={6} />
      <ConfiguratorSection />
      <B2B />
      <FactoryTransparency />
      <Projects limit={6} />
      <Materials limit={12} />
      <TrustStats />
      <SmartQuote />
    </>
  );
}
