'use client';

import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (page) =>
      page === 1 ||
      page === lastPage ||
      Math.abs(page - currentPage) <= 2
  );

  const renderPageButton = (page: number) => (
    <Button
      key={page}
      variant={page === currentPage ? 'default' : 'outline'}
      size="sm"
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );

  const renderEllipsis = (key: string) => (
    <span key={key} className="px-2">
      ...
    </span>
  );

  const paginationItems = visiblePages.reduce((items, page, index, array) => {
    if (index > 0) {
      const prevPage = array[index - 1];
      if (page - prevPage > 1) {
        items.push(renderEllipsis(`ellipsis-${page}`));
      }
    }
    items.push(renderPageButton(page));
    return items;
  }, [] as React.ReactNode[]);

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {paginationItems}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
