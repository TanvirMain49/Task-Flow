import React from "react";
import { ListTodo, Users, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Features() {
  const features = [
    {
      title: "Task Management",
      description:
        "Create, assign, and track tasks with detailed descriptions, due dates, and priority levels. Visualize progress with Kanban boards or lists.",
      icon: ListTodo,
    },
    {
      title: "Team Collaboration",
      description:
        "Facilitate seamless communication with real-time comments, file sharing, and notifications. Keep everyone on the same page and improve team efficiency.",
      icon: Users,
    },
    {
      title: "Progress Reporting & Analytics",
      description:
        "Generate comprehensive reports and dashboards to monitor project progress, identify bottlenecks, and make data-driven decisions. Track time spent, resource allocation, and project milestones.",
      icon: BarChart3,
    },
  ];
  return (
    <div className="container mx-auto">
      <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {features.map((feature, ind) => (
          <Card key={ind} className="bg-gray-800">
            <CardContent className="pt-6">
              <feature.icon size={18} className="h-12 w-12 mb-4 text-blue-300"/>
              <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
              <p className="text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
