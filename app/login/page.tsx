"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("NENU AE OPEN CHEYANU NIKU ENDHUKU RA 😭");
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#f5efe6] grid grid-cols-2 overflow-hidden">

      {/* LEFT SIDE */}
      <section className="flex flex-col justify-between px-14 py-10">

        {/* Logo */}
        <div>

          <p className="tracking-[0.4em] text-sm text-[#6b5a50]">
            LOOSERS ARCHIVE
          </p>

        </div>

        {/* Main Content */}
        <div>

          <h1 className="text-[120px] leading-[0.9] tracking-tight font-semibold text-[#2f241d]">
            OH,
            <br />
            YOU
            <br />
            AGAIN.
          </h1>

          <p className="mt-8 text-2xl italic text-[#8a7465] font-medium">
            Still trying to become productive?
          </p>

          {/* Inputs */}
          <div className="mt-14 flex flex-col gap-5">

            {/* Email */}
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#efe5da] border border-[#d9cabc] rounded-2xl px-6 py-5 outline-none text-lg text-black placeholder:text-[#9f8d80]"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#efe5da] border border-[#d9cabc] rounded-2xl px-6 py-5 outline-none text-lg text-black placeholder:text-[#9f8d80]"
            />

            {/* Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#2f241d] text-[#f5efe6] py-5 rounded-2xl text-lg tracking-[0.2em] hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "ENTERING..." : "ENTER ARCHIVE"}
            </button>

            {/* Error */}
            {error && (

              <p className="mt-4 text-[#7c2f24] text-2xl font-bold leading-snug">
                {error}
              </p>

            )}

          </div>

        </div>

        {/* Bottom */}
        <div>

          <p className="text-sm text-[#8f7b6e]">
            Built by and for sreesanth
          </p>

        </div>

      </section>

      {/* RIGHT SIDE */}
      <section className="relative h-screen bg-[#d8c7b8]">

        <Image
          src="/login.png"
          alt="Login Visual"
          fill
          className="object-contain"
        />

        <div className="absolute inset-0 bg-black/5"></div>

      </section>

    </main>
  );
}