import { supabase } from "../../lib/supabase";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const { data: post } = await supabase
    .from("journal_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    return (
      <main className="min-h-screen bg-[#f3ead7] text-[#1f1a15] flex items-center justify-center">
        <p
          className="text-4xl"
          style={{
            fontFamily: "serif",
          }}
        >
          Essay not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3ead7] text-[#1f1a15] px-8 md:px-20 py-16">

      {/* Top */}
      <section className="border-b border-[#d4c5a5] pb-14 mb-16">

        <p className="uppercase tracking-[0.35em] text-xs text-[#7d705d] mb-8">
          A WORD FOR TOMORROW
        </p>

        <h1
          className="text-[48px] md:text-[90px] leading-[0.95] max-w-5xl"
          style={{
            fontFamily: "serif",
          }}
        >
          {post.title}
        </h1>

        <p className="mt-10 text-sm uppercase tracking-[0.25em] text-[#7d705d]">
          {new Date(post.created_at).toDateString()}
        </p>

      </section>

      {/* Essay */}
      <article className="max-w-4xl mx-auto">

        <div
          className="text-lg md:text-2xl leading-[2.5rem] text-[#332c25] whitespace-pre-wrap"
          style={{
            fontFamily: "serif",
          }}
        >
          {post.content}
        </div>

      </article>

    </main>
  );
}