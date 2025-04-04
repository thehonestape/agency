import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DesignSystem() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the current design docs page
    navigate('/design-docs');
  }, [navigate]);
  
  // Render a loading state while redirecting
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to design documentation...</p>
    </div>
  );
} 