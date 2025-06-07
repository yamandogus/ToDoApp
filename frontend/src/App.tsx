import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './store/store'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import TodoListPage from './pages/TodoListPage'
import TodoDetailPage from './pages/TodoDetailPage'
import CategoryPage from './pages/CategoryPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Toaster position="top-right" />
          <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
            <div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/todos" element={<TodoListPage />} />
                <Route path="/todos/:id" element={<TodoDetailPage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/profile" element={<ProfilePage />} /> 
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App 