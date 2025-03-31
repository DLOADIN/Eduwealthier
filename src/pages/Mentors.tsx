// components/MentorList.tsx
import React, { useState } from 'react';
import { mentorData } from '@/types/mentor';
import MentorCard from '@/components/MentorCard';
import type { Mentor } from '@/types/mentor';
import SidebarAdapter from "@/components/layout/SidebarAdapter";
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const Mentor: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();  
    navigate("/");    
  };

  // If no mentor is selected, show the list
  if (!selectedMentor) {
    return (
      <>
      <SidebarAdapter>
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Our Mentors</h1>
              <p className="text-muted-foreground">We provide a variety of mentors on our platform</p>
            </div>
            <Button className="bg-eduwealth-primary hover:bg-eduwealth-primary/90" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentorData.map((mentor) => (
            <div 
              key={mentor.id} 
              className="cursor-pointer hover:scale-105 transition-transform"
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
      </div>
      </main>
      </SidebarAdapter>
      </>
    );
  }

  return (
    <MentorCard 
      mentor={selectedMentor} 
      onBack={() => setSelectedMentor(null)} 
    />
  );
};

export default Mentor;      
