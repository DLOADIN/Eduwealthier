import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SignIn, SignUp, useAuth, useClerk } from "@clerk/clerk-react";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Mentors from "./pages/Mentors";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import MentorVideos from "./pages/MentorVideos";
import { Button } from "@/components/ui/button"; 

const queryClient = new QueryClient();

// ✅ Custom SignIn Component
const CustomSignIn = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="font-intel">
      <SignIn appearance={{ layout: { socialButtonsPlacement: "bottom" } }} />
    </div>
  );
};

const CustomSignUp = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/login");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="font-intel">
      <SignUp />
    </div>
  );
};

// ✅ Custom Logout Component
// const Logout = () => {
//   const { signOut } = useClerk();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await signOut(); // ✅ Sign out of Clerk
//     navigate("/");   // ✅ Redirect to home page
//   };

//   return (
//     <Link to="/" onClick={handleLogout}>
//       <Button className="bg-eduwealth-primary hover:bg-eduwealth-primary/90">
//         Logout
//       </Button>
//     </Link>
//   );
// };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/login" element={<CustomSignIn />} />
          <Route path="/signup" element={<CustomSignUp />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/mentor-videos" element={<MentorVideos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
