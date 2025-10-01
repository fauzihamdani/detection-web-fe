import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (imgRef.current) {
        imgRef.current.src = url;
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const handleImageLoading = () => {
    setLoading(false);
  };
  return (
    <div>
      {loading && (
        <div>
          <h1>loading..</h1>
        </div>
      )}

      <img
        ref={imgRef}
        alt="Video stream"
        style={{ width: "100%", border: "1px solid black" }}
        // width="" // Adjust as necessary
        height="360"
        onLoad={handleImageLoading}
      />

      {/* http://10.1.1.62:5001/obj-detection */}
    </div>
  );
};

export default VideoPlayer;
