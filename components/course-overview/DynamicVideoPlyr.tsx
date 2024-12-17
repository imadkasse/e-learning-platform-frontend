"use client";

import dynamic from "next/dynamic";

// استيراد المكون الديناميكي
const VideoPlyr = dynamic(() => import("./VideoPlyr"), {
  ssr: false,
  loading: () => (
    <div className="text-4xl w-full h-[60vh] flex justify-center items-center flex-col bg-wygColor">
      <p>الرجاء الإنتظار...</p>
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
