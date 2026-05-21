"use client";

import Image from "next/image";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function MemoriesPage() {

  const [memories, setMemories] = useState<any[]>([]);

  async function fetchMemories() {

    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setMemories(data || []);
  }

  async function deleteMemory(id: number) {

    await supabase
      .from("memories")
      .delete()
      .eq("id", id);

    fetchMemories();
  }

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <main className="min-h-screen bg-[#11100f] text-[#f1e6db] px-8 md:px-16 py-14">

      {/* Top */}
      <section className="mb-24 flex items-end justify-between">

        <div>

          <p className="uppercase tracking-[0.4em] text-xs text-[#7f746b] mb-5">
            LOOSERS ARCHIVE
          </p>

          <h1 className="text-[90px] md:text-[120px] leading-[0.9] tracking-tight font-semibold">
            MEMORIES.
          </h1>

          <p className="mt-6 text-[#a8998d] italic text-xl">
            Things that stayed.
          </p>

        </div>

        <p className="hidden md:block text-sm tracking-[0.3em] uppercase text-[#6c6158]">
          {memories.length} Archives
        </p>

      </section>

      {/* Masonry Layout */}
      <section className="columns-1 md:columns-2 xl:columns-3 gap-8 space-y-8">

        {memories.map((memory) => (

          <div
            key={memory.id}
            className="group break-inside-avoid mb-8"
          >

            {/* Image */}
            <div className="relative overflow-hidden bg-[#1a1816]">

              <Image
                src={memory.image_url}
                alt={memory.title}
                width={900}
                height={1200}
                className="w-full h-auto object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition duration-500"></div>

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition duration-500">

                <h2 className="text-3xl font-semibold mb-3">
                  {memory.title}
                </h2>

                <p className="text-[#d8c9bc] leading-7 text-sm">
                  {memory.caption}
                </p>

              </div>

              {/* Tiny Delete Button */}
              <button
                onClick={() => deleteMemory(memory.id)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>

            </div>

          </div>

        ))}

      </section>

    </main>
  );
}