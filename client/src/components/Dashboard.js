import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { topicsAPI } from '../services/api';
import Header from './Header';
import ErrorDialog from './common/ErrorDialog';

const Dashboard = () => {
  const { auth } = useAuth();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ open: false, message: '' });
  const theme = useTheme();

  useEffect(() => {
    fetchTopics();
  }, []);

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

  const calculateProgress = () => {
    if (!topics || topics.length === 0) return 0;
    
    const totalSubTopics = topics.reduce((acc, topic) => 
      acc + (topic.subTopics?.length || 0), 0);
    const completedSubTopics = topics.reduce((acc, topic) => 
      acc + (topic.subTopics?.filter(st => st.isCompleted)?.length || 0), 0);
    
    return totalSubTopics === 0 ? 0 : Math.round((completedSubTopics / totalSubTopics) * 100);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <Box sx={{ mt: 2 }}>
            <Typography>Loading...</Typography>
            <LinearProgress />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box 
        sx={{ 
          height: 'calc(100vh - 64px)', 
          overflow: 'hidden',
          bgcolor: theme.palette.grey[50],
          pt: 3,
          pb: 3
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid 
            container 
            spacing={3} 
            sx={{ 
              flexGrow: 1,
              alignItems: 'stretch'
            }}
          >
            {/* Welcome Section */}
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                {/* Background Image Overlay */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.05,
                    background: 'url(https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg) no-repeat right center',
                    backgroundSize: 'cover',
                  }}
                />

                {/* Content */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    zIndex: 1,
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography 
                      variant="h3" 
                      gutterBottom 
                      sx={{ 
                        color: 'white',
                        fontWeight: 700,
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.01)'
                        }
                      }}
                    >
                      Welcome, {auth.user?.username}!
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.9)',
                        mb: 4,
                        fontWeight: 500
                      }}
                    >
                      Start your DSA learning journey today
                    </Typography>
                  </Box>

                  {/* Progress Section */}
                  <Box 
                    sx={{ 
                      p: 3,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                      maxWidth: '600px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.15)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        color: 'white',
                        fontWeight: 500
                      }}
                    >
                      Overall Progress: {calculateProgress()}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateProgress()} 
                      sx={{ 
                        height: 10,
                        borderRadius: 5,
                        bgcolor: 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          height: 12,
                          bgcolor: 'rgba(255,255,255,0.3)',
                          transform: 'scale(1.01)',
                        },
                        '& .MuiLinearProgress-bar': {
                          bgcolor: 'white',
                          borderRadius: 5,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.9)',
                            boxShadow: '0 0 8px rgba(255,255,255,0.5)'
                          }
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Quick Access Cards */}
            <Grid item xs={12} md={4}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  {
                    title: 'Topics',
                    description: 'Explore our DSA topics collection',
                    image: 'https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg',
                    color: theme.palette.primary.main,
                    bgColor: theme.palette.primary.light
                  },
                  {
                    title: 'Track Progress',
                    description: 'Monitor your learning journey',
                    image: 'https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg',
                    color: theme.palette.warning.main,
                    bgColor: theme.palette.warning.light
                  },
                  {
                    title: 'Resources',
                    description: 'Access learning materials',
                    image: 'https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg',
                    color: theme.palette.success.main,
                    bgColor: theme.palette.success.light
                  }
                ].map((card, index) => (
                  <Card 
                    key={index}
                    sx={{ 
                      display: 'flex',
                      flex: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 120,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: card.bgColor,
                        p: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: `${card.bgColor}CC`
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={card.image}
                        alt={card.title}
                        sx={{ 
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    </Box>
                    <CardContent 
                      sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 2.5
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          color: card.color,
                          fontWeight: 600,
                          mb: 0.5,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(4px)'
                          }
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ lineHeight: 1.3 }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ErrorDialog
        open={error.open}
        onClose={() => setError({ open: false, message: '' })}
        message={error.message}
      />
    </>
  );
};

export default Dashboard; 