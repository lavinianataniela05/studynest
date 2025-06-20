// components/dashboard/Dashboard.tsx
'use client'; // Mark as client component if using hooks

import { BookOpen, MessageSquare, Target, Calendar, Bot, Clock, ListChecks } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/UI/Card';
import {StudyProgress} from '@/components/dashboard/StudyProgress';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import {RecentActivity} from '@/components/dashboard/RecentActivity';

export default function Dashboard() {
  const features = [
    {
      title: 'Course Material',
      description: 'Organize your study resources',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/dashboard/course-material',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
    },
    {
      title: 'Discuss Buddy',
      description: 'Connect with peers',
      icon: <MessageSquare className="w-6 h-6" />,
      href: '/dashboard/discuss-buddy',
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
    },
    {
      title: 'Goal Setting',
      description: 'Track academic objectives',
      icon: <Target className="w-6 h-6" />,
      href: '/dashboard/goal-setting',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200'
    },
    {
      title: 'Schedule',
      description: 'Manage your classes',
      icon: <Calendar className="w-6 h-6" />,
      href: '/dashboard/schedule-timetable',
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200'
    },
    {
      title: 'Study Bot',
      description: 'AI-powered assistance',
      icon: <Bot className="w-6 h-6" />,
      href: '/dashboard/study-bot',
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-200'
    },
    {
      title: 'Study Tracker',
      description: 'Monitor sessions',
      icon: <Clock className="w-6 h-6" />,
      href: '/dashboard/study-tracker',
      color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
    },
    {
      title: 'To-Do List',
      description: 'Manage daily tasks',
      icon: <ListChecks className="w-6 h-6" />,
      href: '/dashboard/todo-list',
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back!</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Ready to tackle your academic goals today?
        </p>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StudyProgress />
        <UpcomingTasks />
        <RecentActivity />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="hover:shadow-md transition-shadow">
            <Link href={feature.href} className="block p-6">
              <div className={`${feature.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {feature.description}
              </p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}