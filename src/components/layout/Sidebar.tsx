
import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Home, Users, MessageSquare, BookOpen, 
  BarChart2, Search, Award, Settings, User,
  Video, LogIn, UserPlus
} from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import SidebarUserProfile from "./SidebarUserProfile";
import SidebarLogo from "./SidebarLogo";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  restricted?: boolean;
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
    title: "Mentor Videos",
    href: "/mentor-videos",
    icon: Video,
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
  {
    title: "Login",
    href: "/login",
    icon: LogIn,
    restricted: true,
  },
  {
    title: "Sign Up",
    href: "/signup",
    icon: UserPlus,
    restricted: true,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate authentication state

  const visibleNavItems = navItems.filter(item => 
    !item.restricted || (item.restricted && !isLoggedIn)
  );

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside 
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarLogo collapsed={collapsed} onToggle={toggleSidebar} />

      <div className="flex-1 py-8 px-3 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            title={item.title}
            href={item.href}
            icon={item.icon}
            collapsed={collapsed}
          />
        ))}
      </div>

      {isLoggedIn && (
        <SidebarUserProfile collapsed={collapsed} />
      )}
    </aside>
  );
};

export default Sidebar;
