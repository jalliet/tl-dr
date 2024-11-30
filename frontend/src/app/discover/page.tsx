'use client';

import { AgentDetail } from '@/components/AgentDetail';
import Recommendation from '@/components/Recommendation';

const RecommendationPage = () => {
  // Example video IDs - replace with your actual video IDs
  const videoIds = [
    'dQw4w9WgXcQ',
    'jNQXAC9IVRw',
    '9bZkp7q19f0',
    'kJQP7kiw5Fk',
    'JGwWNGJdvx8',
    'OPf0YbXqDm0',
    'fJ9rUzIMcZQ',
    'y6120QOlsfU',
  ];

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-xl font-bold mb-6">Exploration & Curation Agent</h1>  */}
      <AgentDetail /> 
      <h1 className="text-2xl font-bold my-6">Recommended Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoIds.map((videoId) => (
          <Recommendation key={videoId} videoId={videoId} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationPage;
