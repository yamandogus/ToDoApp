import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import axios from 'axios';
import { debounce } from 'lodash';
import { BASE_URL } from '@/services/authService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';



interface TodoItem {
  id: string;
  title: string;
  description?: string;
}

interface SearchInputProps {
  onSearchResults?: (results: TodoItem[]) => void;
  onSearchLoading?: (loading: boolean) => void;
  onSearchError?: (error: string | null) => void;
}

interface TodoItem {
  id: string;
  title: string;
  description?: string;
  status: string;
  dueDate?: string;
  categoryId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const SearchInput = ({ onSearchResults, onSearchLoading, onSearchError }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedResults, setDisplayedResults] = useState<TodoItem[]>([]);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchSearchResults = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === '') {
        setDisplayedResults([]);
        setSearchAttempted(false);
        setError(null);
        setLoading(false);
        onSearchResults?.([]);
        onSearchError?.(null);
        onSearchLoading?.(false);
        return;
      }

      setLoading(true);
      setError(null);
      onSearchLoading?.(true);
      onSearchError?.(null);

      setSearchAttempted(true);
      try {
        const response = await axios.get<{ status: string; data: { data: TodoItem[]; meta: any } }>(`${BASE_URL}/api/todos/search`, {
          params: { q: query },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
   
        console.log('[SearchInput] Raw API response.data:', response.data);
        const middleLayerData = response.data.data;
        console.log('[SearchInput] Middle layer data (response.data.data):', middleLayerData);

        if (middleLayerData && Array.isArray(middleLayerData.data)) {
          const actualTodoArray = middleLayerData.data;
          console.log('[SearchInput] Actual todos array (middleLayerData.data):', actualTodoArray, 'Length:', actualTodoArray.length);
          setDisplayedResults(actualTodoArray);
          onSearchResults?.(actualTodoArray);
        } else {
          console.warn('[SearchInput] Todos array not found in expected path or not an array. Response structure might be different. Setting empty results. Middle layer data was:', middleLayerData);
          setDisplayedResults([]);
          onSearchResults?.([]);
        }
        setError(null);
        onSearchError?.(null);
      } catch (err) {
        console.error('Error fetching search results:', err);
        const errorMessage = err instanceof Error ? err.message : 'Arama sırasında bir hata oluştu.';
        setError(errorMessage);
        onSearchError?.(errorMessage);
        setDisplayedResults([]);
        onSearchResults?.([]); 
      } finally {
        setLoading(false);
        onSearchLoading?.(false);
      }
    }, 500),
    [onSearchResults, onSearchLoading, onSearchError, token]
  );

  useEffect(() => {
    fetchSearchResults(searchTerm);
    return () => {
      fetchSearchResults.cancel();
    };
  }, [searchTerm, fetchSearchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full md:w-64">
      <Input
        type="text"
        placeholder="Görevlerde ara..."
        value={searchTerm}
        onChange={handleInputChange}
        className="pl-10 w-full md:w-64"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />

      {(loading || error || (searchAttempted && searchTerm.trim() !== '')) && (
        <div className="absolute z-10 mt-1 w-full bg-background border border-border shadow-lg rounded-md max-h-60 overflow-y-auto top-full">
          {loading && <div className="p-2 text-sm text-muted-foreground">Aranıyor...</div>}
          {error && <div className="p-2 text-sm text-destructive">Hata: {error}</div>}
          {!loading && !error && searchAttempted && searchTerm.trim() !== '' && (
            displayedResults.length > 0 ? (
              displayedResults.map((todo) => (
                <div key={todo.id} className="p-2 text-sm hover:bg-accent cursor-pointer">
                  {todo.title}
                </div>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">Todo bulunamadı.</div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
