// Todo tipleri
export interface Todo {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  created_at: string
  updated_at: string
  categories?: Category[]
}

// Kategori tipleri
export interface Category {
  id: string
  name: string
  color: string
  created_at: string
  updated_at: string
}

// API yanıt tipleri
export interface ApiResponse<T> {
  status: 'success' | 'error'
  message?: string
  data?: T
  meta?: {
    pagination?: {
      total: number
      per_page: number
      current_page: number
      last_page: number
      from: number
      to: number
    }
  }
  errors?: string[]
}

// İstatistik tipleri
export interface TodoStats {
  total: number
  pending: number
  in_progress: number
  completed: number
  cancelled: number
  overdue?: number
} 