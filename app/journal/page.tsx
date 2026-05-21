"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function JournalPage() {

  const [journals, setJournals] = useState<any[]>([]);

  async function fetchJournals() {

    const { data, error } = await supabase
      .from("journal_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setJournals(data || []);
  }

  async function deleteJournal(id: number) {

    await supabase
      .from("journal_posts")
      .delete()
      .eq("id", id);

    fetchJournals();
  }

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <main className="min-h-screen bg-[#f3eadf] text-[#2e241d] px-8 md:px-20 py-16">

      {/* Hero */}
      <section className="mb-24 border-b border-[#d8cabd] pb-14">

        <p className="uppercase tracking-[0.35em] text-xs text-[#8d7a6d] mb-8">
          LOOSERS ARCHIVE
        </p>

        <h1
          className="text-[52px] md:text-[90px] leading-[0.92]"
          style={{
            fontFamily: "serif",
          }}
        >
          A WORD
          <br />
          FOR
          <br />
          TOMORROW.
        </h1>

      </section>

      {/* Grid */}
      <section className="grid md:grid-cols-2 gap-8">

        {journals.map((journal) => (

          <article
            key={journal.id}
            className="relative border border-[#d7c8bb] rounded-[28px] p-8 bg-[#f7efe5]"
          >

            {/* Delete */}
            <button
              onClick={() => deleteJournal(journal.id)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2e241d]/10 hover:bg-[#2e241d]/20 transition text-[#2e241d]"
            >
              ×
            </button>

            {/* Date */}
            <p className="text-xs uppercase tracking-[0.3em] text-[#8c7868] mb-8">
              {new Date(journal.created_at).toDateString()}
            </p>

            {/* Title */}
            <h2
              className="text-4xl leading-tight mb-6"
              style={{
                fontFamily: "serif",
              }}
            >
              {journal.title}
            </h2>

            {/* Preview */}
            <p
              className="text-lg leading-[2rem] text-[#5e5148] mb-10"
              style={{
                fontFamily: "serif",
              }}
            >
              {journal.content.slice(0, 220)}...
            </p>

            {/* Read */}
            <Link
              href={`/journal/${journal.id}`}
              className="text-sm uppercase tracking-[0.25em] border-b border-[#2e241d] pb-1"
            >
              Continue Reading
            </Link>

          </article>

        ))}

        {/* Empty */}
        {journals.length === 0 && (

          <section className="border border-[#d7c8bb] rounded-[28px] p-12 bg-[#f7efe5]">

            <p
              className="text-4xl md:text-6xl text-[#8f8174]"
              style={{
                fontFamily: "serif",
              }}
            >
              Nothing written yet.
            </p>

          </section>

        )}

      </section>

    </main>
  );
}