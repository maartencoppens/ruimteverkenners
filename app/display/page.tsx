"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MiddleColumn from "../sections/MiddleColumn";
import LeftInfoColumn from "../sections/LeftInfoColumn";
import RightInfoColumn from "../sections/RightInfoColumn";
import { Planet } from "../types/planet";
import Idle from "../sections/Idle";
import VideoBackground from "../components/VideoBackground";
import FlagForm from "../sections/FlagForm";
import ExtraInfo from "../sections/ExtraInfo";

const PATTERNS = [
  "#7c5cff",
  "#ff9448",
  "#52d661",
  "#f43aa6",
  "#7d91ad",
  "#46b4f0",
  "#ff5a54",
  "#24a356",
  "#9b51e0",
  "#f2c500",
  "#2f3c97",
  "#ff7066",
  "#a5ff2f",
  "#5d4df4",
  "#f00035",
];

type State = "idle" | "planet-info";
type currentPlanetScreen = "info" | "flag-form" | "extra-info";

function DisplayPage() {
  const [state, setState] = useState<State>("idle");
  const [planetId, setPlanetId] = useState<string | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [initials, setInitials] = useState("");
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentScreen, setCurrentScreen] =
    useState<currentPlanetScreen>("info");

  const gridLayout =
    currentScreen === "info"
      ? "grid-cols-[1fr_1.2fr_1fr]"
      : currentScreen === "extra-info"
        ? "grid-cols-[1.2fr_1fr_0fr]"
        : "grid-cols-[0fr_1fr_1.2fr]";

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
        console.log(data);
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
    if (!initials.trim()) {
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
          initials: initials.trim(),
          pattern,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setCurrentScreen("info");
      setTimeout(() => setState("idle"), 4000);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-dvh">
      <VideoBackground />
      <div className="relative z-10">
        {/* ── IDLE ── */}
        {state === "idle" && <Idle />}

        {/* PLANET INFO */}
        {state === "planet-info" && (
          <div
            className={`grid ${gridLayout} gap-xs display-container h-dvh overflow-hidden transition-all duration-500`}
          >
            <div
              className={
                currentScreen === "flag-form" ? "overflow-hidden opacity-0" : ""
              }
            >
              {currentScreen === "extra-info" ? (
                <ExtraInfo planet={planet} />
              ) : (
                <LeftInfoColumn
                  planet={planet}
                  onShowExtraInfo={() => setCurrentScreen("extra-info")}
                  onSearchFurther={() => setState("idle")}
                />
              )}
            </div>

            <MiddleColumn
              planet={planet}
              currentScreen={currentScreen}
              onBack={() => setCurrentScreen("info")}
            />

            <div
              className={
                currentScreen === "extra-info"
                  ? "overflow-hidden opacity-0"
                  : ""
              }
            >
              {currentScreen === "flag-form" ? (
                <FlagForm
                  initials={initials}
                  setInitials={setInitials}
                  pattern={pattern}
                  setPattern={setPattern}
                  patternArray={PATTERNS}
                  submitting={submitting}
                  error={error}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <RightInfoColumn
                  planet={planet}
                  onShowFlagForm={() => setCurrentScreen("flag-form")}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default dynamic(async () => DisplayPage, {
  ssr: false,
});
