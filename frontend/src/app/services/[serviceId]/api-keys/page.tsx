'use client';

import { ApiKeyList } from '@/components/features/ApiKey/ApiKeyList/ApiKeyList';

interface ApiKeysPageProps {
  params: {
    serviceId: string;
  };
}

export default function ApiKeysPage({ params }: ApiKeysPageProps) {
  return (
    <div className="container mx-auto py-8">
      <ApiKeyList serviceId={params.serviceId} />
    </div>
  );
}
