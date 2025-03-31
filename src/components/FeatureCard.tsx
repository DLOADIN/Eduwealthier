
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCardProps) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-md bg-eduwealth-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-eduwealth-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
