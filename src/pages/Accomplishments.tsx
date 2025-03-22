// import React from "react";
// import { Trophy, Award, Star, CheckCircle2, Bookmark } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import SidebarAdapter from "@/components/layout/SidebarAdapter";

// interface Achievement {
//   id: number;
//   title: string;
//   date: string;
//   description: string;
//   icon: React.ReactNode;
// }

// const achievements: Achievement[] = [
//   {
//     id: 1,
//     title: "Python Programming Certificate",
//     date: "March 2023",
//     description: "Completed advanced Python programming course with distinction",
//     icon: <Trophy className="h-8 w-8 text-yellow-500" />,
//   },
//   {
//     id: 2,
//     title: "Data Science Hackathon Winner",
//     date: "June 2023",
//     description: "First place in the annual university data science competition",
//     icon: <Award className="h-8 w-8 text-blue-500" />,
//   },
//   {
//     id: 3,
//     title: "Research Publication",
//     date: "September 2023",
//     description: "Published paper on machine learning applications in healthcare",
//     icon: <Bookmark className="h-8 w-8 text-green-500" />,
//   },
//   {
//     id: 4,
//     title: "Full Stack Development Course",
//     date: "December 2023",
//     description: "Completed 12-week intensive bootcamp on modern web development",
//     icon: <CheckCircle2 className="h-8 w-8 text-purple-500" />,
//   },
//   {
//     id: 5,
//     title: "Open Source Contributor",
//     date: "February 2024",
//     description: "Recognized for significant contributions to TensorFlow projects",
//     icon: <Star className="h-8 w-8 text-orange-500" />,
//   },
// ];

// const Accomplishments = () => {
//   return (
//     <SidebarAdapter>
//       <div className="container mx-auto p-6">
//         <div className="flex items-center mb-8">
//           <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
//           <h1 className="text-3xl font-bold">Your Accomplishments</h1>
//         </div>
        
//         <p className="text-gray-600 mb-8">
//           Track your educational journey and celebrate your achievements along the way.
//           These accomplishments showcase your growth and dedication to continuous learning.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {achievements.map((achievement) => (
//             <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
//               <CardHeader className="flex flex-row items-center gap-4 pb-2">
//                 <div className="bg-gray-100 p-2 rounded-full">
//                   {achievement.icon}
//                 </div>
//                 <div>
//                   <CardTitle className="text-xl">{achievement.title}</CardTitle>
//                   <CardDescription>{achievement.date}</CardDescription>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600">{achievement.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </SidebarAdapter>
//   );
// };

// export default Accomplishments;
