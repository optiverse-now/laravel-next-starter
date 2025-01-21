'use client';

import { Category } from '@/domains/category/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface CategoryListItemProps {
  category: Category;
}

export const CategoryListItem = ({ category }: CategoryListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:text-gray-500"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="flex-1">
        <h3 className="text-lg font-medium">{category.name}</h3>
        <p className="text-sm text-gray-500">
          作成日: {new Date(category.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
