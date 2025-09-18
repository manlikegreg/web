'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { PhotoIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  category?: string;
}

interface SortableItemProps {
  item: GalleryItem;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

function SortableItem({ item, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-50 rounded-lg overflow-hidden border hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div className="aspect-video bg-gray-200 relative">
        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 z-10 bg-white bg-opacity-80 rounded p-1 cursor-grab hover:bg-opacity-100 transition-colors"
        >
          <Bars3Icon className="h-4 w-4 text-gray-600" />
        </div>

        {item.imageUrl.includes('youtube.com') || item.imageUrl.includes('youtu.be') ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <p className="text-xs text-gray-600">Video</p>
            </div>
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.caption || 'Gallery item'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        )}
        <div className="hidden w-full h-full flex items-center justify-center bg-gray-300">
          <PhotoIcon className="h-8 w-8 text-gray-500" />
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.caption || 'No caption'}</p>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="flex-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface DragDropGalleryProps {
  items: GalleryItem[];
  onReorder: (items: GalleryItem[]) => void;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

export function DragDropGallery({ items, onReorder, onEdit, onDelete }: DragDropGalleryProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}