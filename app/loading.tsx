"use client";
import BouncingLoader from "@/components/BouncingLoader";
import { useState, useEffect } from "react";

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after page fully loads
    const handleLoad = () => setLoading(false);
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[95vh] bg-white flex justify-center items-center z-100"> 
      <BouncingLoader/>
    </div>
  );
};

export default Loading;
