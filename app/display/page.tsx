"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import Button from "../components/Button";
import Image from "next/image";
import MiddleColumn from "../sections/MiddleColumn";
import LeftInfoColumn from "../sections/LeftInfoColumn";
import RightInfoColumn from "../sections/RightInfoColumn";
import { Planet } from "../types/planet";

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

type State = "idle" | "form" | "success" | "planet-info";
type currentPlanetScreen = "info" | "flag-form" | "home";

export default function Display() {
  const [state, setState] = useState<State>("idle");
  const [planetId, setPlanetId] = useState<string | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentScreen, setCurrentScreen] =
    useState<currentPlanetScreen>("home");

  // Fetch planet info when planetId changes
  useEffect(() => {
    if (planetId === null) {
      setPlanet(null);
      return;
    }

    const fetchPlanet = async () => {
      try {
        const res = await fetch(`/api/planet?planetId=${planetId}`);
        if (!res.ok) throw new Error("Failed to fetch planet");
        const data = await res.json();
        setPlanet(data);
      } catch {
        setPlanet(null);
      }
    };

    void fetchPlanet();
  }, [planetId]);

  //websocket to listen for zoom events from the main page
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://${window.location.host}/api/ws`);

    ws.onmessage = async (event) => {
      try {
        const raw =
          typeof event.data === "string"
            ? event.data
            : event.data instanceof Blob
              ? await event.data.text()
              : new TextDecoder().decode(event.data);

        const payload = JSON.parse(raw) as {
          isZoomedIn?: boolean | number | string;
          planetId?: string | number | null;
        };

        const isZoomedIn =
          payload.isZoomedIn === true || Number(payload.isZoomedIn) === 1;
        const nextPlanetId = payload.planetId ?? null;

        if (isZoomedIn) {
          setPlanetId(nextPlanetId !== null ? String(nextPlanetId) : null);

          setName("");
          setInitials("");
          setPattern(PATTERNS[0]);
          setError(null);
          setState("planet-info");
        } else {
          // Reset to idle when zoomed out
          setState("idle");
          setPlanetId(null);
        }
      } catch {
        console.error("Invalid WS message", event.data);
      }
    };

    ws.onerror = () => console.error("WebSocket error");

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
    <main>
      {/* ── IDLE ── */}
      {state === "idle" && (
        <div>
          <p>Idle</p>
        </div>
      )}

      {/* PLANET INFO */}
      {state === "planet-info" && (
        <div className="grid grid-cols-3 gap-xs display-container h-dvh overflow-hidden">
          {/* Left column */}
          <LeftInfoColumn planet={planet} />
          {/* Middle column */}
          <MiddleColumn planet={planet} />
          {/* Right column */}
          <RightInfoColumn planet={planet} />
        </div>
      )}

      {/* ── FORM ── */}
      {state === "form" && (
        <div>
          {planetId && <p>Planet {planetId}</p>}
          <h1>Claim your planet</h1>

          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="initials">Initials</label>
              <input
                id="initials"
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                placeholder="e.g. AB"
                maxLength={4}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="pattern">Flag pattern</label>
              <select
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              >
                {PATTERNS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p>{error}</p>}

          <button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit flag"}
          </button>
        </div>
      )}
    </main>
  );
}
