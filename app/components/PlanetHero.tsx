import { useEffect, useState } from "react";
import { Center, Float, useGLTF } from "@react-three/drei";
import type { Group } from "three";

type PlanetHeroProps = {
  planetID: number | undefined;
};

type ModelStatus = "idle" | "ready" | "missing";

function PlanetModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath) as { scene: Group };

  return (
    <Center>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <primitive object={scene.clone()} scale={0.5} />
      </Float>
    </Center>
  );
}

function PlanetFallback() {
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial color="#7c78e6" metalness={0.15} roughness={0.65} />
      </mesh>
    </Float>
  );
}

const PlanetHero = ({ planetID }: PlanetHeroProps) => {
  const [modelStatus, setModelStatus] = useState<ModelStatus>("idle");

  useEffect(() => {
    if (!planetID) {
      setModelStatus("missing");
      return;
    }

    let isCancelled = false;
    const modelPath = `/models/${planetID}.glb`;

    const verifyModel = async () => {
      try {
        const response = await fetch(modelPath, { method: "HEAD" });

        if (!isCancelled) {
          setModelStatus(response.ok ? "ready" : "missing");
        }
      } catch {
        if (!isCancelled) {
          setModelStatus("missing");
        }
      }
    };

    setModelStatus("idle");
    void verifyModel();

    return () => {
      isCancelled = true;
    };
  }, [planetID]);

  if (!planetID || modelStatus !== "ready") {
    return <PlanetFallback />;
  }

  return <PlanetModel modelPath={`/models/${planetID}.glb`} />;
};

export default PlanetHero;
