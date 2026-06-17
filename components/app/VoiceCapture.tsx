"use client";

import { useState, useRef, useCallback } from "react";
import { Mic, MicOff, CheckCircle2, Loader2, ArrowRight, X } from "lucide-react";
import CategoryPicker from "./CategoryPicker";

type Step = "idle" | "requesting" | "recording" | "stopped" | "categorizing" | "saving" | "saved";

interface VoiceCaptureProps {
  onSaved: (result: { content: string; categories: string[]; visibility: "private" | "family_shared" }) => void;
  onCancel: () => void;
}

export default function VoiceCapture({ onSaved, onCancel }: VoiceCaptureProps) {
  const [step, setStep] = useState<Step>("idle");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string[]>(["family_shared"]);
  const [visibility, setVisibility] = useState<"private" | "family_shared">("family_shared");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [noMic, setNoMic] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setNoMic(true);
      setStep("stopped");
      return;
    }
    setStep("requesting");
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        setStep("stopped");
      };
      recorderRef.current = recorder;
      recorder.start(250);
      setStep("recording");
    } catch {
      setError("Could not access microphone. You can type your story instead.");
      setNoMic(true);
      setStep("stopped");
    }
  }, []);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    recorderRef.current = null;
  }, []);

  const handleSave = useCallback(async () => {
    if (!content.trim()) return;
    setStep("saving");
    const finalVisibility = categories.includes("private_vault") ? "private" : visibility;
    await new Promise(r => setTimeout(r, 600));
    onSaved({ content: content.trim(), categories, visibility: finalVisibility });
    setStep("saved");
  }, [content, categories, visibility, onSaved]);

  const effectiveVisibility = categories.includes("private_vault") ? "private" : visibility;

  if (step === "saved") {
    return (
      <div className="flex flex-col items-center gap-5 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-900">
          <CheckCircle2 size={36} strokeWidth={1.5} className="text-cream-50" />
        </div>
        <h2 className="font-serif text-3xl text-ink-900">Memory saved.</h2>
        <p className="max-w-xs text-lg text-ink-600">
          {effectiveVisibility === "private"
            ? "Saved to your Private Vault. Only you can read this."
            : "Saved. Your family will be able to see this."}
        </p>
      </div>
    );
  }

  if (step === "saving") {
    return (
      <div className="flex flex-col items-center gap-5 py-12 text-center">
        <Loader2 size={40} className="animate-spin text-ink-700" />
        <p className="font-serif text-2xl text-ink-800">Saving your story...</p>
      </div>
    );
  }

  if (step === "categorizing") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStep("stopped")}
            className="rounded-full p-2 text-ink-600 hover:bg-cream-100"
            aria-label="Go back"
          >
            <X size={20} />
          </button>
          <h2 className="font-serif text-2xl text-ink-900">What kind of story is this?</h2>
        </div>

        <CategoryPicker selected={categories} onChange={setCategories} />

        {!categories.includes("private_vault") && (
          <div>
            <p className="mb-3 text-sm font-medium text-ink-700">Who can see this?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setVisibility("family_shared")}
                className={`flex-1 rounded-2xl border py-3 text-sm font-medium transition-colors ${
                  visibility === "family_shared"
                    ? "border-ink-900 bg-ink-900 text-cream-50"
                    : "border-ink-900/10 bg-white text-ink-700 hover:bg-cream-50"
                }`}
              >
                My Family
              </button>
              <button
                type="button"
                onClick={() => setVisibility("private")}
                className={`flex-1 rounded-2xl border py-3 text-sm font-medium transition-colors ${
                  visibility === "private"
                    ? "border-ink-900 bg-ink-900 text-cream-50"
                    : "border-ink-900/10 bg-white text-ink-700 hover:bg-cream-50"
                }`}
              >
                Just Me
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={categories.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 py-4 text-lg font-medium text-cream-50 shadow-soft disabled:opacity-40"
        >
          Save this memory
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  if (step === "stopped") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="rounded-full p-2 text-ink-600 hover:bg-cream-100"
            aria-label="Cancel"
          >
            <X size={20} />
          </button>
          <h2 className="font-serif text-2xl text-ink-900">
            {noMic ? "Type your story" : "Your recording"}
          </h2>
        </div>

        {error && (
          <div className="rounded-2xl bg-cream-100 px-4 py-3 text-sm text-ink-700">{error}</div>
        )}

        {audioUrl && !noMic && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio controls src={audioUrl} className="w-full rounded-2xl" />
        )}

        <div>
          <label htmlFor="transcript" className="mb-2 block text-sm font-medium text-ink-700">
            In your own words...
          </label>
          <textarea
            id="transcript"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            placeholder="Write what you want to preserve. It doesn't have to be perfect — just real."
            className="w-full rounded-2xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-base leading-relaxed text-ink-900 placeholder:text-ink-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-200"
          />
        </div>

        <button
          type="button"
          onClick={() => setStep("categorizing")}
          disabled={!content.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 py-4 text-lg font-medium text-cream-50 shadow-soft disabled:opacity-40"
        >
          Next: choose tags
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  if (step === "recording") {
    return (
      <div className="flex flex-col items-center gap-8 py-8 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-8 w-8 animate-ping rounded-full bg-red-200 opacity-75" />
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
            <div className="h-3 w-3 rounded-full bg-white" />
          </div>
        </div>
        <p className="font-serif text-2xl text-ink-800">Recording...</p>
        <p className="text-ink-500">Speak naturally. Tap Stop when you&apos;re done.</p>
        <button
          type="button"
          onClick={stopRecording}
          className="flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-full bg-ink-900 text-cream-50 shadow-warm transition-transform active:scale-95"
          aria-label="Stop recording"
        >
          <MicOff size={28} strokeWidth={1.8} />
          <span className="text-xs font-medium">Stop</span>
        </button>
        <button onClick={onCancel} className="text-sm text-ink-400 underline">
          Cancel
        </button>
      </div>
    );
  }

  if (step === "requesting") {
    return (
      <div className="flex flex-col items-center gap-5 py-12 text-center">
        <Loader2 size={36} className="animate-spin text-ink-700" />
        <p className="font-serif text-2xl text-ink-800">Getting your microphone...</p>
      </div>
    );
  }

  // idle
  return (
    <div className="flex flex-col items-center gap-8 py-8 text-center">
      <div>
        <h2 className="font-serif text-3xl text-ink-900">Record a story.</h2>
        <p className="mt-2 text-lg text-ink-600">
          Just talk. LYLO will preserve exactly what you say.
        </p>
      </div>

      <button
        type="button"
        onClick={startRecording}
        className="flex h-32 w-32 flex-col items-center justify-center gap-3 rounded-full bg-ink-900 text-cream-50 shadow-warm transition-transform hover:scale-105 active:scale-95"
        aria-label="Start recording"
      >
        <Mic size={40} strokeWidth={1.5} />
        <span className="text-sm font-medium">Tap to record</span>
      </button>

      <button
        type="button"
        onClick={() => { setNoMic(true); setStep("stopped"); }}
        className="text-base text-ink-500 underline underline-offset-2"
      >
        Type instead
      </button>

      <button onClick={onCancel} className="text-sm text-ink-400">
        Cancel
      </button>
    </div>
  );
}
