import React, { Fragment } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import { Helmet } from "react-helmet"; // need this for set the background colour

//loading animation
import * as loadingAnimation from "./loadingAnimation.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

// const styles = {
//   body: {
//     background: ,
//   },
// };
function Loading() {
  return (
    <div className="application">
      <Helmet>
        <style>{"body { background-color: #2E3047; }"}</style>
      </Helmet>
      <FadeIn>
        <Lottie options={defaultOptions} width={550} length={550} />
      </FadeIn>
    </div>
  );
}

export default Loading;
