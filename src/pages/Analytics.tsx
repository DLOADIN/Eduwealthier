import { useState } from "react";
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import StatsCard from "@/components/StatsCard";
import { BarChart2, TrendingUp, Clock, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const Analytics = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("6months");

  
  const handleLogout = async () => {
    await signOut();  
    navigate("/");    
  };

  // Sample data for charts
  const learningProgressData = [
    { month: "Jan", hours: 12, sessions: 5, skills: 2 },
    { month: "Feb", hours: 15, sessions: 7, skills: 2 },
    { month: "Mar", hours: 18, sessions: 8, skills: 3 },
    { month: "Apr", hours: 16, sessions: 7, skills: 3 },
    { month: "May", hours: 22, sessions: 10, skills: 4 },
    { month: "Jun", hours: 28, sessions: 12, skills: 5 },
  ];

  const skillProgressData = [
    { name: "JavaScript", progress: 85 },
    { name: "React", progress: 70 },
    { name: "Node.js", progress: 60 },
    { name: "Python", progress: 45 },
    { name: "Data Science", progress: 30 },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Track your learning progress and growth</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="bg-eduwealth-primary hover:bg-eduwealth-primary/90" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Learning Hours"
              value="111"
              description="Hours spent learning"
              icon={Clock}
              trend="up"
              trendValue="18% from last period"
            />
            
            <StatsCard
              title="Sessions Completed"
              value="49"
              description="Mentorship sessions"
              icon={Calendar}
              trend="up"
              trendValue="8 more than last period"
            />
            
            <StatsCard
              title="Skills Mastered"
              value="5"
              description="Skills at 80%+ proficiency"
              icon={Target}
              trend="up"
              trendValue="2 more than last period"
            />
            
            <StatsCard
              title="Overall Growth"
              value="32%"
              description="Improvement in skills"
              icon={TrendingUp}
              trend="up"
              trendValue="7% better than average"
            />
          </div>
          
          {/* Charts */}
          <Tabs defaultValue="progress" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="progress">Learning Progress</TabsTrigger>
              <TabsTrigger value="skills">Skills Breakdown</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress Over Time</CardTitle>
                  <CardDescription>
                    Track your hours spent learning, sessions completed, and skills developed over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={learningProgressData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="hours" stroke="#0ea5e9" name="Hours" />
                        <Line type="monotone" dataKey="sessions" stroke="#f43f5e" name="Sessions" />
                        <Line type="monotone" dataKey="skills" stroke="#8b5cf6" name="Skills" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Proficiency</CardTitle>
                  <CardDescription>
                    Your progress in different skill areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillProgressData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                        <Legend />
                        <Bar dataKey="progress" fill="#0ea5e9" name="Proficiency %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="engagement">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Engagement</CardTitle>
                  <CardDescription>
                    How you've been interacting with mentors and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Engagement data visualization will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Additional insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Learning Recommendations</CardTitle>
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>
                  Based on your current progress and goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="rounded-md bg-muted p-3">
                    <p className="font-medium">Strengthen React skills</p>
                    <p className="text-sm text-muted-foreground">
                      Consider advanced React courses with focus on hooks and state management
                    </p>
                  </li>
                  <li className="rounded-md bg-muted p-3">
                    <p className="font-medium">Explore data science fundamentals</p>
                    <p className="text-sm text-muted-foreground">
                      This area shows potential for growth based on your interests
                    </p>
                  </li>
                  <li className="rounded-md bg-muted p-3">
                    <p className="font-medium">Increase session frequency</p>
                    <p className="text-sm text-muted-foreground">
                      More regular mentorship sessions could accelerate your progress
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Growth Opportunities</CardTitle>
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>
                  Areas where you can improve and expand your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="rounded-md bg-muted p-3 border-l-4 border-eduwealth-primary">
                    <p className="font-medium">Project-based learning</p>
                    <p className="text-sm text-muted-foreground">
                      Applying skills to real projects shows 30% better retention
                    </p>
                  </li>
                  <li className="rounded-md bg-muted p-3 border-l-4 border-eduwealth-secondary">
                    <p className="font-medium">Peer collaboration</p>
                    <p className="text-sm text-muted-foreground">
                      Working with peers can enhance problem-solving abilities
                    </p>
                  </li>
                  <li className="rounded-md bg-muted p-3 border-l-4 border-eduwealth-accent">
                    <p className="font-medium">Teaching concepts</p>
                    <p className="text-sm text-muted-foreground">
                      Explaining concepts to others solidifies your own understanding
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
