// components/dashboard/Sidebar.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home, gradient: "from-blue-400 to-indigo-500" },
  { name: "Course Material", href: "/course-material", icon: BookOpen, gradient: "from-emerald-400 to-teal-500" },
  { name: "Discuss Buddy", href: "/discuss-buddy", icon: MessageSquare, gradient: "from-purple-400 to-pink-500" },
  { name: "Goal Setting", href: "/goal-setting", icon: Target, gradient: "from-amber-400 to-orange-500" },
  { name: "Schedule", href: "/schedule-timetable", icon: Calendar, gradient: "from-teal-400 to-cyan-500" },
  { name: "Study Bot", href: "/study-bot", icon: Bot, gradient: "from-violet-400 to-purple-500" },
  { name: "Study Tracker", href: "/study-tracker", icon: Clock, gradient: "from-green-400 to-emerald-500" },
  { name: "To-Do List", href: "/todo-list", icon: ListChecks, gradient: "from-cyan-400 to-blue-500" },
];

const bottomNavItems = [
  { name: "Settings", href: "/settings", icon: Settings, gradient: "from-gray-400 to-slate-500" },
  { name: "Logout", href: "/logout", icon: LogOut, gradient: "from-red-400 to-pink-500" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`
      fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-72'}
    `}>
      {/* Backdrop blur container */}
      <div className="h-full backdrop-blur-xl bg-white/80 border-r border-white/20 shadow-2xl relative overflow-hidden">
        
        {/* Animated background gradients */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/3 -right-8 w-24 h-24 bg-gradient-to-br from-emerald-400/15 to-teal-500/15 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 -left-8 w-28 h-28 bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full blur-xl animate-pulse" />
        
        <div className="relative z-10 h-full flex flex-col">
          
          {/* Header with Logo */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <Link href="/dashboard" className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      StudyNest
                    </h1>
                    <p className="text-xs text-gray-500">Learning Platform</p>
                  </div>
                </Link>
              )}
              
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-xl bg-white/50 hover:bg-white/80 text-gray-600 hover:text-gray-800 transition-all duration-200 hover:scale-110 shadow-lg"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src="/avatars/default.png" />
                  <AvatarFallback>
                    <User className="h-6 w-6 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse" />
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">Alex Scholar</h3>
                  <p className="text-sm text-gray-600 truncate">Computer Science</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    w-full group relative flex items-center transition-all duration-300
                    ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
                    ${pathname === item.href 
                      ? 'bg-white/70 shadow-lg border border-white/30' 
                      : 'hover:bg-white/50 hover:shadow-md'
                    }
                    rounded-xl
                  `}
                >
                  {/* Active indicator */}
                  {pathname === item.href && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-r-full" />
                  )}
                  
                  {/* Icon with gradient background */}
                  <div className={`
                    p-2 rounded-lg transition-all duration-200 group-hover:scale-110
                    ${pathname === item.href 
                      ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                      : 'bg-gray-100 group-hover:bg-white'
                    }
                  `}>
                    <item.icon className={`
                      h-5 w-5 transition-colors duration-200
                      ${pathname === item.href ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}
                    `} />
                  </div>
                  
                  {!isCollapsed && (
                    <div className="ml-3 flex-1 text-left">
                      <span className={`
                        font-medium transition-colors duration-200
                        ${pathname === item.href 
                          ? 'text-gray-800' 
                          : 'text-gray-700 group-hover:text-gray-900'
                        }
                      `}>
                        {item.name}
                      </span>
                    </div>
                  )}
                  
                  {/* Hover tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className="p-3 border-t border-white/20">
            <div className="space-y-2">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    w-full group relative flex items-center transition-all duration-300
                    ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
                    ${pathname === item.href 
                      ? 'bg-white/70 shadow-lg border border-white/30' 
                      : 'hover:bg-white/50 hover:shadow-md'
                    }
                    rounded-xl
                  `}
                >
                  <div className={`
                    p-2 rounded-lg transition-all duration-200 group-hover:scale-110
                    ${pathname === item.href 
                      ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                      : 'bg-gray-100 group-hover:bg-white'
                    }
                  `}>
                    <item.icon className={`
                      h-5 w-5 transition-colors duration-200
                      ${pathname === item.href ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}
                    `} />
                  </div>
                  
                  {!isCollapsed && (
                    <div className="ml-3 flex-1 text-left">
                      <span className={`
                        font-medium transition-colors duration-200
                        ${pathname === item.href 
                          ? 'text-gray-800' 
                          : 'text-gray-700 group-hover:text-gray-900'
                        }
                      `}>
                        {item.name}
                      </span>
                    </div>
                  )}
                  
                  {isCollapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Study streak indicator */}
            {!isCollapsed && (
              <div className="mt-4 p-3 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-xl border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🔥</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">12 Day Streak!</p>
                    <p className="text-xs text-gray-600">Keep it up!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};