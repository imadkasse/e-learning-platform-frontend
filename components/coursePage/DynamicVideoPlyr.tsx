"use client";

import { PlayArrow } from "@mui/icons-material";
import dynamic from "next/dynamic";

const VideoPlyr = dynamic(() => import("./VideoPlyr"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] flex justify-center items-center flex-col bg-wygColor">
      <div className="animate-pulse space-y-4">
        <div className="w-48 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-full h-4  rounded-md text-center">
          <PlayArrow className="text-4xl text-gray-300" />
        </div>
        <div className="w-80 h-3 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  ),
});

type Props = {
  videoSrc: string;
};

const DynamicVideoPlyr = ({ videoSrc }: Props) => {
  return <VideoPlyr videoSrc={videoSrc} />;
};

export default DynamicVideoPlyr;
