
export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  endDate?: Date;
  options: PollOption[];
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface Vote {
  userId: string;
  pollId: string;
  optionId: string;
  timestamp: Date;
}

export interface DashboardStats {
  totalUsers: number;
  totalElections: number;
  activeElections: number;
  completedElections: number;
  totalVotes: number;
}

export interface UserStats {
  recentActivity: {
    date: string;
    action: string;
  }[];
}
