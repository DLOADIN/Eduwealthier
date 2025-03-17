
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-eduwealth-primary text-2xl font-bold">Edu<span className="text-eduwealth-accent">Wealth</span></span>
        </Link>

        {!isMobile && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search mentors, skills, topics..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button className="bg-eduwealth-primary text-white hover:bg-eduwealth-primary/90">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
