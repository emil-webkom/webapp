"use client";

const VideoPlayer = () => {
  return (
    <div className="justify-center items-center w-full h-100 bg-[#001D21] hidden md:inline-flex mt-20">
      <iframe
        width="700"
        height="400"
        src="https://www.youtube.com/embed/7r3_Hm10dQ4?si=p4ONyFGigtRyVOuS"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullscreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
