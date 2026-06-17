"use client";

import { Lock, PlusCircle } from "lucide-react";

const LABELS: Record<string, string> = {
  private_vault:  "Private Vault",
  family_shared:  "Family",
  about_person:   "About Someone",
  recipe:         "Recipe",
  tradition:      "Tradition",
  life_lesson:    "Life Lesson",
  funny_moment:   "Funny Moment",
  holiday:        "Holiday",
  childhood:      "Childhood",
  vacation:       "Vacation",
  place:          "Place",
  theme:          "Theme",
};

interface MemoryCardProps {
  id: string;
  content: string;
  categories: string[];
  visibility: "private" | "family_shared";
  created_at: string;
  people_mentioned?: string[];
  onAddChain?: (memoryId: string) => void;
}

export default function MemoryCard({
  id,
  content,
  categories,
  visibility,
  created_at,
  people_mentioned,
  onAddChain,
}: MemoryCardProps) {
  const date = new Date(created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isVault = categories.includes("private_vault") || visibility === "private";

  return (
    <div className="rounded-3xl border border-ink-900/5 bg-white p-5 shadow-soft">
      {/* Content */}
      <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-800">
        {content}
      </p>

      {/* Category chips */}
      {categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map(cat => {
            const isVaultChip = cat === "private_vault";
            return (
              <span
                key={cat}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isVaultChip
                    ? "bg-ink-900 text-cream-50"
                    : "bg-cream-100 text-ink-700"
                }`}
              >
                {isVaultChip && <Lock size={10} strokeWidth={2} />}
                {LABELS[cat] ?? cat}
              </span>
            );
          })}
        </div>
      )}

      {/* People mentioned */}
      {people_mentioned && people_mentioned.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {people_mentioned.map(person => (
            <span key={person} className="text-xs font-medium text-gold-500">
              @{person}
            </span>
          ))}
        </div>
      )}

      {/* Footer: date + add chain button */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-ink-400">{date}</span>

        {onAddChain && !isVault && (
          <button
            type="button"
            onClick={() => onAddChain(id)}
            className="inline-flex items-center gap-1.5 text-xs text-ink-500 transition-colors hover:text-ink-800"
          >
            <PlusCircle size={14} strokeWidth={1.8} />
            Add to this story
          </button>
        )}
      </div>
    </div>
  );
}
