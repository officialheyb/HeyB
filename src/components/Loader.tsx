import { useEffect, useState } from "react";
import heybLogo from "figma:asset/e0e68f1c544810d61fdfca1264a2cb79408d1ee9.png";

export function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="mb-8 animate-pulse">
        <img 
          src={heybLogo} 
          alt="HeyB Logo" 
          className="w-80 h-80 object-contain"
        />
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-muted-foreground font-['Inter'] animate-pulse">
        Loading your marketplace...
      </p>
    </div>
  );
}
