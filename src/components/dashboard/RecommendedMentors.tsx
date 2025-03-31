import React, {useState} from 'react'
import MentorCard from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { mentorData } from '@/types/mentor';
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
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Recommended Mentors</h2>
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-2">
          {mentorData.slice(0, 10).map((mentor) => (
              <div 
                key={mentor.id} 
                className="cursor-pointer hover:scale-105 transition-transform p-5"
                onClick={() => setSelectedMentor(mentor)}
              >
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-bold">{mentor.name}</h2>
                  <p className="text-gray-600">{mentor.title}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-2">{mentor.rating.toFixed(1)} ({mentor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
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
