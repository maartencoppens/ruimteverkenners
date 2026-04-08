import { Planeet } from "@prisma/client";
import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";

type FlagFormProps = {
  initials: string;
  setInitials: (initials: string) => void;
  pattern: string;
  setPattern: (pattern: string) => void;
  patternArray: string[];
  submitting: boolean;
  error: string | null;
  handleSubmit: () => void;
};

const FlagForm = ({
  initials,
  setInitials,
  pattern,
  patternArray,
  setPattern,
  submitting,
  error,
  handleSubmit,
}: FlagFormProps) => {
  const previewInitials = initials.trim().slice(0, 3) || "XDD";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="relative w-full p-3">
        <h2 className="text-title-primary font-bold title-gradient text-center border-b-2 border-border-tertiary pb-1">
          PLAATS JE VLAG
        </h2>
        <h3 className="mt-sm text-center text-subtitle-primary text-text-secondary">
          Kies jouw kleuren
        </h3>

        <div className="mt-sm grid grid-cols-[1fr_0.9fr] gap-sm">
          <div className="flex flex-col gap-sm">
            <div>
              <label
                htmlFor="initials"
                className="mb-2 block text-center text-subtitle-secondary text-text-secondary"
              >
                Jouw initialen
              </label>
              <Card>
                <input
                  id="initials"
                  type="text"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value.toUpperCase())}
                  placeholder="XDD"
                  maxLength={3}
                  autoComplete="off"
                  className="w-full bg-transparent text-center text-4xl font-bold uppercase tracking-[0.35em] text-text-secondary caret-text-secondary outline-none placeholder:text-white/40"
                />
              </Card>
            </div>

            <div>
              <p className="mb-2 text-center text-subtitle-secondary text-text-secondary">
                Kleur vlag
              </p>
              <Card className="p-4">
                <div className="flex flex-wrap justify-center gap-1">
                  {patternArray.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setPattern(color)}
                      aria-label={`Kies kleur ${color}`}
                      className={`h-10 w-10 transition ${pattern === color ? "ring-2 ring-white" : ""}`}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </div>
              </Card>
            </div>

            {error && <p className="text-center text-danger">{error}</p>}

            <div className="flex justify-center">
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Submitting..." : "Plant je vlag"}
              </Button>
            </div>
          </div>

          <Card className="w-full p-sm">
            <div className="flex h-full min-h-72 items-start justify-start">
              <div className="h-full w-2 rounded-full bg-white/80" />
              <div
                className="flex h-32 w-full max-w-50 pl-3 items-center justify-start rounded-r-3xl rounded-l-md text-5xl font-bold text-white"
                style={{
                  backgroundColor: pattern,
                  clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                }}
              >
                {previewInitials}
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default FlagForm;
