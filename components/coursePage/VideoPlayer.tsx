"use client";
import React from "react";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const baseUrlVideo = `${process.env.NEXT_PUBLIC_BUNNY_BASE_URL}/${process.env.NEXT_PUBLIC_VIDEO_LIBRARY}`;

  return (
    <div className="mt-5 relative w-full" style={{ paddingTop: "56.25%" }}>
      <iframe
        src={`${baseUrlVideo}/${videoId}?autoplay=false&loop=false&muted=false&preload=false&responsive=false`}
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-md"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
