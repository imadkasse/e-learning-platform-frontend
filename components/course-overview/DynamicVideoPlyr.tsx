"use client";

import dynamic from "next/dynamic";

// استيراد المكون الديناميكي
const VideoPlyr = dynamic(() => import("./VideoPlyr"), {
  ssr: false,
});

type Props = {
  videoSrc: string;
};

const DynamicVideoPlyr = ({ videoSrc }: Props) => {
  return <VideoPlyr videoSrc={videoSrc} />;
};

export default DynamicVideoPlyr;
