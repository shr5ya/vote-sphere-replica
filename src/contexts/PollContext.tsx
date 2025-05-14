
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Poll, PollOption, Vote } from '@/types';
import { toast } from '@/components/ui/sonner';
import { useAuth } from './AuthContext';

interface PollContextType {
  polls: Poll[];
  userVotes: Vote[];
  isLoading: boolean;
  createPoll: (title: string, description: string, options: string[]) => void;
  castVote: (pollId: string, optionId: string) => void;
  getUserVoteForPoll: (pollId: string) => string | undefined;
  getActivePolls: () => Poll[];
  getPollById: (pollId: string) => Poll | undefined;
  deletePoll: (pollId: string) => void;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

// Sample polls for demo purposes
const DEMO_POLLS: Poll[] = [
  {
    id: '1',
    title: 'Best Programming Language',
    description: 'Vote for your favorite programming language',
    createdBy: '1',
    createdAt: new Date(),
    options: [
      { id: '1-1', text: 'JavaScript', voteCount: 5 },
      { id: '1-2', text: 'Python', voteCount: 3 },
      { id: '1-3', text: 'Java', voteCount: 2 },
      { id: '1-4', text: 'C#', voteCount: 1 },
    ],
    isActive: true
  },
  {
    id: '2',
    title: 'Favorite Framework',
    description: 'What frontend framework do you prefer?',
    createdBy: '1',
    createdAt: new Date(),
    options: [
      { id: '2-1', text: 'React', voteCount: 7 },
      { id: '2-2', text: 'Vue', voteCount: 4 },
      { id: '2-3', text: 'Angular', voteCount: 2 },
      { id: '2-4', text: 'Svelte', voteCount: 3 },
    ],
    isActive: true
  }
];

export const PollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [userVotes, setUserVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Load polls from local storage or use demo polls
    const loadPolls = () => {
      const storedPolls = localStorage.getItem('polls');
      if (storedPolls) {
        try {
          const parsedPolls = JSON.parse(storedPolls);
          
          // Convert string dates back to Date objects
          const pollsWithDates = parsedPolls.map((poll: any) => ({
            ...poll,
            createdAt: new Date(poll.createdAt),
            endDate: poll.endDate ? new Date(poll.endDate) : undefined
          }));
          
          setPolls(pollsWithDates);
        } catch (error) {
          console.error('Error parsing polls from localStorage:', error);
          setPolls(DEMO_POLLS);
        }
      } else {
        // Use demo polls if nothing in storage
        setPolls(DEMO_POLLS);
      }
    };

    // Load user votes from local storage
    const loadUserVotes = () => {
      const storedVotes = localStorage.getItem('userVotes');
      if (storedVotes) {
        try {
          const parsedVotes = JSON.parse(storedVotes);
          
          // Convert string dates back to Date objects
          const votesWithDates = parsedVotes.map((vote: any) => ({
            ...vote,
            timestamp: new Date(vote.timestamp)
          }));
          
          setUserVotes(votesWithDates);
        } catch (error) {
          console.error('Error parsing votes from localStorage:', error);
          setUserVotes([]);
        }
      }
    };

    loadPolls();
    loadUserVotes();
    setIsLoading(false);
  }, []);

  // Save polls to localStorage whenever they change
  useEffect(() => {
    if (polls.length > 0) {
      localStorage.setItem('polls', JSON.stringify(polls));
    }
  }, [polls]);

  // Save user votes to localStorage whenever they change
  useEffect(() => {
    if (userVotes.length > 0) {
      localStorage.setItem('userVotes', JSON.stringify(userVotes));
    }
  }, [userVotes]);

  const createPoll = (title: string, description: string, optionTexts: string[]) => {
    if (!currentUser) {
      toast.error('You must be logged in to create a poll');
      return;
    }

    const options: PollOption[] = optionTexts.map((text, index) => ({
      id: `new-${Date.now()}-${index}`,
      text,
      voteCount: 0
    }));

    const newPoll: Poll = {
      id: Date.now().toString(),
      title,
      description,
      createdBy: currentUser.id,
      createdAt: new Date(),
      options,
      isActive: true
    };

    setPolls([newPoll, ...polls]);
    toast.success('Poll created successfully');
  };

  const castVote = (pollId: string, optionId: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to vote');
      return;
    }

    // Check if user already voted in this poll
    const existingVote = userVotes.find(
      vote => vote.pollId === pollId && vote.userId === currentUser.id
    );

    if (existingVote) {
      // If changing vote, remove previous vote count
      if (existingVote.optionId !== optionId) {
        setPolls(polls.map(poll => {
          if (poll.id === pollId) {
            const updatedOptions = poll.options.map(option => {
              if (option.id === existingVote.optionId) {
                // Decrease previous option vote count
                return { ...option, voteCount: Math.max(0, option.voteCount - 1) };
              }
              if (option.id === optionId) {
                // Increase new option vote count
                return { ...option, voteCount: option.voteCount + 1 };
              }
              return option;
            });
            return { ...poll, options: updatedOptions };
          }
          return poll;
        }));

        // Update user's vote
        setUserVotes(userVotes.map(vote => {
          if (vote.pollId === pollId && vote.userId === currentUser.id) {
            return {
              ...vote,
              optionId,
              timestamp: new Date()
            };
          }
          return vote;
        }));
        
        toast.success('Vote updated successfully');
      } else {
        toast.info("You've already voted for this option");
      }
    } else {
      // First time voting in this poll
      setPolls(polls.map(poll => {
        if (poll.id === pollId) {
          const updatedOptions = poll.options.map(option => {
            if (option.id === optionId) {
              return { ...option, voteCount: option.voteCount + 1 };
            }
            return option;
          });
          return { ...poll, options: updatedOptions };
        }
        return poll;
      }));

      // Record user's vote
      setUserVotes([
        ...userVotes,
        {
          userId: currentUser.id,
          pollId,
          optionId,
          timestamp: new Date()
        }
      ]);
      
      toast.success('Vote cast successfully');
    }
  };

  const getUserVoteForPoll = (pollId: string): string | undefined => {
    if (!currentUser) return undefined;
    
    const vote = userVotes.find(
      v => v.pollId === pollId && v.userId === currentUser.id
    );
    
    return vote?.optionId;
  };

  const getActivePolls = (): Poll[] => {
    return polls.filter(poll => poll.isActive);
  };

  const getPollById = (pollId: string): Poll | undefined => {
    return polls.find(poll => poll.id === pollId);
  };

  const deletePoll = (pollId: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to delete a poll');
      return;
    }

    const poll = polls.find(p => p.id === pollId);
    if (!poll) {
      toast.error('Poll not found');
      return;
    }

    if (poll.createdBy !== currentUser.id) {
      toast.error('You can only delete polls you created');
      return;
    }

    setPolls(polls.filter(p => p.id !== pollId));
    setUserVotes(userVotes.filter(v => v.pollId !== pollId));
    toast.success('Poll deleted successfully');
  };

  return (
    <PollContext.Provider
      value={{
        polls,
        userVotes,
        isLoading,
        createPoll,
        castVote,
        getUserVoteForPoll,
        getActivePolls,
        getPollById,
        deletePoll
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export const usePolls = () => {
  const context = useContext(PollContext);
  if (context === undefined) {
    throw new Error('usePolls must be used within a PollProvider');
  }
  return context;
};
