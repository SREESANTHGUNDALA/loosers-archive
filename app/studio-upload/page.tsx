"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function StudioUploadPage() {

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  // Protect Route
  useEffect(() => {

    async function checkUser() {

      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      }

    }

    checkUser();

  }, []);

  async function uploadVideo() {

    if (!video) return;

    setUploading(true);

    const fileName = `${Date.now()}-${video.name}`;

    // Upload video
    const { error: uploadError } = await supabase.storage
      .from("studio")
      .upload(fileName, video);

    if (uploadError) {
      console.log(uploadError);
      setUploading(false);
      return;
    }

    // Public URL
    const { data } = supabase.storage
      .from("studio")
      .getPublicUrl(fileName);

    const videoUrl = data.publicUrl;

    // Save in DB
    const { error: dbError } = await supabase
      .from("studio_posts")
      .insert([
        {
          title,
          caption,
          video_url: videoUrl,
        },
      ]);

    if (dbError) {
      console.log(dbError);
      setUploading(false);
      return;
    }

    router.push("/studio");
  }

  return (
    <main className="min-h-screen bg-[#0f0f10] text-[#f2eee8] px-8 md:px-20 py-16">

      {/* Hero */}
      <section className="mb-20 border-b border-[#2a2a2e] pb-14">

        <p className="uppercase tracking-[0.35em] text-xs text-[#7d7d82] mb-8">
          STUDIO
        </p>

        <h1
          className="text-[48px] md:text-[84px] leading-[0.95]"
          style={{
            fontFamily: "serif",
          }}
        >
          BUILD
          <br />
          SOMETHING
          <br />
          REAL.
        </h1>

      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto flex flex-col gap-10">

        {/* Title */}
        <div>

          <p className="uppercase tracking-[0.25em] text-xs text-[#7d7d82] mb-4">
            ee sari em patukocharu dhora?
          </p>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="short film draft?"
            className="w-full bg-transparent border-b border-[#2e2e33] pb-5 text-3xl md:text-5xl outline-none placeholder:text-[#5d5d63]"
            style={{
              fontFamily: "serif",
            }}
          />

        </div>

        {/* Caption */}
        <div>

          <p className="uppercase tracking-[0.25em] text-xs text-[#7d7d82] mb-4">
            em vunndhi dintlo?
          </p>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="trying to understand pacing and atmosphere..."
            className="w-full bg-transparent border border-[#2a2a2e] rounded-[24px] p-6 min-h-[220px] text-lg leading-[2rem] outline-none resize-none placeholder:text-[#5d5d63]"
            style={{
              fontFamily: "serif",
            }}
          />

        </div>

        {/* Upload */}
        <div>

          <p className="uppercase tracking-[0.25em] text-xs text-[#7d7d82] mb-4">
            tagalletu ikkada?
          </p>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setVideo(e.target.files[0]);
              }
            }}
            className="w-full bg-[#18181b] border border-[#2a2a2e] rounded-[24px] px-6 py-6 text-[#9d9da3]"
          />

        </div>

        {/* Button */}
        <div className="flex justify-end pt-6">

          <button
            onClick={uploadVideo}
            disabled={uploading}
            className="border border-[#f2eee8] px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#f2eee8] hover:text-[#0f0f10] transition disabled:opacity-40"
          >
            {uploading ? "Uploading..." : "Publish Process"}
          </button>

        </div>

      </section>

    </main>
  );
}