// 'use client'

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Goal, Target, Trophy, Plus, ChevronDown, ChevronRight, Check, X, Edit2, Trash2 } from 'lucide-react';
// // import { db } from '@/firebase/config';
// import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
// // import { useAuth } from '@/context/AuthContext';

// interface SMARTGoal {
//   id?: string;
//   title: string;
//   description: string;
//   specific: string;
//   measurable: string;
//   achievable: string;
//   relevant: string;
//   timeBound: string;
//   progress: number;
//   completed: boolean;
//   dueDate: string;
//   createdAt: Date;
//   userId: string;
// }

// export default function GoalSetting() {
//   const { user } = useAuth();
//   const [goals, setGoals] = useState<SMARTGoal[]>([]);
//   const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentGoal, setCurrentGoal] = useState<SMARTGoal>({
//     title: '',
//     description: '',
//     specific: '',
//     measurable: '',
//     achievable: '',
//     relevant: '',
//     timeBound: '',
//     progress: 0,
//     completed: false,
//     dueDate: new Date().toISOString().split('T')[0],
//     createdAt: new Date(),
//     userId: user?.uid || ''
//   });

//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, 'goals'),
//       where('userId', '==', user.uid)
//     );

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const goalsData: SMARTGoal[] = [];
//       querySnapshot.forEach((doc) => {
//         goalsData.push({ id: doc.id, ...doc.data() } as SMARTGoal);
//       });
//       setGoals(goalsData.sort((a, b) => 
//         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       ));
//     });

//     return () => unsubscribe();
//   }, [user]);

//   const toggleGoal = (goalId: string) => {
//     setExpandedGoal(expandedGoal === goalId ? null : goalId);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setCurrentGoal(prev => ({ ...prev, [name]: value }));
//   };

//   const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCurrentGoal(prev => ({ ...prev, progress: parseInt(e.target.value) });
//   };

//   const resetForm = () => {
//     setCurrentGoal({
//       title: '',
//       description: '',
//       specific: '',
//       measurable: '',
//       achievable: '',
//       relevant: '',
//       timeBound: '',
//       progress: 0,
//       completed: false,
//       dueDate: new Date().toISOString().split('T')[0],
//       createdAt: new Date(),
//       userId: user?.uid || ''
//     });
//     setIsEditing(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!user) return;

//     try {
//       if (isEditing && currentGoal.id) {
//         const goalRef = doc(db, 'goals', currentGoal.id);
//         await updateDoc(goalRef, {
//           ...currentGoal,
//           userId: user.uid
//         });
//       } else {
//         await addDoc(collection(db, 'goals'), {
//           ...currentGoal,
//           userId: user.uid,
//           createdAt: new Date()
//         });
//       }
      
//       setIsFormOpen(false);
//       resetForm();
//     } catch (error) {
//       console.error('Error saving goal:', error);
//     }
//   };

