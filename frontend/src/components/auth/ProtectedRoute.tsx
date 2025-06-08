import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@/store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const localToken = localStorage.getItem('token');

  useEffect(() => {
    // Token kontrolü
    const hasValidToken = isAuthenticated && (token || localToken);
    
    if (!hasValidToken) {
      console.log('Yetkilendirme bulunamadı, ana sayfaya yönlendiriliyor...');
      
      // Login sonrası geri dönüş için
      navigate('/', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [isAuthenticated, token, localToken, navigate, location.pathname]);

  // Yönlendirme sırasında loading
  if (!isAuthenticated || (!token && !localToken)) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Yönlendiriliyor...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 