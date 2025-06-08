import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../test/utils'
import CreateTodoDialog from '../CreateTodoDialog'

// Mock the hooks and services
vi.mock('../../../hooks/useTodos', () => ({
  useTodos: () => ({
    addTodo: vi.fn(),
    loading: false
  })
}))

vi.mock('../../../services/categoryService', () => ({
  getCategories: vi.fn().mockResolvedValue([
    { id: '1', name: 'Work', color: '#4A90E2', created_at: '', updated_at: '' },
    { id: '2', name: 'Personal', color: '#50E3C2', created_at: '', updated_at: '' }
  ])
}))

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('CreateTodoDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders trigger button by default', () => {
    render(<CreateTodoDialog />)
    
    expect(screen.getByRole('button', { name: /yeni görev/i })).toBeInTheDocument()
  })

  it('renders custom trigger when provided', () => {
    const customTrigger = <button>Custom Trigger</button>
    render(<CreateTodoDialog trigger={customTrigger} />)
    
    expect(screen.getByRole('button', { name: /custom trigger/i })).toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/yeni görev ekle/i)).toBeInTheDocument()
  })

  it('renders form fields when dialog is open', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    expect(screen.getByLabelText(/görev başlığı/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/görev açıklaması/i)).toBeInTheDocument()
  })

  it('validates required title field', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    // Try to submit without title
    const submitButton = screen.getByRole('button', { name: /oluştur/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/görev başlığı en az 3 karakter/i)).toBeInTheDocument()
    })
  })

  it('validates title length', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    const titleInput = screen.getByLabelText(/görev başlığı/i)
    await user.type(titleInput, 'ab') // Too short
    
    const submitButton = screen.getByRole('button', { name: /oluştur/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/görev başlığı en az 3 karakter/i)).toBeInTheDocument()
    })
  })

  it('validates description length', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    const titleInput = screen.getByLabelText(/görev başlığı/i)
    const descriptionInput = screen.getByLabelText(/görev açıklaması/i)
    
    await user.type(titleInput, 'Valid Title')
    await user.type(descriptionInput, 'a'.repeat(501)) // Too long
    
    const submitButton = screen.getByRole('button', { name: /oluştur/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/açıklama en fazla 500 karakter/i)).toBeInTheDocument()
    })
  })

  it('closes dialog on cancel', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    // Cancel dialog
    const cancelButton = screen.getByRole('button', { name: /iptal/i })
    await user.click(cancelButton)
    
    // Dialog should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('allows filling form fields', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    // Fill title
    const titleInput = screen.getByLabelText(/görev başlığı/i)
    await user.type(titleInput, 'Test Todo Title')
    expect(titleInput).toHaveValue('Test Todo Title')
    
    // Fill description
    const descriptionInput = screen.getByLabelText(/görev açıklaması/i)
    await user.type(descriptionInput, 'Test description')
    expect(descriptionInput).toHaveValue('Test description')
  })

  it('shows category selection', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    // Categories should be rendered (mocked to return Work and Personal)
    await waitFor(() => {
      expect(screen.getByText(/work/i)).toBeInTheDocument()
      expect(screen.getByText(/personal/i)).toBeInTheDocument()
    })
  })

  it('renders priority and status selects', async () => {
    const user = userEvent.setup()
    render(<CreateTodoDialog />)
    
    // Open dialog
    const triggerButton = screen.getByRole('button', { name: /yeni görev/i })
    await user.click(triggerButton)
    
    // Check if priority and status selects exist
    expect(screen.getByText(/öncelik/i)).toBeInTheDocument()
    expect(screen.getByText(/durum/i)).toBeInTheDocument()
  })
}) 