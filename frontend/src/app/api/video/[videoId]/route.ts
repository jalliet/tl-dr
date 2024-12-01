import { NextResponse } from 'next/server';

function formatDuration(isoDuration: string) {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';

  const [_, hours, minutes, seconds] = match;
  const h = hours ? `${hours}:` : '';
  const m = minutes ? minutes.padStart(2, '0') : '00';
  const s = seconds ? seconds.padStart(2, '0') : '00';

  return h + (hours ? m + ':' + s : m + ':' + s);
}

function formatViews(viewCount: string) {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export async function GET(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  const videoId = params.videoId;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key not configured' },
      { status: 500 }
    );
  }
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: API_KEY,
      })
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      );
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const statistics = video.statistics;
    const contentDetails = video.contentDetails;

    return NextResponse.json({
      title: snippet.title,
      thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
      channelTitle: snippet.channelTitle,
      views: formatViews(statistics.viewCount),
      duration: formatDuration(contentDetails.duration),
    });

  } catch (error) {
    console.error('Error fetching video details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video details' },
      { status: 500 }
    );
  }
} 