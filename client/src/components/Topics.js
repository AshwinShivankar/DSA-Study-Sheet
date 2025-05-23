import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Chip,
  Link,
  Paper,
  LinearProgress,
  Button,
  Grid,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CodeIcon from "@mui/icons-material/Code";
import ArticleIcon from "@mui/icons-material/Article";
import Header from "./Header";
import { topicsAPI } from "../services/api";
import ErrorDialog from "./common/ErrorDialog";

// Memoized resource buttons to prevent unnecessary re-renders
const ResourceButton = memo(({ icon: Icon, title, url, color, label }) => (
  <Tooltip title={title}>
    <Button
      variant="contained"
      color={color}
      size="small"
      startIcon={<Icon sx={{ fontSize: 18 }} />}
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        minWidth: "auto",
        minHeight: "32px",
        px: 1.5,
        textTransform: "none",
        fontSize: "0.8125rem",
        "&:hover": {
          transform: "translateY(-2px)",
          transition: "transform 0.2s",
        },
      }}
    >
      {label}
    </Button>
  </Tooltip>
));

const SubTopic = memo(({ subTopic, onCheckboxChange }) => {
  if (!subTopic) {
    return null;
  }

  return (
    <ListItem
      sx={{
        flexDirection: "column",
        alignItems: "flex-start",
        bgcolor: "background.paper",
        borderRadius: 1,
        mb: 1.5,
        boxShadow: "0 1px 3px rgb(0 0 0 / 49%)",
        p: 2,
      }}
    >
      {/* Title and Difficulty */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          mb: 1.5,
          borderBottom: "1px solid #eee",
          pb: 1.5,
        }}
      >
        <Checkbox
          checked={subTopic.isCompleted || false}
          onChange={() => onCheckboxChange(subTopic._id)}
          sx={{ mr: 1, mt: -0.5 }}
          size="small"
        />
        <Box sx={{ flex: 1, mr: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
            {subTopic.title || "Untitled Topic"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {subTopic.description}
          </Typography>
        </Box>
        <Chip
          label={subTopic.difficulty || "Unknown"}
          color={
            subTopic.difficulty === "Easy"
              ? "success"
              : subTopic.difficulty === "Medium"
              ? "warning"
              : "error"
          }
          size="small"
          sx={{
            height: "24px",
            "& .MuiChip-label": {
              px: 1,
              fontSize: "0.75rem",
            },
          }}
        />
      </Box>

      {/* Resources */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Video Tutorials */}
        {subTopic.resources?.youtubeLinks?.map((video, index) => (
          <ResourceButton
            key={`yt-${index}`}
            icon={YouTubeIcon}
            title={video.title || "Video Tutorial"}
            url={video.url}
            color="error"
            label="Watch"
          />
        ))}

        {/* Practice Problems */}
        {subTopic.resources?.leetcodeLinks?.map((problem, index) => (
          <ResourceButton
            key={`lc-${index}`}
            icon={CodeIcon}
            title={problem.title || "Practice Problem"}
            url={problem.url}
            color="primary"
            label="Practice"
          />
        ))}

        {/* Articles */}
        {subTopic.resources?.articles?.map((article, index) => (
          <ResourceButton
            key={`art-${index}`}
            icon={ArticleIcon}
            title={article.title || "Article"}
            url={article.url}
            color="secondary"
            label="Read"
          />
        ))}
      </Box>
    </ListItem>
  );
});

const TopicAccordion = memo(
  ({ topic, expanded, onChange, onCheckboxChange }) => {
    if (!topic || !topic.subTopics) {
      return null;
    }

    const progress = Math.round(
      (topic.subTopics.filter((st) => st?.isCompleted).length /
        topic.subTopics.length) *
        100 || 0
    );

    return (
      <Paper sx={{ mb: 2, position: "relative" }}>
        <Accordion
          expanded={expanded}
          onChange={onChange}
          sx={{
            "& .MuiAccordionSummary-root": {
              position: expanded ? "sticky" : "static",
              top: 0,
              zIndex: 1,
              backgroundColor: "background.paper",
              borderBottom: expanded ? "1px solid rgba(0, 0, 0, 0.12)" : "none",
              transition: "box-shadow 0.3s ease-in-out",
              boxShadow: expanded ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-content": {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{topic.title}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {progress}%
                </Typography>
                <Chip
                  label={progress === 100 ? "Completed" : "In Progress"}
                  color={progress === 100 ? "success" : "warning"}
                  size="small"
                />
              </Box>
            </Box>
            <Box sx={{ width: "100%", mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(0,0,0,0.08)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 3 }}>
            <List>
              {topic.subTopics.map(
                (subTopic) =>
                  subTopic && (
                    <SubTopic
                      key={subTopic._id}
                      subTopic={subTopic}
                      onCheckboxChange={(subTopicId) =>
                        onCheckboxChange(topic._id, subTopicId)
                      }
                    />
                  )
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    );
  }
);

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [visibleTopics, setVisibleTopics] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ open: false, message: "" });
  const [page, setPage] = useState(0);
  const topicsPerPage = 3;

  const fetchTopics = useCallback(async () => {
    try {
      const data = await topicsAPI.getTopics();
      setTopics(data);
      setVisibleTopics(data.slice(0, topicsPerPage));
    } catch (error) {
      setError({
        open: true,
        message: "Failed to fetch topics. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const handleCheckboxChange = async (topicId, subTopicId) => {
    try {
      console.log("Handling checkbox change:", { topicId, subTopicId });

      const topic = topics.find((t) => t._id === topicId);
      if (!topic) {
        throw new Error(`Topic not found: ${topicId}`);
      }

      const subTopic = topic.subTopics.find((st) => st._id === subTopicId);
      if (!subTopic) {
        throw new Error(`Subtopic not found: ${subTopicId}`);
      }

      // Get current completion status
      const isCurrentlyCompleted = subTopic.isCompleted || false;

      // Update both topics and visibleTopics states
      const updateTopics = (prevTopics) =>
        prevTopics.map((t) => {
          if (t._id === topicId) {
            return {
              ...t,
              subTopics: t.subTopics.map((st) => {
                if (st._id === subTopicId) {
                  return { ...st, isCompleted: !isCurrentlyCompleted };
                }
                return st;
              }),
            };
          }
          return t;
        });

      setTopics(updateTopics);
      setVisibleTopics(updateTopics);

      // Make API call
      await topicsAPI.updateProgress(
        topicId,
        subTopicId,
        !isCurrentlyCompleted
      );
      console.log("Progress updated successfully");
    } catch (error) {
      console.error("Error updating progress:", error);
      // Revert optimistic update on error
      await fetchTopics();
      setError({
        open: true,
        message:
          error.message || "Failed to update progress. Please try again.",
      });
    }
  };

  // Load more topics when scrolling
  const loadMoreTopics = useCallback(() => {
    const nextPage = page + 1;
    const start = nextPage * topicsPerPage;
    const end = start + topicsPerPage;

    if (start < topics.length) {
      setVisibleTopics((prev) => [...prev, ...topics.slice(start, end)]);
      setPage(nextPage);
    }
  }, [page, topics]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreTopics();
        }
      },
      { threshold: 0.5 }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [loading, loadMoreTopics]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <Box sx={{ mt: 4 }}>
            <Typography>Loading topics...</Typography>
            <LinearProgress />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4">Topics</Typography>
            <Button
              variant="outlined"
              onClick={() => setExpanded(false)}
              disabled={!expanded}
            >
              Collapse All
            </Button>
          </Box>
          {visibleTopics && visibleTopics.length > 0 ? (
            <>
              {visibleTopics.map((topic) => (
                <TopicAccordion
                  key={topic._id}
                  topic={topic}
                  expanded={expanded === topic._id}
                  onChange={handleAccordionChange(topic._id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
              {visibleTopics.length < topics.length && (
                <Box
                  id="scroll-sentinel"
                  sx={{
                    width: "100%",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    my: 2,
                  }}
                >
                  <LinearProgress sx={{ width: "50%" }} />
                </Box>
              )}
            </>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              No topics available. Please check back later.
            </Typography>
          )}
        </Box>
      </Container>

      <ErrorDialog
        open={error.open}
        onClose={() => setError({ open: false, message: "" })}
        message={error.message}
      />
    </>
  );
};

export default Topics;
