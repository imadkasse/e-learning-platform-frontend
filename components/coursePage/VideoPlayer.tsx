"use client";
import React from "react";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="mt-5 relative w-full" style={{ paddingTop: "56.25%" }}>
      <iframe
        src={`https://iframe.mediadelivery.net/embed/476506/${videoId}?autoplay=false&loop=false&muted=false&preload=false&responsive=false`}
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-md"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
