import React, { useState, useMemo } from "react";
import ReactPlayer from "react-player";
import { Search, Filter, Play, BookOpen, Star, Clock, Calendar, Users, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Sidebar from "@/components/layout/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

// // Video import strategy - add more videos as needed
// import videoone from "@/public/videos/videoone.mp4";
// import videotwo from "@/public/videos/videotwo.mp4";
// import videothree from "@/public/videos/videothree.mp4";
// import videofour from "@/public/videos/videofour.mp4";
// import videofive from "@/public/videos/videofive.mp4";
// import videosix from "@/public/videos/videosix.mp4";
// import videoseven from "@/public/videos/videoseven.mp4";
// import videoeight from "@/public/videos/videoeight.mp4";
// import videonine from "@/public/videos/videonine.mp4";
// import videoten from "@/public/videos/videoten.mp4";
// import videoeleven from "@/public/videos/videoeleven.mp4";
// import videotwelve from "@/public/videos/videotwelve.mp4";
// import videothirteen from "@/public/videos/videothirteen.mp4";

//business pictures
import businessone from '../frontend/thumbnails/businessone.jpg'
import businesstwo from '../frontend/thumbnails/businesstwo.jpg'
import businessthree from '../frontend/thumbnails/businessthree.jpg'
import businessfour from '../frontend/thumbnails/businessfour.jpg'

//film thumbnails
import filmone from '../frontend/thumbnails/filmone.jpg'
import filmtwo from '../frontend/thumbnails/filmtwo.jpg'
import filmthree from '../frontend/thumbnails/filmthree.jpg'
import filmfour from '../frontend/thumbnails/filmfour.jpg'

//politicalscience thumbnails
import politicalsciencesone from '../frontend/thumbnails/politicalsciencesone.jpg'
import politicalsciencestwo from '../frontend/thumbnails/politicalsciencestwo.jpg'
import politicalsciencesthree from '../frontend/thumbnails/politicalsciencethree.jpg'
import politicalsciencesfour from '../frontend/thumbnails/politicalsciencesfour.jpg'

import codingone from '../frontend/thumbnails/codingone.jpg'
import codingtwo from '../frontend/thumbnails/codingtwo.jpg'
import codingfour from '../frontend/thumbnails/codingfive.jpg'

//politicalscience thumbnails
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
  videoUrl: string;
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
  videoUrl,
  onWatchVideo,
}: VideoCardProps & { onWatchVideo: (videoUrl: string) => void }) => {
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
          <Button 
            size="icon" 
            className="rounded-full bg-white text-black hover:bg-white/90"
            onClick={() => onWatchVideo(videoUrl)}
          >
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
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onWatchVideo(videoUrl)}
        >
          <BookOpen className="mr-2 h-4 w-4" /> Watch Video
        </Button>
      </CardFooter>
    </Card>
  );
};

