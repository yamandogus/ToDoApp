import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateTodoDialog from '@/components/todo/CreateTodoDialog';
import TodoFilter, { FilterOptions } from '@/components/todo/TodoFilter';
import TodoPagination, { PaginationInfo } from '@/components/todo/TodoPagination';
import UserTasksList from '@/components/todo/UserTasksList';
import { getTodos, updateTodo, deleteTodo, TodoListParams } from '@/services/todoService';
import { toast } from 'react-hot-toast';

interface Todo {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  categories?: any[];
}

const TodoListPage = () => {
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem("token");
  
  // Durum
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: '',
    priority: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Todo getir
  const fetchTodos = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const params: TodoListParams = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: filters.search || undefined,
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };

      const response = await getTodos(params, token);
      
      if (response.status === 'success') {
        setTodos(response.data.data || []);
        
        // Pagination güncelle
        const meta = response.data.meta?.pagination;
        if (meta) {
          setPagination({
            currentPage: meta.current_page,
            totalPages: meta.last_page,
            totalItems: meta.total,
            itemsPerPage: meta.per_page,
            hasNextPage: meta.current_page < meta.last_page,
            hasPrevPage: meta.current_page > 1,
          });
        }
      }
    } catch (error) {
      console.error('Todo getirme hatası:', error);
      toast.error('Todo\'lar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  }, [token, pagination.currentPage, pagination.itemsPerPage, filters]);

  // İlk yükleme
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Filtre değişimi
  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    // İlk sayfaya dön
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // Sayfa değişimi
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  // Sayfa boyutu
  const handlePageSizeChange = (pageSize: number) => {
    setPagination(prev => ({ 
      ...prev, 
      itemsPerPage: pageSize, 
      currentPage: 1 
    }));
  };

  // Todo güncelleme
  const handleUpdateTodo = async (id: string, data: { title?: string; description?: string; status?: string }) => {
    if (!token) return;
    
    try {
      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.status !== undefined) updateData.status = data.status;

      const response = await updateTodo(id, updateData, token);
      
      if (response.status === 'success') {
        toast.success('Todo başarıyla güncellendi');
        fetchTodos(); // Listeyi yenile
      }
    } catch (error) {
      console.error('Todo güncelleme hatası:', error);
      toast.error('Todo güncellenirken hata oluştu');
    }
  };

  // Todo silme
  const handleDeleteTodo = async (id: string) => {
    if (!token) return;
    
    try {
      await deleteTodo(id, token);
      toast.success('Todo başarıyla silindi');
      fetchTodos(); // Listeyi yenile
    } catch (error) {
      console.error('Todo silme hatası:', error);
      toast.error('Todo silinirken hata oluştu');
    }
  };

  // Yenileme
  const handleRefresh = () => {
    fetchTodos();
  };

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Todo Listesi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tüm görevlerinizi görüntüleyin, filtreleyin ve yönetin
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </Button>
          
          <CreateTodoDialog 
            trigger={
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Yeni Todo
              </Button>
            }
          />
        </div>
      </div>

      {/* Filtreler */}
      <TodoFilter
        onFilterChange={handleFilterChange}
        totalCount={pagination.totalItems}
        loading={loading}
      />

      {/* Todo Listesi */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {filters.search || filters.status || filters.priority 
                ? 'Kriterlere uygun todo bulunamadı.' 
                : 'Henüz todo eklenmemiş.'}
            </p>
            {!filters.search && !filters.status && !filters.priority && (
              <CreateTodoDialog 
                trigger={
                  <Button className="mt-4">
                    İlk Todo'nizi Ekleyin
                  </Button>
                }
              />
            )}
          </div>
        ) : (
          <div className="p-6">
            <UserTasksList
              todos={todos}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          </div>
        )}
      </div>

      {/* Sayfalama */}
      {pagination.totalItems > 0 && (
        <TodoPagination
          pagination={pagination}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          loading={loading}
        />
      )}


    </div>
  );
};

export default TodoListPage; 