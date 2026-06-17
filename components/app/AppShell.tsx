"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Mic,
  BookOpen,
  Heart,
  Utensils,
  Calendar,
  Sparkles,
  Bell,
  Loader2,
  ChevronLeft,
} from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_LYLO_API_URL ||
  "https://lylo.thegoodneighborguard.com";

type View = "home" | "capture" | "people" | "person" | "memories" | "timeline";

interface Session {
  userId: string;
  userName: string;
}

interface LegacyPersonSummary {
  id: string;
  display_name: string;
  relationship?: string;
  memory_count: number;
}

interface MemoryItem {
  id: string;
  content: string;
  categories: string[];
  created_at: string;
}

// Dynamically imported to avoid SSR issues
const VoiceCapture = dynamic(() => import("./VoiceCapture"), { ssr: false });
const PersonPage = dynamic(() => import("./PersonPage"), { ssr: false });

export default function AppShell() {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [view, setView] = useState<View>("home");
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(0);
  const [captureSuccess, setCaptureSuccess] = useState(false);

  // People view state
  const [people, setPeople] = useState<LegacyPersonSummary[] | null>(null);
  const [peopleLoading, setPeopleLoading] = useState(false);

  // Memories view state
  const [memories, setMemories] = useState<MemoryItem[] | null>(null);
  const [memoriesLoading, setMemoriesLoading] = useState(false);

  // Session check
  useEffect(() => {
    fetch(`${API_BASE}/api/_debug/identity`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setSession(data))
      .catch(() => setSession(null))
      .finally(() => setSessionLoading(false));
  }, []);

  // Notification count from localStorage
  useEffect(() => {
    try {
      const notifs = JSON.parse(
        localStorage.getItem("lylo_notification_queue") || "[]"
      );
      setNotifications(
        notifs.filter((n: { delivered: boolean }) => !n.delivered).length
      );
    } catch {
      setNotifications(0);
    }
  }, []);

  // Fetch people when entering that view
  useEffect(() => {
    if (view === "people" && people === null) {
      setPeopleLoading(true);
      fetch(`${API_BASE}/api/legacy/people`, { credentials: "include" })
        .then((r) => r.json())
        .then((data) => setPeople(Array.isArray(data) ? data : data.people || []))
        .catch(() => setPeople([]))
        .finally(() => setPeopleLoading(false));
    }
  }, [view, people]);

  // Fetch memories when entering memories view
  useEffect(() => {
    if (view === "memories" && memories === null) {
      setMemoriesLoading(true);
      fetch(`${API_BASE}/api/memory`, { credentials: "include" })
        .then((r) => r.json())
        .then((data) => setMemories(Array.isArray(data) ? data : data.memories || []))
        .catch(() => setMemories([]))
        .finally(() => setMemoriesLoading(false));
    }
  }, [view, memories]);

  // Auto-clear capture success banner
  useEffect(() => {
    if (captureSuccess) {
      const t = setTimeout(() => setCaptureSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [captureSuccess]);

  const saveToAPI = (result: {
    content: string;
    categories: string[];
    visibility: "private" | "family_shared";
  }) => {
    fetch(`${API_BASE}/api/memory/confirm`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    }).catch(() => {});
  };

  const firstName = session?.userName?.split(" ")[0] || "there";

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

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (sessionLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-cream-50">
        <Loader2 className="h-8 w-8 animate-spin text-ink-500" />
        <p className="font-serif text-lg text-ink-700">Loading LYLO…</p>
      </div>
    );
  }

  // ─── Not signed in ──────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream-50 px-8">
        <p className="font-serif text-4xl text-ink-900 mb-8">LYLO</p>
        <div className="w-full max-w-sm rounded-3xl bg-white shadow-soft border border-ink-900/8 p-8 text-center space-y-4">
          <p className="font-serif text-xl text-ink-800">
            Open LYLO in the app to sign in, then come back here.
          </p>
          <p className="text-sm text-ink-500">
            LYLO requires sign-in to protect your memories.
          </p>
          <a
            href={API_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 rounded-2xl bg-ink-900 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-ink-800 transition-colors"
          >
            Open LYLO
          </a>
        </div>
      </div>
    );
  }

  // ─── Shared nav bar ─────────────────────────────────────────────────────────
  const NavBar = () => (
    <div className="sticky top-0 z-10 bg-cream-50/90 backdrop-blur-sm border-b border-ink-900/6 px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {view !== "home" && (
          <button
            onClick={() => {
              if (view === "person") setView("people");
              else setView("home");
            }}
            className="flex items-center gap-1 rounded-2xl bg-cream-100 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-cream-200 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        )}
        <span className="font-serif text-xl text-ink-900">LYLO</span>
      </div>
      <button className="relative rounded-full p-2 hover:bg-cream-100 transition-colors">
        <Bell className="h-5 w-5 text-ink-600" />
        {notifications > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {notifications > 9 ? "9+" : notifications}
          </span>
        )}
      </button>
    </div>
  );

  // ─── Capture view ───────────────────────────────────────────────────────────
  if (view === "capture") {
    return (
      <div className="min-h-screen bg-cream-50">
        <NavBar />
        {captureSuccess && (
          <div className="bg-gold-400 text-ink-900 text-sm font-medium text-center py-2.5 px-4">
            Memory saved successfully!
          </div>
        )}
        <div className="px-5 py-6 max-w-xl mx-auto">
          <VoiceCapture
            onSaved={async (result) => {
              saveToAPI(result);
              setCaptureSuccess(true);
              setView("home");
            }}
            onCancel={() => setView("home")}
          />
        </div>
      </div>
    );
  }

  // ─── Person view ────────────────────────────────────────────────────────────
  if (view === "person" && selectedPersonId) {
    return (
      <PersonPage
        personId={selectedPersonId}
        onBack={() => setView("people")}
      />
    );
  }

  // ─── People view ────────────────────────────────────────────────────────────
  if (view === "people") {
    return (
      <div className="min-h-screen bg-cream-50">
        <NavBar />
        <div className="px-5 py-6 max-w-xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl text-ink-900">Your People</h2>
          {peopleLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-ink-400" />
            </div>
          ) : !people || people.length === 0 ? (
            <div className="rounded-3xl bg-cream-100 p-8 text-center">
              <p className="font-serif text-lg text-ink-600">
                No people saved yet.
              </p>
              <p className="mt-1 text-sm text-ink-400">
                Mention someone&apos;s name while recording a story and LYLO
                will remember them.
              </p>
            </div>
          ) : (
            people.map((person) => (
              <button
                key={person.id}
                onClick={() => {
                  setSelectedPersonId(person.id);
                  setView("person");
                }}
                className="w-full rounded-3xl bg-white shadow-soft border border-ink-900/6 p-5 flex items-center gap-4 text-left hover:shadow-warm transition-shadow"
              >
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-cream-100 flex items-center justify-center shrink-0">
                  <span className="font-serif text-xl text-ink-700">
                    {person.display_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-xl text-ink-900 truncate">
                    {person.display_name}
                  </p>
                  {person.relationship && (
                    <p className="text-sm text-ink-500 capitalize mt-0.5">
                      {person.relationship}
                    </p>
                  )}
                </div>
                {/* Memory count */}
                <div className="text-right shrink-0">
                  <p className="text-2xl font-medium text-ink-800">
                    {person.memory_count}
                  </p>
                  <p className="text-xs text-ink-400">
                    {person.memory_count === 1 ? "memory" : "memories"}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  // ─── Memories view ──────────────────────────────────────────────────────────
  if (view === "memories") {
    return (
      <div className="min-h-screen bg-cream-50">
        <NavBar />
        <div className="px-5 py-6 max-w-xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl text-ink-900">Family Stories</h2>
          {memoriesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-ink-400" />
            </div>
          ) : !memories || memories.length === 0 ? (
            <div className="rounded-3xl bg-cream-100 p-8 text-center">
              <p className="font-serif text-lg text-ink-600">
                No stories saved yet.
              </p>
              <p className="mt-1 text-sm text-ink-400">
                Record your first story to get started.
              </p>
            </div>
          ) : (
            memories.map((memory) => (
              <div
                key={memory.id}
                className="rounded-3xl bg-white shadow-soft border border-ink-900/6 p-5"
              >
                <p
                  className="text-ink-800 text-[15px] leading-relaxed"
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
        </div>
      </div>
    );
  }

  // ─── Timeline view ──────────────────────────────────────────────────────────
  if (view === "timeline") {
    return (
      <div className="min-h-screen bg-cream-50">
        <NavBar />
        <div className="px-5 py-12 max-w-xl mx-auto text-center space-y-3">
          <Calendar className="mx-auto h-12 w-12 text-sky-600 opacity-60" />
          <h2 className="font-serif text-2xl text-ink-900">Your Timeline</h2>
          <p className="text-ink-500">
            Coming soon — your memories arranged by time.
          </p>
        </div>
      </div>
    );
  }

  // ─── Home view ──────────────────────────────────────────────────────────────
  const homeButtons = [
    {
      label: "Record a Story",
      description: "Talk — LYLO listens",
      icon: Mic,
      iconBg: "bg-gold-50",
      iconColor: "text-gold-500",
      onClick: () => setView("capture"),
    },
    {
      label: "Family Stories",
      description: "Browse everything saved",
      icon: BookOpen,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-700",
      onClick: () => setView("memories"),
    },
    {
      label: "About Someone",
      description: "Stories about the people you love",
      icon: Heart,
      iconBg: "bg-cream-100",
      iconColor: "text-ink-700",
      onClick: () => setView("people"),
    },
    {
      label: "Save a Recipe",
      description: "Preserve a family recipe",
      icon: Utensils,
      iconBg: "bg-gold-50",
      iconColor: "text-gold-500",
      onClick: () => setView("capture"),
    },
    {
      label: "My Timeline",
      description: "See your memories over time",
      icon: Calendar,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      onClick: () => setView("timeline"),
    },
    {
      label: "What's New",
      description: "Recent family activity",
      icon: Sparkles,
      iconBg: "bg-cream-100",
      iconColor: "text-gold-400",
      onClick: () => setView("timeline"),
    },
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      <NavBar />

      {/* Success banner */}
      {captureSuccess && (
        <div className="bg-gold-400 text-ink-900 text-sm font-medium text-center py-2.5 px-4">
          Memory saved! Keep going.
        </div>
      )}

      <div className="px-5 py-8 max-w-xl mx-auto">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-ink-900">
            Hello, {firstName}.
          </h1>
          <p className="mt-1.5 text-lg text-ink-600">
            What would you like to do today?
          </p>
        </div>

        {/* 2-column button grid */}
        <div className="grid grid-cols-2 gap-3">
          {homeButtons.map(
            ({ label, description, icon: Icon, iconBg, iconColor, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="rounded-3xl bg-white border border-ink-900/8 shadow-soft p-5 min-h-[88px] flex items-center gap-4 text-left hover:shadow-warm transition-shadow active:scale-[0.98]"
              >
                <div
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-lg text-ink-900 leading-tight">
                    {label}
                  </p>
                  <p className="text-xs text-ink-500 mt-1 leading-snug">
                    {description}
                  </p>
                </div>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
