import Image from 'next/image';
import { useEffect, useState } from 'react';

interface VideoInfo {
  title: string;
  author_name: string;
  thumbnail_url: string;
}

interface RecommendationProps {
  videoId: string;
}

export default function Recommendation({ videoId }: RecommendationProps) {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        // Using YouTube's oEmbed API which doesn't require an API key
        const response = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const data = await response.json();
        
        setVideoInfo({
          title: data.title,
          author_name: data.author_name,
          thumbnail_url: data.thumbnail_url
        });
      } catch (error) {
        console.error('Error fetching video info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (videoId) {
      fetchVideoInfo();
    }
  }, [videoId]);

  if (isLoading) {
    return <div className="animate-pulse">
      <div className="w-full aspect-video bg-gray-200 rounded-xl"></div>
      <div className="mt-3 h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
    </div>;
  }

  if (!videoInfo) {
    return null;
  }

  return (
    <div className="flex flex-col w-full cursor-pointer hover:opacity-90 transition-opacity">
      <div className="relative aspect-video w-full">
        <Image
          src={videoInfo.thumbnail_url}
          alt={videoInfo.title}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      
      <div className="mt-3">
        <h3 className="font-semibold text-sm line-clamp-2">
          {videoInfo.title}
        </h3>
        
        <div className="mt-1 text-sm text-gray-600">
          <p>{videoInfo.author_name}</p>
        </div>
      </div>
    </div>
  );
}
