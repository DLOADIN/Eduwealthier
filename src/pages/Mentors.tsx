
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MentorCard from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, ArrowDownUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mentors = [
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
  {
    id: "3",
    name: "Sarah Johnson",
    title: "UX/UI Design Lead | 8+ years exp",
    rating: 4.7,
    reviews: 56,
    skills: ["UI Design", "User Research", "Figma", "Prototyping"],
    hourlyRate: 60,
  },
  {
    id: "4",
    name: "James Wilson",
    title: "Marketing Strategy Consultant",
    rating: 4.6,
    reviews: 42,
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
    hourlyRate: 55,
  },
  {
    id: "5",
    name: "Aisha Patel",
    title: "Product Management | Ex-Amazon",
    rating: 4.9,
    reviews: 93,
    skills: ["Product Strategy", "Roadmapping", "User Stories", "Agile"],
    hourlyRate: 80,
  },
];

const categories = [
  "Software Development",
  "Data Science",
  "Design",
  "Marketing",
  "Product Management",
  "Business",
  "Finance",
];

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Find Mentors</h1>
              <p className="text-muted-foreground">Connect with expert mentors to accelerate your learning</p>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search mentors by name, skills, or expertise..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <ArrowDownUp className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="highestRated">Highest Rated</SelectItem>
                    <SelectItem value="priceLow">Price: Low to High</SelectItem>
                    <SelectItem value="priceHigh">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            
            {showFilters && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label className="text-base font-medium mb-2 block">Categories</Label>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label
                              htmlFor={category}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium mb-2 block">Price Range</Label>
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-6"
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">${priceRange[0]}/hr</span>
                        <span className="text-sm">${priceRange[1]}/hr</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium mb-2 block">Availability</Label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox id="available-weekdays" />
                          <label
                            htmlFor="available-weekdays"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                          >
                            Weekdays
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="available-weekends" />
                          <label
                            htmlFor="available-weekends"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                          >
                            Weekends
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="available-evenings" />
                          <label
                            htmlFor="available-evenings"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                          >
                            Evenings
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 space-x-2">
                    <Button variant="outline" onClick={() => setShowFilters(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-eduwealth-primary hover:bg-eduwealth-primary/90">
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Mentors List */}
          <div className="space-y-6">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} {...mentor} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" className="bg-eduwealth-primary text-white hover:bg-eduwealth-primary/90">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mentors;
