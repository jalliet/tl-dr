interface YouTubeEmbedProps {
  videoId: string;
  startTime?: number;
}

export function YouTubeEmbed({ videoId, startTime = 0 }: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&rel=0`;
  
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
} 