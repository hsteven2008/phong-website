import React from "react";
import { Composition } from "remotion";
import { ProfileVideo } from "./ProfileVideo";
import { FPS, TOTAL_FRAMES, WIDTH, HEIGHT } from "./theme";

export const Root: React.FC = () => (
  <>
    <Composition
      id="ProfileVideo"
      component={ProfileVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
