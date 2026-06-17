export default function Page() {
return ( <main className="min-h-screen bg-warm-gradient text-[#1F1B17]"> <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center"> <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#8A6A2F]">
LYLO </p>

```
    <h1 className="max-w-5xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
      LYLO isn&apos;t about death. It&apos;s about continuing life.
    </h1>

    <p className="mt-8 max-w-3xl text-2xl font-semibold text-[#4A4036] md:text-3xl">
      Preserve your stories. Strengthen your relationships. Be remembered.
    </p>

    <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5F554B] md:text-xl">
      LYLO helps families capture stories, recipes, traditions, photos, and everyday
      moments while they&apos;re still being lived, so those memories can keep
      creating connection for years to come.
    </p>

    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
      <a
        href="#demo"
        className="rounded-full bg-[#1F1B17] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
      >
        See how it works
      </a>
      <a
        href="#vision"
        className="rounded-full border border-[#D4A85A] bg-white/70 px-8 py-4 text-lg font-semibold text-[#1F1B17] shadow-sm transition hover:scale-[1.02]"
      >
        Learn the vision
      </a>
    </div>
  </section>

  <section id="demo" className="px-6 py-20">
    <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/80 p-8 shadow-xl md:p-12">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8A6A2F]">
        The moment LYLO creates
      </p>

      <h2 className="text-4xl font-bold md:text-5xl">
        Dad was thinking about you.
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-[#E7D9BC] bg-[#FDFBF6] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8A6A2F]">
            Step 1
          </p>
          <h3 className="mt-4 text-2xl font-bold">A story is told</h3>
          <p className="mt-4 leading-7 text-[#5F554B]">
            Steve remembers something about his daughter Emma. He opens LYLO,
            taps the microphone, and says, “I want to save a story about Emma.”
          </p>
        </div>

        <div className="rounded-3xl border border-[#E7D9BC] bg-[#FDFBF6] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8A6A2F]">
            Step 2
          </p>
          <h3 className="mt-4 text-2xl font-bold">LYLO connects it</h3>
          <p className="mt-4 leading-7 text-[#5F554B]">
            The memory is preserved and connected to Emma, childhood, family
            vacations, funny moments, and the people who may one day treasure it.
          </p>
        </div>

        <div className="rounded-3xl border border-[#E7D9BC] bg-[#FDFBF6] p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8A6A2F]">
            Step 3
          </p>
          <h3 className="mt-4 text-2xl font-bold">A new call happens</h3>
          <p className="mt-4 leading-7 text-[#5F554B]">
            Days later Emma sees, “Your dad shared a new story about you.”
            She calls home. They laugh. LYLO didn&apos;t just save a memory.
            It helped create another one.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-[#1F1B17] p-8 text-white">
        <p className="text-2xl font-bold md:text-3xl">
          “Your dad shared a new story about you this week.”
        </p>
        <p className="mt-4 text-lg leading-8 text-white/80">
          That message is not just a notification. It is a reason to call,
          reconnect, ask another question, and keep the story going.
        </p>
      </div>
    </div>
  </section>

  <section className="px-6 py-20">
    <div className="mx-auto max-w-6xl">
      <h2 className="max-w-4xl text-4xl font-bold md:text-5xl">
        LYLO does not preserve conversations. It preserves relationships.
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white/80 p-8 shadow">
          <h3 className="text-2xl font-bold">Story Threads</h3>
          <p className="mt-4 leading-8 text-[#5F554B]">
            Memories are connected around people, recipes, places, holidays,
            life stages, traditions, and themes. One memory can be found many ways.
          </p>
        </div>

        <div className="rounded-3xl bg-white/80 p-8 shadow">
          <h3 className="text-2xl font-bold">Person Profiles</h3>
          <p className="mt-4 leading-8 text-[#5F554B]">
            A loved one can one day open their own thread and discover the
            stories, recipes, photos, lessons, and messages connected to them.
          </p>
        </div>

        <div className="rounded-3xl bg-white/80 p-8 shadow">
          <h3 className="text-2xl font-bold">Weekly Legacy Letters</h3>
          <p className="mt-4 leading-8 text-[#5F554B]">
            Optional updates can gently show families that stories are being
            preserved, giving them another reason to call while they still can.
          </p>
        </div>

        <div className="rounded-3xl bg-white/80 p-8 shadow">
          <h3 className="text-2xl font-bold">Story Mode</h3>
          <p className="mt-4 leading-8 text-[#5F554B]">
            LYLO can tell a faithful story from preserved memories without
            inventing facts, always keeping the original memories as the source.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section className="px-6 py-20">
    <div className="mx-auto max-w-6xl rounded-[2rem] bg-white/80 p-8 shadow-xl md:p-12">
      <h2 className="text-4xl font-bold md:text-5xl">
        Built for every stage of life.
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {[
          ["Leaving for college", "A parent can preserve stories while their child is away, and those stories can become reasons to call home."],
          ["Raising a family", "Everyday moments, birthdays, first steps, funny stories, and lessons can be saved as life is happening."],
          ["Grandparents and grandchildren", "Recipes, traditions, photos, and memories can become gifts shared across generations."],
          ["Growing older", "Older adults can talk naturally while LYLO helps preserve what matters without making technology feel hard."]
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-[#E7D9BC] bg-[#FDFBF6] p-6">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-3 leading-7 text-[#5F554B]">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="vision" className="px-6 py-24 text-center">
    <div className="mx-auto max-w-4xl">
      <h2 className="text-4xl font-bold md:text-6xl">
        One day, your family won&apos;t just inherit your photos.
      </h2>

      <p className="mt-8 text-xl leading-9 text-[#5F554B]">
        They&apos;ll inherit your stories, your recipes, your laughter, your
        lessons, and the way you remembered them.
      </p>

      <p className="mt-10 text-3xl font-bold">
        LYLO isn&apos;t about death. It&apos;s about continuing life.
      </p>
    </div>
  </section>
</main>
```

);
}
