import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Simple test to verify our setup
describe('Simple Test', () => {
  it('renders a simple component', () => {
    render(<div>Hello Test World</div>)
    expect(screen.getByText('Hello Test World')).toBeInTheDocument()
  })

  it('can perform basic assertions', () => {
    expect(1 + 1).toBe(2)
    expect('hello').toBe('hello')
    expect([1, 2, 3]).toHaveLength(3)
  })
}) 