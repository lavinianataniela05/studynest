'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, MessageSquare, Target, Calendar, 
  Bot, Clock, ListChecks, Lock, Mail, User,
  Sparkles, ArrowRight, Check, Flame, Star
} from 'lucide-react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(getFirebaseErrorMessage(err))
      setIsSubmitting(false)
    }
  }

  function getFirebaseErrorMessage(error: unknown): string {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
      return 'An unknown error occurred'
    }
    
    const firebaseError = error as { code?: string; message?: string }
    
    switch (firebaseError.code) {
      case 'auth/invalid-email': return 'Invalid email address'
      case 'auth/user-disabled': return 'Account disabled'
      case 'auth/user-not-found': return 'Account not found'
      case 'auth/wrong-password': return 'Incorrect password'
      case 'auth/network-request-failed': return 'Network error. Please check your connection'
      default: return firebaseError.message || 'Login failed. Please try again.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-16 w-12 h-12 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-lg animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-xl transition-all duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-700 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0.3, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  >
                    <BookOpen className="w-6 h-6 text-teal-900" />
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                animate={{ rotate: -5, y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-block relative z-10"
              >
                <BookOpen className="w-12 h-12 text-teal-100 mx-auto" strokeWidth={1.5} />
              </motion.div>
              
              <div className="relative z-10 mt-4">
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-teal-100/20 rounded-full border border-teal-200/30">
                  <Sparkles className="w-4 h-4 text-teal-100" />
                  <span className="text-teal-50 text-sm font-medium">WELCOME BACK</span>
                  <Sparkles className="w-4 h-4 text-teal-100" />
                </div>
                
                <h2 className="text-3xl font-bold text-teal-50">
                  Scholar Login
                </h2>
                <p className="text-teal-200 mt-2">
                  Continue your learning journey
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-800 placeholder-gray-400"
                    required
                  />
                  <Mail className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition text-gray-800 placeholder-gray-400"
                    required
                  />
                  <Lock className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Forgot password?
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${
                  isSubmitting ? 'bg-teal-400' : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700'
                } shadow-lg hover:shadow-xl`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <BookOpen className="w-5 h-5" />
                    </motion.span>
                    Signing In...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Login to Dashboard
                  </span>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="px-8 pb-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="font-medium text-teal-600 hover:text-emerald-600 underline underline-offset-4"
                >
                  Create one now
                </button>
              </p>
              
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-teal-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}