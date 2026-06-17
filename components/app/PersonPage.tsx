"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_LYLO_API_URL ||
  "https://lylo.thegoodneighborguard.com";

interface LegacyPerson {
  id: string;
  display_name: string;
  relationship?: string;
  confirmed: boolean;
  memory_count: number;
  recipe_count: number;
  direct_message_count: number;
  total_mentions?: number;
}

interface Memory {
  id: string;
  content: string;
  categories: string[];
  visibility: "private" | "family_shared";
  created_at: string;
  owner_id: string;
  people_mentioned?: string[];
}

interface StoryModeResult {
  narrative: string;
  source_memory_ids: string[];
  gaps_noted: string[];
  confidence_note: string;
  memory_count: number;
  generated_at: string;
  grounded: boolean;
}

interface PersonPageProps {
  personId: string;
  onBack: () => void;
}

export default function PersonPage({ personId, onBack }: PersonPageProps) {
  const [person, setPerson] = useState<LegacyPerson | null>(null);
  const [memories, setMemories] = useState<Memory[] | null>(null);
  const [view, setView] = useState<"memories" | "story">("memories");
  const [story, setStory] = useState<StoryModeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [storyLoading, setStoryLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/legacy/people/${personId}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        setPerson(data.profile);
        setMemories(data.memories || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [personId]);

  const fetchStory = async () => {
    setStoryLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/legacy/people/${personId}/story`,
        { credentials: "include" }
      );
      const data = await res.json();
      setStory({ ...data, grounded: true });
      setView("story");
    } catch {
      /* ignore */
    } finally {
      setStoryLoading(false);
    }
  };

  const handleStoryTab = () => {
    if (story) {
      setView("story");
    } else {
      fetchStory();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-50">
        <Loader2 className="h-8 w-8 animate-spin text-ink-500" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream-50 px-6">
        <p className="font-serif text-xl text-ink-700">Person not found.</p>
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-2xl bg-cream-100 px-5 py-2.5 text-sm font-medium text-ink-700 hover:bg-cream-200 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    );
  }

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header row */}
      <div className="sticky top-0 z-10 bg-cream-50/90 backdrop-blur-sm border-b border-ink-900/6 px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 rounded-2xl bg-cream-100 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-cream-200 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-2xl text-ink-900 truncate">
              {person.display_name}
            </h1>
            {person.relationship && (
              <p className="text-sm text-ink-500 capitalize mt-0.5">
                {person.relationship}
              </p>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <span className="bg-cream-100 rounded-2xl px-4 py-2 text-sm text-ink-700 font-medium">
            {person.memory_count}{" "}
            <span className="text-ink-500 font-normal">
              {person.memory_count === 1 ? "memory" : "memories"}
            </span>
          </span>
          <span className="bg-cream-100 rounded-2xl px-4 py-2 text-sm text-ink-700 font-medium">
            {person.recipe_count}{" "}
            <span className="text-ink-500 font-normal">
              {person.recipe_count === 1 ? "recipe" : "recipes"}
            </span>
          </span>
          <span className="bg-cream-100 rounded-2xl px-4 py-2 text-sm text-ink-700 font-medium">
            {person.direct_message_count}{" "}
            <span className="text-ink-500 font-normal">
              {person.direct_message_count === 1 ? "message" : "messages"}
            </span>
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setView("memories")}
            className={`flex-1 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
              view === "memories"
                ? "bg-ink-900 text-cream-50"
                : "bg-cream-100 text-ink-700 hover:bg-cream-200"
            }`}
          >
            Memories
          </button>

          {/* Story tab — guarded by memory count */}
          {memories !== null && memories.length === 0 ? (
            <div className="flex-1 rounded-2xl px-4 py-2.5 text-sm text-ink-400 bg-cream-100 text-center cursor-default select-none">
              No memories yet
            </div>
          ) : (
            <button
              onClick={handleStoryTab}
              disabled={storyLoading}
              className={`flex-1 flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                view === "story"
                  ? "bg-ink-900 text-cream-50"
                  : "bg-gold-50 text-gold-500 hover:bg-gold-100"
              } disabled:opacity-60`}
            >
              {storyLoading && (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              )}
              Tell me their story
            </button>
          )}
        </div>

        {/* Grounding guard message */}
        {memories !== null && memories.length === 0 && (
          <p className="mt-3 text-sm text-ink-500 bg-cream-100 rounded-2xl px-4 py-3">
            No memories preserved for {person.display_name} yet. Record some
            stories first.
          </p>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-5 space-y-4 max-w-xl mx-auto">
        {/* MEMORIES VIEW */}
        {view === "memories" && (
          <>
            {memories === null ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-ink-400" />
              </div>
            ) : memories.length === 0 ? (
              <div className="rounded-3xl bg-cream-100 p-8 text-center">
                <p className="font-serif text-lg text-ink-600">
                  No memories saved yet.
                </p>
                <p className="mt-1 text-sm text-ink-400">
                  Start recording stories that mention {person.display_name}.
                </p>
              </div>
            ) : (
              memories.map((memory) => (
                <div
                  key={memory.id}
                  className="rounded-3xl bg-white shadow-soft p-5 border border-ink-900/6"
                >
                  <p
                    className="text-ink-800 text-[15px] leading-relaxed overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {memory.content}
                  </p>
                  <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                    <div className="flex gap-1.5 flex-wrap">
                      {memory.categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-cream-100 px-2.5 py-0.5 text-xs text-ink-600 capitalize"
                        >
                          {cat.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-ink-400 shrink-0">
                      {formatDate(memory.created_at)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* STORY VIEW */}
        {view === "story" && (
          <>
            {storyLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-gold-400" />
                <p className="text-sm text-ink-500">
                  Weaving their story together…
                </p>
              </div>
            ) : story ? (
              <div className="space-y-4">
                {/* Grounded refusal check */}
                {story.grounded === false ? (
                  <div className="rounded-3xl bg-cream-200 border border-ink-900/10 p-6 text-center">
                    <p className="font-serif text-lg text-ink-800">
                      Not enough to go on yet.
                    </p>
                    <p className="mt-2 text-sm text-ink-600">
                      {story.narrative ||
                        "Record more memories to generate a story."}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Narrative card */}
                    <div className="rounded-3xl bg-cream-50 border border-ink-900/8 shadow-warm p-6">
                      <p className="font-serif text-[17px] leading-relaxed text-ink-800 whitespace-pre-wrap">
                        {story.narrative}
                      </p>
                    </div>

                    {/* Source count */}
                    <p className="text-sm text-ink-500 text-center">
                      Based on{" "}
                      <span className="font-medium text-ink-700">
                        {story.memory_count}
                      </span>{" "}
                      preserved{" "}
                      {story.memory_count === 1 ? "memory" : "memories"}
                    </p>

                    {/* Confidence note */}
                    {story.confidence_note && (
                      <p className="text-xs text-ink-400 text-center italic px-4">
                        {story.confidence_note}
                      </p>
                    )}

                    {/* Gaps noted */}
                    {story.gaps_noted && story.gaps_noted.length > 0 && (
                      <div className="rounded-2xl bg-gold-50 border border-gold-200 p-4">
                        <p className="text-sm font-medium text-gold-500 mb-2">
                          Gaps in this story
                        </p>
                        <ul className="space-y-1">
                          {story.gaps_noted.map((gap, i) => (
                            <li
                              key={i}
                              className="text-sm text-ink-600 flex gap-2"
                            >
                              <span className="text-gold-400 shrink-0">·</span>
                              {gap}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
