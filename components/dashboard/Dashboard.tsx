'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, MessageSquare, Target, Calendar, Bot, Clock, ListChecks,
  TrendingUp, CheckCircle, Activity, Flame, Star, Sparkles
} from 'lucide-react'
import Link from 'next/link'

// Card Component
type CardProps = {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

const Card = ({ children, className = '', ...props }: CardProps) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className={`bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-all ${className}`}
    {...props}
  >
    {children}
  </motion.div>
)

// Study Progress Component
const StudyProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(68), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-100 rounded-full blur-xl opacity-60" />
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Study Progress</h3>
          <p className="text-xs text-gray-500">This week</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">{progress}%</span>
          <span className="text-xs text-gray-500">24/35 hours</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
          />
        </div>
      </div>
    </Card>
  )
}

// Upcoming Tasks
const UpcomingTasks = () => {
  const tasks = [
    { id: 1, title: 'Math Assignment', due: 'Today', priority: 'high', completed: false },
    { id: 2, title: 'History Essay', due: 'Tomorrow', priority: 'medium', completed: false },
    { id: 3, title: 'Science Lab Report', due: 'Friday', priority: 'low', completed: true }
  ]
  const [taskList, setTaskList] = useState(tasks)

  const toggleTask = (id: number) => {
    setTaskList(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-600'
      case 'medium': return 'bg-amber-50 text-amber-600'
      case 'low': return 'bg-green-50 text-green-600'
      default: return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-50 to-emerald-100 rounded-full blur-xl opacity-60" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Upcoming Tasks</h3>
            <p className="text-xs text-gray-500">{taskList.filter(t => !t.completed).length} pending</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="p-1 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
      </div>

      <div className="space-y-2">
        {taskList.slice(0, 3).map(task => (
          <motion.div
            key={task.id}
            layout
            className={`flex items-center gap-3 p-3 rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleTask(task.id)}
              className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                task.completed 
                  ? 'bg-emerald-500 border-emerald-500' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {task.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </motion.button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{task.due}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// Recent Activity
const RecentActivity = () => {
  const activities = [
    { id: 1, action: 'Completed Math Quiz', time: '2 hours ago', icon: <Star className="w-4 h-4 text-amber-500" /> },
    { id: 2, action: 'Added new notes', time: '4 hours ago', icon: <BookOpen className="w-4 h-4 text-blue-500" /> },
    { id: 3, action: 'Study session: 45 min', time: '1 day ago', icon: <Clock className="w-4 h-4 text-teal-500" /> }
  ]

  return (
    <Card className="p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-full blur-xl opacity-60" />
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Activity className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Recent Activity</h3>
          <p className="text-xs text-gray-500">Your progress</p>
        </div>
      </div>

      <div className="space-y-2">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-1.5 bg-white rounded-lg shadow-xs border border-gray-100">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

// Dashboard Page
export default function Dashboard() {
  const [timeGreeting, setTimeGreeting] = useState('')
  const [studyStreak, setStudyStreak] = useState(7)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeGreeting('Good morning')
    else if (hour < 17) setTimeGreeting('Good afternoon')
    else setTimeGreeting('Good evening')
  }, [])

  const features = [
    { title: 'Course Material', description: 'Organize your study resources', icon: <BookOpen className="w-5 h-5" />, href: '/dashboard/course-material', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Discuss Buddy', description: 'Connect with study peers', icon: <MessageSquare className="w-5 h-5" />, href: '/dashboard/discuss-buddy', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Goal Setting', description: 'Track academic objectives', icon: <Target className="w-5 h-5" />, href: '/dashboard/goal-setting', color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Schedule', description: 'Manage your study time', icon: <Calendar className="w-5 h-5" />, href: '/dashboard/schedule-timetable', color: 'text-teal-500', bg: 'bg-teal-50' },
    { title: 'Study Bot', description: 'AI-powered learning assistant', icon: <Bot className="w-5 h-5" />, href: '/dashboard/study-bot', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Study Tracker', description: 'Monitor learning sessions', icon: <Clock className="w-5 h-5" />, href: '/dashboard/study-tracker', color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'To-Do List', description: 'Manage daily tasks', icon: <ListChecks className="w-5 h-5" />, href: '/dashboard/todo-list', color: 'text-cyan-500', bg: 'bg-cyan-50' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-xs border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{timeGreeting}, Scholar! <span className="text-emerald-500">🌱</span></h1>
              <p className="text-gray-600">Ready to nurture your mind and grow your knowledge today?</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-700">{studyStreak} day streak</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
                <Star className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">Level 3 Learner</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <StudyProgress />
          <UpcomingTasks />
          <RecentActivity />
        </div>

        {/* Learning Tools */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Learning Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="group p-5 hover:border-emerald-100 transition-colors">
                    <div className={`p-3 rounded-lg ${feature.bg} ${feature.color} w-fit mb-3`}>
                      {feature.icon}
                    </div>
                    <h4 className="font-medium text-gray-800 group-hover:text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600">{feature.description}</p>
                    <div className="mt-3 flex justify-end">
                      <div className="text-gray-400 group-hover:text-emerald-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-xs"
        >
          <div className="flex justify-center items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="italic text-gray-700 mb-2">"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."</p>
          <p className="text-xs text-gray-500">- Brian Herbert</p>
        </motion.div>
      </div>
    </div>
  )
}