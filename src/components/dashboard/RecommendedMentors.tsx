
import MentorCard from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Mentor = {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  skills: string[];
  hourlyRate: number;
  imageUrl?: string;
};

type RecommendedMentorsProps = {
  mentors: Mentor[];
};

const RecommendedMentors = ({ mentors }: RecommendedMentorsProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Recommended Mentors</h2>
      <div className="space-y-4 mb-8">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} {...mentor} />
        ))}
        
        <div className="text-center pt-4">
          <Link to="/mentors">
            <Button variant="outline">View All Mentors</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecommendedMentors;
