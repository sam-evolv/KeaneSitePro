import { useRef, useEffect, useState } from "react";
import { Button } from "./button";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className={className}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </Button>
    </div>
  );
}