//   const handleEdit = (goal: SMARTGoal) => {
//     setCurrentGoal(goal);
//     setIsEditing(true);
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (goalId: string) => {
//     if (confirm('Are you sure you want to delete this goal?')) {
//       try {
//         await deleteDoc(doc(db, 'goals', goalId));
//       } catch (error) {
//         console.error('Error deleting goal:', error);
//       }
//     }
//   };

//   const toggleComplete = async (goal: SMARTGoal) => {
//     if (!goal.id) return;
    
//     try {
//       const goalRef = doc(db, 'goals', goal.id);
//       await updateDoc(goalRef, {
//         completed: !goal.completed,
//         progress: !goal.completed ? 100 : 0
//       });
//     } catch (error) {
//       console.error('Error updating goal:', error);
//     }
//   };

//   const calculateDaysLeft = (dueDate: string) => {
//     const today = new Date();
//     const due = new Date(dueDate);
//     const diffTime = due.getTime() - today.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? `${diffDays} days left` : diffDays < 0 ? `${Math.abs(diffDays)} days overdue` : 'Due today';
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-emerald-50 rounded-lg">
//             <Target className="w-6 h-6 text-emerald-600" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">Goal Setting</h1>
//         </div>
        
//         <button
//           onClick={() => {
//             resetForm();
//             setIsFormOpen(true);
//           }}
//           className="px-4 py-2 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
//         >
//           <Plus className="w-5 h-5" />
//           New Goal
//         </button>
//       </div>

//       {/* SMART Goals Explanation */}
//       <div className="mb-8 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//           <Trophy className="w-5 h-5 text-amber-500" />
//           SMART Goals Framework
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           {[
//             { letter: 'S', term: 'Specific', desc: 'Clearly defined and focused' },
//             { letter: 'M', term: 'Measurable', desc: 'Trackable with concrete criteria' },
//             { letter: 'A', term: 'Achievable', desc: 'Realistic and attainable' },
//             { letter: 'R', term: 'Relevant', desc: 'Matters to your academic success' },
//             { letter: 'T', term: 'Time-bound', desc: 'Has a clear deadline' },
//           ].map((item) => (
//             <div key={item.letter} className="bg-gray-50 p-4 rounded-lg">
//               <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg mb-2">
//                 {item.letter}
//               </div>
//               <h3 className="font-medium text-gray-800">{item.term}</h3>
//               <p className="text-sm text-gray-600">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Goals List */}
//       <div className="space-y-4">
//         {goals.length === 0 ? (
//           <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xs text-center">
//             <Goal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-700 mb-2">No goals yet</h3>
//             <p className="text-gray-500 mb-4">Start by creating your first SMART goal</p>
//             <button
//               onClick={() => setIsFormOpen(true)}
//               className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//             >
//               Create Goal
//             </button>
//           </div>
//         ) : (
//           goals.map((goal) => (
//             <div key={goal.id} className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
//               <div className={`p-4 ${goal.completed ? 'bg-green-50' : ''}`}>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => toggleComplete(goal)}
//                       className={`w-6 h-6 rounded-full border flex items-center justify-center ${goal.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
//                     >
//                       {goal.completed && <Check className="w-4 h-4" />}
//                     </button>
//                     <h3 className={`font-medium ${goal.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
//                       {goal.title}
//                     </h3>
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <span className={`text-sm ${new Date(goal.dueDate) < new Date() && !goal.completed ? 'text-red-500' : 'text-gray-500'}`}>
//                       {calculateDaysLeft(goal.dueDate)}
//                     </span>
//                     <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-emerald-500"
//                         style={{ width: `${goal.progress}%` }}
//                       />
//                     </div>
//                     <span className="text-sm font-medium w-8 text-right">
//                       {goal.progress}%
//                     </span>
//                     <button
//                       onClick={() => toggleGoal(goal.id!)}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       {expandedGoal === goal.id ? (
//                         <ChevronDown className="w-5 h-5" />
//                       ) : (
//                         <ChevronRight className="w-5 h-5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {expandedGoal === goal.id && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="mt-4 pl-9"
//                   >
//                     <p className="text-gray-600 mb-4">{goal.description}</p>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h4 className="font-medium text-gray-700 mb-2">Specific</h4>
//                         <p className="text-gray-600">{goal.specific}</p>
//                       </div>
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h4 className="font-medium text-gray-700 mb-2">Measurable</h4>
//                         <p className="text-gray-600">{goal.measurable}</p>
//                       </div>
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h4 className="font-medium text-gray-700 mb-2">Achievable</h4>
//                         <p className="text-gray-600">{goal.achievable}</p>
//                       </div>
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h4 className="font-medium text-gray-700 mb-2">Relevant</h4>
//                         <p className="text-gray-600">{goal.relevant}</p>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                       <h4 className="font-medium text-gray-700 mb-2">Time-bound</h4>
//                       <p className="text-gray-600">{goal.timeBound}</p>
//                       <p className="text-sm text-gray-500 mt-2">
//                         Due date: {new Date(goal.dueDate).toLocaleDateString()}
//                       </p>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex-1 mr-4">
//                         <label htmlFor={`progress-${goal.id}`} className="block text-sm font-medium text-gray-700 mb-1">
//                           Progress: {goal.progress}%
//                         </label>
//                         <input
//                           type="range"
//                           id={`progress-${goal.id}`}
//                           min="0"
//                           max="100"
//                           value={goal.progress}
//                           onChange={(e) => {
//                             const newProgress = parseInt(e.target.value);
//                             if (goal.id) {
//                               updateDoc(doc(db, 'goals', goal.id), {
//                                 progress: newProgress,
//                                 completed: newProgress === 100
//                               });
//                             }
//                           }}
//                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                         />
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(goal)}
//                           className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
//                         >
//                           <Edit2 className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(goal.id!)}
//                           className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Goal Form Modal */}
//       {isFormOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
//           >
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {isEditing ? 'Edit Goal' : 'Create New Goal'}
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setIsFormOpen(false);
//                     resetForm();
//                   }}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                       Goal Title*
//                     </label>
//                     <input
//                       type="text"
//                       id="title"
//                       name="title"
//                       value={currentGoal.title}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                       Description
//                     </label>
//                     <textarea
//                       id="description"
//                       name="description"
//                       value={currentGoal.description}
//                       onChange={handleInputChange}
//                       rows={3}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
//                         Due Date*
//                       </label>
//                       <input
//                         type="date"
//                         id="dueDate"
//                         name="dueDate"
//                         value={currentGoal.dueDate}
//                         onChange={handleInputChange}
//                         required
//                         min={new Date().toISOString().split('T')[0]}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
//                         Progress: {currentGoal.progress}%
//                       </label>
//                       <input
//                         type="range"
//                         id="progress"
//                         name="progress"
//                         value={currentGoal.progress}
//                         onChange={handleProgressChange}
//                         min="0"
//                         max="100"
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <h3 className="font-medium text-gray-800">SMART Criteria</h3>
                    
//                     <div>
//                       <label htmlFor="specific" className="block text-sm font-medium text-gray-700 mb-1">
//                         Specific*
//                       </label>
//                       <input
//                         type="text"
//                         id="specific"
//                         name="specific"
//                         value={currentGoal.specific}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="What exactly do you want to achieve?"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="measurable" className="block text-sm font-medium text-gray-700 mb-1">
//                         Measurable*
//                       </label>
//                       <input
//                         type="text"
//                         id="measurable"
//                         name="measurable"
//                         value={currentGoal.measurable}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="How will you measure success?"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="achievable" className="block text-sm font-medium text-gray-700 mb-1">
//                         Achievable*
//                       </label>
//                       <input
//                         type="text"
//                         id="achievable"
//                         name="achievable"
//                         value={currentGoal.achievable}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Is this goal realistic with your resources?"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="relevant" className="block text-sm font-medium text-gray-700 mb-1">
//                         Relevant*
//                       </label>
//                       <input
//                         type="text"
//                         id="relevant"
//                         name="relevant"
//                         value={currentGoal.relevant}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Why is this goal important to you?"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="timeBound" className="block text-sm font-medium text-gray-700 mb-1">
//                         Time-bound*
//                       </label>
//                       <input
//                         type="text"
//                         id="timeBound"
//                         name="timeBound"
//                         value={currentGoal.timeBound}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="What's your timeline for completion?"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsFormOpen(false);
//                       resetForm();
//                     }}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
//                   >
//                     {isEditing ? 'Update Goal' : 'Create Goal'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }
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
