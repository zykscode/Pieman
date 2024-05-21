import React from "react";
import AnimatedGradientText from "./AnimatedGradientText";

const Hero = () => {
  return (
    <div className="mt-16">
      <h1 className="show-counter">
        <AnimatedGradientText
          content={"Trusted"}
          index={1}
          startColor={"#00ca12"}
          endColor={"#f0ce12"}
        />

        <AnimatedGradientText
          content={"Middle"}
          index={2}
          startColor={"var(--yellow)"}
          endColor={"var(--red)"}
        />

        <AnimatedGradientText
          content={"man"}
          startColor={"var(--blue)"}
          index={3}
          endColor={"var(--pink)"}
        />
      </h1>{" "}
    </div>
  );
};

export default Hero;
