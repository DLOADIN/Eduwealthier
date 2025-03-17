
import { User, Star, MessageSquare, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type MentorCardProps = {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  skills: string[];
  hourlyRate: number;
  imageUrl?: string;
};

const MentorCard = ({
  id,
  name,
  title,
  rating,
  reviews,
  skills,
  hourlyRate,
  imageUrl,
}: MentorCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-gray-500" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-muted-foreground">{title}</p>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-muted-foreground">{reviews} reviews</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline">+{skills.length - 3} more</Badge>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold">${hourlyRate}/hr</div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 px-6 py-4 bg-gray-50 border-t">
        <Button className="flex-1 bg-eduwealth-primary hover:bg-eduwealth-primary/90">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button variant="outline" className="flex-1">
          <Book className="h-4 w-4 mr-2" />
          Book Session
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
