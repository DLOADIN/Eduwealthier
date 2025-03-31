import React from "react";
import { Trophy, Award, Star, CheckCircle2, Bookmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SidebarAdapter from "@/components/layout/SidebarAdapter";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Programming Certificate",
    description: "Try to Finishup the videos on the programming concept to gain your first cerificate",
    icon: <Trophy className="h-8 w-8 text-yellow-500" />,
  },
  {
    id: 2,
    title: "Continue Learning and Upgrading your Filmmaking Skills",
    description: "The more you continue pursuing and learning new skills, the better you become.",
    icon: <Award className="h-8 w-8 text-blue-500" />,
  },
  {
    id: 3,
    title: "Gain A Leadership Certfication",
    description: "Leadership is at the core of success. Gain a leadership certfication to prove your leadership skills.",
    icon: <Bookmark className="h-8 w-8 text-green-500" />,
  },
  {
    id: 4,
    title: "Manage your Finance & Businness Like a Pro",
    description: "Completed the 2-day intensive training on finance and business administration",
    icon: <CheckCircle2 className="h-8 w-8 text-purple-500" />,
  },
];

const Accomplishments = () => {
  return (
    <SidebarAdapter>
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-8">
          <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold">Your Accomplishments</h1>
        </div>
        
        <p className="text-gray-600 mb-8">
          Track your educational journey and celebrate your achievements along the way.
          These accomplishments showcase your growth and dedication to continuous learning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  {achievement.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{achievement.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarAdapter>
  );
};

export default Accomplishments;
