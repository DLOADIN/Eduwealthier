
import { Clock, Calendar, Target, Users } from "lucide-react";
import StatsCard from "@/components/StatsCard";

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Learning Hours"
        value="0"
        description="Hours spent learning"
        icon={Clock}
        trend="up"
        trendValue="0.3% from last month"
      />
      
      <StatsCard
        title="Completed Sessions"
        value="1"
        description="Mentorship sessions"
        icon={Calendar}
        trend="up"
        trendValue="1 more than last month"
      />
      
      <StatsCard
        title="Skills Progress"
        value="0"
        description="Skills in development"
        icon={Target}
        trend="neutral"
        trendValue="0% as last month"
      />
      
      <StatsCard
        title="Student & Mentor Engagement"
        value="2"
        description="New connections"
        icon={Users}
        trend="up"
        trendValue="10% more than last month"
      />
    </div>
  );
};

export default StatsOverview;
