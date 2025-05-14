
export interface User {
  id: string;
  name: string;
  email: string;
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
