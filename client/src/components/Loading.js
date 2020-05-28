import React, { Fragment } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import { Helmet } from "react-helmet"; // need this for set the background colour

//material ui stuff
import { Container, makeStyles } from "@material-ui/core";

//loading animation
import * as fishLoading from "./fish-loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: fishLoading.default,
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
        <style>{"body { background-color: #32f09e; }"}</style>
      </Helmet>
      <FadeIn>
        <Lottie options={defaultOptions} width={550} length={550} />
      </FadeIn>
    </div>
  );
}

export default Loading;
