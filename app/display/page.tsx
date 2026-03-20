"use client";
import { useEffect, useState } from "react";

const PATTERNS = [
  "Horizontal stripes",
  "Vertical stripes",
  "Cross",
  "Diagonal",
  "Solid color",
  "Quarters",
  "Circle center",
  "Star",
];

type State = "idle" | "form" | "success";

export default function Display() {
  const [state, setState] = useState<State>("idle");
  const [planetId, setPlanetId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.active) {
          setPlanetId(data.planetId ?? null);
          setName("");
          setInitials("");
          setPattern(PATTERNS[0]);
          setError(null);
          setState("form");
        } else {
          setState("idle");
          setPlanetId(null);
        }
      } catch {
        console.error("Invalid WS message", event.data);
      }
    };

    ws.onerror = () => console.error("WebSocket error");

    setState("idle");
    return () => ws.close();
  }, []);

  //submit flag to API
  const handleSubmit = async () => {
    if (!name.trim() || !initials.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/flags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          initials: initials.trim(),
          pattern,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setState("success");
      setTimeout(() => setState("idle"), 4000);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-black text-white font-sans">
      {/* ── IDLE ── */}
      {state === "idle" && (
        <div className="flex w-full max-w-120 flex-col items-center justify-center gap-6 p-8 text-center">
          <p className="text-xl text-gray-500">Idle</p>
        </div>
      )}

      {/* ── FORM ── */}
      {state === "form" && (
        <div className="flex w-full max-w-120 flex-col items-center justify-center gap-6 p-8 text-center">
          {planetId && (
            <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
              Planet {planetId}
            </p>
          )}
          <h1 className="text-3xl font-light tracking-[-0.02em]">
            Claim your planet
          </h1>

          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-widest text-gray-400"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="off"
                className="w-full rounded-md border border-[#333] bg-[#111] px-4 py-3 text-base text-white outline-none transition-colors focus:border-[#666]"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label
                htmlFor="initials"
                className="text-xs uppercase tracking-widest text-gray-400"
              >
                Initials
              </label>
              <input
                id="initials"
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                placeholder="e.g. AB"
                maxLength={4}
                autoComplete="off"
                className="w-full rounded-md border border-[#333] bg-[#111] px-4 py-3 text-base text-white outline-none transition-colors focus:border-[#666]"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label
                htmlFor="pattern"
                className="text-xs uppercase tracking-widest text-gray-400"
              >
                Flag pattern
              </label>
              <select
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full rounded-md border border-[#333] bg-[#111] px-4 py-3 text-base text-white outline-none transition-colors focus:border-[#666]"
              >
                {PATTERNS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-[#e05555]">{error}</p>}

          <button
            className="w-full cursor-pointer rounded-md bg-white px-10 py-3.5 text-base font-medium text-black transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit flag"}
          </button>
        </div>
      )}

      {/* ── SUCCESS ── */}
      {state === "success" && (
        <div className="flex w-full max-w-120 flex-col items-center justify-center gap-6 p-8 text-center">
          <p className="text-5xl text-green-500">✓</p>
          <h2 className="text-[1.75rem] font-light">Flag planted</h2>
          <p className="text-[0.95rem] text-gray-400">
            Your flag is on the planet.
          </p>
        </div>
      )}
    </main>
  );
}
