'use client';

import { ApiKey } from '@/domains/apiKey/types';
import { apiKeyApi } from '@/services/api/apiKey';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ApiKeyListItem } from './ApiKeyListItem';
import { CreateApiKeyForm } from './CreateApiKeyForm';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

interface ApiKeyListProps {
  serviceId: string;
}

export const ApiKeyList = ({ serviceId }: ApiKeyListProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ['apiKeys', serviceId],
    queryFn: () => apiKeyApi.getApiKeys(serviceId),
  });

  const handleDelete = async (apiKey: ApiKey) => {
    try {
      await apiKeyApi.deleteApiKey(apiKey.id);
      toast.success('APIキーを削除しました');
    } catch (error) {
      toast.error('APIキーの削除に失敗しました');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">APIキー</h2>
        <Button onClick={() => setIsFormOpen(true)}>新規作成</Button>
      </div>

      {isFormOpen && (
        <CreateApiKeyForm
          serviceId={serviceId}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <div className="space-y-4">
        {apiKeys?.map((apiKey) => (
          <ApiKeyListItem
            key={apiKey.id}
            apiKey={apiKey}
            onDelete={() => handleDelete(apiKey)}
          />
        ))}
      </div>
    </div>
  );
};
