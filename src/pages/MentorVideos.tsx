
import { useState } from "react";
import { Search, Filter, Play, BookOpen, Star, Clock, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "@/components/layout/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";


interface VideoCardProps {
  id: string;
  title: string;
  mentorName: string;
  thumbnailUrl?: string;
  duration: string;
  date: string;
  category: string;
  rating: number;
  views: number;
  tags: string[];
}

const MentorVideoCard = ({
  id,
  title,
  mentorName,
  thumbnailUrl,
  duration,
  date,
  category,
  rating,
  views,
  tags,
}: VideoCardProps) => {
  const defaultThumbnail = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhcm5pbmd8ZW58MHx8MHx8fDA%3D";
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative">
        <img 
          src={thumbnailUrl || defaultThumbnail} 
          alt={title} 
          className="w-full aspect-video object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90">
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <Badge className="absolute top-2 right-2 bg-black bg-opacity-60">
          {duration}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{mentorName}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{views} views</span>
          </div>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full">
          <BookOpen className="mr-2 h-4 w-4" /> Watch Video
        </Button>
      </CardFooter>
    </Card>
  );
};

// Sample video data
const sampleVideos: VideoCardProps[] = [
  {
    id: "1",
    title: "Getting Started with JavaScript Fundamentals",
    mentorName: "Sarah Johnson, Senior Developer",
    duration: "45:30",
    date: "2 weeks ago",
    category: "Programming",
    rating: 4.8,
    views: 1240,
    tags: ["JavaScript", "Beginner", "Web Development"],
  },
  {
    id: "2",
    title: "Advanced React Hooks and State Management",
    mentorName: "Michael Chen, React Specialist",
    duration: "1:12:45",
    date: "3 days ago",
    category: "Programming",
    rating: 4.9,
    views: 856,
    tags: ["React", "Advanced", "Hooks"],
  },
  {
    id: "3",
    title: "Data Science Essentials: Python & Pandas",
    mentorName: "Dr. Lisa Wang, Data Scientist",
    duration: "58:20",
    date: "1 month ago",
    category: "Data Science",
    rating: 4.7,
    views: 2150,
    tags: ["Python", "Data Science", "Pandas"],
  },
  {
    id: "4",
    title: "UX Design Principles for Developers",
    mentorName: "Alex Rodriguez, UX Designer",
    duration: "37:15",
    date: "2 weeks ago",
    category: "Design",
    rating: 4.6,
    views: 980,
    tags: ["UX", "Design", "UI"],
  },
  {
    id: "5",
    title: "Building Scalable Backend Systems",
    mentorName: "David Kim, System Architect",
    duration: "1:24:10",
    date: "5 days ago",
    category: "Backend",
    rating: 4.9,
    views: 765,
    tags: ["Architecture", "Scalability", "Backend"],
  },
  {
    id: "6",
    title: "Machine Learning for Beginners",
    mentorName: "Dr. Emily Patel, AI Researcher",
    duration: "52:40",
    date: "3 weeks ago",
    category: "Data Science",
    rating: 4.8,
    views: 1850,
    tags: ["Machine Learning", "AI", "Beginner"],
  },
];

const MentorVideos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState(sampleVideos);
  const { signOut } = useClerk();
  const navigate = useNavigate();

  
  const handleLogout = async () => {
    await signOut();  
    navigate("/");    
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Learning Library</h1>
              <p className="text-muted-foreground">Explore videos and tutorials from top mentors</p>
            </div>
            <Button className="bg-eduwealth-primary hover:bg-eduwealth-primary/90" onClick={handleLogout}>
              Logout
          </Button>
          </div>
          
          {/* Search and filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos by title, mentor, or topic..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Viewed</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
          
          {/* Content tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="programming">Programming</TabsTrigger>
              <TabsTrigger value="data">Data Science</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Videos grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <MentorVideoCard key={video.id} {...video} />
            ))}
          </div>
          
          {/* Load more button */}
          <div className="mt-8 text-center">
            <Button variant="outline">Load More Videos</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorVideos;
