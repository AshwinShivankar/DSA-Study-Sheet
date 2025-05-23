export interface DSAProgram {
    id: string;
    title: string;
    description: string;
    subTopics: SubTopic[];
}

export interface SubTopic {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    youtubeLink?: string;
    leetcodeLink?: string;
    articleLink?: string;
    isCompleted: boolean;
}

export interface User {
    username: string;
    progress: number;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
} 