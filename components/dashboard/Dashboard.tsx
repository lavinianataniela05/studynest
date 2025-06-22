'use client'
import React, { useState, useEffect } from 'react'
import {
  BookOpen, MessageSquare, Target, Calendar, Bot, Clock, ListChecks,
  TrendingUp, CheckCircle, Activity, Flame, Star, Sparkles, ArrowRight,
  Plus, Check
} from 'lucide-react'

// Enhanced Card Component with glass morphism
import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  gradient?: boolean
}

const Card = ({ children, className = '', gradient = false, ...props }: CardProps) => (
  <div 
    className={`
      backdrop-blur-sm bg-white/90 rounded-2xl border border-white/20 
      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]
      ${gradient ? 'bg-gradient-to-br from-white/95 to-white/85' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
)

// Animated Study Progress Component
const StudyProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(72), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="p-6 relative overflow-hidden" gradient>
      {/* Animated background orbs */}
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-green-400/15 to-emerald-500/15 rounded-full blur-xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Study Progress</h3>
            <p className="text-sm text-gray-600">This week's journey</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-4xl font-black text-gray-800 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {progress}%
              </span>
              <div className="text-sm text-gray-500 mt-1">Amazing progress!</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">25/35 hours</div>
              <div className="text-xs text-gray-500">10 hours to go</div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-full shadow-sm transition-all duration-1000 ease-out relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Week Start</span>
              <span>Target</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Enhanced Upcoming Tasks
const UpcomingTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Advanced Calculus Assignment', due: 'Today', priority: 'high', completed: false, subject: 'Math' },
    { id: 2, title: 'Renaissance History Essay', due: 'Tomorrow', priority: 'medium', completed: false, subject: 'History' },
    { id: 3, title: 'Physics Lab Report', due: 'Friday', priority: 'low', completed: true, subject: 'Science' }
  ])

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
      case 'medium': return 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
      case 'low': return 'bg-gradient-to-r from-emerald-400 to-green-500 text-white'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <Card className="p-6 relative overflow-hidden" gradient>
      <div className="absolute -top-6 -right-6 w-36 h-36 bg-gradient-to-br from-blue-400/15 to-teal-500/15 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Upcoming Tasks</h3>
              <p className="text-sm text-gray-600">{tasks.filter(t => !t.completed).length} tasks pending</p>
            </div>
          </div>
          <button className="p-2 hover:bg-white/50 rounded-xl text-gray-500 hover:text-teal-600 transition-all duration-200 hover:scale-110">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`
                flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border
                ${task.completed 
                  ? 'bg-gray-50/50 border-gray-200/50 opacity-75' 
                  : 'bg-white/70 border-white/30 hover:bg-white/90 hover:shadow-md'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`
                  w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0
                  ${task.completed 
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-500 shadow-lg' 
                    : 'border-gray-300 hover:border-teal-400 hover:shadow-sm'
                  }
                `}
              >
                {task.completed && <Check className="w-3 h-3 text-white" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{task.due}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityStyle(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                    {task.subject}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// Enhanced Recent Activity
const RecentActivity = () => {
  const activities = [
    { id: 1, action: 'Completed Advanced Math Quiz', time: '2 hours ago', icon: <Star className="w-5 h-5" />, color: 'from-amber-400 to-orange-500' },
    { id: 2, action: 'Added comprehensive study notes', time: '4 hours ago', icon: <BookOpen className="w-5 h-5" />, color: 'from-blue-400 to-indigo-500' },
    { id: 3, action: 'Focused study session: 45 min', time: '1 day ago', icon: <Clock className="w-5 h-5" />, color: 'from-teal-400 to-emerald-500' }
  ]

  return (
    <Card className="p-6 relative overflow-hidden" gradient>
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400/15 to-blue-500/15 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Recent Activity</h3>
            <p className="text-sm text-gray-600">Your learning journey</p>
          </div>
        </div>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300 border border-white/20 hover:shadow-md"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${activity.color} shadow-lg`}>
                <div className="text-white">
                  {activity.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const [timeGreeting, setTimeGreeting] = useState('')
  const [studyStreak, setStudyStreak] = useState(12)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeGreeting('Good morning')
    else if (hour < 17) setTimeGreeting('Good afternoon')
    else setTimeGreeting('Good evening')
  }, [])

  const features = [
    { title: 'Course Material', description: 'Organize your study resources', icon: <BookOpen className="w-6 h-6" />, color: 'from-emerald-400 to-teal-500' },
    { title: 'Discuss Buddy', description: 'Connect with study peers', icon: <MessageSquare className="w-6 h-6" />, color: 'from-blue-400 to-indigo-500' },
    { title: 'Goal Setting', description: 'Track academic objectives', icon: <Target className="w-6 h-6" />, color: 'from-amber-400 to-orange-500' },
    { title: 'Schedule', description: 'Manage your study time', icon: <Calendar className="w-6 h-6" />, color: 'from-teal-400 to-cyan-500' },
    { title: 'Study Bot', description: 'AI-powered learning assistant', icon: <Bot className="w-6 h-6" />, color: 'from-purple-400 to-pink-500' },
    { title: 'Study Tracker', description: 'Monitor learning sessions', icon: <Clock className="w-6 h-6" />, color: 'from-green-400 to-emerald-500' },
    { title: 'To-Do List', description: 'Manage daily tasks', icon: <ListChecks className="w-6 h-6" />, color: 'from-cyan-400 to-blue-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <Card className="p-8 relative overflow-hidden" gradient>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-400/15 to-purple-500/15 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-800 mb-3">
                {timeGreeting}, <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Scholar!</span>
                <span className="text-3xl ml-2">🌱</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Ready to embark on another exciting learning adventure? Your knowledge garden awaits nurturing!
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white shadow-lg">
                <Flame className="w-5 h-5" />
                <span className="font-bold">{studyStreak} day streak</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full text-white shadow-lg">
                <Star className="w-5 h-5" />
                <span className="font-bold">Level 4 Scholar</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <StudyProgress />
          <UpcomingTasks />
          <RecentActivity />
        </div>

        {/* Learning Tools */}
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-black text-gray-800 mb-2">Your Learning Toolkit</h3>
            <p className="text-gray-600">Powerful tools to accelerate your academic journey</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <Card 
                key={feature.title} 
                className="group p-6 cursor-pointer hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700">{feature.description}</p>
                <div className="flex justify-end">
                  <div className="text-gray-400 group-hover:text-teal-500 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Inspirational Quote */}
        <Card className="p-8 text-center relative overflow-hidden" gradient>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-blue-400/5 to-purple-400/5" />
          <div className="relative z-10">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <blockquote className="text-xl font-medium text-gray-700 mb-4 italic max-w-3xl mx-auto leading-relaxed">
              "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
            </blockquote>
            <cite className="text-sm text-gray-500 font-medium">— Brian Herbert</cite>
          </div>
        </Card>
      </div>
    </div>
  )
}