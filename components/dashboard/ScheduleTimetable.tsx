'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar, Clock, Plus, ChevronDown, ChevronUp,
  BookOpen, Target, Bell, MoreHorizontal, Check
} from 'lucide-react'

type ScheduleItem = {
  id: string
  title: string
  course: string
  day: string
  startTime: string
  endTime: string
  location: string
  isCompleted: boolean
  hasReminder: boolean
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<string>(days[new Date().getDay() - 1] || 'Monday')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    course: '',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    isCompleted: false,
    hasReminder: true
  })

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: '1',
      title: 'Advanced Calculus',
      course: 'MATH-301',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Science Bldg Room 203',
      isCompleted: false,
      hasReminder: true
    },
    {
      id: '2',
      title: 'Literature Seminar',
      course: 'ENG-210',
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '15:30',
      location: 'Humanities Bldg Room 105',
      isCompleted: false,
      hasReminder: true
    },
    {
      id: '3',
      title: 'Study Group',
      course: 'PHYS-202',
      day: 'Friday',
      startTime: '16:00',
      endTime: '17:30',
      location: 'Library Study Room C',
      isCompleted: false,
      hasReminder: false
    }
  ])

  const handleAddItem = () => {
    if (!newItem.title.trim()) return
    
    const item: ScheduleItem = {
      id: Date.now().toString(),
      ...newItem
    }
    
    setScheduleItems([...scheduleItems, item])
    setNewItem({
      title: '',
      course: '',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      isCompleted: false,
      hasReminder: true
    })
    setShowAddForm(false)
  }

  const toggleCompletion = (id: string) => {
    setScheduleItems(scheduleItems.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ))
  }

  const toggleReminder = (id: string) => {
    setScheduleItems(scheduleItems.map(item => 
      item.id === id ? { ...item, hasReminder: !item.hasReminder } : item
    ))
  }

  const filteredItems = scheduleItems.filter(item => item.day === activeDay)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 p-4 sm:p-6">
      <div className="ml-0 lg:ml-72 transition-all duration-300 ease-in-out">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="backdrop-blur-sm bg-white/90 rounded-2xl border border-white/20 shadow-lg p-6 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-teal-500/15 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">Study Schedule</h2>
                  <p className="text-sm text-gray-600">Manage your classes and study sessions</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-lg font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Schedule
              </motion.button>
            </div>
          </div>

          {/* Add New Item Form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="backdrop-blur-sm bg-white/90 rounded-2xl border border-white/20 shadow-lg p-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full p-3 border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none"
                    placeholder="e.g. Calculus Lecture"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <input
                    type="text"
                    value={newItem.course}
                    onChange={(e) => setNewItem({...newItem, course: e.target.value})}
                    className="w-full p-3 border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none"
                    placeholder="e.g. MATH-301"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                  <select
                    value={newItem.day}
                    onChange={(e) => setNewItem({...newItem, day: e.target.value})}
                    className="w-full p-3 border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={newItem.startTime}
                      onChange={(e) => setNewItem({...newItem, startTime: e.target.value})}
                      className="w-full p-3 border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={newItem.endTime}
                      onChange={(e) => setNewItem({...newItem, endTime: e.target.value})}
                      className="w-full p-3 border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    className="w-full p-3 border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none"
                    placeholder="e.g. Room 203"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newItem.hasReminder}
                      onChange={(e) => setNewItem({...newItem, hasReminder: e.target.checked})}
                      className="h-4 w-4 text-emerald-500 rounded border-white/30 focus:ring-emerald-200"
                    />
                    <span className="text-sm text-gray-700">Set reminder</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-white/50 border border-white/30 rounded-lg font-medium text-gray-700 hover:bg-white/70"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddItem}
                  disabled={!newItem.title.trim()}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    newItem.title.trim()
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Add Schedule
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Day Selector */}
          <div className="backdrop-blur-sm bg-white/90 rounded-2xl border border-white/20 shadow-lg p-4">
            <div className="flex overflow-x-auto pb-2">
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 py-2 rounded-lg mx-1 whitespace-nowrap transition-all ${
                    activeDay === day
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md'
                      : 'bg-white/50 hover:bg-white/70 text-gray-700'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Items */}
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="backdrop-blur-sm bg-white/90 rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                  <div className={`p-6 ${item.isCompleted ? 'opacity-70' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          item.isCompleted 
                            ? 'bg-gray-100 text-gray-500' 
                            : 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                        }`}>
                          {item.isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <BookOpen className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className={`font-bold ${
                              item.isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'
                            }`}>
                              {item.title}
                            </h3>
                            <span className="text-sm px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                              {item.course}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{item.location}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{item.startTime} - {item.endTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleReminder(item.id)}
                          className={`p-2 rounded-lg ${
                            item.hasReminder 
                              ? 'text-emerald-500 bg-emerald-100/50' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Bell className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleCompletion(item.id)}
                          className={`p-2 rounded-lg ${
                            item.isCompleted 
                              ? 'text-emerald-500 bg-emerald-100/50' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="backdrop-blur-sm bg-white/90 rounded-2xl border border-white/20 shadow-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No schedule for {activeDay}</h3>
              <p className="text-gray-500 max-w-md mx-auto">Add new schedule items to plan your study sessions and classes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}