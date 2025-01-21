'use client';

import { Category } from '@/domains/category/types';
import { categoryApi } from '@/services/api/endpoints/v1/category';
import { useQuery } from '@tanstack/react-query';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CategoryListItem } from './CategoryListItem';
import { useState } from 'react';

interface CategoryListProps {
  serviceId: string;
}

export const CategoryList = ({ serviceId }: CategoryListProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { isLoading } = useQuery({
    queryKey: ['categories', serviceId],
    queryFn: () => categoryApi.getCategories(serviceId),
    onSuccess: (data) => setCategories(data),
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = categories.findIndex((category) => category.id === active.id);
      const newIndex = categories.findIndex((category) => category.id === over.id);

      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);

      await categoryApi.updateCategoryOrder(serviceId, {
        order: newCategories.map((category) => category.id),
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((category) => category.id)}
          strategy={verticalListSortingStrategy}
        >
          {categories.map((category) => (
            <CategoryListItem key={category.id} category={category} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
