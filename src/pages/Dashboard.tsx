
import { Calendar, Clock, Target, Trending, Users, Book, MessageSquare } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import StatsCard from "@/components/StatsCard";
import MentorCard from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const upcomingMentorships = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      mentorName: "Alex Johnson",
      date: "Today",
      time: "3:00 PM",
      duration: "45 min",
    },
    {
      id: "2",
      title: "React Advanced Concepts",
      mentorName: "Sarah Smith",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
    },
  ];

  const recommendedMentors = [
    {
      id: "1",
      name: "Dr. Emily Chen",
      title: "Data Science Expert | PhD Stanford",
      rating: 4.9,
      reviews: 124,
      skills: ["Machine Learning", "Python", "Data Analysis", "Statistics"],
      hourlyRate: 75,
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      title: "Senior Software Engineer | Google",
      rating: 4.8,
      reviews: 87,
      skills: ["JavaScript", "React", "Node.js", "System Design"],
      hourlyRate: 65,
    },
  ];

  const learningPaths = [
    {
      id: "1",
      title: "Full-Stack Web Development",
      progress: 45,
      completedModules: 9,
      totalModules: 20,
    },
    {
      id: "2",
      title: "UX/UI Design Fundamentals",
      progress: 30,
      completedModules: 3,
      totalModules: 10,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's an overview of your learning journey</p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Button className="bg-eduwealth-primary hover:bg-eduwealth-primary/90">
                Find a Mentor
              </Button>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Learning Hours"
              value="24.5"
              description="Hours spent learning"
              icon={Clock}
              trend="up"
              trendValue="12% from last month"
            />
            
            <StatsCard
              title="Completed Sessions"
              value="18"
              description="Mentorship sessions"
              icon={Calendar}
              trend="up"
              trendValue="3 more than last month"
            />
            
            <StatsCard
              title="Skills Progress"
              value="5"
              description="Skills in development"
              icon={Target}
              trend="neutral"
              trendValue="Same as last month"
            />
            
            <StatsCard
              title="Network Growth"
              value="12"
              description="New connections"
              icon={Users}
              trend="up"
              trendValue="4 more than last month"
            />
          </div>
          
          {/* Learning Paths Progress */}
          <h2 className="text-xl font-semibold mb-4">Your Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {learningPaths.map((path) => (
              <Card key={path.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle>{path.title}</CardTitle>
                    <Book className="h-5 w-5 text-eduwealth-primary" />
                  </div>
                  <CardDescription>
                    {path.completedModules} of {path.totalModules} modules completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={path.progress} className="h-2" />
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{path.progress}% Complete</span>
                      <Link to={`/learning-paths/${path.id}`} className="text-sm text-eduwealth-primary hover:underline">
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Upcoming Mentorships */}
          <h2 className="text-xl font-semibold mb-4">Upcoming Mentorships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {upcomingMentorships.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{session.title}</CardTitle>
                  <CardDescription>with {session.mentorName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{session.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{session.time} ({session.duration})</span>
                    </div>
                    
                    <div className="pt-4 flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                      <Button className="flex-1 bg-eduwealth-primary hover:bg-eduwealth-primary/90">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
              <h3 className="text-lg font-medium mb-2">Need more guidance?</h3>
              <p className="text-center text-muted-foreground mb-4">
                Book a new mentorship session to accelerate your learning.
              </p>
              <Link to="/mentors">
                <Button variant="outline">Find More Mentors</Button>
              </Link>
            </Card>
          </div>
          
          {/* Recommended Mentors */}
          <h2 className="text-xl font-semibold mb-4">Recommended Mentors</h2>
          <div className="space-y-4 mb-8">
            {recommendedMentors.map((mentor) => (
              <MentorCard key={mentor.id} {...mentor} />
            ))}
            
            <div className="text-center pt-4">
              <Link to="/mentors">
                <Button variant="outline">View All Mentors</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
