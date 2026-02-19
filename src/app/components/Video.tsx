"use client";
import React from "react";

const Video = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="my-16 max-w-[980px] h-full relative">
        <video
          className="absolute top-0 h-full scale-[1.15] blur-[200px] -z-50 hidden dark:block" //blur-3xl minimal
          src="https://res.cloudinary.com/dvbnmvv40/video/upload/v1760792125/savee_video_lmotaf.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/public/Land/nike.jpg"
          preload="metadata"
        ></video>
        <div className="relative flex justify-center items-center">
          <video
            className="rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            src="https://res.cloudinary.com/dvbnmvv40/video/upload/v1760792125/savee_video_lmotaf.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/public/Land/nike.jpg"
            preload="metadata"
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Video;
