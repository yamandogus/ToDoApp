import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Calendar } from 'lucide-react'
import { useTodos } from '@/hooks/useTodos'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const todoSchema = z.object({
  title: z.string().min(3, 'Görev başlığı en az 3 karakter olmalıdır').max(100, 'Görev başlığı en fazla 100 karakter olabilir'),
  description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled'])
    .default('pending')
    .transform(val => val.toUpperCase()) as unknown as z.ZodEnum<['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']>,
  priority: z.enum(['low', 'medium', 'high'])
    .default('medium')
    .transform(val => val.toUpperCase()) as unknown as z.ZodEnum<['LOW', 'MEDIUM', 'HIGH']>,
  due_date: z.string().min(1, { message: 'Son tarih gereklidir.' }),
})

type TodoForm = z.infer<typeof todoSchema>

interface CreateTodoDialogProps {
  trigger?: React.ReactNode
}

const CreateTodoDialog = ({ trigger }: CreateTodoDialogProps) => {
  const [open, setOpen] = useState(false)
  const { addTodo, loading } = useTodos()
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    console.log(token);
    console.log(userId);
  }, [token, userId])
  
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      status: 'PENDING',
      priority: 'MEDIUM'
    }
  })

  const onSubmit = async (data: TodoForm) => {
    console.log('onSubmit function CALLED. Form Data:', data);
    console.log('Current userId from store:', userId);
    console.log('Current token from store:', token);
    console.log('Form isSubmitting:', isSubmitting);
    console.log('useTodos loading state:', loading);
    console.log('Form errors:', errors);
    if (!userId) {
      alert('Kullanıcı kimliği bulunamadı. Lütfen tekrar giriş yapın.');
      console.error('User ID not found. Please log in.');
      return;
    }
    if (!token) {
      alert('Yetkilendirme anahtarı bulunamadı. Lütfen tekrar giriş yapın.');
      console.error('Authorization token not found. Please log in.');
      return;
    }
    try {
      const backendPayload: {
        title: string;
        userId: string;
        description: string;
        priority: string;
        status: string;
        dueDate: string; 
      } = {
        title: data.title,
        userId: userId,
        description: data.description || "", 
        priority: data.priority, // Already transformed to uppercase by Zod
        status: data.status,   // Already transformed to uppercase by Zod 
        dueDate: new Date(data.due_date).toISOString(), 
      };

      // datetime-local input value is like "YYYY-MM-DDTHH:MM"
      // new Date("YYYY-MM-DDTHH:MM").toISOString() gives "YYYY-MM-DDTHH:MM:00.000Z"
      await addTodo(backendPayload, token || undefined);
      setOpen(false);
      reset();
    } catch (error) {
      console.error('Görev oluşturulurken hata oluştu:', error);
      alert('Görev oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
    }
  }

  const handleCancel = () => {
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Yeni Görev
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Yeni Görev Ekle</DialogTitle>
          <DialogDescription>
            Yeni bir görev oluşturmak için aşağıdaki formu doldurun.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Görev Başlığı */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Görev Başlığı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Görev başlığını girin (3-100 karakter)"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Görev Açıklaması */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Görev Açıklaması <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Görev açıklamasını girin (maksimum 500 karakter)"
              className="min-h-[100px]"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Durum */}
          <div className="space-y-2">
            <Label>
              Durum <span className="text-red-500">*</span>
            </Label>
            <Select
              value={watch('status')}
              onValueChange={(value) => setValue('status', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Bekliyor</SelectItem>
                <SelectItem value="in_progress">Devam Ediyor</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="cancelled">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Öncelik */}
          <div className="space-y-2">
            <Label>
              Öncelik <span className="text-red-500">*</span>
            </Label>
            <Select
              value={watch('priority')}
              onValueChange={(value) => setValue('priority', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Öncelik seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Düşük</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Son Tarih */}
          <div className="space-y-2">
            <Label htmlFor="due_date">
              Son Tarih <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="due_date"
                type="datetime-local"
                {...register('due_date')}
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              İptal
            </Button>
            <Button type="submit">
              {isSubmitting || loading ? 'Oluşturuluyor...' : 'Görevi Oluştur'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTodoDialog 