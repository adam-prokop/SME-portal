'use client';

import { useEffect, useState } from "react";
import Spin from "antd/es/spin";

interface ChartPlaceholderProps {
  filename: string;
  altText: string;
}

export default function ChartPlaceholder({ filename, altText }: ChartPlaceholderProps) {
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  return (
    <div className="flex items-center justify-center h-full grow min-h-[400px] rounded-lg shadow-sm border border-slate-200 bg-white p-4">
      {timestamp ? (
        <img 
          src={`/graphs/${filename}?v=${timestamp}`} 
          alt={altText}
          className="w-full max-w-5xl object-contain"
        />
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
}
