import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TopicIcon from '@mui/icons-material/Topic';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const buttonStyles = (path) => ({
    color: 'white',
    position: 'relative',
    px: 2,
    py: 1.5,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: 'white',
      transform: isActive(path) ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform 0.3s ease-in-out'
    },
    ...(isActive(path) && {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      fontWeight: 600
    }),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '&::after': {
        transform: 'scaleX(1)'
      }
    }
  });

  return (
    <AppBar 
      position="static"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      <Toolbar sx={{ minHeight: '64px' }}>
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          gap: 1,
          alignItems: 'center' 
        }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              mr: 4, 
              fontWeight: 700,
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            DSA Study Sheet
          </Typography>
          <Button
            sx={buttonStyles('/dashboard')}
            startIcon={<DashboardIcon />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            sx={buttonStyles('/topics')}
            startIcon={<TopicIcon />}
            onClick={() => navigate('/topics')}
          >
            Topics
          </Button>
          <Button
            sx={buttonStyles('/progress')}
            startIcon={<AssessmentIcon />}
            onClick={() => navigate('/progress')}
          >
            Progress
          </Button>
        </Box>
        <Button
          sx={{
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            transition: 'all 0.2s ease'
          }}
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 