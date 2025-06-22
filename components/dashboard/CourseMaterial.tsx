'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, FileText, Download, Search, Folder, File, ChevronDown, ChevronRight, Upload } from 'lucide-react'
import Link from 'next/link'

export default function CourseMaterial() {
  const [expandedFolders, setExpandedFolders] = React.useState<Record<string, boolean>>({
    mathematics: true,
    science: false,
    history: false
  })

  const courseMaterials = {
    mathematics: [
      { name: 'Algebra Basics.pdf', type: 'pdf', size: '2.4 MB', date: '2023-10-15' },
      { name: 'Geometry Concepts.docx', type: 'doc', size: '1.8 MB', date: '2023-11-02' },
      { name: 'Calculus Problems.pdf', type: 'pdf', size: '3.1 MB', date: '2023-09-28' }
    ],
    science: [
      { name: 'Biology Chapter 1.pptx', type: 'ppt', size: '5.2 MB', date: '2023-10-20' },
      { name: 'Chemistry Lab Report.pdf', type: 'pdf', size: '1.5 MB', date: '2023-11-05' }
    ],
    history: [
      { name: 'World War II Notes.docx', type: 'doc', size: '2.1 MB', date: '2023-10-30' },
      { name: 'Ancient Civilizations.pdf', type: 'pdf', size: '4.3 MB', date: '2023-11-10' }
    ]
  }

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }))
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-500" />
      case 'ppt':
        return <FileText className="w-5 h-5 text-orange-500" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <BookOpen className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Course Materials</h1>
        </div>
        
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium flex items-center gap-2">
              <Folder className="w-4 h-4" />
              New Folder
            </button>
            <button className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
          <div className="text-sm text-gray-500">
            12.4 GB of 15 GB used
          </div>
        </div>

        {/* Files and Folders */}
        <div className="divide-y divide-gray-200">
          {Object.entries(courseMaterials).map(([folder, files]) => (
            <div key={folder} className="p-4">
              <button
                onClick={() => toggleFolder(folder)}
                className="flex items-center gap-2 w-full text-left mb-2"
              >
                {expandedFolders[folder] ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
                <Folder className="w-5 h-5 text-amber-500" />
                <span className="font-medium text-gray-700 capitalize">{folder}</span>
                <span className="text-sm text-gray-500 ml-auto">{files.length} items</span>
              </button>

              {expandedFolders[folder] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-8 space-y-2"
                >
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {getFileIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{file.date} • {file.size}</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { action: 'Uploaded Calculus Problems.pdf', time: '2 hours ago', user: 'You' },
            { action: 'Edited Geometry Concepts.docx', time: '1 day ago', user: 'Prof. Smith' },
            { action: 'Downloaded Biology Chapter 1.pptx', time: '3 days ago', user: 'Classmate' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs"
            >
              <p className="text-sm font-medium text-gray-800">{activity.action}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{activity.user}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
