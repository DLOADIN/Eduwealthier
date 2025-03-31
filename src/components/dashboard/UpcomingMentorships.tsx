
import { Calendar, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

type MentorshipSession = {
  id: string;
  title: string;
  mentorName: string;
  date: string;
  time: string;
  duration: string;
};

type UpcomingMentorshipsProps = {
  sessions: MentorshipSession[];
};

const UpcomingMentorships = ({ sessions }: UpcomingMentorshipsProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Upcoming Mentorships</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sessions.map((session) => (
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
    </>
  );
};

export default UpcomingMentorships;
