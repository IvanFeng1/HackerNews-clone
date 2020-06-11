import React, { Fragment } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import { Helmet } from "react-helmet"; // need this for set the background colour

//loading animation
import * as loadingAnimation from "./loadingAnimation.json";

// material ui element
import { Typography, Box, makeStyles } from "@material-ui/core";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  loadingText: {
    margins: "3em",
  },
});
function Loading() {
  const classes = useStyles();
  return (
    <div className="application">
      <Helmet>
        <style>{"body { background-color: #2E3047; }"}</style>
      </Helmet>
      <Box
        display="flex"
        alignItems="center" // aligns item vertically
        justifyContent="center" // aligns item horizontally
        flexWrap="wrap"
        p={1} // padding
        m={1} // margins
        // the props inside css made the box component take up the entire background
        css={{
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        }}
        flexDirection="column"
      >
        <Box>
          <Lottie options={defaultOptions} width={120} length={120} />
          {/*the animation component */}
        </Box>
        <Box m={2}>
          <Typography variant="h6" style={{ color: "#dedede" }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Loading;
