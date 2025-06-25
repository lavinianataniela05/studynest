'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageSquare, UserCircle2, ArrowUp, ThumbsUp, Bookmark, 
  MoreHorizontal, Send, ChevronDown, Sparkles, GraduationCap
} from 'lucide-react'

type Post = {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  isBookmarked: boolean
  comments: Comment[]
}

type Comment = {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
}

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`backdrop-blur-sm bg-white/90 rounded-2xl border border-white/20 shadow-lg ${className}`}>
    {children}
  </div>
)

export default function DiscussBuddy() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent')

  useEffect(() => {
    // Mock data
    const mockPosts: Post[] = [
      {
        id: 1,
        author: 'Alex Johnson',
        avatar: 'AJ',
        content: 'Has anyone found good resources for understanding quantum mechanics basics? Our professor recommended some books but I learn better with videos.',
        timestamp: '2 hours ago',
        likes: 14,
        isLiked: false,
        isBookmarked: false,
        comments: [
          {
            id: 1,
            author: 'Maria Chen',
            avatar: 'MC',
            content: 'Check out the MIT OpenCourseWare lectures on YouTube! They have a great introductory series.',
            timestamp: '1 hour ago'
          }
        ]
      },
      {
        id: 2,
        author: 'Sam Wilson',
        avatar: 'SW',
        content: "Study group for Calculus II final? I'm available Wednesdays after 3pm in the library.",
        timestamp: '5 hours ago',
        likes: 8,
        isLiked: true,
        isBookmarked: true,
        comments: []
      }
    ]
    setPosts(mockPosts)
  }, [])

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return
    
    const newPostObj: Post = {
      id: posts.length + 1,
      author: 'You',
      avatar: 'YO',
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      isBookmarked: false,
      comments: []
    }
    
    setPosts([newPostObj, ...posts])
    setNewPost('')
  }

  const handleCommentSubmit = (postId: number) => {
    if (!newComment.trim()) return
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              author: 'You',
              avatar: 'YO',
              content: newComment,
              timestamp: 'Just now'
            }
          ]
        }
      }
      return post
    }))
    
    setNewComment('')
  }

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const toggleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        }
      }
      return post
    }))
  }

  const toggleComments = (postId: number) => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId)
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    } else {
      return b.likes - a.likes
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 p-4 sm:p-6">
      <div className="ml-0 lg:ml-72 transition-all duration-300 ease-in-out">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-400/15 to-blue-500/15 rounded-full blur-2xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">Discuss Buddy</h2>
                  <p className="text-sm text-gray-600">Connect with study peers</p>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/70 border border-white/30 rounded-lg text-sm font-medium hover:bg-white/90 hover:shadow-md transition-all"
                  onClick={() => setSortBy(sortBy === 'recent' ? 'popular' : 'recent')}
                >
                  Sort: {sortBy === 'recent' ? 'Recent' : 'Popular'}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>

          {/* New Post Form */}
          <Card className="p-6 relative overflow-hidden">
            <form onSubmit={handlePostSubmit}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                  YO
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Start a discussion..."
                    className="w-full p-4 border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none resize-none hover:shadow-md transition-all"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={!newPost.trim()}
                      className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                        newPost.trim()
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Post <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </form>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <Card key={post.id} className="p-0 overflow-hidden">
                {/* Post Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-medium">
                      {post.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{post.author}</h4>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-3 border-t border-white/20 flex items-center justify-between bg-white/50">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1 text-sm hover:text-emerald-600 transition-colors"
                    >
                      <ThumbsUp className={`w-5 h-5 ${post.isLiked ? 'fill-emerald-500 text-emerald-500' : 'text-gray-500'}`} />
                      <span className={post.isLiked ? 'text-emerald-600 font-medium' : 'text-gray-600'}>{post.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleBookmark(post.id)}
                      className="p-1 text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {activeCommentPost === post.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-50/30 border-t border-white/20"
                    >
                      {/* Existing Comments */}
                      <div className="px-6 py-4 space-y-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full flex items-center justify-center text-emerald-600 text-xs font-medium flex-shrink-0">
                              {comment.avatar}
                            </div>
                            <div className="flex-1">
                              <Card className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium text-gray-800">{comment.author}</span>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700">{comment.content}</p>
                              </Card>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* New Comment Form */}
                      <div className="px-6 py-4 border-t border-white/20 bg-white/30">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full flex items-center justify-center text-emerald-600 text-xs font-medium flex-shrink-0">
                            YO
                          </div>
                          <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Write a comment..."
                              className="flex-1 px-4 py-2 text-sm border border-white/30 bg-white/50 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none hover:shadow-md transition-all"
                            />
                            <button
                              onClick={() => handleCommentSubmit(post.id)}
                              disabled={!newComment.trim()}
                              className={`p-2 rounded-xl ${
                                newComment.trim()
                                  ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white hover:shadow-lg'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <Card className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No discussions yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">Be the first to start a discussion! Ask a question or share your thoughts with fellow students.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}