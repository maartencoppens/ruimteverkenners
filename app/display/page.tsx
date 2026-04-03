"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import Button from "../components/Button";
import Image from "next/image";

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
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentScreen, setCurrentScreen] =
    useState<currentPlanetScreen>("home");

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://${window.location.host}/api/ws`);
    console.log(state);

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
          setState("form");
        } else {
          // Reset to idle when zoomed out
          setState("planet-info");
          setPlanetId(null);
        }
      } catch {
        console.error("Invalid WS message", event.data);
      }
    };

    ws.onerror = () => console.error("WebSocket error");

    // setState("idle");
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
          <div className="h-full flex flex-col justify-between overflow-hidden">
            <div>
              <div className="border-b border-border-primary p-4 w-full flex items-center gap-3.5">
                <Image
                  src="/planet-blue.svg"
                  alt="Planet icon"
                  width={40}
                  height={40}
                  className=""
                />
                <h2 className="text-subtitle-primary">Planeet</h2>
              </div>
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-subtitle-secondary">Grootte</h3>
                <Card className="flex gap-xl justify-center">
                  <div>
                    <Image
                      src="/aarde-grootte.svg"
                      alt="Earth icon"
                      width={150}
                      height={150}
                    />
                    <Image
                      src={"/double-arrow.svg"}
                      alt="Double arrow"
                      width={150}
                      height={20}
                    />
                    <p className="text-center text-body-primary">2,8 x aarde</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image
                      src={"/weight-icon.svg"}
                      alt="Weight icon"
                      width={40}
                      height={40}
                    />
                    <p className="text-center text-body-primary">1,2 x aarde</p>
                  </div>
                </Card>
              </div>
              <div className="w-full">
                <h3 className="text-subtitle-secondary">Afstand van de ster</h3>
                <Slider variant="primary" />
              </div>
              <div className="w-full">
                <h3 className="text-subtitle-secondary">Zwaartekracht</h3>
                <Slider variant="secondary" />
              </div>
            </div>
            <Button label="Plant je vlag" />
          </div>
          {/* Middle column */}
          <div className="h-full flex flex-col justify-between w-full relative overflow-hidden">
            <div className="flex flex-col items-center">
              <Image
                src="/around-sun.svg"
                alt="Orbit around sun"
                width={550}
                height={60}
                style={{ width: "auto", height: "auto" }}
              />
              <p className="text-text-primary text-body-primary text-sm m-0">
                days dagen
              </p>
            </div>
            <Image
              src="/planet-placeholder.png"
              alt="Planet placeholder"
              width={550}
              height={550}
              className="mx-auto h-auto max-h-[52vh] w-auto"
              priority
            />
            <div>
              <div className="text-center">
                <h1 className="text-title-primary title-gradient">
                  Planet-name
                </h1>
                <h2 className="text-title-secondary title-gradient">
                  Mogelijk Bewoonbaar
                </h2>
              </div>
              <div>
                <div className="flex items-center justify-center gap-md">
                  <Image
                    src="/earth.svg"
                    alt="Earth icon"
                    width={60}
                    height={60}
                  />

                  <div className="flex flex-col items-center mt-2xl">
                    <Image
                      src="/line-arrow.svg"
                      alt="Distance arrow"
                      width={200}
                      height={20}
                      className="w-full"
                      style={{ width: "auto", height: "auto" }}
                    />

                    <p className="text-text-primary text-body-primary text-sm m-0">
                      1400 Lichtjaren
                    </p>
                  </div>
                  <Image
                    src="/planet.svg"
                    alt="Earth icon"
                    width={60}
                    height={60}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right column */}
          <div className="h-full flex flex-col justify-between items-end overflow-hidden">
            <div>
              <div className="border-b border-border-primary p-4 w-full flex justify-end items-center gap-3.5">
                <h2 className="text-subtitle-primary text-end">Ster</h2>
                <Image src="/sun-blue.svg" alt="Sun" width={40} height={40} />
              </div>
              <div className="p-4 flex flex-col items-center w-full gap-xs">
                <h3 className="text-subtitle-secondary">Levenslijn</h3>
                <Card className="w-full">
                  <div className="w-full flex flex-col items-center justify-between">
                    <p className="text-body-primary">2,7 miljard jaar</p>
                    <Slider variant="primary" />
                  </div>
                </Card>
                <div className="flex gap-sm w-full">
                  <Card className="w-full">
                    <p className="text-body-primary">Aantal planeten</p>
                    <span className="text-2xs text-text-secondary">3</span>
                  </Card>
                  <Card className="w-full">
                    <p className="text-body-primary">Temperatuur</p>
                    <span className="text-2xs text-text-secondary">
                      5757 °C (1,1 x de zon)
                    </span>
                  </Card>
                </div>
              </div>
            </div>
            <Image
              src="/info-button.svg"
              alt="Info buttons"
              width={50}
              height={50}
            />
          </div>
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

      {/* ── SUCCESS ── */}
      {state === "success" && (
        <div>
          <p>✓</p>
          <h2>Flag planted</h2>
          <p>Your flag is on the planet.</p>
        </div>
      )}
    </main>
  );
}
