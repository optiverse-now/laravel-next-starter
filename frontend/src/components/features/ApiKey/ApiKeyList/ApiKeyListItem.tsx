'use client';

import { ApiKey } from '@/domains/apiKey/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

interface ApiKeyListItemProps {
  apiKey: ApiKey;
  onDelete: () => void;
}

export const ApiKeyListItem = ({ apiKey, onDelete }: ApiKeyListItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{apiKey.name}</h3>
          <p className="text-sm text-gray-500">作成日: {formatDate(apiKey.created_at)}</p>
          {apiKey.key && (
            <div className="mt-2">
              <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                {apiKey.key}
              </p>
              <p className="text-sm text-red-500 mt-1">
                このAPIキーは一度しか表示されません。大切に保管してください。
              </p>
            </div>
          )}
        </div>
        <Button
          variant="destructive"
          onClick={onDelete}
        >
          削除
        </Button>
      </div>
    </Card>
  );
};
