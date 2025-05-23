const mongoose = require("mongoose");
const User = require("../models/User");
const Topic = require("../models/Topic");
require("dotenv").config();

// MongoDB connection string
const MONGODB_URI = "mongodb://localhost:27017/dsa-study-sheet";
process.env.JWT_SECRET = "your-secret-key-here";

const topics = [
  {
    title: "Algorithms",
    description: "Core algorithmic concepts and problem-solving techniques",
    order: 1,
    subTopics: [
      {
        title: "Binary Search",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=P3YID7liBug",
        leetcodeLink: "https://leetcode.com/tag/binary-search/",
        articleLink: "https://www.geeksforgeeks.org/binary-search/",
      },
      {
        title: "Dynamic Programming",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
        leetcodeLink: "https://leetcode.com/tag/dynamic-programming/",
        articleLink: "https://www.geeksforgeeks.org/dynamic-programming/",
      },
      {
        title: "Graph Algorithms",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=tWVWeAqZ0WU",
        leetcodeLink: "https://leetcode.com/tag/graph/",
        articleLink:
          "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
      },
      {
        title: "Sorting Algorithms",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=kPRA0W1kECg",
        leetcodeLink: "https://leetcode.com/tag/sorting/",
        articleLink: "https://www.geeksforgeeks.org/sorting-algorithms/",
      },
      {
        title: "Greedy Algorithms",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=bC7o8P_Ste4",
        leetcodeLink: "https://leetcode.com/tag/greedy/",
        articleLink: "https://www.geeksforgeeks.org/greedy-algorithms/",
      },
    ],
  },
  {
    title: "Data Structures",
    description: "Fundamental data structures and their implementations",
    order: 2,
    subTopics: [
      {
        title: "Arrays and Strings",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=3OamzN90kPg",
        leetcodeLink: "https://leetcode.com/tag/array/",
        articleLink: "https://www.geeksforgeeks.org/array-data-structure/",
      },
      {
        title: "Trees and BST",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=fAAZixBzIAI",
        leetcodeLink: "https://leetcode.com/tag/tree/",
        articleLink:
          "https://www.geeksforgeeks.org/binary-tree-data-structure/",
      },
      {
        title: "Graphs",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=tWVWeAqZ0WU",
        leetcodeLink: "https://leetcode.com/tag/graph/",
        articleLink:
          "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
      },
      {
        title: "Hash Tables",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=shs0KM3wKv8",
        leetcodeLink: "https://leetcode.com/tag/hash-table/",
        articleLink: "https://www.geeksforgeeks.org/hashing-data-structure/",
      },
      {
        title: "Heaps",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=t0Cq6tVNRBA",
        leetcodeLink: "https://leetcode.com/tag/heap/",
        articleLink: "https://www.geeksforgeeks.org/heap-data-structure/",
      },
    ],
  },
  {
    title: "Databases",
    description: "Database concepts, design, and optimization",
    order: 3,
    subTopics: [
      {
        title: "SQL Basics",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        leetcodeLink: "https://leetcode.com/study-plan/sql/",
        articleLink: "https://www.w3schools.com/sql/",
      },
      {
        title: "Database Design",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=ztHopE5Wnpc",
        leetcodeLink: "https://leetcode.com/tag/database/",
        articleLink: "https://www.geeksforgeeks.org/database-design-tutorial/",
      },
      {
        title: "Indexing and Optimization",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=HubXt90MLfE",
        leetcodeLink: "https://leetcode.com/tag/database/",
        articleLink: "https://www.geeksforgeeks.org/indexing-in-databases/",
      },
      {
        title: "NoSQL Databases",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=xQnIN9bW0og",
        leetcodeLink: "https://leetcode.com/tag/database/",
        articleLink: "https://www.mongodb.com/nosql-explained",
      },
      {
        title: "Transactions and ACID",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=pomxJOFVcQs",
        leetcodeLink: "https://leetcode.com/tag/database/",
        articleLink: "https://www.geeksforgeeks.org/acid-properties-in-dbms/",
      },
    ],
  },
  {
    title: "Machine Learning",
    description: "Machine learning concepts and algorithms",
    order: 4,
    subTopics: [
      {
        title: "Supervised Learning",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=ICKBWIkfeJ8",
        leetcodeLink: "https://leetcode.com/tag/machine-learning/",
        articleLink: "https://www.geeksforgeeks.org/supervised-learning/",
      },
      {
        title: "Deep Learning",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=aircAruvnKk",
        leetcodeLink: "https://leetcode.com/tag/machine-learning/",
        articleLink: "https://www.geeksforgeeks.org/deep-learning-tutorial/",
      },
      {
        title: "Neural Networks",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=aircAruvnKk",
        leetcodeLink: "https://leetcode.com/tag/machine-learning/",
        articleLink: "https://www.geeksforgeeks.org/neural-networks-tutorial/",
      },
      {
        title: "Natural Language Processing",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=FLZvOKSCkxY",
        leetcodeLink: "https://leetcode.com/tag/machine-learning/",
        articleLink:
          "https://www.geeksforgeeks.org/natural-language-processing-overview/",
      },
      {
        title: "Computer Vision",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=OcycT1Jwsns",
        leetcodeLink: "https://leetcode.com/tag/machine-learning/",
        articleLink: "https://www.geeksforgeeks.org/computer-vision-tutorial/",
      },
    ],
  },
  {
    title: "Operating Systems",
    description: "Operating system concepts and internals",
    order: 5,
    subTopics: [
      {
        title: "Process Management",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=exbKr6fnoUw",
        leetcodeLink: "https://leetcode.com/tag/operating-system/",
        articleLink:
          "https://www.geeksforgeeks.org/operating-system-process-management/",
      },
      {
        title: "Memory Management",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=qdkxXygc3rE",
        leetcodeLink: "https://leetcode.com/tag/operating-system/",
        articleLink:
          "https://www.geeksforgeeks.org/memory-management-in-operating-system/",
      },
      {
        title: "File Systems",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=HbgzrKJvDRw",
        leetcodeLink: "https://leetcode.com/tag/operating-system/",
        articleLink:
          "https://www.geeksforgeeks.org/file-systems-in-operating-system/",
      },
      {
        title: "Deadlocks",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=UVo5M0QSg_s",
        leetcodeLink: "https://leetcode.com/tag/operating-system/",
        articleLink:
          "https://www.geeksforgeeks.org/deadlock-in-operating-system/",
      },
      {
        title: "Scheduling Algorithms",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=Jf5p9Tv3PJo",
        leetcodeLink: "https://leetcode.com/tag/operating-system/",
        articleLink:
          "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/",
      },
    ],
  },
  {
    title: "Networks",
    description: "Computer networking concepts and protocols",
    order: 6,
    subTopics: [
      {
        title: "TCP/IP Protocol",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=EkNq4TrHP_U",
        leetcodeLink: "https://leetcode.com/tag/network/",
        articleLink: "https://www.geeksforgeeks.org/tcp-ip-model/",
      },
      {
        title: "OSI Model",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=vv4y_uOneC0",
        leetcodeLink: "https://leetcode.com/tag/network/",
        articleLink:
          "https://www.geeksforgeeks.org/osi-model-computer-network/",
      },
      {
        title: "Network Security",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=sdpxddDzXfE",
        leetcodeLink: "https://leetcode.com/tag/network/",
        articleLink: "https://www.geeksforgeeks.org/network-security/",
      },
      {
        title: "HTTP/HTTPS",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=iYM2zFP3Zn0",
        leetcodeLink: "https://leetcode.com/tag/network/",
        articleLink: "https://www.geeksforgeeks.org/http-and-https-protocols/",
      },
      {
        title: "DNS and Load Balancing",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=mpQZVYPuDGU",
        leetcodeLink: "https://leetcode.com/tag/network/",
        articleLink: "https://www.geeksforgeeks.org/dns-domain-name-server/",
      },
    ],
  },
  {
    title: "Mathematics",
    description: "Mathematical concepts for computer science",
    order: 7,
    subTopics: [
      {
        title: "Discrete Mathematics",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=wGLTV8MgLlA",
        leetcodeLink: "https://leetcode.com/tag/math/",
        articleLink:
          "https://www.geeksforgeeks.org/discrete-mathematics-tutorial/",
      },
      {
        title: "Linear Algebra",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
        leetcodeLink: "https://leetcode.com/tag/math/",
        articleLink: "https://www.geeksforgeeks.org/linear-algebra-tutorial/",
      },
      {
        title: "Probability",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=uzkc-qNVoOk",
        leetcodeLink: "https://leetcode.com/tag/math/",
        articleLink: "https://www.geeksforgeeks.org/probability-tutorial/",
      },
      {
        title: "Number Theory",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=19SW3P_PRHQ",
        leetcodeLink: "https://leetcode.com/tag/math/",
        articleLink:
          "https://www.geeksforgeeks.org/number-theory-competitive-programming/",
      },
      {
        title: "Combinatorics",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=8RRo6Ti9d0U",
        leetcodeLink: "https://leetcode.com/tag/math/",
        articleLink: "https://www.geeksforgeeks.org/combinatorics-tutorial/",
      },
    ],
  },
  {
    title: "Software Engineering",
    description: "Software development principles and practices",
    order: 8,
    subTopics: [
      {
        title: "Design Patterns",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=v9ejT8FO-7I",
        leetcodeLink: "https://leetcode.com/tag/design/",
        articleLink: "https://www.geeksforgeeks.org/software-design-patterns/",
      },
      {
        title: "Clean Code",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=7EmboKQH8lM",
        leetcodeLink: "https://leetcode.com/tag/design/",
        articleLink: "https://www.geeksforgeeks.org/clean-code-principles/",
      },
      {
        title: "Testing",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=u5H0sCdvZ14",
        leetcodeLink: "https://leetcode.com/tag/testing/",
        articleLink: "https://www.geeksforgeeks.org/software-testing-tutorial/",
      },
      {
        title: "Agile Methodology",
        difficulty: "Easy",
        youtubeLink: "https://www.youtube.com/watch?v=Z9QbYZh1YXY",
        leetcodeLink: "https://leetcode.com/tag/design/",
        articleLink: "https://www.geeksforgeeks.org/agile-methodology/",
      },
      {
        title: "System Design",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=UzLMhqg3_Wc",
        leetcodeLink: "https://leetcode.com/tag/system-design/",
        articleLink: "https://www.geeksforgeeks.org/system-design-tutorial/",
      },
    ],
  },
  {
    title: "Web Development",
    description: "Web development technologies and frameworks",
    order: 9,
    subTopics: [
      {
        title: "Frontend Development",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=0pThnRneDjw",
        leetcodeLink: "https://leetcode.com/tag/frontend/",
        articleLink: "https://www.geeksforgeeks.org/web-development/",
      },
      {
        title: "Backend Development",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=XBu54nfzxAQ",
        leetcodeLink: "https://leetcode.com/tag/backend/",
        articleLink: "https://www.geeksforgeeks.org/backend-development/",
      },
      {
        title: "Web Security",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=WlmKwIe9z1Q",
        leetcodeLink: "https://leetcode.com/tag/security/",
        articleLink: "https://www.geeksforgeeks.org/web-security/",
      },
      {
        title: "RESTful APIs",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=7YcW25PHnAA",
        leetcodeLink: "https://leetcode.com/tag/api/",
        articleLink: "https://www.geeksforgeeks.org/rest-api-tutorial/",
      },
      {
        title: "Web Performance",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=AJUZZkOH3Dw",
        leetcodeLink: "https://leetcode.com/tag/frontend/",
        articleLink:
          "https://www.geeksforgeeks.org/web-performance-optimization/",
      },
    ],
  },
  {
    title: "Cloud Computing",
    description: "Cloud computing services and architecture",
    order: 10,
    subTopics: [
      {
        title: "AWS Fundamentals",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=3hLmDS179YE",
        leetcodeLink: "https://leetcode.com/tag/system-design/",
        articleLink:
          "https://www.geeksforgeeks.org/amazon-web-services-tutorial/",
      },
      {
        title: "Docker and Containers",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        leetcodeLink: "https://leetcode.com/tag/system-design/",
        articleLink: "https://www.geeksforgeeks.org/docker-tutorial/",
      },
      {
        title: "Kubernetes",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=X48VuDVv0do",
        leetcodeLink: "https://leetcode.com/tag/system-design/",
        articleLink: "https://www.geeksforgeeks.org/kubernetes-tutorial/",
      },
      {
        title: "Cloud Security",
        difficulty: "Hard",
        youtubeLink: "https://www.youtube.com/watch?v=ZM4yGM9c_Sw",
        leetcodeLink: "https://leetcode.com/tag/system-design/",
        articleLink: "https://www.geeksforgeeks.org/cloud-security/",
      },
      {
        title: "Serverless Computing",
        difficulty: "Medium",
        youtubeLink: "https://www.youtube.com/watch?v=97q30JjEq9Y",
        leetcodeLink: "https://leetcode.com/tag/system-design/",
        articleLink: "https://www.geeksforgeeks.org/serverless-computing/",
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Topic.deleteMany({});
    await User.deleteMany({});
    console.log("Cleared existing data");

    // Insert topics
    const insertedTopics = await Topic.insertMany(topics);
    console.log("Successfully seeded topics");

    // Create test user
    const testUser = new User({
      username: "testUser",
      password: "12345",
      progress: [],
    });

    await testUser.save();
    console.log("Successfully created test user");
    console.log("Test user credentials:");
    console.log("Username: testUser");
    console.log("Password: 12345");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
