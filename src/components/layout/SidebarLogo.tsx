
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SidebarLogoProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const SidebarLogo = ({ collapsed, onToggle }: SidebarLogoProps) => {
  return (
    <div className="p-4 flex justify-between items-center">
      {!collapsed && (
        <span className="text-eduwealth-primary text-xl font-bold">
          Edu<span className="text-eduwealth-accent">Wealth</span>
        </span>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onToggle}
        className="ml-auto"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </Button>
    </div>
  );
};

export default SidebarLogo;
