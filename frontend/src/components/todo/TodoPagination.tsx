import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface TodoPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  loading?: boolean;
}

export const TodoPagination = ({
  pagination,
  onPageChange,
  onPageSizeChange,
  loading
}: TodoPaginationProps) => {
  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPrevPage } = pagination;

  // Sayfa hesaplama
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Tüm sayfalar
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // İlk sayfa
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Çevre sayfalar
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Son sayfa
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Sayfa boyutu seçenekleri
  const pageSizeOptions = [
    { value: '5', label: '5 / sayfa' },
    { value: '10', label: '10 / sayfa' },
    { value: '20', label: '20 / sayfa' },
    { value: '50', label: '50 / sayfa' },
  ];

  // Öğe aralığı
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Sonuç bilgisi */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalItems > 0 ? (
            <>
              <span className="font-medium">{startItem}-{endItem}</span>
              {' arası, toplam '}
              <span className="font-medium">{totalItems}</span>
              {' sonuç'}
            </>
          ) : (
            'Sonuç bulunamadı'
          )}
        </div>

        {/* Sayfa boyutu seçici */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Göster:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
            disabled={loading}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination kontrolları */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            {/* Önceki sayfa */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrevPage || loading}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Önceki
            </Button>

            {/* Sayfa numaraları */}
            <div className="flex items-center gap-1">
              {pageNumbers.map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-gray-400">
                      <MoreHorizontal className="h-4 w-4" />
                    </span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(page as number)}
                      disabled={loading}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Sonraki sayfa */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNextPage || loading}
              className="flex items-center gap-1"
            >
              Sonraki
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Mobil için basit pagination */}
      {totalPages > 1 && (
        <div className="sm:hidden mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded">
            {currentPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoPagination; 