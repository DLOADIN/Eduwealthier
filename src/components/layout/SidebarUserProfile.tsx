
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarUserProfileProps = {
  collapsed: boolean;
  userName?: string;
  userRole?: string;
};

const SidebarUserProfile = ({ 
  collapsed, 
  userName = "User Name", 
  userRole = "Mentee" 
}: SidebarUserProfileProps) => {
  return (
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
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarUserProfile;
