import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { Users, MessageSquare, Award, Search, BarChart2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import image1 from '../frontend/assets/images/img1.jpg'
import image2 from '../frontend/assets/images/img2.png'
import image3 from '../frontend/assets/images/img3.jpg'
import image4 from '../frontend/assets/images/img4.jpg'
import image5 from '../frontend/assets/images/img5.jpg'
import image6 from '../frontend/assets/images/img6.png'
import image7 from '../frontend/assets/images/img7.png'
import image8 from '../frontend/assets/images/img8.jpeg'


const Index = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const FeatureCard = [
    { name: "Oprah Winfrey", image: image3, description: "Learn about Oprah's contributions to modern-day feminism and her insights on personal growth." },
    { name: "Elon Musk", image: image4, description: "Discover how Elon Musk runs his companies and what we can learn from his leadership." },
    { name: "Neil deGrasse Tyson", image: image5, description: "Master astrophysics and cosmology with the world's leading astrophysicist." },
    { name: "Nischa", image: image6, description: "Learn investment banking and financial literacy from a top portfolio manager." },
    { name: "Paul Kagame", image: image7, description: "Explore leadership lessons from Rwanda's President, Paul Kagame." },
    { name: "Denis Villeneuve", image: image8, description: "Learn filmmaking from one of the world's leading directors." },
  ];
  
  const faqs = [
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription from your account settings. If you need further assistance, contact our support team."
    },
    {
      question: "Are the tutorials suitable for beginners?",
      answer: "Yes! Our tutorials are designed for all skill levels, from beginners to advanced users."
    },
    {
      question: "Can I access tutorials on multiple devices?",
      answer: "Absolutely! You can access your tutorials on any device with an internet connection."
    },
    {
      question: "Is there a difference between monthly and yearly subscriptions?",
      answer: "The only difference is the billing cycle. Yearly subscriptions come with a discount compared to monthly payments."
    },
    {
      question: "What happens if my payment fails during the subscription period?",
      answer: "If a payment fails, you'll receive a notification and have a grace period to update your payment method."
    },
    {
      question: "Can I get a refund if I'm not satisfied with the tutorials?",
      answer: "We offer a 7-day money-back guarantee if you're not satisfied with our content. Contact support for details."
    }
  ];

  const pricingPlans = [
    {
      plan: "Personal",
      price: "$0",
      features: ["Limited tutorials", "No membership", "Dashboard Analytics"],
    },
    {
      plan: "Professional",
      price: "$10",
      features: ["All tutorials", "Membership", "Community access", "Dashboard Analytics"],
    },
    {
      plan: "Elite",
      price: "$50",
      features: ["Everything in Pro", "Simple Panel"],
    },
  ];
  


  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <header className="border border-purple-200 rounded-lg mx-2 my-2">
        <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="#" className="flex items-center space-x-2">
          <span className="text-eduwealth-primary text-2xl font-bold">Edu<span className="text-eduwealth-accent">Wealth</span></span>
        </Link>
          <div className="flex space-x-8">
              <a href="#About-Us" className="text-gray-800 font-medium">About Us</a>
              <a href="#why-us" className="text-gray-800 font-medium">Why Us</a>
              {/* <a href="#mentors" className="text-gray-800 font-medium">Mentors</a> */}
              <a href="#pricing" className="text-gray-800 font-medium">Pricing</a>
              <a href="#faqs" className="text-gray-800 font-medium">FAQs</a>
          </div>
          <div className="flex space-x-4">
          <Link to="/login">
            <Button className="bg-orange-400 hover:bg-eduwealth-primary">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button  className="hover:bg-orange-400">Sign Up</Button>
          </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Master Your Expertise with the World's Best Mentors
            </h1>
            <p className="text-gray-600 mb-8">
              Join for exclusive access to premium financial tutorials, world-class mentorship, and hands-on projects designed to elevate your financial literacy and other skills.
            </p>
            <div className="flex space-x-4">
              <Link to="/signup"> 
                <Button className="bg-gray-800 text-white">Become a Member</Button>
              </Link>
              
              <Link to="/login">
                <Button className="bg-orange-500 text-white">Continue Your Studies</Button>
              </Link>

            </div>
            <div className="flex mt-16 space-x-4">
              <div className="text-center p-6">
                <h2 className="text-4xl font-bold text-blue-500">100+</h2>
                <p className="text-gray-600">Mentors</p>
              </div>
              <div className="text-center p-6">
                <h2 className="text-4xl font-bold text-orange-500">200+</h2>
                <p className="text-gray-600">Courses</p>
              </div>
              <div className="text-center p-6">
                <h2 className="text-4xl font-bold text-green-600">99%</h2>
                <p className="text-gray-600">Satisfaction</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-red-200 rounded-full w-64 h-64 md:w-80 md:h-80 absolute top-0 right-0 -z-10"></div>
            <img
              src={image2}
              alt="Student with notebook"
              className="relative z-10"
            />
            <div className="absolute top-16 left-0 bg-blue-500 text-white p-4 rounded-lg shadow-lg transform -translate-x-1/4 rotate-12 z-20">
              <MessageSquare className="h-8 w-8" />
            </div>
            <div className="absolute top-8 right-8 bg-green-600 text-white p-4 rounded-lg shadow-lg transform rotate-12 z-20">
              <Award className="h-8 w-8" />
            </div>
            <div className="absolute bottom-16 left-0 bg-white px-4 py-2 rounded-full shadow-lg flex items-center z-20">
              <div className="flex -space-x-2 mr-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium">3800+ people already joined</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto py-16 px-4 bg-white" id="About-Us">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-8">
            <div className="border-l-4 border-blue-400 pl-6 mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                WE EDUCATE<br />
                FOR A BETTER<br />
                GENERATION
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              With years of research-backed insights, we are dedicated to helping you reach financial success by offering personalized learning experiences tailored to your needs and connecting you with the best experts in the world as your mentors.
            </p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src={image1}
              alt="Students collaborating with laptops"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4" id="why-us">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          WHY CHOOSE TO LEARN FROM US?
        </h2>
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-16 leading-relaxed">
          We provide videos and tutorials from top-notch industry experts who have dedicated their lives to their professions and are ready to offer their expertise to individuals looking to upgrade their skills to meet current market demands.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {
            FeatureCard.map((feature, index) => (
              <div key={index}>
                <h2>{feature.name}</h2>
                {typeof feature.image === 'string' && (
                <img className="w-50 h-60 rounded-md" src={feature.image} alt={feature.name} />
                  )}
                <p>{feature.description}</p>
              </div>
            ))
          }
        </div>
      </section>

      {/* Pricing Section */}
    <section className="max-w-6xl mx-auto px-4 py-16 bg-gray-50 text-gray-900" id="pricing">
      <h2 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
          >
            <h3 className="text-lg font-semibold text-gray-700">{plan.plan}</h3>
            <div className="flex items-baseline my-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-gray-500 text-sm ml-1">/month</span>
            </div>
            <ul className="space-y-3 mb-6 text-gray-600">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="h-6 w-6 bg-gray-900 text-white flex items-center justify-center rounded-full mr-3">
                    ✔
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/login">
              <Button className="bg-gray-900 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition-all">
                Get Started
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16" id="faqs">
      <h2 className="text-xl md:text-2xl font-medium text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm md:text-base font-medium">{faq.question}</span>
              <div className="relative group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <div
                  className="absolute left-0 mt-2 w-64 bg-white shadow-lg p-3 rounded-md text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-800"
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h2 className="text-xl md:text-2xl font-medium mb-2">
                Stay Informed, Stay Inspired
              </h2>
              <p className="text-sm text-gray-600">
                Subscribe to our newsletter for the latest insights and updates.
              </p>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto flex">
              <input
                type="email"
                placeholder="hello@example.com"
                className="flex-grow md:w-64 px-4 py-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <Button className="bg-red-500 text-white px-4 py-2 text-sm font-medium rounded-r">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-lg font-bold mb-4">Eduwealth</div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Users className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <MessageSquare className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Award className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="mb-8 md:mb-0">
              <p className="text-lg mb-4 font-extrabold">MENU</p>
              <ul className="space-y-2">
                <li> <a href="#About-Us" className="text-gray-800 font-medium">About Us</a></li>
                <li><a href="#why-us" className="text-gray-800 font-medium">Why Us</a></li>
                {/* <a href="#mentors" className="text-gray-800 font-medium">Mentors</a> */}
                <li><a href="#pricing" className="text-gray-800 font-medium">Pricing</a></li>
                <li><a href="#faqs" className="text-gray-800 font-medium">FAQs</a></li>
              </ul>
            </div>
            <div>
            <p className="text-lg mb-4 font-extrabold">ACCOUNT</p>
              <ul className="space-y-2">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-6">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Eduwealth. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;