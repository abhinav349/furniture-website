"use client";

import { Reveal } from "@/components/ui/Reveal";
import { QuoteWizard } from "@/components/quote/QuoteWizard";

export function SmartQuote({ prefill }: { prefill?: { type?: string; furnitureType?: string } }) {
  return (
    <section id="quote" className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Smart Quote</p>
          <h2 className="mt-3 font-display text-4xl lg:text-5xl">What are you building?</h2>
          <p className="mt-4 text-ink-soft">
            Answer a few questions and we&apos;ll generate a project brief you
            can send straight to our team.
          </p>
        </Reveal>

        <div className="mt-12">
          <QuoteWizard prefill={prefill} />
        </div>
      </div>
    </section>
  );
}
