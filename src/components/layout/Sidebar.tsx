
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, Users, MessageSquare, BookOpen, 
  BarChart2, Search, Award, Settings, ChevronLeft, ChevronRight, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Find Mentors",
    href: "/mentors",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Learning Paths",
    href: "/learning-paths",
    icon: BookOpen,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    title: "Search & Filter",
    href: "/search",
    icon: Search,
  },
  {
    title: "Endorsements",
    href: "/endorsements",
    icon: Award,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && (
          <span className="text-eduwealth-primary text-xl font-bold">
            Edu<span className="text-eduwealth-accent">Wealth</span>
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 py-8 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-3 rounded-md text-sm transition-colors",
              location.pathname === item.href 
                ? "bg-eduwealth-primary/10 text-eduwealth-primary" 
                : "text-gray-600 hover:bg-gray-100",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={16} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-gray-500">Mentee</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
