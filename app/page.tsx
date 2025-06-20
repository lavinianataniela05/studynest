'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, BrainCircuit, NotebookPen, Sparkles, Leaf, Coffee } from 'lucide-react'

export default function SplashScreen() {
  // Simulating router for demo - in real app, uncomment the router logic
  // const router = useRouter()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // router.push('/register')
      console.log('Redirecting to register...')
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-25 to-sage-50 p-4 overflow-hidden relative">
      {/* Enhanced floating decorative elements with study-friendly colors */}
      <div className="absolute top-16 left-8 w-24 h-24 bg-gradient-to-br from-sage-200/30 to-emerald-200/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-32 right-16 w-20 h-20 bg-gradient-to-br from-mint-200/35 to-teal-200/35 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-16 w-28 h-28 bg-gradient-to-br from-eucalyptus-200/25 to-sage-200/25 rounded-full blur-2xl animate-pulse delay-500"></div>
      <div className="absolute bottom-24 right-20 w-16 h-16 bg-gradient-to-br from-seafoam-200/40 to-mint-200/40 rounded-full blur-lg animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-4 w-12 h-12 bg-gradient-to-br from-pistachio-200/30 to-sage-200/30 rounded-full blur-lg animate-pulse delay-300"></div>

      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-32 h-32 border border-sage-300 rounded-lg rotate-12"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 border border-teal-300 rounded-full"></div>
        <div className="absolute top-1/3 right-8 w-20 h-20 border border-emerald-300 rounded-lg -rotate-6"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center relative w-full max-w-lg z-10"
      >
        {/* Enhanced animated book with study elements */}
        <motion.div
          animate={{ 
            rotate: [-3, 3, -3],
            y: [0, -8, 0]
          }}
          transition={{ 
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mx-auto mb-10 relative"
        >
          {/* Main book container with soft shadows */}
          <div className="bg-gradient-to-br from-sage-600 to-emerald-700 p-8 rounded-2xl shadow-2xl w-32 h-32 flex items-center justify-center relative border border-white/20">
            <BookOpen className="w-18 h-18 text-sage-50" strokeWidth={1.5} />
            
            {/* Soft inner glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
          </div>
          
          {/* Enhanced floating study elements */}
          {[
            { icon: NotebookPen, delay: 0, angle: 0, distance: 70, color: "sage" },
            { icon: Coffee, delay: 0.3, angle: 1.2, distance: 65, color: "teal" },
            { icon: Leaf, delay: 0.6, angle: 2.4, distance: 75, color: "emerald" },
            { icon: BrainCircuit, delay: 0.9, angle: 3.6, distance: 68, color: "mint" },
            { icon: GraduationCap, delay: 1.2, angle: 4.8, distance: 72, color: "sage" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ 
                opacity: [0.7, 1, 0.7], 
                scale: [0.8, 1.1, 0.8],
                rotate: [0, 360, 720]
              }}
              transition={{ 
                delay: item.delay,
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute flex items-center justify-center w-10 h-10 bg-white/90 rounded-full shadow-lg border border-sage-200/50"
              style={{
                left: `${Math.cos(item.angle) * item.distance + 50}px`,
                top: `${Math.sin(item.angle) * item.distance + 50}px`,
              }}
            >
              <item.icon className={`w-5 h-5 text-${item.color}-600`} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced main heading with better typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inline-flex items-center gap-4 mb-8 px-8 py-4 bg-gradient-to-r from-white/80 to-sage-50/80 rounded-2xl shadow-lg border border-sage-200/30 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-sage-600" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-sage-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent leading-tight tracking-tight">
            StudyNest
          </h1>
          <motion.div
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-emerald-600" />
          </motion.div>
        </motion.div>
                
        {/* Enhanced subtitle with better spacing */}
        <motion.p 
          className="text-xl text-sage-700 mb-12 max-w-md mx-auto leading-relaxed font-light tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Your mindful companion for focused, organized learning
        </motion.p>
        
        {/* Enhanced loading animation with study theme */}
        <motion.div 
          className="flex justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { delay: 0, color: "sage" },
            { delay: 0.2, color: "emerald" },
            { delay: 0.4, color: "teal" }
          ].map((dot, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -12, 0],
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity,
                delay: dot.delay,
                ease: "easeInOut"
              }}
              className={`h-4 w-4 bg-gradient-to-r from-${dot.color}-500 to-${dot.color}-600 rounded-full shadow-lg`}
            />
          ))}
        </motion.div>

        {/* Study progress indicator */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 1, duration: 2 }}
          className="h-1 bg-gradient-to-r from-sage-300 via-emerald-300 to-teal-300 rounded-full mx-auto max-w-xs mb-8"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full w-8 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
          />
        </motion.div>

        {/* Floating wisdom quotes/study tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
          className="text-sm text-sage-600 italic font-light"
        >
          "Knowledge grows when shared"
        </motion.div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-8">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <BrainCircuit className="w-7 h-7 text-sage-400" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Leaf className="w-7 h-7 text-emerald-400" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Coffee className="w-7 h-7 text-teal-400" />
        </motion.div>
      </div>

      {/* Ambient particle effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-sage-300 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}