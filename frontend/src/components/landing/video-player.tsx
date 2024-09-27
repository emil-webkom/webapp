"use client";

const VideoPlayer = () => {
  return (
    <div className="justify-center items-center w-full h-full bg-green-darkest hidden md:inline-flex">
      <iframe
        width="100%"
        height="440vh"
        src="https://www.youtube.com/embed/jLSEKH5U9DU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
