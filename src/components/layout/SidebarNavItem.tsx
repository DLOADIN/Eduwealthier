
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export type NavItemProps = {
  title: string;
  href: string;
  icon: LucideIcon;
  collapsed: boolean;
};

const SidebarNavItem = ({ title, href, icon: Icon, collapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-3 rounded-md text-sm transition-colors",
        isActive
          ? "bg-eduwealth-primary/10 text-eduwealth-primary" 
          : "text-gray-600 hover:bg-gray-100",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      <Icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
      {!collapsed && <span>{title}</span>}
    </Link>
  );
};

export default SidebarNavItem;
