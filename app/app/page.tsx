import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/app/AppShell"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-cream-50">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink-900 border-t-transparent" />
        <p className="mt-4 font-serif text-xl text-ink-800">LYLO</p>
        <p className="mt-1 text-sm text-ink-500">Loading your memories...</p>
      </div>
    </div>
  ),
});

export default function AppPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <AppShell />
    </div>
  );
}
