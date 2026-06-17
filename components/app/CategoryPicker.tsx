"use client";

import { Users, Heart, Utensils, TreePine, BookOpen, Smile, Star, Baby, Map, MapPin, Sparkles, Lock, type LucideIcon } from "lucide-react";

type Category = {
  id: string;
  icon: LucideIcon;
  label: string;
};

const CATEGORIES: Category[] = [
  { id: "family_shared",  icon: Users,    label: "Family" },
  { id: "about_person",   icon: Heart,    label: "About Someone" },
  { id: "recipe",         icon: Utensils, label: "Recipe" },
  { id: "tradition",      icon: TreePine, label: "Tradition" },
  { id: "life_lesson",    icon: BookOpen, label: "Life Lesson" },
  { id: "funny_moment",   icon: Smile,    label: "Funny Moment" },
  { id: "holiday",        icon: Star,     label: "Holiday" },
  { id: "childhood",      icon: Baby,     label: "Childhood" },
  { id: "vacation",       icon: Map,      label: "Vacation" },
  { id: "place",          icon: MapPin,   label: "Place" },
  { id: "theme",          icon: Sparkles, label: "Theme" },
  { id: "private_vault",  icon: Lock,     label: "Private Vault" },
];

interface CategoryPickerProps {
  selected: string[];
  onChange: (cats: string[]) => void;
}

export default function CategoryPicker({ selected, onChange }: CategoryPickerProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(c => c !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const hasVault = selected.includes("private_vault");

  return (
    <div>
      <p className="mb-4 text-sm font-medium text-ink-700">
        What kind of memory is this? Pick all that fit.
      </p>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {CATEGORIES.map(cat => {
          const isSelected = selected.includes(cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggle(cat.id)}
              className={`flex min-h-[64px] flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-3 text-xs font-medium transition-colors ${
                isSelected
                  ? "border-ink-900 bg-ink-900 text-cream-50"
                  : "border-ink-900/10 bg-white text-ink-700 hover:bg-cream-50"
              }`}
            >
              <cat.icon size={18} strokeWidth={1.8} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {hasVault && (
        <div className="mt-3 rounded-2xl border border-ink-900/10 bg-ink-900/5 px-4 py-3 text-sm text-ink-700">
          <span className="font-medium">Private Vault:</span> Only you can ever read this, regardless of other settings.
        </div>
      )}
    </div>
  );
}
