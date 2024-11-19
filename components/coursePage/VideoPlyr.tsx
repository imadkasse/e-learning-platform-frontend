"use client";
import React from "react";
import "plyr/dist/plyr.css";
import Plyr, { PlyrProps } from "plyr-react";

const VideoPlyr = () => {
  const videoOptions: PlyrProps["source"] = {
    type: "video",
    sources: [
      {
        src: "/videos/videoEx.mp4", // مسار الفيديو
        type: "video/mp4",
      },
    ],
  };
  return (
    <div className="w-full mt-5">
      <Plyr source={videoOptions} />
    </div>
  );
};

export default VideoPlyr;
