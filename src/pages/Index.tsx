
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { Users, MessageSquare, Award, Search, BarChart2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-eduwealth-background to-white py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Empowering individuals to learn and earn through mentorship
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with expert mentors, develop new skills, and collaborate on projects
                in a structured learning environment designed to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/mentors">
                  <Button size="lg" className="bg-eduwealth-primary hover:bg-eduwealth-primary/90">
                    Find a Mentor
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline">
                    Become a Mentor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="public/lovable-uploads/acf32a02-4a25-495a-89e0-7519dd9308b4.png" 
                alt="EduWealth Mentorship" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Planned Technical Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is built with cutting-edge technology to provide the best mentorship experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Mentorship Matching System" 
              description="Rule-based algorithm to connect mentees with the perfect mentor based on skills, goals, and preferences."
              icon={Users}
            />
            
            <FeatureCard 
              title="Collaboration Service" 
              description="Real-time communication and progress tracking tools to facilitate effective mentorship relationships."
              icon={MessageSquare}
            />
            
            <FeatureCard 
              title="Mentor Endorsement System" 
              description="Verify mentor expertise through a comprehensive review and endorsement system."
              icon={Award}
            />
            
            <FeatureCard 
              title="Search & Filtering System" 
              description="Advanced search capabilities to find mentors and content tailored to your specific needs."
              icon={Search}
            />
            
            <FeatureCard 
              title="Analytics & Reporting" 
              description="Track mentorship effectiveness and progress with detailed analytics and insights."
              icon={BarChart2}
            />
          </div>
        </div>
      </section>
      
      {/* Problem Statement Section */}
      <section className="py-20 bg-eduwealth-background">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Problem Statement</h2>
              <p className="text-xl mb-8">
                Millions of people struggle to access quality education and job opportunities
                due to skill gaps and lack of mentorship.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Significance</h3>
              <p className="text-lg">
                Edu<span className="text-eduwealth-primary">Wealth</span> directly tackles this by
                providing a structured platform for mentorship, learning, and collaboration.
              </p>
            </div>
            
            <div>
              <img 
                src="public/lovable-uploads/05e206ab-469c-46ce-aa30-924faa28d444.png" 
                alt="Problem Statement" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-eduwealth-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of mentees and mentors who are already building skills
            and careers through our platform.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-eduwealth-primary hover:bg-gray-100">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduWealth</h3>
              <p className="text-gray-400">
                Empowering individuals to learn new skills and earn through mentorship.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/mentors" className="text-gray-400 hover:text-white">Find Mentors</Link></li>
                <li><Link to="/learning-paths" className="text-gray-400 hover:text-white">Learning Paths</Link></li>
                <li><Link to="/analytics" className="text-gray-400 hover:text-white">Analytics</Link></li>
                <li><Link to="/endorsements" className="text-gray-400 hover:text-white">Endorsements</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduWealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
