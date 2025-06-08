import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface Todo {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
  createdAt?: string;
}

interface UserTasksListProps {
  todos: Todo[];
  onUpdate: (id: string, data: { title: string; description: string }) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}

export const statusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Bekliyor', color: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700' },
  IN_PROGRESS: { label: 'Devam Ediyor', color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-700' },
  COMPLETED: { label: 'Tamamlandı', color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-800 dark:text-green-200 dark:border-green-700' },
  CANCELLED: { label: 'İptal', color: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700' },
};

export const getPriorityText = (priority?: string) => {
  if (!priority) return '';
  if (priority.toLowerCase() === 'low') return 'Düşük';
  if (priority.toLowerCase() === 'medium') return 'Orta';
  if (priority.toLowerCase() === 'high') return 'Yüksek';
  return priority;
};

export const getPriorityColor = (priority?: string) => {
  if (!priority) return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';
  if (priority.toLowerCase() === 'low') return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:border-blue-700';
  if (priority.toLowerCase() === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
  if (priority.toLowerCase() === 'high') return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
  return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700';
};

const UserTasksList = ({ todos, onUpdate, onDelete }: UserTasksListProps) => {
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  // Düzenle butonuna basınca dialogu aç
  const handleEditClick = (todo: Todo) => {
    setEditTodo(todo);
    setEditForm({
      title: todo.title,
      description: todo.description || '',
    });
  };

  // Düzenleme formunu gönder
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTodo) return;
    setLoading(true);
    try {
      await onUpdate?.(editTodo.id, {
        title: editForm.title,
        description: editForm.description,
      });
      setEditTodo(null);
    } catch (err) {
      alert('Güncelleme başarısız.');
    } finally {
      setLoading(false);
    }
  };

  // Silme işlemi
  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await onDelete?.(deleteId);
      setDeleteId(null);
    } catch (err) {
      alert('Silme başarısız.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ul className="space-y-6">
        {todos.map((todo) => (
          <li key={todo.id} className="p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 relative bg-white dark:bg-[#181f2a] border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{todo.title}</h3>
                {todo.description && <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{todo.description}</p>}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEditClick(todo)} title="Düzenle"
                  className="rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                  <Pencil className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setDeleteId(todo.id)} title="Sil"
                  className="rounded-full border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                  <Trash className="w-5 h-5 text-red-500 dark:text-red-300" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 items-center text-xs">
              <Badge className={statusMap[todo.status]?.color || statusMap['PENDING'].color} variant="outline">
                Durum: {statusMap[todo.status]?.label || 'Bekliyor'}
              </Badge>
              {todo.priority && (
                <Badge className={getPriorityColor(todo.priority)} variant="outline">
                  Öncelik: {getPriorityText(todo.priority)}
                </Badge>
              )}
              {todo.dueDate && (
                <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
                  Bitiş: {typeof todo.dueDate === 'string' ? new Date(todo.dueDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </Badge>
              )}
              {todo.createdAt && (
                <Badge className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                  Oluşturulma: {typeof todo.createdAt === 'string' ? new Date(todo.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                </Badge>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Düzenle Dialog */}
      <Dialog open={!!editTodo} onOpenChange={(open) => !open && setEditTodo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Görev Düzenle</DialogTitle>
            <DialogDescription>Görev bilgilerini güncelleyin.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              value={editForm.title}
              onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Başlık"
              required
              disabled={loading}
            />
            <Textarea
              value={editForm.description}
              onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Açıklama"
              disabled={loading}
            />
            <DialogFooter>
              <Button type="submit" disabled={loading}>Kaydet</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={loading}>İptal</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Silme Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Görevi Sil</DialogTitle>
            <DialogDescription>Bu görevi silmek istediğinize emin misiniz?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>Sil</Button>
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>Vazgeç</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserTasksList; 