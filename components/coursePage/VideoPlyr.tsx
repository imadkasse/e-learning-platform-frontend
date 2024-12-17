"use client";
import React from "react";
import "plyr/dist/plyr.css";
import Plyr, { PlyrProps } from "plyr-react";

type Props = {
  videoSrc: string;
};

const VideoPlyr = ({ videoSrc }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const plyrRef = useRef<any>(null);

  // useEffect(() => {
  //   const player = plyrRef.current?.plyr; // تأكد من الوصول إلى plyr

  //   if (player) {
  //     // تحقق أن player يحتوي على طريقة on
  //     if (typeof player.on === "function") {
  //       player.on("ended", () => {
  //         console.log("الفيديو انتهى!");
  //       });
  //     } else {
  //       console.error("طريقة on غير متوفرة على Plyr.");
  //     }
  //   }

  //   return () => {
  //     if (player && typeof player.destroy === "function") {
  //       player.destroy(); // تنظيف اللاعب عند إلغاء تحميل المكون
  //     }
  //   };
  // }, []);

  const videoOptions: PlyrProps["source"] = {
    type: "video",
    sources: [
      {
        src: videoSrc, // مسار الفيديو
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
