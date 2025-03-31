// types/mentor.ts
export type Mentor = {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  skills: string[];
  hourlyRate: number;
};

export const mentorData: Mentor[] = [
  { id: "1", name: "Dennis Scott", title: "Award-Winning Filmmaker", rating: 4.9, reviews: 152, skills: ["Cinematography"], hourlyRate: 90},
  { id: "2", name: "Fred Swaniker", title: "Entrepreneur & Global Consultant", rating: 4.8, reviews: 210, skills: ["Leadership"], hourlyRate: 100},
  { id: "3", name: "Nischa Patel", title: "Finance Expert", rating: 4.7, reviews: 75, skills: ["Investment Strategies"], hourlyRate: 85 },
      { id: "4", name: "Alex Hormozi", title: "Business Growth", rating: 4.9, reviews: 189, skills: ["Brand Building"], hourlyRate: 95 },
      { id: "5", name: "Dwayne Johnson", title: "Fitness & Motivation Coach", rating: 4.9, reviews: 300, skills: ["Fitness Training"], hourlyRate: 120 },
      { id: "6", name: "David Guetta", title: "DJ & Music Producer", rating: 4.8, reviews: 275, skills: ["Music Production"], hourlyRate: 110 },
      { id: "7", name: "William H. McRaven", title: "Military Leadership", rating: 4.9, reviews: 150, skills: ["Leadership"], hourlyRate: 105 },
      { id: "8", name: "Oprah Winfrey", title: "Media Mogul", rating: 4.9, reviews: 320, skills: ["Public Speaking"], hourlyRate: 150 },
      { id: "9", name: "Elon Musk", title: "Tech Innovator", rating: 4.8, reviews: 290, skills: ["Business Strategy"], hourlyRate: 200 },
      { id: "10", name: "Serena Williams", title: "Tennis Legend", rating: 4.9, reviews: 260, skills: ["Tennis"], hourlyRate: 130 },
      { id: "11", name: "Gordon Ramsay", title: "Chef & TV Personality", rating: 4.8, reviews: 220, skills: ["Culinary Arts"], hourlyRate: 140 },
      { id: "12", name: "Sheryl Sandberg", title: "Tech Executive", rating: 4.7, reviews: 180, skills: ["Leadership"], hourlyRate: 110 },
      { id: "13", name: "Neil deGrasse Tyson", title: "Astrophysicist", rating: 4.9, reviews: 200, skills: ["Astrophysics"], hourlyRate: 125 },
      { id: "14", name: "J.K. Rowling", title: "Author", rating: 4.9, reviews: 280, skills: ["Writing"], hourlyRate: 100 },
      { id: "15", name: "Cristiano Ronaldo", title: "Football Icon", rating: 4.9, reviews: 310, skills: ["Football"], hourlyRate: 150 },
      { id: "16", name: "Angela Merkel", title: "Former Chancellor", rating: 4.8, reviews: 180, skills: ["Governance"], hourlyRate: 130 },
      { id: "17", name: "LeBron James", title: "Basketball Champion", rating: 4.9, reviews: 290, skills: ["Basketball"], hourlyRate: 160 },
      { id: "18", name: "Mark Zuckerberg", title: "Tech Visionary", rating: 4.7, reviews: 270, skills: ["Software Engineering"], hourlyRate: 190 },
      { id: "19", name: "Bill Gates", title: "Philanthropist & Tech Leader", rating: 4.9, reviews: 320, skills: ["Entrepreneurship"], hourlyRate: 180 },
      { id: "20", name: "Michelle Obama", title: "Public Speaker & Author", rating: 4.9, reviews: 350, skills: ["Leadership"], hourlyRate: 140 },
      { id: "21", name: "Jeff Bezos", title: "E-Commerce Expert", rating: 4.8, reviews: 260, skills: ["Business"], hourlyRate: 210 },
      { id: "22", name: "Richard Branson", title: "Entrepreneur & Investor", rating: 4.7, reviews: 250, skills: ["Investments"], hourlyRate: 160 },
      { id: "23", name: "Jack Ma", title: "E-Commerce Pioneer", rating: 4.8, reviews: 290, skills: ["Startups"], hourlyRate: 200 },
      { id: "24", name: "Malala Yousafzai", title: "Education Advocate", rating: 4.9, reviews: 330, skills: ["Public Speaking"], hourlyRate: 100 },
      { id: "25", name: "Lionel Messi", title: "Football Legend", rating: 4.9, reviews: 400, skills: ["Football"], hourlyRate: 150 },
      { id: "26", name: "Sundar Pichai", title: "Tech Executive", rating: 4.7, reviews: 220, skills: ["Leadership"], hourlyRate: 170 },
      { id: "27", name: "Naval Ravikant", title: "Investor & Philosopher", rating: 4.8, reviews: 260, skills: ["Investments"], hourlyRate: 190 },
      { id: "28", name: "Steve Wozniak", title: "Tech Innovator", rating: 4.8, reviews: 280, skills: ["Engineering"], hourlyRate: 160 },
      { id: "29", name: "Barbara Corcoran", title: "Real Estate Investor", rating: 4.7, reviews: 240, skills: ["Real Estate"], hourlyRate: 140 },
      { id: "30", name: "Marie Kondo", title: "Organization Expert", rating: 4.9, reviews: 260, skills: ["Decluttering"], hourlyRate: 90 },
];