const MentorVideos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { signOut } = useClerk();
  const navigate = useNavigate(); 
  const videoone = "/videos/videoone.mp4";
  const videotwo = "/videos/videotwo.mp4";
  const videothree = "/videos/videothree.mp4";
  const videofour = "/videos/videofour.mp4";
  const videofive = "/videos/videofive.mp4";
  const videosix = "/videos/videosix.mp4";
  const videoseven = "/videos/videoseven.mp4";
  const videoeight = "/videos/videoeight.mp4";
  const videonine = "/videos/videonine.mp4";
  const videoten = "/videos/videoten.mp4";
  const videoeleven = "/videos/videoeleven.mp4";
  const videotwelve = "/videos/videotwelve.mp4";
  const videothirteen = "/videos/videothirteen.mp4";


  // Updated video data with local imports
  const sampleVideos: VideoCardProps[] = [
    {
      id: "1",
      title: "Get to Learn the Best Filmmaking Tool, Davinci Resolve",
      mentorName: "Denis Villenueve, Filmmaker",
      duration: "45:30",
      date: "2 weeks ago",
      thumbnailUrl: filmone,
      category: "Filmmaking",
      rating: 4.8,
      views: 124420,
      tags: ["Davinci Resolve", "Typography", "Editing"],
      videoUrl: videoone,
    },
    {
      id: "2",
      title: "The concept of a Monarchy in Advanced Politics",
      mentorName: "Michael Chen, Monarchy & Empire Historian",
      duration: "1:12:45",
      thumbnailUrl: politicalsciencesthree,
      date: "3 days ago",
      category: "Leadership",
      rating: 4.9,
      views: 85426,
      tags: ["Ideals", "History", "Political Science"],
      videoUrl: videotwo,
    },
    {
      id: "3",
      title: "Conservatism's Roots in human society",
      mentorName: "Dr. Lisa Wang, US Politics Expert",
      duration: "58:20",
      date: "1 month ago",
      thumbnailUrl: politicalsciencesfour,
      category: "Leadership",
      rating: 4.7,
      views: 21550,
      tags: ["Empire", "Divide & Rule", "Political Analysis"],
      videoUrl: videothree,
    },
    {
      id: "4",
      title: "How to setup your environment for filmmaking",
      mentorName: "Christopher Nolan, Filmmaker",
      duration: "37:15",
      thumbnailUrl: filmtwo,
      date: "2 weeks ago",
      category: "Filmmaking",
      rating: 4.6,
      views: 98023,
      tags: ["Filmmaking", "Actors", "Enironment"],
      videoUrl: videofour,
    },
    {
      id: "5",
      title: "Learn Finance Basics",
      mentorName: "David Kim, US Financial Analysts",
      duration: "1:24:10",
      date: "5 days ago",
      thumbnailUrl: politicalsciencestwo,
      category: "Finance",
      rating: 4.9,
      views: 765,
      tags: ["Finance", "Personal Management", "Loans & Debts"],
      videoUrl: videofive,
    },
    {
      id: "6",
      title: "How to Learn Programming for beginners",
      mentorName: "Kachi Brandon, AI Researcher",
      duration: "52:40",
      date: "3 weeks ago",
      category: "Programming",
      rating: 4.8,
      views: 2314550,
      tags: ["Programming", "AI", "Beginner"],
      videoUrl: videosix,
    },
    {
      id: "7",
      title: "Python for Beginners",
      mentorName: "Dr. Grant Patel, AI Researcher",
      duration: "52:40",
      date: "3 weeks ago",
      category: "Programming",
      rating: 4.8,
      views: 248292,
      thumbnailUrl: codingone,
      tags: ["Machine Learning", "Data Science", "Python Libraries"],
      videoUrl: videoseven,
    },
    {
      id: "8",
      title: "Let's talk about Money & What is Money",
      mentorName: "Dr. Emily Patel & Jaden Camille, Goldman Sachs Analysts",
      duration: "52:40",
      date: "3 weeks ago",
      thumbnailUrl: businessone,
      category: "Finance",
      rating: 4.8,
      views: 1850,
      tags: ["Machine Learning", "AI", "Beginner"],
      videoUrl: videoeight,
    },
    {
      id: "9",
      title: "Coding Vs Programming",
      mentorName: "Arnold Grand, Software Engineer",
      duration: "52:40",
      thumbnailUrl: codingtwo,
      date: "3 weeks ago",
      category: "Programming",
      rating: 4.8,
      views: 13380,
      tags: ["Coding", "Programming", "Software Engineering"],
      videoUrl: videonine,
    },
    {
      id: "10",
      title: "Will your investments be worth the wait ",
      mentorName: "Alux Kent, Business Professor",
      duration: "52:40",
      thumbnailUrl: businessthree,
      date: "3 weeks ago",
      category: "Finance",
      rating: 4.8,
      views: 19480,
      tags: ["Decisions", "Business", "Branding"],
      videoUrl: videoten,
    },
    {
      id: "11",
      title: "Advanced Techniques in Davinci Resolve | Filmmaking",
      mentorName: "Kwako Samuel, Davinci Resolve Expert",
      duration: "52:40",
      thumbnailUrl: filmthree,
      date: "3 weeks ago",
      category: "Filmmaking",
      rating: 4.8,
      views: 47850,
      tags: ["Editing", "Videomaking", "Davinci Resolve"],
      videoUrl: videoeleven,
    },
    {
      id: "12",
      title: "Finance | The Driver of Capitalism",
      mentorName: "CEO Stephen A. Schwarzman, Blackstone Inc",
      duration: "52:40",
      date: "3 weeks ago",
      thumbnailUrl: businesstwo,
      category: "Finance",
      rating: 4.8,
      views: 13950,
      tags: ["Portfolio", "Business Management", "Administration"],
      videoUrl: videotwelve,
    },
    {
      id: "13",
      title: "What is Political Science",
      mentorName: "Thaddeus Young, Political Scientist",
      duration: "52:40",
      thumbnailUrl: politicalsciencesone,
      date: "3 weeks ago",
      category: "Leadership",
      rating: 4.8,
      views: 1850,
      tags: ["Organisational Management", "Leadership", "Politics"],
      videoUrl: videothirteen,
    },
  ];

  const handleLogout = async () => {
    await signOut();  
    navigate("/");    
  };

  const handleWatchVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const filteredVideos = useMemo(() => {
    return sampleVideos.filter(video => 
      // Filter by search query
      (searchQuery === "" || 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ) && 
      // Filter by category
      (selectedCategory === "all" || video.category === selectedCategory)
    ).sort((a, b) => {
      // Sorting logic
      switch(sortOption) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "popular":
          return b.views - a.views;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, sortOption]);

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
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
          
          {/* Content tabs */}
          <Tabs 
          defaultValue="all" 
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-6"
        >
          <TabsList>
            <TabsTrigger value="all">All Videos</TabsTrigger>
            <TabsTrigger value="Programming">Programming</TabsTrigger>
            <TabsTrigger value="Finance">Finance</TabsTrigger>
            <TabsTrigger value="Filmmaking">Filmmaking</TabsTrigger>
            <TabsTrigger value="Leadership">Leadership</TabsTrigger>
          </TabsList>
        </Tabs>
          
          {/* Videos grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <MentorVideoCard 
              key={video.id} 
              {...video} 
              onWatchVideo={handleWatchVideo}
            />
          ))}
        </div>
          
          {/* Load more button */}
          <div className="mt-8 text-center">
            <Button variant="outline">Load More Videos</Button>
          </div>

          {/* Video Player Modal */}
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Video Player</DialogTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-4"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogHeader>
              {selectedVideo && (
                <div className="aspect-video">
                  <ReactPlayer 
                    url={selectedVideo}
                    width="100%"
                    height="100%"
                    controls
                    playing
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default MentorVideos;