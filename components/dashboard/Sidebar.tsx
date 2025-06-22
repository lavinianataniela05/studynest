// components/dashboard/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  MessageSquare,
  Target,
  Calendar,
  Bot,
  Clock,
  ListChecks,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Button } from "@/components/UI/Button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Course Material", href: "/course-material", icon: BookOpen },
  { name: "Discuss Buddy", href: "/discuss-buddy", icon: MessageSquare },
  { name: "Goal Setting", href: "/goal-setting", icon: Target },
  { name: "Schedule", href: "/schedule-timetable", icon: Calendar },
  { name: "Study Bot", href: "/study-bot", icon: Bot },
  { name: "Study Tracker", href: "/study-tracker", icon: Clock },
  { name: "To-Do List", href: "/todo-list", icon: ListChecks },
];

const bottomNavItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/logout", icon: LogOut },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/dashboard" className="flex items-center">
            <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              StudyNest
            </span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <Avatar>
            <AvatarImage src="/avatars/default.png" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Student User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Computer Science
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon
                    className={`flex-shrink-0 h-5 w-5 ${
                      pathname === item.href
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ul className="space-y-1">
            {bottomNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon
                    className={`flex-shrink-0 h-5 w-5 ${
                      pathname === item.href
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};