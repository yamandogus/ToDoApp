import { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface FilterOptions {
  search: string;
  status: string;
  priority: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface TodoFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  totalCount: number;
  loading?: boolean;
}

const statusOptions = [
  { value: '', label: 'Tüm Durumlar' },
  { value: 'PENDING', label: 'Bekliyor' },
  { value: 'IN_PROGRESS', label: 'Devam Ediyor' },
  { value: 'COMPLETED', label: 'Tamamlandı' },
  { value: 'CANCELLED', label: 'İptal Edildi' },
];

const priorityOptions = [
  { value: '', label: 'Tüm Öncelikler' },
  { value: 'LOW', label: 'Düşük' },
  { value: 'MEDIUM', label: 'Orta' },
  { value: 'HIGH', label: 'Yüksek' },
];

const sortOptions = [
  { value: 'createdAt', label: 'Oluşturulma Tarihi' },
  { value: 'dueDate', label: 'Bitiş Tarihi' },
  { value: 'title', label: 'Başlık' },
  { value: 'priority', label: 'Öncelik' },
  { value: 'status', label: 'Durum' },
];

export const TodoFilter = ({ onFilterChange, totalCount, loading }: TodoFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: '',
    priority: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  // Filtre değişikliği
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Arama debounce
  const handleSearchChange = (value: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value }));
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSortOrder = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status) count++;
    if (filters.priority) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Arama */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Todo'larda ara..."
          className="pl-10"
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Filtre Kontrolleri */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {/* Durum Filtresi */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Durum
                {filters.status && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    1
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Durum Filtresi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilterChange('status', option.value)}
                  className={filters.status === option.value ? 'bg-blue-50 dark:bg-blue-900' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Öncelik Filtresi */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Öncelik
                {filters.priority && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                    1
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Öncelik Filtresi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {priorityOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilterChange('priority', option.value)}
                  className={filters.priority === option.value ? 'bg-blue-50 dark:bg-blue-900' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sıralama */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                {filters.sortOrder === 'asc' ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
                Sıralama
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sıralama Kriteri</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilterChange('sortBy', option.value)}
                  className={filters.sortBy === option.value ? 'bg-blue-50 dark:bg-blue-900' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleSortOrder}>
                {filters.sortOrder === 'asc' ? '↑ Artan' : '↓ Azalan'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filtreleri Temizle */}
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Filtreleri Temizle ({activeFilterCount})
            </Button>
          )}
        </div>

        {/* Sonuç Sayısı */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {loading ? 'Yükleniyor...' : `${totalCount} todo gösteriliyor`}
        </div>
      </div>

      {/* Aktif Filtreler */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Arama: "{filters.search}"
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Durum: {statusOptions.find(s => s.value === filters.status)?.label}
            </Badge>
          )}
          {filters.priority && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Öncelik: {priorityOptions.find(p => p.value === filters.priority)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoFilter; 