import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { SCENES, TOTAL_FRAMES } from "./theme";
import { Intro } from "./scenes/Intro";
import { Tagline } from "./scenes/Tagline";
import { Stats } from "./scenes/Stats";
import { IronEdge } from "./scenes/IronEdge";
import { CIRculate } from "./scenes/CIRculate";
import { Skills } from "./scenes/Skills";
import { Certs } from "./scenes/Certs";
import { Languages } from "./scenes/Languages";
import { CTA } from "./scenes/CTA";

// Checks whether the voiceover file exists in /public
const AUDIO_FILE = "voiceover.mp3";

export const ProfileVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0f172a" }}>
      {/* Voiceover — drop voiceover.mp3 into public/ to enable */}
      <Audio src={staticFile(AUDIO_FILE)} volume={1} />

      <Sequence from={SCENES.intro.start} durationInFrames={SCENES.intro.duration + 30}>
        <Intro />
      </Sequence>

      <Sequence from={SCENES.tagline.start} durationInFrames={SCENES.tagline.duration + 30}>
        <Tagline />
      </Sequence>

      <Sequence from={SCENES.stats.start} durationInFrames={SCENES.stats.duration + 30}>
        <Stats />
      </Sequence>

      <Sequence from={SCENES.ironedge.start} durationInFrames={SCENES.ironedge.duration + 30}>
        <IronEdge />
      </Sequence>

      <Sequence from={SCENES.circulate.start} durationInFrames={SCENES.circulate.duration + 30}>
        <CIRculate />
      </Sequence>

      <Sequence from={SCENES.skills.start} durationInFrames={SCENES.skills.duration + 30}>
        <Skills />
      </Sequence>

      <Sequence from={SCENES.certs.start} durationInFrames={SCENES.certs.duration + 30}>
        <Certs />
      </Sequence>

      <Sequence from={SCENES.languages.start} durationInFrames={SCENES.languages.duration + 30}>
        <Languages />
      </Sequence>

      <Sequence from={SCENES.cta.start} durationInFrames={SCENES.cta.duration}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
