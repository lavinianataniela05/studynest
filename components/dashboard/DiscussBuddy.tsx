'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, m } from 'framer-motion'
import { MessageSquare, UserCircle2, ArrowUp, ThumbsUp, Bookmark, MoreHorizontal, Send, ChevronDown } from 'lucide-react'

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

export default function DiscussBuddy() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent')

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
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
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Discuss Buddy</h2>
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium"
            onClick={() => setSortBy(sortBy === 'recent' ? 'popular' : 'recent')}
          >
            Sort: {sortBy === 'recent' ? 'Recent' : 'Popular'}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New Post Form */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xs border border-gray-100 p-4 mb-6"
      >
        <form onSubmit={handlePostSubmit}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium flex-shrink-0">
              YO
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Start a discussion..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={!newPost.trim()}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 ${
                    newPost.trim()
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Post <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Posts List */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{post.author}</h4>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1 text-sm"
                >
                  <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-emerald-500 text-emerald-500' : 'text-gray-500'}`} />
                  <span className={post.isLiked ? 'text-emerald-600 font-medium' : 'text-gray-600'}>{post.likes}</span>
                </button>
                
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments.length}</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleBookmark(post.id)}
                  className="p-1 text-gray-500 hover:text-emerald-600"
                >
                  <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="w-4 h-4" />
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
                  className="bg-gray-50 border-t border-gray-100"
                >
                  {/* Existing Comments */}
                  <div className="px-4 py-3 space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-xs font-medium flex-shrink-0">
                          {comment.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-800">{comment.author}</span>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* New Comment Form */}
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 text-xs font-medium flex-shrink-0">
                        YO
                      </div>
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Write a comment..."
                          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 outline-none"
                        />
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          disabled={!newComment.trim()}
                          className={`p-2 rounded-lg ${
                            newComment.trim()
                              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
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
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No discussions yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">Be the first to start a discussion! Ask a question or share your thoughts with fellow students.</p>
        </motion.div>
      )}
    </div>
  )
}