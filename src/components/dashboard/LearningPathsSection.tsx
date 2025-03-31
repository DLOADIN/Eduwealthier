
import { Book } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

type LearningPath = {
  id: string;
  title: string;
  progress: number;
  completedModules: number;
  totalModules: number;
};

type LearningPathsSectionProps = {
  learningPaths: LearningPath[];
};

const LearningPathsSection = ({ learningPaths }: LearningPathsSectionProps) => {
  return (
    <>
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
                  <Link to="/mentor-videos" className="text-sm text-eduwealth-primary hover:underline">
                    Continue Learning
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default LearningPathsSection;
