"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function UploadPage() {

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");

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

  async function uploadImage() {

    if (!image) return;

    setUploading(true);

    const fileName = `${Date.now()}-${image.name}`;

    // Upload Image
    const { error: uploadError } = await supabase.storage
      .from("memories")
      .upload(fileName, image);

    if (uploadError) {
      console.log(uploadError);
      setUploading(false);
      return;
    }

    // Public URL
    const { data } = supabase.storage
      .from("memories")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // Save in DB
    const { error: dbError } = await supabase
      .from("memories_posts")
      .insert([
        {
          title,
          caption,
          image_url: imageUrl,
        },
      ]);

    if (dbError) {
      console.log(dbError);
      setUploading(false);
      return;
    }

    router.push("/memories");
  }

  return (
    <main className="min-h-screen bg-[#f5efe6] text-[#2f241d] px-8 md:px-20 py-16">

      {/* Hero */}
      <section className="mb-20 border-b border-[#dbcbbb] pb-14">

        <p className="uppercase tracking-[0.35em] text-xs text-[#8d7a6d] mb-8">
          ARCHIVE ROOM
        </p>

        <h1
          className="text-[52px] md:text-[92px] leading-[0.92]"
          style={{
            fontFamily: "serif",
          }}
        >
          OH.
          <br />
          THIS AGAIN?
        </h1>

        <p
          className="mt-8 text-xl text-[#7b685c]"
          style={{
            fontFamily: "serif",
          }}
        >
          Another thing you couldn’t let go of?
        </p>

      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto flex flex-col gap-10">

        {/* Title */}
        <div>

          <p className="uppercase tracking-[0.25em] text-xs text-[#8d7a6d] mb-4">
            em jarigindhi ikkada?
          </p>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="beach day? breakdown? both?"
            className="w-full bg-transparent border-b border-[#d4c4b4] pb-5 text-3xl md:text-5xl outline-none placeholder:text-[#a18d7e]"
            style={{
              fontFamily: "serif",
            }}
          />

        </div>

        {/* Caption */}
        <div>

          <p className="uppercase tracking-[0.25em] text-xs text-[#8d7a6d] mb-4">
            em feel ayyaru?
          </p>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="probably should've stayed home that day."
            className="w-full bg-transparent border border-[#d8c9ba] rounded-[24px] p-6 min-h-[220px] text-lg leading-[2rem] outline-none resize-none placeholder:text-[#a18d7e]"
            style={{
              fontFamily: "serif",
            }}
          />

        </div>

        {/* Upload */}
        <div>

          <p className="uppercase tracking-[0.25em] text-xs text-[#8d7a6d] mb-4">
            tagalettu ikkada?
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="w-full bg-[#efe5da] border border-[#d8c9ba] rounded-[24px] px-6 py-6 text-[#7b685c]"
          />

        </div>

        {/* Button */}
        <div className="flex justify-end pt-6">

          <button
            onClick={uploadImage}
            disabled={uploading}
            className="border border-[#2f241d] px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#2f241d] hover:text-[#f5efe6] transition disabled:opacity-40"
          >
            {uploading ? "ARCHIVING..." : "Archive It Anyway"}
          </button>

        </div>

      </section>

    </main>
  );
}