"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function WritePage() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  async function publishPost() {

    if (!title || !content) return;

    const { error } = await supabase
      .from("journal_posts")
      .insert([
        {
          title,
          content,
        },
      ]);

    if (error) {
      console.log(error);
      return;
    }

    router.push("/journal");
  }

  return (
    <main className="min-h-screen bg-[#f3ead7] text-[#1f1a15] px-8 md:px-20 py-16">

      {/* Hero */}
      <section className="mb-16 border-b border-[#d4c5a5] pb-12">

        <p className="uppercase tracking-[0.35em] text-xs text-[#7d705d] mb-8">
          A WORD FOR TOMORROW
        </p>

        <h1
          className="text-[44px] md:text-[72px] leading-[0.95]"
          style={{
            fontFamily: "serif",
          }}
        >
          WRITE
          <br />
          SOMETHING
          <br />
          TRUE.
        </h1>

      </section>

      {/* Writing Area */}
      <section className="max-w-4xl mx-auto">

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="give this thought a name"
          className="w-full bg-transparent border-b border-[#c9b997] pb-5 text-3xl md:text-5xl outline-none placeholder:text-[#93856f]"
          style={{
            fontFamily: "serif",
          }}
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="start writing..."
          className="w-full bg-transparent mt-12 min-h-[550px] text-lg md:text-xl leading-[2.3rem] outline-none resize-none placeholder:text-[#93856f]"
          style={{
            fontFamily: "serif",
          }}
        />

        {/* Bottom Bar */}
        <div className="flex justify-end mt-16 border-t border-[#d4c5a5] pt-8">

          <button
            onClick={publishPost}
            className="border border-[#1f1a15] px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#1f1a15] hover:text-[#f3ead7] transition"
          >
            publish tomorrow
          </button>

        </div>

      </section>

    </main>
  );
}