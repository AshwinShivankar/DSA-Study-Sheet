import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  LinearProgress,
  Grid,
} from '@mui/material';
import Header from './Header';
import { topicsAPI } from '../services/api';
import ErrorDialog from './common/ErrorDialog';

const DifficultyProgress = ({ difficulty, progress, color }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" gutterBottom>
      {difficulty}: {progress}%
    </Typography>
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        height: 10,
        borderRadius: 5,
        backgroundColor: `${color}.light`,
        '& .MuiLinearProgress-bar': {
          backgroundColor: `${color}.main`,
        },
      }}
    />
  </Box>
);

const Progress = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ open: false, message: '' });

  const fetchTopics = async () => {
    try {
      const data = await topicsAPI.getTopics();
      setTopics(data);
    } catch (error) {
      setError({
        open: true,
        message: 'Failed to fetch topics. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const calculateDifficultyProgress = (difficulty) => {
    if (!topics || topics.length === 0) return 0;

    let total = 0;
    let completed = 0;

    try {
      topics.forEach(topic => {
        if (topic.subTopics) {
          topic.subTopics.forEach(subTopic => {
            if (subTopic.difficulty === difficulty) {
              total++;
              if (subTopic.isCompleted) {
                completed++;
              }
            }
          });
        }
      });

      return total === 0 ? 0 : Math.round((completed / total) * 100);
    } catch (error) {
      setError({
        open: true,
        message: 'Error calculating progress. Please try again later.'
      });
      return 0;
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="md">
          <Box sx={{ mt: 4 }}>
            <Typography>Loading progress data...</Typography>
            <LinearProgress />
          </Box>
        </Container>
      </>
    );
  }

  if (!topics || topics.length === 0) {
    return (
      <>
        <Header />
        <Container maxWidth="md">
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" color="text.secondary" align="center">
              No progress data available.
            </Typography>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ 
          p: 3,
          '& .MuiBox-root': {
            transition: 'all 0.3s ease',
            p: 2,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-root': {
                height: 12,
                '& .MuiLinearProgress-bar': {
                  boxShadow: '0 0 8px rgba(255,255,255,0.3)'
                }
              },
              '& .MuiTypography-h6': {
                transform: 'translateX(4px)',
                color: theme => theme.palette.primary.main
              }
            }
          },
          '& .MuiLinearProgress-root': {
            height: 10,
            borderRadius: 5,
            transition: 'all 0.3s ease',
            mb: 1
          },
          '& .MuiLinearProgress-bar': {
            transition: 'all 0.3s ease',
            borderRadius: 5
          },
          '& .MuiTypography-h6': {
            transition: 'all 0.3s ease',
            fontWeight: 600,
            mb: 1
          },
          '& .MuiTypography-body2': {
            color: 'text.secondary',
            transition: 'all 0.3s ease'
          }
        }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
            Your Progress
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Easy Topics
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={calculateDifficultyProgress('Easy')} 
              color="primary"
            />
            <Typography variant="body2">
              {calculateDifficultyProgress('Easy')}% Complete
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Medium Topics
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={calculateDifficultyProgress('Medium')} 
              color="warning"
            />
            <Typography variant="body2">
              {calculateDifficultyProgress('Medium')}% Complete
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Hard Topics
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={calculateDifficultyProgress('Hard')} 
              color="error"
            />
            <Typography variant="body2">
              {calculateDifficultyProgress('Hard')}% Complete
            </Typography>
          </Box>
        </Box>
      </Container>

      <ErrorDialog
        open={error.open}
        onClose={() => setError({ open: false, message: '' })}
        message={error.message}
      />
    </>
  );
};

export default Progress; 