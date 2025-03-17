
import { Clock, Calendar, Target, Users } from "lucide-react";
import StatsCard from "@/components/StatsCard";

const StatsOverview = () => {
  return (
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
  );
};

export default StatsOverview;
