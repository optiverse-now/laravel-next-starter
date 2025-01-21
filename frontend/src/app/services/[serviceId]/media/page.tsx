'use client';

import { MediaList } from '@/components/features/Media/MediaList/MediaList';

interface MediaPageProps {
  params: {
    serviceId: string;
  };
}

export default function MediaPage({ params }: MediaPageProps) {
  return (
    <div className="container mx-auto py-8">
      <MediaList serviceId={params.serviceId} />
    </div>
  );
}
