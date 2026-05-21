"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5efe6] text-[#3e2f26] px-8 py-8 relative">

      {/* Navbar */}
      <nav className="mb-14 flex items-start justify-between">

        <h1 className="text-lg tracking-[0.3em] font-medium">
          LOOSERS ARCHIVE
        </h1>

        {/* Upload Menu */}
        <div className="relative">

          {/* Popup */}
          {open && (

            <div className="absolute right-0 top-16 w-64 bg-[#1a1714]/95 backdrop-blur-xl border border-[#2d2824] rounded-[28px] p-5 shadow-2xl z-50">

              <p className="text-sm uppercase tracking-[0.3em] text-[#8e7f72] mb-5">
                Archive Something
              </p>

              <div className="flex flex-col gap-3">

                {/* Memories */}
                <Link
                  href="/upload"
                  className="bg-[#24201d] hover:bg-[#2e2925] transition rounded-2xl px-5 py-4 text-[#f1e6db]"
                >
                  Memories
                </Link>

                {/* Studio */}
                <Link
                  href="/studio-upload"
                  className="bg-[#24201d] hover:bg-[#2e2925] transition rounded-2xl px-5 py-4 text-[#f1e6db]"
                >
                  Studio
                </Link>

              </div>

            </div>

          )}

          {/* Plus Button */}
          <button
            onClick={() => setOpen(!open)}
            className="w-14 h-14 rounded-full bg-[#1c1917]/90 backdrop-blur-xl border border-[#2c2723] text-[#f1e6db] text-3xl hover:scale-105 transition shadow-2xl"
          >
            +
          </button>

        </div>

      </nav>

      {/* Quote */}
      <section className="mb-14">
        <h1 className="text-6xl leading-[1.05] max-w-4xl font-semibold tracking-tight">
          “Chase who
          <br />
          you are.”
        </h1>

        <p className="mt-4 text-[#7a685d] italic text-xl">
          ~ looser (2026)
        </p>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-3 gap-5">

        {/* Memories */}
        <Link href="/memories" className="group cursor-pointer">

          <div className="relative overflow-hidden rounded-[24px] h-[480px]">

            <Image
              src="/memories.png"
              alt="Memories"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/25"></div>

            <div className="absolute bottom-6 left-6 text-white">

              <p className="text-xs uppercase tracking-[0.3em] mb-2">
                01
              </p>

              <h2 className="text-4xl font-semibold mb-3">
                Memories
              </h2>

              <p className="text-sm text-white/80 leading-6">
                Moments.
                <br />
                Things that stay.
              </p>

            </div>

          </div>

        </Link>

        {/* Studio */}
        <Link href="/studio" className="group cursor-pointer mt-10">

          <div className="relative overflow-hidden rounded-[24px] h-[480px]">

            <Image
              src="/studio.png"
              alt="Studio"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/25"></div>

            <div className="absolute bottom-6 left-6 text-white">

              <p className="text-xs uppercase tracking-[0.3em] mb-2">
                02
              </p>

              <h2 className="text-4xl font-semibold mb-3">
                Studio
              </h2>

              <p className="text-sm text-white/80 leading-6">
                Building.
                <br />
                Trying again.
              </p>

            </div>

          </div>

        </Link>

        {/* Journal */}
        <Link href="/journal" className="group cursor-pointer">

          <div className="relative overflow-hidden rounded-[24px] h-[480px]">

            <Image
              src="/journal.png"
              alt="Journal"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/25"></div>

            <div className="absolute bottom-6 left-6 text-white">

              <p className="text-xs uppercase tracking-[0.3em] mb-2">
                03
              </p>

              <h2 className="text-4xl font-semibold mb-3">
                A Word For Tomorrow
              </h2>

              <p className="text-sm text-white/80 leading-6">
                Thoughts.
                <br />
                Reflections.
              </p>

            </div>

          </div>

        </Link>

      </section>

    </main>
  );
}