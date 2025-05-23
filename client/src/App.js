import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Topics from './components/Topics';
import Progress from './components/Progress';
import { CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { topicsAPI } from './services/api';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

const PrivateLayout = ({ component: Component }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await topicsAPI.getTopics();
        setTopics(data);
      } catch (error) {
        console.error('Failed to fetch topics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (loading) {
    return null;
  }

  return <Component topics={topics} />;
};

function App() {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/topics"
            element={
              <PrivateRoute>
                <PrivateLayout component={Topics} />
              </PrivateRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <PrivateRoute>
                <PrivateLayout component={Progress} />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; 