
import { useEffect, useState } from "react";
import { usePolls } from "@/contexts/PollContext";
import PollCard from "./PollCard";
import { Input } from "@/components/ui/input";
import { Poll } from "@/types";

const PollList = () => {
  const { polls, isLoading } = usePolls();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPolls(polls);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = polls.filter(
        (poll) =>
          poll.title.toLowerCase().includes(term) ||
          poll.description.toLowerCase().includes(term) ||
          poll.options.some((option) => option.text.toLowerCase().includes(term))
      );
      setFilteredPolls(filtered);
    }
  }, [polls, searchTerm]);

  if (isLoading) {
    return (
      <div className="w-full py-20 text-center">
        <div className="animate-pulse flex justify-center">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <Input
          placeholder="Search polls..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />
      </div>

      {filteredPolls.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No polls found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPolls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PollList;
