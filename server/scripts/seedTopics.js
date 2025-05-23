const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const topics = [
  {
    title: 'Algorithms',
    description: 'Core algorithmic concepts and problem-solving techniques',
    order: 1,
    subTopics: [
      {
        title: 'Binary Search',
        description: 'Learn the binary search algorithm and its applications',
        difficulty: 'Easy',
        resources: {
          youtubeLinks: [
            {
              title: 'Binary Search Algorithm',
              url: 'https://www.youtube.com/watch?v=P3YID7liBug'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Binary Search Problems',
              url: 'https://leetcode.com/tag/binary-search/'
            }
          ],
          articles: [
            {
              title: 'Binary Search Tutorial',
              url: 'https://www.geeksforgeeks.org/binary-search/'
            }
          ]
        }
      },
      {
        title: 'Dynamic Programming',
        description: 'Master dynamic programming concepts and patterns',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Dynamic Programming - Learn to Solve Algorithmic Problems',
              url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Dynamic Programming Practice',
              url: 'https://leetcode.com/tag/dynamic-programming/'
            }
          ],
          articles: [
            {
              title: 'Dynamic Programming Guide',
              url: 'https://www.geeksforgeeks.org/dynamic-programming/'
            }
          ]
        }
      },
      {
        title: 'Graph Algorithms',
        description: 'Understand graph theory and common algorithms',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Graph Theory Algorithms',
              url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Graph Problems Collection',
              url: 'https://leetcode.com/tag/graph/'
            }
          ],
          articles: [
            {
              title: 'Graph Algorithms Tutorial',
              url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/'
            }
          ]
        }
      },
      {
        title: 'Sorting Algorithms',
        description: 'Learn different sorting techniques and their complexities',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Sorting Algorithms Visualized',
              url: 'https://www.youtube.com/watch?v=kPRA0W1kECg'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Sorting Problems',
              url: 'https://leetcode.com/tag/sorting/'
            }
          ],
          articles: [
            {
              title: 'Sorting Algorithms Guide',
              url: 'https://www.geeksforgeeks.org/sorting-algorithms/'
            }
          ]
        }
      },
      {
        title: 'Greedy Algorithms',
        description: 'Study greedy approach to problem solving',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Greedy Algorithms Tutorial',
              url: 'https://www.youtube.com/watch?v=bC7o8P_Ste4'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Greedy Problems',
              url: 'https://leetcode.com/tag/greedy/'
            }
          ],
          articles: [
            {
              title: 'Greedy Algorithms Guide',
              url: 'https://www.geeksforgeeks.org/greedy-algorithms/'
            }
          ]
        }
      },
      {
        title: 'Divide and Conquer',
        description: 'Learn to solve problems by breaking them down',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Divide and Conquer Algorithms',
              url: 'https://www.youtube.com/watch?v=2Rr2tW9zvRg'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Divide and Conquer Problems',
              url: 'https://leetcode.com/tag/divide-and-conquer/'
            }
          ],
          articles: [
            {
              title: 'Divide and Conquer Guide',
              url: 'https://www.geeksforgeeks.org/divide-and-conquer/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Data Structures',
    description: 'Fundamental data structures and their implementations',
    order: 2,
    subTopics: [
      {
        title: 'Arrays and Strings',
        description: 'Master array operations and string manipulation',
        difficulty: 'Easy',
        resources: {
          youtubeLinks: [
            {
              title: 'Arrays and Strings Fundamentals',
              url: 'https://www.youtube.com/watch?v=3OamzN90kPg'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Array Problems',
              url: 'https://leetcode.com/tag/array/'
            }
          ],
          articles: [
            {
              title: 'Array Data Structure',
              url: 'https://www.geeksforgeeks.org/array-data-structure/'
            }
          ]
        }
      },
      {
        title: 'Linked Lists',
        description: 'Understanding linked list operations and types',
        difficulty: 'Easy',
        resources: {
          youtubeLinks: [
            {
              title: 'Linked List Data Structure',
              url: 'https://www.youtube.com/watch?v=njTh_OwMljA'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Linked List Problems',
              url: 'https://leetcode.com/tag/linked-list/'
            }
          ],
          articles: [
            {
              title: 'Linked List Guide',
              url: 'https://www.geeksforgeeks.org/data-structures/linked-list/'
            }
          ]
        }
      },
      {
        title: 'Trees and BST',
        description: 'Learn tree structures and binary search trees',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Tree Data Structures',
              url: 'https://www.youtube.com/watch?v=fAAZixBzIAI'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Tree Problems',
              url: 'https://leetcode.com/tag/tree/'
            }
          ],
          articles: [
            {
              title: 'Binary Tree Tutorial',
              url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/'
            }
          ]
        }
      },
      {
        title: 'Graphs',
        description: 'Graph representations and algorithms',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Graph Data Structure',
              url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Graph Problems',
              url: 'https://leetcode.com/tag/graph/'
            }
          ],
          articles: [
            {
              title: 'Graph Theory Guide',
              url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/'
            }
          ]
        }
      },
      {
        title: 'Hash Tables',
        description: 'Hash table implementation and collision resolution',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Hash Tables and Hash Functions',
              url: 'https://www.youtube.com/watch?v=shs0KM3wKv8'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Hash Table Problems',
              url: 'https://leetcode.com/tag/hash-table/'
            }
          ],
          articles: [
            {
              title: 'Hash Table Guide',
              url: 'https://www.geeksforgeeks.org/hashing-data-structure/'
            }
          ]
        }
      },
      {
        title: 'Heaps',
        description: 'Priority queues and heap operations',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Heap Data Structure',
              url: 'https://www.youtube.com/watch?v=t0Cq6tVNRBA'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Heap Problems',
              url: 'https://leetcode.com/tag/heap/'
            }
          ],
          articles: [
            {
              title: 'Heap Guide',
              url: 'https://www.geeksforgeeks.org/heap-data-structure/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Databases',
    description: 'Database concepts, design, and optimization',
    order: 3,
    subTopics: [
      {
        title: 'SQL Basics',
        description: 'Learn fundamental SQL queries and operations',
        difficulty: 'Easy',
        resources: {
          youtubeLinks: [
            {
              title: 'SQL Tutorial for Beginners',
              url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
            }
          ],
          leetcodeLinks: [
            {
              title: 'SQL Practice Problems',
              url: 'https://leetcode.com/study-plan/sql/'
            }
          ],
          articles: [
            {
              title: 'SQL Tutorial',
              url: 'https://www.w3schools.com/sql/'
            }
          ]
        }
      },
      {
        title: 'Database Design',
        description: 'Database schema design and normalization',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Database Design Course',
              url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Database Problems',
              url: 'https://leetcode.com/tag/database/'
            }
          ],
          articles: [
            {
              title: 'Database Design Guide',
              url: 'https://www.geeksforgeeks.org/database-design-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Indexing and Optimization',
        description: 'Database performance and query optimization',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Database Indexing',
              url: 'https://www.youtube.com/watch?v=HubXt90MLfE'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Advanced SQL Problems',
              url: 'https://leetcode.com/tag/database/'
            }
          ],
          articles: [
            {
              title: 'Database Indexing Guide',
              url: 'https://www.geeksforgeeks.org/indexing-in-databases/'
            }
          ]
        }
      },
      {
        title: 'NoSQL Databases',
        description: 'Non-relational database systems',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'NoSQL Database Tutorial',
              url: 'https://www.youtube.com/watch?v=xQnIN9bW0og'
            }
          ],
          leetcodeLinks: [
            {
              title: 'System Design with NoSQL',
              url: 'https://leetcode.com/tag/database/'
            }
          ],
          articles: [
            {
              title: 'NoSQL Guide',
              url: 'https://www.mongodb.com/nosql-explained'
            }
          ]
        }
      },
      {
        title: 'Transactions and ACID',
        description: 'Database transactions and ACID properties',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Database Transactions',
              url: 'https://www.youtube.com/watch?v=pomxJOFVcQs'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Transaction Problems',
              url: 'https://leetcode.com/tag/database/'
            }
          ],
          articles: [
            {
              title: 'ACID Properties',
              url: 'https://www.geeksforgeeks.org/acid-properties-in-dbms/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Machine Learning',
    description: 'Machine learning concepts and algorithms',
    order: 4,
    subTopics: [
      {
        title: 'Supervised Learning',
        description: 'Classification and regression techniques',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Supervised Learning Tutorial',
              url: 'https://www.youtube.com/watch?v=ICKBWIkfeJ8'
            }
          ],
          leetcodeLinks: [
            {
              title: 'ML Practice Problems',
              url: 'https://leetcode.com/tag/machine-learning/'
            }
          ],
          articles: [
            {
              title: 'Supervised Learning Guide',
              url: 'https://www.geeksforgeeks.org/supervised-learning/'
            }
          ]
        }
      },
      {
        title: 'Unsupervised Learning',
        description: 'Clustering and dimensionality reduction',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Unsupervised Learning Basics',
              url: 'https://www.youtube.com/watch?v=IUn8k5zSI6g'
            }
          ],
          leetcodeLinks: [
            {
              title: 'ML Algorithms',
              url: 'https://leetcode.com/tag/machine-learning/'
            }
          ],
          articles: [
            {
              title: 'Unsupervised Learning Guide',
              url: 'https://www.geeksforgeeks.org/unsupervised-learning/'
            }
          ]
        }
      },
      {
        title: 'Deep Learning',
        description: 'Neural networks and deep learning concepts',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Deep Learning Fundamentals',
              url: 'https://www.youtube.com/watch?v=aircAruvnKk'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Neural Network Problems',
              url: 'https://leetcode.com/tag/machine-learning/'
            }
          ],
          articles: [
            {
              title: 'Deep Learning Tutorial',
              url: 'https://www.geeksforgeeks.org/deep-learning-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Natural Language Processing',
        description: 'Text processing and language understanding',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'NLP Course',
              url: 'https://www.youtube.com/watch?v=FLZvOKSCkxY'
            }
          ],
          leetcodeLinks: [
            {
              title: 'String Processing Problems',
              url: 'https://leetcode.com/tag/string/'
            }
          ],
          articles: [
            {
              title: 'NLP Guide',
              url: 'https://www.geeksforgeeks.org/natural-language-processing-overview/'
            }
          ]
        }
      },
      {
        title: 'Computer Vision',
        description: 'Image processing and visual recognition',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Computer Vision Basics',
              url: 'https://www.youtube.com/watch?v=OcycT1Jwsns'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Image Processing Problems',
              url: 'https://leetcode.com/tag/machine-learning/'
            }
          ],
          articles: [
            {
              title: 'Computer Vision Guide',
              url: 'https://www.geeksforgeeks.org/computer-vision-tutorial/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Operating Systems',
    description: 'Operating system concepts and internals',
    order: 5,
    subTopics: [
      {
        title: 'Process Management',
        description: 'Process scheduling and synchronization',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Process Management in OS',
              url: 'https://www.youtube.com/watch?v=exbKr6fnoUw'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Concurrency Problems',
              url: 'https://leetcode.com/tag/concurrency/'
            }
          ],
          articles: [
            {
              title: 'Process Management Guide',
              url: 'https://www.geeksforgeeks.org/operating-system-process-management/'
            }
          ]
        }
      },
      {
        title: 'Memory Management',
        description: 'Virtual memory and memory allocation',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Memory Management in OS',
              url: 'https://www.youtube.com/watch?v=qdkxXygc3rE'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Memory Problems',
              url: 'https://leetcode.com/tag/memory-management/'
            }
          ],
          articles: [
            {
              title: 'Memory Management Guide',
              url: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/'
            }
          ]
        }
      },
      {
        title: 'File Systems',
        description: 'File organization and management',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'File Systems in OS',
              url: 'https://www.youtube.com/watch?v=HbgzrKJvDRw'
            }
          ],
          leetcodeLinks: [
            {
              title: 'File System Problems',
              url: 'https://leetcode.com/tag/system-design/'
            }
          ],
          articles: [
            {
              title: 'File Systems Guide',
              url: 'https://www.geeksforgeeks.org/file-systems-in-operating-system/'
            }
          ]
        }
      },
      {
        title: 'Deadlocks',
        description: 'Deadlock prevention and handling',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Deadlocks in OS',
              url: 'https://www.youtube.com/watch?v=UVo5M0QSg_s'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Concurrency Problems',
              url: 'https://leetcode.com/tag/concurrency/'
            }
          ],
          articles: [
            {
              title: 'Deadlock Guide',
              url: 'https://www.geeksforgeeks.org/deadlock-in-operating-system/'
            }
          ]
        }
      },
      {
        title: 'CPU Scheduling',
        description: 'CPU scheduling algorithms',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'CPU Scheduling Algorithms',
              url: 'https://www.youtube.com/watch?v=Jf5p9Tv3PJo'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Scheduling Problems',
              url: 'https://leetcode.com/tag/operating-system/'
            }
          ],
          articles: [
            {
              title: 'CPU Scheduling Guide',
              url: 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Networks',
    description: 'Computer networking concepts and protocols',
    order: 6,
    subTopics: [
      {
        title: 'TCP/IP Protocol',
        description: 'Understanding TCP/IP networking model',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'TCP/IP Protocol Suite',
              url: 'https://www.youtube.com/watch?v=EkNq4TrHP_U'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Network Problems',
              url: 'https://leetcode.com/tag/network/'
            }
          ],
          articles: [
            {
              title: 'TCP/IP Guide',
              url: 'https://www.geeksforgeeks.org/tcp-ip-model/'
            }
          ]
        }
      },
      {
        title: 'OSI Model',
        description: 'The seven layers of the OSI model',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'OSI Model Explained',
              url: 'https://www.youtube.com/watch?v=vv4y_uOneC0'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Network Design Problems',
              url: 'https://leetcode.com/tag/network/'
            }
          ],
          articles: [
            {
              title: 'OSI Model Guide',
              url: 'https://www.geeksforgeeks.org/osi-model-computer-network/'
            }
          ]
        }
      },
      {
        title: 'Network Security',
        description: 'Security protocols and practices',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Network Security Fundamentals',
              url: 'https://www.youtube.com/watch?v=sdpxddDzXfE'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Security Problems',
              url: 'https://leetcode.com/tag/security/'
            }
          ],
          articles: [
            {
              title: 'Network Security Guide',
              url: 'https://www.geeksforgeeks.org/network-security/'
            }
          ]
        }
      },
      {
        title: 'HTTP/HTTPS',
        description: 'Web protocols and secure communication',
        difficulty: 'Easy',
        resources: {
          youtubeLinks: [
            {
              title: 'HTTP and HTTPS',
              url: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Web Problems',
              url: 'https://leetcode.com/tag/network/'
            }
          ],
          articles: [
            {
              title: 'HTTP/HTTPS Guide',
              url: 'https://www.geeksforgeeks.org/http-and-https-protocols/'
            }
          ]
        }
      },
      {
        title: 'DNS and Load Balancing',
        description: 'Domain name system and load distribution',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'DNS and Load Balancing',
              url: 'https://www.youtube.com/watch?v=mpQZVYPuDGU'
            }
          ],
          leetcodeLinks: [
            {
              title: 'System Design Problems',
              url: 'https://leetcode.com/tag/system-design/'
            }
          ],
          articles: [
            {
              title: 'DNS Guide',
              url: 'https://www.geeksforgeeks.org/dns-domain-name-server/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Mathematics',
    description: 'Mathematical concepts for computer science',
    order: 7,
    subTopics: [
      {
        title: 'Discrete Mathematics',
        description: 'Sets, relations, and combinatorics',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Discrete Math Course',
              url: 'https://www.youtube.com/watch?v=wGLTV8MgLlA'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Math Problems',
              url: 'https://leetcode.com/tag/math/'
            }
          ],
          articles: [
            {
              title: 'Discrete Math Guide',
              url: 'https://www.geeksforgeeks.org/discrete-mathematics-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Linear Algebra',
        description: 'Matrices, vectors, and linear transformations',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Linear Algebra Course',
              url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Matrix Problems',
              url: 'https://leetcode.com/tag/math/'
            }
          ],
          articles: [
            {
              title: 'Linear Algebra Guide',
              url: 'https://www.geeksforgeeks.org/linear-algebra-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Probability',
        description: 'Probability theory and random processes',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Probability Course',
              url: 'https://www.youtube.com/watch?v=uzkc-qNVoOk'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Probability Problems',
              url: 'https://leetcode.com/tag/math/'
            }
          ],
          articles: [
            {
              title: 'Probability Guide',
              url: 'https://www.geeksforgeeks.org/probability-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Number Theory',
        description: 'Properties of numbers and their applications',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Number Theory Course',
              url: 'https://www.youtube.com/watch?v=19SW3P_PRHQ'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Number Theory Problems',
              url: 'https://leetcode.com/tag/math/'
            }
          ],
          articles: [
            {
              title: 'Number Theory Guide',
              url: 'https://www.geeksforgeeks.org/number-theory-competitive-programming/'
            }
          ]
        }
      },
      {
        title: 'Combinatorics',
        description: 'Counting principles and arrangements',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Combinatorics Course',
              url: 'https://www.youtube.com/watch?v=8RRo6Ti9d0U'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Combinatorics Problems',
              url: 'https://leetcode.com/tag/math/'
            }
          ],
          articles: [
            {
              title: 'Combinatorics Guide',
              url: 'https://www.geeksforgeeks.org/combinatorics-tutorial/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Software Engineering',
    description: 'Software development principles and practices',
    order: 8,
    subTopics: [
      {
        title: 'Design Patterns',
        description: 'Common software design patterns',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Design Patterns Course',
              url: 'https://www.youtube.com/watch?v=v9ejT8FO-7I'
            }
          ],
          leetcodeLinks: [
            {
              title: 'OOP Problems',
              url: 'https://leetcode.com/tag/design/'
            }
          ],
          articles: [
            {
              title: 'Design Patterns Guide',
              url: 'https://www.geeksforgeeks.org/software-design-patterns/'
            }
          ]
        }
      },
      {
        title: 'Clean Code',
        description: 'Writing maintainable and readable code',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Clean Code Course',
              url: 'https://www.youtube.com/watch?v=7EmboKQH8lM'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Code Review Problems',
              url: 'https://leetcode.com/tag/design/'
            }
          ],
          articles: [
            {
              title: 'Clean Code Guide',
              url: 'https://www.geeksforgeeks.org/clean-code-principles/'
            }
          ]
        }
      },
      {
        title: 'Testing',
        description: 'Software testing methodologies',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Software Testing Course',
              url: 'https://www.youtube.com/watch?v=u-HdLtqEOog'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Testing Problems',
              url: 'https://leetcode.com/tag/testing/'
            }
          ],
          articles: [
            {
              title: 'Testing Guide',
              url: 'https://www.geeksforgeeks.org/software-testing-basics/'
            }
          ]
        }
      },
      {
        title: 'Version Control',
        description: 'Git and version control systems',
        difficulty: 'Easy',
        resources: {
          youtubeLinks: [
            {
              title: 'Git Course',
              url: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Git Problems',
              url: 'https://leetcode.com/tag/git/'
            }
          ],
          articles: [
            {
              title: 'Git Guide',
              url: 'https://www.geeksforgeeks.org/git-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Agile Development',
        description: 'Agile methodologies and practices',
        difficulty: 'Easy',
        resources: {
          youtubeLinks: [
            {
              title: 'Agile Course',
              url: 'https://www.youtube.com/watch?v=502ILHjX9EE'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Project Management',
              url: 'https://leetcode.com/tag/system-design/'
            }
          ],
          articles: [
            {
              title: 'Agile Guide',
              url: 'https://www.geeksforgeeks.org/agile-software-development/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Web Development',
    description: 'Web development technologies and frameworks',
    order: 9,
    subTopics: [
      {
        title: 'Frontend Development',
        description: 'HTML, CSS, and JavaScript',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Frontend Course',
              url: 'https://www.youtube.com/watch?v=0pThnRneDjw'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Frontend Problems',
              url: 'https://leetcode.com/tag/frontend/'
            }
          ],
          articles: [
            {
              title: 'Frontend Guide',
              url: 'https://www.geeksforgeeks.org/web-development/'
            }
          ]
        }
      },
      {
        title: 'Backend Development',
        description: 'Server-side programming and APIs',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Backend Course',
              url: 'https://www.youtube.com/watch?v=XBu54nfzxAQ'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Backend Problems',
              url: 'https://leetcode.com/tag/backend/'
            }
          ],
          articles: [
            {
              title: 'Backend Guide',
              url: 'https://www.geeksforgeeks.org/backend-development/'
            }
          ]
        }
      },
      {
        title: 'Web Security',
        description: 'Security best practices for web apps',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Web Security Course',
              url: 'https://www.youtube.com/watch?v=WlmKwIe9z1Q'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Security Problems',
              url: 'https://leetcode.com/tag/security/'
            }
          ],
          articles: [
            {
              title: 'Web Security Guide',
              url: 'https://www.geeksforgeeks.org/web-security/'
            }
          ]
        }
      },
      {
        title: 'RESTful APIs',
        description: 'REST architecture and API design',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'REST API Course',
              url: 'https://www.youtube.com/watch?v=7YcW25PHnAA'
            }
          ],
          leetcodeLinks: [
            {
              title: 'API Design Problems',
              url: 'https://leetcode.com/tag/api/'
            }
          ],
          articles: [
            {
              title: 'REST API Guide',
              url: 'https://www.geeksforgeeks.org/rest-api-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Web Performance',
        description: 'Optimization and performance tuning',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Web Performance Course',
              url: 'https://www.youtube.com/watch?v=AJUZZkOH3Dw'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Performance Problems',
              url: 'https://leetcode.com/tag/frontend/'
            }
          ],
          articles: [
            {
              title: 'Performance Guide',
              url: 'https://www.geeksforgeeks.org/web-performance-optimization/'
            }
          ]
        }
      }
    ]
  },
  {
    title: 'Cloud Computing',
    description: 'Cloud computing services and architecture',
    order: 10,
    subTopics: [
      {
        title: 'AWS Fundamentals',
        description: 'Amazon Web Services basics',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'AWS Course',
              url: 'https://www.youtube.com/watch?v=3hLmDS179YE'
            }
          ],
          leetcodeLinks: [
            {
              title: 'System Design Problems',
              url: 'https://leetcode.com/tag/system-design/'
            }
          ],
          articles: [
            {
              title: 'AWS Guide',
              url: 'https://www.geeksforgeeks.org/amazon-web-services-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Docker and Containers',
        description: 'Container technology and orchestration',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Docker Course',
              url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
            }
          ],
          leetcodeLinks: [
            {
              title: 'System Design Problems',
              url: 'https://leetcode.com/tag/system-design/'
            }
          ],
          articles: [
            {
              title: 'Docker Guide',
              url: 'https://www.geeksforgeeks.org/docker-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Kubernetes',
        description: 'Container orchestration with Kubernetes',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Kubernetes Course',
              url: 'https://www.youtube.com/watch?v=X48VuDVv0do'
            }
          ],
          leetcodeLinks: [
            {
              title: 'System Design Problems',
              url: 'https://leetcode.com/tag/system-design/'
            }
          ],
          articles: [
            {
              title: 'Kubernetes Guide',
              url: 'https://www.geeksforgeeks.org/kubernetes-tutorial/'
            }
          ]
        }
      },
      {
        title: 'Cloud Security',
        description: 'Security in cloud environments',
        difficulty: 'Hard',
        resources: {
          youtubeLinks: [
            {
              title: 'Cloud Security Course',
              url: 'https://www.youtube.com/watch?v=ZM4yGM9c_Sw'
            }
          ],
          leetcodeLinks: [
            {
              title: 'Security Problems',
              url: 'https://leetcode.com/tag/security/'
            }
          ],
          articles: [
            {
              title: 'Cloud Security Guide',
              url: 'https://www.geeksforgeeks.org/cloud-security/'
            }
          ]
        }
      },
      {
        title: 'Serverless Computing',
        description: 'Serverless architecture and FaaS',
        difficulty: 'Medium',
        resources: {
          youtubeLinks: [
            {
              title: 'Serverless Course',
              url: 'https://www.youtube.com/watch?v=97q30JjEq9Y'
            }
          ],
          leetcodeLinks: [
            {
              title: 'System Design Problems',
              url: 'https://leetcode.com/tag/system-design/'
            }
          ],
          articles: [
            {
              title: 'Serverless Guide',
              url: 'https://www.geeksforgeeks.org/serverless-computing/'
            }
          ]
        }
      }
    ]
  }
];

const seedTopics = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing topics
    await Topic.deleteMany({});
    console.log('Cleared existing topics');

    // Insert new topics
    await Topic.insertMany(topics);
    console.log('Successfully seeded topics');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding topics:', error);
    process.exit(1);
  }
};

seedTopics(); 