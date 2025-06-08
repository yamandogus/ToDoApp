import { http, HttpResponse } from 'msw'

const API_BASE_URL = 'http://localhost:3000/api'

// Mock data
const mockTodos = [
  {
    id: '1',
    title: 'Test Todo 1',
    description: 'Test description 1',
    status: 'pending',
    priority: 'high',
    due_date: '2024-12-31T23:59:59.000Z',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
    categories: [
      { id: '1', name: 'Work', color: '#4A90E2' }
    ]
  },
  {
    id: '2',
    title: 'Test Todo 2',
    description: 'Test description 2',
    status: 'completed',
    priority: 'medium',
    due_date: '2024-12-25T23:59:59.000Z',
    created_at: '2024-01-02T00:00:00.000Z',
    updated_at: '2024-01-02T00:00:00.000Z',
    categories: []
  }
]

const mockCategories = [
  { id: '1', name: 'Work', color: '#4A90E2', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' },
  { id: '2', name: 'Personal', color: '#50E3C2', created_at: '2024-01-01T00:00:00.000Z', updated_at: '2024-01-01T00:00:00.000Z' }
]

const mockUser = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
  role: 'user'
}

export const handlers = [
  // Authentication
  http.post(`${API_BASE_URL}/auth/login`, () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        user: mockUser,
        token: 'mock-jwt-token'
      }
    })
  }),

  http.post(`${API_BASE_URL}/auth/register`, () => {
    return HttpResponse.json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: mockUser,
        token: 'mock-jwt-token'
      }
    }, { status: 201 })
  }),

  // Todos
  http.get(`${API_BASE_URL}/todos`, ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 10
    const status = url.searchParams.get('status')
    
    let filteredTodos = mockTodos
    if (status) {
      filteredTodos = mockTodos.filter(todo => todo.status === status)
    }

    return HttpResponse.json({
      status: 'success',
      data: filteredTodos,
      meta: {
        pagination: {
          total: filteredTodos.length,
          per_page: limit,
          current_page: page,
          last_page: Math.ceil(filteredTodos.length / limit),
          from: 1,
          to: filteredTodos.length
        }
      }
    })
  }),

  http.get(`${API_BASE_URL}/todos/:id`, ({ params }) => {
    const { id } = params
    const todo = mockTodos.find(t => t.id === id)
    
    if (!todo) {
      return HttpResponse.json({
        status: 'error',
        message: 'Todo not found'
      }, { status: 404 })
    }

    return HttpResponse.json({
      status: 'success',
      data: todo
    })
  }),

  http.post(`${API_BASE_URL}/todos`, async ({ request }) => {
    const body = await request.json() as any
    return HttpResponse.json({
      status: 'success',
      message: 'Todo created successfully',
      data: {
        id: '3',
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }, { status: 201 })
  }),

  http.put(`${API_BASE_URL}/todos/:id`, async ({ params, request }) => {
    const { id } = params
    const body = await request.json() as any
    return HttpResponse.json({
      status: 'success',
      message: 'Todo updated successfully',
      data: {
        id,
        ...body,
        updated_at: new Date().toISOString()
      }
    })
  }),

  http.patch(`${API_BASE_URL}/todos/:id/status`, ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      status: 'success',
      message: 'Todo status updated successfully',
      data: {
        id,
        updated_at: new Date().toISOString()
      }
    })
  }),

  http.delete(`${API_BASE_URL}/todos/:id`, () => {
    return HttpResponse.json({
      status: 'success',
      message: 'Todo deleted successfully'
    })
  }),

  // Categories
  http.get(`${API_BASE_URL}/categories`, () => {
    return HttpResponse.json({
      status: 'success',
      data: mockCategories
    })
  }),

  http.post(`${API_BASE_URL}/categories`, async ({ request }) => {
    const body = await request.json() as any
    return HttpResponse.json({
      status: 'success',
      message: 'Category created successfully',
      data: {
        id: '3',
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }, { status: 201 })
  }),

  // Stats
  http.get(`${API_BASE_URL}/stats/todos`, () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        pending: 1,
        in_progress: 0,
        completed: 1,
        cancelled: 0,
        total: 2,
        overdue: 0
      }
    })
  })
] 