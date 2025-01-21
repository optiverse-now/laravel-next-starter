'use client';

import { Service } from '@/domains/service/types';
import { serviceApi } from '@/services/api/endpoints/v1/service';
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
import { ServiceListItem } from './ServiceListItem';
import { useState } from 'react';

export const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const { isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: serviceApi.getServices,
    onSuccess: (data) => setServices(data),
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
      const oldIndex = services.findIndex((service) => service.id === active.id);
      const newIndex = services.findIndex((service) => service.id === over.id);

      const newServices = arrayMove(services, oldIndex, newIndex);
      setServices(newServices);

      await serviceApi.updateServiceOrder({
        order: newServices.map((service) => service.id),
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
          items={services.map((service) => service.id)}
          strategy={verticalListSortingStrategy}
        >
          {services.map((service) => (
            <ServiceListItem key={service.id} service={service} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
