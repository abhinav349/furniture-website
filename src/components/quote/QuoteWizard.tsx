"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  Hotel,
  Briefcase,
  Check,
  Copy,
  RotateCcw,
  Mail,
} from "lucide-react";
import { productCategories } from "@/lib/data/products";
import { formatNumber, cn } from "@/lib/utils";

type BuildingType = "Residential" | "Commercial" | "Hospitality" | "Office";

interface QuoteFormState {
  buildingType: BuildingType | "";
  sizeSqFt: number;
  categories: string[];
  quantity: number;
  needsCustomization: "yes" | "no" | "";
  customizationNotes: string;
  budget: string;
  delivery: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const buildingTypes: { id: BuildingType; icon: typeof Home; description: string }[] = [
  { id: "Residential", icon: Home, description: "A home, apartment, or villa" },
  { id: "Commercial", icon: Building2, description: "Offices, retail, or workspaces" },
  { id: "Hospitality", icon: Hotel, description: "Hotels, restaurants, or cafes" },
  { id: "Office", icon: Briefcase, description: "A single office fit-out" },
];

const budgetOptions = ["Under ₹5 Lakh", "₹5–20 Lakh", "₹20–50 Lakh", "₹50 Lakh+"];
const deliveryOptions = ["Within 4 weeks", "1–2 months", "2–4 months", "Flexible"];

const steps = [
  "What are you building?",
  "Project size",
  "Furniture categories",
  "Approx. quantity",
  "Customization",
  "Budget range",
  "Expected delivery",
  "Your details",
];

function initialState(prefill?: { type?: string; furnitureType?: string }): QuoteFormState {
  const typeMap: Record<string, BuildingType> = {
    residential: "Residential",
    commercial: "Commercial",
    hospitality: "Hospitality",
    office: "Office",
  };
  const category = productCategories.find((c) => c.id === prefill?.furnitureType)?.label;
  return {
    buildingType: (prefill?.type && typeMap[prefill.type.toLowerCase()]) || "",
    sizeSqFt: 1500,
    categories: category ? [category] : [],
    quantity: 20,
    needsCustomization: "",
    customizationNotes: "",
    budget: "",
    delivery: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  };
}

export function QuoteWizard({
  prefill,
}: {
  prefill?: { type?: string; furnitureType?: string };
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteFormState>(() => initialState(prefill));
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const canAdvance = useMemo(() => {
    if (step === 0) return !!form.buildingType;
    if (step === 2) return form.categories.length > 0;
    if (step === 7) return form.name.trim().length > 0;
    return true;
  }, [step, form]);

  function update<K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleCategory(label: string) {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(label)
        ? f.categories.filter((c) => c !== label)
        : [...f.categories, label],
    }));
  }

  const briefText = useMemo(() => {
    return [
      `Project Brief — Ligna Furniture Co.`,
      `Building: ${form.buildingType}`,
      `Size: ${formatNumber(form.sizeSqFt)} sq ft`,
      `Categories: ${form.categories.join(", ")}`,
      `Approx. quantity: ${form.quantity} pieces`,
      `Customization required: ${form.needsCustomization === "yes" ? "Yes" : "No"}${
        form.customizationNotes ? ` — ${form.customizationNotes}` : ""
      }`,
      `Budget range: ${form.budget}`,
      `Expected delivery: ${form.delivery}`,
      `Contact: ${form.name}${form.company ? `, ${form.company}` : ""}`,
      `Email: ${form.email} ${form.phone ? `· Phone: ${form.phone}` : ""}`,
    ].join("\n");
  }, [form]);

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-paper p-8 lg:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-wood-500">Project Brief Generated</p>
        <h3 className="mt-3 font-display text-3xl text-ink">Thank you, {form.name.split(" ")[0] || "there"}.</h3>
        <p className="mt-2 text-ink-soft">
          Here&apos;s a summary of what you shared. Our B2B team will review it
          and follow up within one business day.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-4 rounded-2xl bg-wood-100/50 p-6 sm:grid-cols-2">
          <Field label="Building" value={form.buildingType} />
          <Field label="Project Size" value={`${formatNumber(form.sizeSqFt)} sq ft`} />
          <Field label="Categories" value={form.categories.join(", ") || "—"} />
          <Field label="Quantity" value={`${form.quantity} pieces`} />
          <Field label="Customization" value={form.needsCustomization === "yes" ? "Required" : "Standard"} />
          <Field label="Budget" value={form.budget || "—"} />
          <Field label="Delivery" value={form.delivery || "—"} />
          <Field label="Contact" value={`${form.name}${form.company ? ` · ${form.company}` : ""}`} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(briefText);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-ink hover:border-ink-soft"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy Brief"}
          </button>
          <a
            href={`mailto:hello@ligna.in?subject=${encodeURIComponent(
              "New Project Brief — " + form.buildingType
            )}&body=${encodeURIComponent(briefText)}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-canvas hover:bg-wood-700"
          >
            <Mail className="h-4 w-4" /> Email This Brief
          </a>
          <button
            onClick={() => {
              setForm(initialState());
              setStep(0);
              setDone(false);
            }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-ink-soft hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" /> Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-paper p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
          Step {step + 1} of {steps.length}
        </p>
        <p className="text-xs text-ink-faint">{steps[step]}</p>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full bg-wood-500"
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="mt-8 min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <div>
                <h3 className="font-display text-2xl text-ink">What are you building?</h3>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {buildingTypes.map(({ id, icon: Icon, description }) => (
                    <button
                      key={id}
                      onClick={() => update("buildingType", id)}
                      className={cn(
                        "flex flex-col gap-2 rounded-2xl border p-5 text-left transition-colors",
                        form.buildingType === id ? "border-ink bg-wood-100/60" : "border-line hover:border-ink-soft"
                      )}
                    >
                      <Icon className="h-5 w-5 text-wood-500" />
                      <span className="font-display text-lg text-ink">{id}</span>
                      <span className="text-xs text-ink-faint">{description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="font-display text-2xl text-ink">How large is the project?</h3>
                <p className="mt-2 text-sm text-ink-faint">Approximate built-up area.</p>
                <div className="mt-8">
                  <p className="font-display text-4xl text-ink">{formatNumber(form.sizeSqFt)} sq ft</p>
                  <input
                    type="range"
                    min={200}
                    max={50000}
                    step={100}
                    value={form.sizeSqFt}
                    onChange={(e) => update("sizeSqFt", Number(e.target.value))}
                    className="mt-5 w-full accent-wood-500"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-faint">
                    <span>200 sq ft</span>
                    <span>50,000+ sq ft</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-2xl text-ink">Which furniture categories?</h3>
                <p className="mt-2 text-sm text-ink-faint">Select all that apply.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {productCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleCategory(c.label)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        form.categories.includes(c.label)
                          ? "border-ink bg-ink text-canvas"
                          : "border-line text-ink-soft hover:border-ink-soft"
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-display text-2xl text-ink">Approximately how many pieces?</h3>
                <div className="mt-8">
                  <p className="font-display text-4xl text-ink">{form.quantity} pieces</p>
                  <input
                    type="range"
                    min={1}
                    max={2000}
                    step={1}
                    value={form.quantity}
                    onChange={(e) => update("quantity", Number(e.target.value))}
                    className="mt-5 w-full accent-wood-500"
                  />
                  <div className="mt-1 flex justify-between text-xs text-ink-faint">
                    <span>1</span>
                    <span>2,000+</span>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-display text-2xl text-ink">Do you need custom specifications?</h3>
                <p className="mt-2 text-sm text-ink-faint">Custom sizing, private labelling, or material matching.</p>
                <div className="mt-6 flex gap-3">
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => update("needsCustomization", v)}
                      className={cn(
                        "rounded-full border px-6 py-2.5 text-sm capitalize transition-colors",
                        form.needsCustomization === v
                          ? "border-ink bg-ink text-canvas"
                          : "border-line text-ink-soft hover:border-ink-soft"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {form.needsCustomization === "yes" && (
                  <textarea
                    value={form.customizationNotes}
                    onChange={(e) => update("customizationNotes", e.target.value)}
                    placeholder="Tell us briefly what you have in mind…"
                    rows={3}
                    className="mt-5 w-full rounded-xl border border-line bg-canvas p-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-ink-soft focus:outline-none"
                  />
                )}
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="font-display text-2xl text-ink">What&apos;s your budget range?</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => update("budget", b)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        form.budget === b
                          ? "border-ink bg-ink text-canvas"
                          : "border-line text-ink-soft hover:border-ink-soft"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="font-display text-2xl text-ink">When do you need it delivered?</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {deliveryOptions.map((d) => (
                    <button
                      key={d}
                      onClick={() => update("delivery", d)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        form.delivery === d
                          ? "border-ink bg-ink text-canvas"
                          : "border-line text-ink-soft hover:border-ink-soft"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h3 className="font-display text-2xl text-ink">A few details to reach you</h3>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    placeholder="Full name *"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="rounded-xl border border-line bg-canvas p-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-ink-soft focus:outline-none"
                  />
                  <input
                    placeholder="Company (optional)"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className="rounded-xl border border-line bg-canvas p-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-ink-soft focus:outline-none"
                  />
                  <input
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="rounded-xl border border-line bg-canvas p-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-ink-soft focus:outline-none"
                  />
                  <input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="rounded-xl border border-line bg-canvas p-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-ink-soft focus:outline-none"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={!canAdvance}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm text-canvas transition-colors hover:bg-wood-700 disabled:opacity-30"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => setDone(true)}
            disabled={!canAdvance}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm text-canvas transition-colors hover:bg-wood-700 disabled:opacity-30"
          >
            Generate Project Brief <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.15em] text-ink-faint">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}
