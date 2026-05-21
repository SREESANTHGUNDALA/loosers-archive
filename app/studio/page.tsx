"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function StudioPage() {

  const [videos, setVideos] = useState<any[]>([]);

  async function fetchVideos() {

    const { data, error } = await supabase
      .from("studio_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setVideos(data || []);
  }

  async function deleteVideo(id: number, videoUrl: string) {

    // Extract filename from URL
    const fileName = videoUrl.split("/").pop();

    // Delete from storage
    if (fileName) {

      await supabase.storage
        .from("studio")
        .remove([fileName]);

    }

    // Delete from database
    await supabase
      .from("studio_posts")
      .delete()
      .eq("id", id);

    fetchVideos();
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#18181b_50%,#0b0b0c_50%)] text-[#f2eee8] px-8 md:px-16 py-16">

      {/* Hero */}
      <section className="mb-20 border-b border-[#2f2f34] pb-12">

        <p className="uppercase tracking-[0.35em] text-xs text-[#8b8b92] mb-6">
          LOOSERS ARCHIVE
        </p>

        <h1
          className="text-[52px] md:text-[90px] leading-[0.9]"
          style={{
            fontFamily: "serif",
          }}
        >
          STUDIO.
        </h1>

      </section>

      {/* Intro */}
      <section className="mb-16">

        <p
          className="text-lg md:text-2xl leading-[1.8] max-w-2xl text-[#c7c2bc]"
          style={{
            fontFamily: "serif",
          }}
        >
          building. learning. trying again.
        </p>

      </section>

      {/* Grid */}
      <section className="grid md:grid-cols-3 gap-6">

        {videos.map((video) => (

          <article
            key={video.id}
            className="relative border border-[#2f2f34] rounded-[28px] p-4 bg-[#121214] shadow-2xl"
          >

            {/* Delete */}
            <button
              onClick={() => deleteVideo(video.id, video.video_url)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white text-sm hover:bg-black transition"
            >
              ×
            </button>

            {/* Video */}
            <div className="overflow-hidden rounded-[22px] bg-[#0f0f10]">

              <video
                src={video.video_url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[340px] object-cover rounded-[22px]"
              />

            </div>

            {/* Content */}
            <div className="mt-6">

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b8b92] mb-4">
                {new Date(video.created_at).toDateString()}
              </p>

              <h2
                className="text-2xl md:text-3xl leading-tight mb-4"
                style={{
                  fontFamily: "serif",
                }}
              >
                {video.title}
              </h2>

              <p
                className="text-sm md:text-base leading-[1.9rem] text-[#b5b0aa]"
                style={{
                  fontFamily: "serif",
                }}
              >
                {video.caption}
              </p>

            </div>

          </article>

        ))}

        {/* Empty */}
        {videos.length === 0 && (

          <section className="border border-[#2f2f34] rounded-[28px] p-10 bg-[#121214]">

            <p
              className="text-3xl md:text-5xl text-[#66666b]"
              style={{
                fontFamily: "serif",
              }}
            >
              Nothing in motion yet.
            </p>

          </section>

        )}

      </section>

    </main>
  );
}