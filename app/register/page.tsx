'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Coffee, Bean, Heart, Leaf, Users, Star, Sparkles } from 'lucide-react'
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Basic validation
    if (!email || !password || !name) {
      setError('All fields are required.')
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      setIsSubmitting(false)
      return
    }

    try {
      // Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: name
      })

      // Redirect to dashboard
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
      case 'auth/email-already-in-use': return 'This email address is already in use.'
      case 'auth/invalid-email': return 'The email address is not valid.'
      case 'auth/weak-password': return 'Password should be at least 6 characters.'
      case 'auth/network-request-failed': return 'Network error. Please check your internet connection and try again.'
      case 'auth/user-disabled': return 'This account has been disabled.'
      default: return firebaseError.message || 'Registration failed. Please try again.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-emerald-200/40 to-green-200/40 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute bottom-20 right-16 w-12 h-12 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-lg animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-amber-100/50 hover:shadow-amber-200/50 transition-all duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                {[...Array(10)].map((_, i) => (
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
                    <Bean className="w-6 h-6 text-amber-900" />
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                animate={{ rotate: -5, y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-block relative z-10"
              >
                <Coffee className="w-12 h-12 text-amber-100 mx-auto" strokeWidth={1.5} />
              </motion.div>
              
              <div className="relative z-10 mt-4">
                <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-amber-100/20 rounded-full border border-amber-200/30">
                  <Sparkles className="w-4 h-4 text-amber-100" />
                  <span className="text-amber-50 text-sm font-medium">JOIN OUR COMMUNITY</span>
                  <Sparkles className="w-4 h-4 text-amber-100" />
                </div>
                
                <h2 className="text-3xl font-bold text-amber-50">
                  Create Your Account
                </h2>
                <p className="text-amber-200 mt-2">
                  Become part of the Brew & Bliss family
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="p-8 space-y-6">
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
                <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/70 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-amber-900 placeholder-amber-400"
                    required
                  />
                  <Users className="absolute right-3 top-3.5 w-5 h-5 text-amber-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/70 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-amber-900 placeholder-amber-400"
                    required
                  />
                  <Heart className="absolute right-3 top-3.5 w-5 h-5 text-amber-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-amber-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/70 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition text-amber-900 placeholder-amber-400"
                    required
                    minLength={6}
                  />
                  <Leaf className="absolute right-3 top-3.5 w-5 h-5 text-amber-400" />
                </div>
                <p className="text-xs text-amber-600 mt-2">Minimum 6 characters</p>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${
                  isSubmitting ? 'bg-amber-400' : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                } shadow-lg hover:shadow-xl`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Bean className="w-5 h-5" />
                    </motion.span>
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Register Now
                  </span>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="px-8 pb-8 text-center">
              <p className="text-sm text-amber-800">
                Already have an account?{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="font-medium text-amber-600 hover:text-orange-600 underline underline-offset-4"
                >
                  Sign in here
                </button>
              </p>
              
              <div className="flex justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}